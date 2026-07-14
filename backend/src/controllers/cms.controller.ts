import type { Request, Response } from "express";
import { sendSuccess } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

type CmsService = {
  listAdmin(query: Record<string, unknown>): Promise<{ records: unknown[]; pagination: unknown }>;
  listPublic(query: Record<string, unknown>, limitDefault?: number): Promise<{ records: unknown[]; pagination: unknown }>;
  getAdmin(id: string): Promise<unknown>;
  getPublicBySlug?(slug: string): Promise<unknown>;
  create(data: Record<string, unknown>, req: Request): Promise<unknown>;
  update(id: string, data: Record<string, unknown>, req: Request): Promise<unknown>;
  publish(id: string, value: boolean, req: Request): Promise<unknown>;
  feature(id: string, value: boolean, req: Request): Promise<unknown>;
  softDelete(id: string, req: Request): Promise<unknown>;
  reorder(items: Array<{ id: string; sortOrder: number }>, req: Request): Promise<unknown>;
};

export function createCmsController(service: CmsService, labels: { singular: string; plural: string; publicDetail?: boolean }) {
  return {
    listAdmin: asyncHandler(async (req: Request, res: Response) => {
      const result = await service.listAdmin(req.query as Record<string, unknown>);
      return res.status(200).json({ success: true, message: `${labels.plural} fetched successfully`, data: result.records, pagination: result.pagination });
    }),
    listPublic: asyncHandler(async (req: Request, res: Response) => {
      const result = await service.listPublic(req.query as Record<string, unknown>, 50);
      return res.status(200).json({ success: true, message: `${labels.plural} fetched successfully`, data: result.records, pagination: result.pagination });
    }),
    getAdmin: asyncHandler(async (req: Request, res: Response) => sendSuccess(res, 200, `${labels.singular} fetched successfully`, await service.getAdmin(String(req.params.id)))),
    getPublicBySlug: asyncHandler(async (req: Request, res: Response) => {
      if (!service.getPublicBySlug) return sendSuccess(res, 404, `${labels.singular} not found`, {});
      return sendSuccess(res, 200, `${labels.singular} fetched successfully`, await service.getPublicBySlug(String(req.params.slug)));
    }),
    create: asyncHandler(async (req: Request, res: Response) => sendSuccess(res, 201, `${labels.singular} created successfully`, await service.create(req.body, req))),
    update: asyncHandler(async (req: Request, res: Response) => sendSuccess(res, 200, `${labels.singular} updated successfully`, await service.update(String(req.params.id), req.body, req))),
    remove: asyncHandler(async (req: Request, res: Response) => sendSuccess(res, 200, `${labels.singular} deleted successfully`, await service.softDelete(String(req.params.id), req))),
    publish: asyncHandler(async (req: Request, res: Response) => sendSuccess(res, 200, `${labels.singular} publish state updated`, await service.publish(String(req.params.id), req.body.value, req))),
    feature: asyncHandler(async (req: Request, res: Response) => sendSuccess(res, 200, `${labels.singular} featured state updated`, await service.feature(String(req.params.id), req.body.value, req))),
    reorder: asyncHandler(async (req: Request, res: Response) => sendSuccess(res, 200, `${labels.plural} reordered successfully`, await service.reorder(req.body.items, req))),
  };
}

