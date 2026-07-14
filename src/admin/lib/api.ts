import { activities, adminUsers, dashboardAnalytics, leads, moduleRecords } from "../data/mockAdmin";
import type { AdminRecord, LeadRecord } from "../types";
import { adminAuthApi, adminRequest } from "./apiClient";

const delay = (ms = 220) => new Promise((resolve) => window.setTimeout(resolve, ms));
const realModules = new Set(["courses", "faculty", "results", "gallery"]);

type ApiList<T> = { data: T[]; pagination?: unknown };
type CmsApiRecord = Record<string, unknown> & { _id: string; id?: string; title?: string; name?: string; studentName?: string; category?: string; subject?: string; examName?: string; isPublished?: boolean; isFeatured?: boolean; sortOrder?: number; updatedAt?: string; shortDescription?: string; qualification?: string; achievement?: string; altText?: string };

type CmsPayload = Record<string, unknown>;

function pathFor(module: string) {
  return `/${module}`;
}

function mapCmsRecord(record: CmsApiRecord, module: string): AdminRecord {
  const title = String(record.title ?? record.name ?? record.studentName ?? "Untitled");
  const subtitle = String(record.category ?? record.subject ?? record.examName ?? record.shortDescription ?? record.qualification ?? record.achievement ?? record.altText ?? module);
  return {
    id: String(record._id ?? record.id),
    title,
    subtitle,
    status: record.isPublished ? "Published" : "Draft",
    owner: record.isFeatured ? "Featured" : "CMS",
    updatedAt: record.updatedAt ? new Date(String(record.updatedAt)).toLocaleDateString() : "Recently",
    metric: record.sortOrder !== undefined ? `Order ${record.sortOrder}` : undefined,
  };
}

function cmsModule(module: string) {
  return {
    async list(): Promise<AdminRecord[]> {
      const response = await adminRequest<CmsApiRecord[]>(`${pathFor(module)}?limit=50&sortBy=sortOrder&sortOrder=asc`);
      return response.data.map((record) => mapCmsRecord(record, module));
    },
    async rawList(): Promise<CmsApiRecord[]> {
      const response = await adminRequest<CmsApiRecord[]>(`${pathFor(module)}?limit=100&sortBy=sortOrder&sortOrder=asc`);
      return response.data;
    },
    async create(payload: CmsPayload) {
      return (await adminRequest<CmsApiRecord>(pathFor(module), { method: "POST", body: JSON.stringify(payload) })).data;
    },
    async update(id: string, payload: CmsPayload) {
      return (await adminRequest<CmsApiRecord>(`${pathFor(module)}/${id}`, { method: "PATCH", body: JSON.stringify(payload) })).data;
    },
    async remove(id: string) {
      return (await adminRequest<CmsApiRecord>(`${pathFor(module)}/${id}`, { method: "DELETE" })).data;
    },
    async publish(id: string, value: boolean) {
      return (await adminRequest<CmsApiRecord>(`${pathFor(module)}/${id}/publish`, { method: "PATCH", body: JSON.stringify({ value }) })).data;
    },
    async feature(id: string, value: boolean) {
      return (await adminRequest<CmsApiRecord>(`${pathFor(module)}/${id}/feature`, { method: "PATCH", body: JSON.stringify({ value }) })).data;
    },
    async reorder(items: Array<{ id: string; sortOrder: number }>) {
      return (await adminRequest<{ count: number }>(`${pathFor(module)}/reorder`, { method: "PATCH", body: JSON.stringify({ items }) })).data;
    },
  };
}

export const adminApi = {
  auth: adminAuthApi,
  courses: cmsModule("courses"),
  faculty: cmsModule("faculty"),
  results: cmsModule("results"),
  gallery: cmsModule("gallery"),
  uploads: {
    async image(formData: FormData) {
      return (await adminRequest<{ id: string; publicId: string; secureUrl: string; width?: number; height?: number; format?: string; bytes?: number; altText?: string }>("/uploads/image", { method: "POST", body: formData })).data;
    },
    async remove(id: string) {
      return (await adminRequest<Record<string, never>>(`/uploads/${id}`, { method: "DELETE" })).data;
    },
  },
  async getDashboard() {
    await delay();
    return dashboardAnalytics;
  },
  async listModule(module: string): Promise<AdminRecord[]> {
    if (realModules.has(module)) return cmsModule(module).list();
    await delay();
    return moduleRecords[module] ?? [];
  },
  async listLeads(): Promise<LeadRecord[]> {
    await delay();
    return leads;
  },
  async listActivities() {
    await delay();
    return activities;
  },
  async listUsers() {
    await delay();
    return adminUsers;
  },
};
