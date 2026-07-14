import { Schema, model } from "mongoose";
import { cmsBaseFields, mediaAssetSchema } from "./cmsBase.js";
import { slugify } from "../utils/slug.js";
const courseSchema = new Schema({
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, trim: true, lowercase: true, index: true },
    category: { type: String, required: true, trim: true, index: true },
    shortDescription: { type: String, required: true, trim: true, maxlength: 260 },
    longDescription: { type: String, trim: true, maxlength: 4000 },
    duration: { type: String, trim: true, default: "" },
    eligibility: { type: String, trim: true, default: "" },
    subjects: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    outcomes: [{ type: String, trim: true }],
    batchTimings: [{ type: String, trim: true }],
    image: { type: mediaAssetSchema, default: null },
    icon: { type: String, trim: true, default: null },
    isFeatured: { type: Boolean, default: false, index: true },
    seoTitle: { type: String, trim: true, maxlength: 70, default: null },
    seoDescription: { type: String, trim: true, maxlength: 170, default: null },
    ...cmsBaseFields(),
}, { timestamps: true });
courseSchema.pre("validate", function setSlug() {
    if (!this.slug && this.title)
        this.slug = slugify(this.title);
    if (this.slug)
        this.slug = slugify(this.slug);
});
courseSchema.index({ slug: 1, isDeleted: 1 }, { unique: true });
courseSchema.index({ isPublished: 1, isDeleted: 1, sortOrder: 1 });
courseSchema.index({ isFeatured: 1, isPublished: 1 });
courseSchema.index({ createdAt: -1 });
export const CourseModel = model("Course", courseSchema);
//# sourceMappingURL=Course.model.js.map