import type { RequestHandler } from "express";
import { validate } from "../middlewares/validate.middleware.js";
type CmsController = Record<"listAdmin" | "listPublic" | "getAdmin" | "create" | "update" | "remove" | "publish" | "feature" | "reorder", RequestHandler> & {
    getPublicBySlug?: RequestHandler;
};
type CmsSchemas = {
    create: Parameters<typeof validate>[0];
    update: Parameters<typeof validate>[0];
};
export declare function createCmsRouter(controller: CmsController, schemas: CmsSchemas, options?: {
    publicDetail?: boolean;
}): import("express-serve-static-core").Router;
export {};
