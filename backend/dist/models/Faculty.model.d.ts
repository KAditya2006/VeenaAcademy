import { type CmsBase } from "./cmsBase.js";
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
    socialLinks?: {
        linkedin?: string;
        website?: string;
    };
    isFeatured: boolean;
};
export declare const FacultyModel: import("mongoose").Model<Faculty, {}, {}, {}, import("mongoose").Document<unknown, {}, Faculty, {}, import("mongoose").DefaultSchemaOptions> & CmsBase & {
    name: string;
    slug: string;
    subject: string;
    qualification: string;
    experience: string;
    bio?: string;
    photo?: MediaAsset | null;
    email?: string;
    phone?: string;
    socialLinks?: {
        linkedin?: string;
        website?: string;
    };
    isFeatured: boolean;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Faculty>;
