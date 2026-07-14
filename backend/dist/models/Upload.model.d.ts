import { type Types } from "mongoose";
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
export declare const UploadModel: import("mongoose").Model<Upload, {}, {}, {}, import("mongoose").Document<unknown, {}, Upload, {}, import("mongoose").DefaultSchemaOptions> & Upload & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Upload>;
