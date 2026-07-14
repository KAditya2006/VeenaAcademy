import { Schema, model } from "mongoose";
import { cmsBaseFields, mediaAssetSchema } from "./cmsBase.js";
const resultSchema = new Schema({
    studentName: { type: String, required: true, trim: true, maxlength: 100 },
    examName: { type: String, required: true, trim: true, index: true },
    year: { type: Number, required: true, min: 2000, max: 2100, index: true },
    rank: { type: String, trim: true },
    marks: { type: String, trim: true },
    maximumMarks: { type: String, trim: true },
    percentage: { type: Number, min: 0, max: 100 },
    course: { type: String, trim: true, index: true },
    achievement: { type: String, required: true, trim: true, maxlength: 180 },
    photo: { type: mediaAssetSchema, default: null },
    isFeatured: { type: Boolean, default: false, index: true },
    ...cmsBaseFields(),
}, { timestamps: true });
resultSchema.index({ isFeatured: 1, isPublished: 1 });
resultSchema.index({ isPublished: 1, isDeleted: 1, sortOrder: 1 });
export const ResultModel = model("Result", resultSchema);
//# sourceMappingURL=Result.model.js.map