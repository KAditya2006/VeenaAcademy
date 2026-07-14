import type { Request } from "express";
import { Types } from "mongoose";
import type { LinkedModule } from "../types/index.js";
export declare function uploadImage(file: Express.Multer.File | undefined, module: LinkedModule, altText: string | undefined, req: Request): Promise<import("mongoose").Document<unknown, {}, import("../models/Upload.model.js").Upload, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Upload.model.js").Upload & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare function deleteUpload(id: string, req: Request): Promise<import("mongoose").Document<unknown, {}, import("../models/Upload.model.js").Upload, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Upload.model.js").Upload & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
