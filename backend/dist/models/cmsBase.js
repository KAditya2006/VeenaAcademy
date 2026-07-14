import { Schema } from "mongoose";
export const mediaAssetSchema = new Schema({
    publicId: { type: String, required: true },
    secureUrl: { type: String, required: true },
    width: Number,
    height: Number,
    format: String,
    bytes: Number,
    altText: String,
}, { _id: false });
export function cmsBaseFields() {
    return {
        createdBy: { type: Schema.Types.ObjectId, ref: "AdminUser", index: true },
        updatedBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
        isPublished: { type: Boolean, default: false, index: true },
        publishedAt: { type: Date, default: null },
        isDeleted: { type: Boolean, default: false, index: true },
        deletedAt: { type: Date, default: null },
        sortOrder: { type: Number, default: 0, min: 0, index: true },
    };
}
//# sourceMappingURL=cmsBase.js.map