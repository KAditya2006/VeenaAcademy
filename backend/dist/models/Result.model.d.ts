import { type CmsBase } from "./cmsBase.js";
import type { MediaAsset } from "../types/index.js";
export type Result = CmsBase & {
    studentName: string;
    examName: string;
    year: number;
    rank?: string;
    marks?: string;
    maximumMarks?: string;
    percentage?: number;
    course?: string;
    achievement: string;
    photo?: MediaAsset | null;
    isFeatured: boolean;
};
export declare const ResultModel: import("mongoose").Model<Result, {}, {}, {}, import("mongoose").Document<unknown, {}, Result, {}, import("mongoose").DefaultSchemaOptions> & CmsBase & {
    studentName: string;
    examName: string;
    year: number;
    rank?: string;
    marks?: string;
    maximumMarks?: string;
    percentage?: number;
    course?: string;
    achievement: string;
    photo?: MediaAsset | null;
    isFeatured: boolean;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Result>;
