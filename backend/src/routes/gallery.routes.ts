import { createCmsRouter } from "./cms.router.js";
import { galleryController } from "../controllers/gallery.controller.js";
import { createGallerySchema, updateGallerySchema } from "../validations/gallery.validation.js";
export const galleryRouter = createCmsRouter(galleryController, { create: createGallerySchema, update: updateGallerySchema });
