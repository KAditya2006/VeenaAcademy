import { GalleryItemModel } from "../models/GalleryItem.model.js";
import { createCmsService } from "./cms.service.js";
export const galleryService = createCmsService({ module: "gallery", model: GalleryItemModel, searchFields: ["title", "altText", "description"], filterFields: ["category"], defaultSort: "sortOrder" });
