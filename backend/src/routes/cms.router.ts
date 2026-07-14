import { Router } from "express";
import type { RequestHandler } from "express";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { objectIdParamSchema, querySchema, reorderSchema, slugParamSchema, toggleSchema } from "../validations/cms.validation.js";

type CmsController = Record<"listAdmin" | "listPublic" | "getAdmin" | "create" | "update" | "remove" | "publish" | "feature" | "reorder", RequestHandler> & { getPublicBySlug?: RequestHandler };

type CmsSchemas = { create: Parameters<typeof validate>[0]; update: Parameters<typeof validate>[0] };

const manageRoles = ["super_admin", "admin", "content_manager"] as const;
const readRoles = ["super_admin", "admin", "content_manager", "counsellor", "faculty"] as const;

export function createCmsRouter(controller: CmsController, schemas: CmsSchemas, options: { publicDetail?: boolean } = {}) {
  const router = Router();
  router.get("/public", validate(querySchema), controller.listPublic);
  if (options.publicDetail && controller.getPublicBySlug) router.get("/public/:slug", validate(slugParamSchema), controller.getPublicBySlug);
  router.patch("/reorder", protect, authorize(...manageRoles), validate(reorderSchema), controller.reorder);
  router.get("/", protect, authorize(...readRoles), validate(querySchema), controller.listAdmin);
  router.post("/", protect, authorize(...manageRoles), validate(schemas.create), controller.create);
  router.get("/:id", protect, authorize(...readRoles), validate(objectIdParamSchema), controller.getAdmin);
  router.patch("/:id", protect, authorize(...manageRoles), validate(objectIdParamSchema), validate(schemas.update), controller.update);
  router.delete("/:id", protect, authorize("super_admin", "admin"), validate(objectIdParamSchema), controller.remove);
  router.patch("/:id/publish", protect, authorize(...manageRoles), validate(objectIdParamSchema), validate(toggleSchema), controller.publish);
  router.patch("/:id/feature", protect, authorize(...manageRoles), validate(objectIdParamSchema), validate(toggleSchema), controller.feature);
  return router;
}
