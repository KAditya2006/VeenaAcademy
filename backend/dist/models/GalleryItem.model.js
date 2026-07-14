import { Schema, model } from "mongoose";
import { cmsBaseFields, mediaAssetSchema } from "./cmsBase.js";
export const galleryCategories = ["classroom", "events", "students", "seminars", "results", "facilities"];
const galleryItemSchema = new Schema({
    title: { type: String, required: true, trim: true, maxlength: 120 },
    category: { type: String, enum: galleryCategories, required: true, index: true },
    image: { type: mediaAssetSchema, required: true },
    altText: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, trim: true, maxlength: 1000 },
    eventDate: { type: Date, default: null, index: true },
    isFeatured: { type: Boolean, default: false, index: true },
    ...cmsBaseFields(),
}, { timestamps: true });
galleryItemSchema.index({ isPublished: 1, isDeleted: 1, sortOrder: 1 });
galleryItemSchema.index({ isFeatured: 1, isPublished: 1 });
export const GalleryItemModel = model("GalleryItem", galleryItemSchema);
//# sourceMappingURL=GalleryItem.model.js.map