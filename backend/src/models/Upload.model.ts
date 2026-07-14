import { Schema, model, type Types } from "mongoose";
import type { LinkedModule } from "../types/index.js";

export type Upload = {
  publicId: string;
  secureUrl: string;
  resourceType: "image";
  folder: string;
  originalFilename?: string;
  format?: string;
  mimeType?: string;
  bytes?: number;
  width?: number;
  height?: number;
  altText?: string;
  uploadedBy?: Types.ObjectId;
  linkedModule: LinkedModule;
  linkedRecordId?: Types.ObjectId | null;
  isDeleted: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const uploadSchema = new Schema<Upload>({
  publicId: { type: String, required: true, unique: true, index: true },
  secureUrl: { type: String, required: true },
  resourceType: { type: String, enum: ["image"], default: "image" },
  folder: { type: String, required: true, index: true },
  originalFilename: String,
  format: String,
  mimeType: String,
  bytes: Number,
  width: Number,
  height: Number,
  altText: String,
  uploadedBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
  linkedModule: { type: String, enum: ["course", "faculty", "result", "gallery", "unassigned"], default: "unassigned", index: true },
  linkedRecordId: { type: Schema.Types.ObjectId, default: null, index: true },
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });
export const UploadModel = model<Upload>("Upload", uploadSchema);
