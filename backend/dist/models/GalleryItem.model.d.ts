import { type CmsBase } from "./cmsBase.js";
import type { MediaAsset } from "../types/index.js";
export declare const galleryCategories: readonly ["classroom", "events", "students", "seminars", "results", "facilities"];
export type GalleryCategory = (typeof galleryCategories)[number];
export type GalleryItem = CmsBase & {
    title: string;
    category: GalleryCategory;
    image: MediaAsset;
    altText: string;
    description?: string;
    eventDate?: Date | null;
    isFeatured: boolean;
};
export declare const GalleryItemModel: import("mongoose").Model<GalleryItem, {}, {}, {}, import("mongoose").Document<unknown, {}, GalleryItem, {}, import("mongoose").DefaultSchemaOptions> & CmsBase & {
    title: string;
    category: GalleryCategory;
    image: MediaAsset;
    altText: string;
    description?: string;
    eventDate?: Date | null;
    isFeatured: boolean;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, GalleryItem>;
