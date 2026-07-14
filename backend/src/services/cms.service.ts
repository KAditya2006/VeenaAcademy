import type { Model } from "mongoose";
import { Types } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { parsePagination, paginationMeta } from "../utils/pagination.js";
import { searchRegex } from "../utils/query.js";
import { writeAuditLog } from "./audit.service.js";
import type { Request } from "express";

type CmsConfig = {
  module: string;
  model: Model<any>;
  searchFields: string[];
  filterFields?: string[];
  publicFields?: string;
  adminFields?: string;
  defaultSort?: string;
};

function statusFilter(status?: unknown) {
  if (status === "published") return { isPublished: true };
  if (status === "draft") return { isPublished: false };
  return {};
}

function featuredFilter(featured?: unknown) {
  if (featured === "true") return { isFeatured: true };
  if (featured === "false") return { isFeatured: false };
  return {};
}

function buildFilters(config: CmsConfig, query: Record<string, unknown>, publicOnly = false) {
  const filter: Record<string, unknown> = { isDeleted: false };
  if (publicOnly) filter.isPublished = true;
  Object.assign(filter, statusFilter(query.status), featuredFilter(query.featured));

  for (const field of config.filterFields ?? []) {
    const value = query[field];
    if (value !== undefined && value !== "") filter[field] = value;
  }

  const regex = searchRegex(query.search);
  if (regex) filter.$or = config.searchFields.map((field) => ({ [field]: regex }));
  return filter;
}

function duplicateSlugError(error: unknown): never {
  if (typeof error === "object" && error && "code" in error && (error as { code?: number }).code === 11000) {
    throw new ApiError(409, "A record with this slug already exists");
  }
  throw error;
}

export function createCmsService(config: CmsConfig) {
  return {
    async listAdmin(query: Record<string, unknown>) {
      const { page, limit, skip, sort } = parsePagination(query, { sortBy: config.defaultSort ?? "sortOrder" });
      const filter = buildFilters(config, query);
      const [records, total] = await Promise.all([
        config.model.find(filter).sort(sort).skip(skip).limit(limit).select(config.adminFields ?? "").lean(),
        config.model.countDocuments(filter),
      ]);
      return { records, pagination: paginationMeta(page, limit, total) };
    },
    async listPublic(query: Record<string, unknown>, limitDefault = 50) {
      const { page, limit, skip, sort } = parsePagination(query, { limit: limitDefault, sortBy: config.defaultSort ?? "sortOrder" });
      const filter = buildFilters(config, query, true);
      const [records, total] = await Promise.all([
        config.model.find(filter).sort(sort).skip(skip).limit(limit).select(config.publicFields ?? "").lean(),
        config.model.countDocuments(filter),
      ]);
      return { records, pagination: paginationMeta(page, limit, total) };
    },
    async getAdmin(id: string) {
      const record = await config.model.findOne({ _id: id, isDeleted: false });
      if (!record) throw new ApiError(404, `${config.module} record not found`);
      return record;
    },
    async getPublicBySlug(slug: string) {
      const record = await config.model.findOne({ slug, isDeleted: false, isPublished: true }).select(config.publicFields ?? "").lean();
      if (!record) throw new ApiError(404, `${config.module} record not found`);
      return record;
    },
    async create(data: Record<string, unknown>, req: Request) {
      if (typeof data.slug === "string" && await config.model.exists({ slug: data.slug, isDeleted: false })) {
        throw new ApiError(409, "A record with this slug already exists");
      }
      try {
        const record = await config.model.create({ ...data, createdBy: req.user?._id, updatedBy: req.user?._id });
        await writeAuditLog({ userId: req.user?._id, action: `${config.module}.created`, module: config.module, targetId: String(record._id), req });
        return record;
      } catch (error) {
        duplicateSlugError(error);
      }
    },
    async update(id: string, data: Record<string, unknown>, req: Request) {
      if (typeof data.slug === "string" && await config.model.exists({ slug: data.slug, isDeleted: false, _id: { $ne: id } })) {
        throw new ApiError(409, "A record with this slug already exists");
      }
      try {
        const record = await config.model.findOneAndUpdate({ _id: id, isDeleted: false }, { ...data, updatedBy: req.user?._id }, { returnDocument: "after", runValidators: true });
        if (!record) throw new ApiError(404, `${config.module} record not found`);
        await writeAuditLog({ userId: req.user?._id, action: `${config.module}.updated`, module: config.module, targetId: id, metadata: { fields: Object.keys(data) }, req });
        return record;
      } catch (error) {
        duplicateSlugError(error);
      }
    },
    async publish(id: string, value: boolean, req: Request) {
      const record = await config.model.findOne({ _id: id, isDeleted: false });
      if (!record) throw new ApiError(404, `${config.module} record not found`);
      record.set("isPublished", value);
      if (value && !record.get("publishedAt")) record.set("publishedAt", new Date());
      record.set("updatedBy", req.user?._id);
      await record.save();
      await writeAuditLog({ userId: req.user?._id, action: `${config.module}.${value ? "published" : "unpublished"}`, module: config.module, targetId: id, req });
      return record;
    },
    async feature(id: string, value: boolean, req: Request) {
      const record = await config.model.findOneAndUpdate({ _id: id, isDeleted: false }, { isFeatured: value, updatedBy: req.user?._id }, { returnDocument: "after" });
      if (!record) throw new ApiError(404, `${config.module} record not found`);
      await writeAuditLog({ userId: req.user?._id, action: `${config.module}.${value ? "featured" : "unfeatured"}`, module: config.module, targetId: id, req });
      return record;
    },
    async softDelete(id: string, req: Request) {
      const record = await config.model.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true, deletedAt: new Date(), updatedBy: req.user?._id }, { returnDocument: "after" });
      if (!record) throw new ApiError(404, `${config.module} record not found`);
      await writeAuditLog({ userId: req.user?._id, action: `${config.module}.deleted`, module: config.module, targetId: id, req });
      return record;
    },
    async reorder(items: Array<{ id: string; sortOrder: number }>, req: Request) {
      const ids = items.map((item) => item.id);
      if (new Set(ids).size !== ids.length) throw new ApiError(422, "Reorder item ids must be unique");
      await config.model.bulkWrite(items.map((item) => ({ updateOne: { filter: { _id: new Types.ObjectId(item.id), isDeleted: false }, update: { $set: { sortOrder: item.sortOrder, updatedBy: req.user?._id } } } })) as any);
      await writeAuditLog({ userId: req.user?._id, action: `${config.module}.reordered`, module: config.module, metadata: { count: items.length }, req });
      return { count: items.length };
    },
  };
}

