import { type Types } from "mongoose";
import { type CmsBase } from "./cmsBase.js";
import type { MediaAsset } from "../types/index.js";
export type Course = CmsBase & {
    title: string;
    slug: string;
    category: string;
    shortDescription: string;
    longDescription?: string;
    duration?: string;
    eligibility?: string;
    subjects: string[];
    features: string[];
    outcomes: string[];
    batchTimings: string[];
    image?: MediaAsset | null;
    icon?: string | null;
    isFeatured: boolean;
    seoTitle?: string | null;
    seoDescription?: string | null;
};
export declare const CourseModel: import("mongoose").Model<Course, {}, {}, {}, import("mongoose").Document<unknown, {}, Course, {}, import("mongoose").DefaultSchemaOptions> & CmsBase & {
    title: string;
    slug: string;
    category: string;
    shortDescription: string;
    longDescription?: string;
    duration?: string;
    eligibility?: string;
    subjects: string[];
    features: string[];
    outcomes: string[];
    batchTimings: string[];
    image?: MediaAsset | null;
    icon?: string | null;
    isFeatured: boolean;
    seoTitle?: string | null;
    seoDescription?: string | null;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Course>;
