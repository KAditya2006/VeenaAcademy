import { Schema, model } from "mongoose";
import { cmsBaseFields, mediaAssetSchema, type CmsBase } from "./cmsBase.js";
import { slugify } from "../utils/slug.js";
import type { MediaAsset } from "../types/index.js";

export type Faculty = CmsBase & {
  name: string;
  slug: string;
  subject: string;
  qualification: string;
  experience: string;
  bio?: string;
  photo?: MediaAsset | null;
  email?: string;
  phone?: string;
  socialLinks?: { linkedin?: string; website?: string };
  isFeatured: boolean;
};

const facultySchema = new Schema<Faculty>({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  slug: { type: String, required: true, trim: true, lowercase: true, index: true },
  subject: { type: String, required: true, trim: true, index: true },
  qualification: { type: String, required: true, trim: true },
  experience: { type: String, required: true, trim: true },
  bio: { type: String, trim: true, maxlength: 3000 },
  photo: { type: mediaAssetSchema, default: null },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  socialLinks: { linkedin: String, website: String },
  isFeatured: { type: Boolean, default: false, index: true },
  ...cmsBaseFields(),
}, { timestamps: true });
facultySchema.pre("validate", function setSlug() {
  if (!this.slug && this.name) this.slug = slugify(this.name);
  if (this.slug) this.slug = slugify(this.slug);
});
facultySchema.index({ slug: 1, isDeleted: 1 }, { unique: true });
facultySchema.index({ isPublished: 1, isDeleted: 1, sortOrder: 1 });
facultySchema.index({ isFeatured: 1, isPublished: 1 });
export const FacultyModel = model<Faculty>("Faculty", facultySchema);


