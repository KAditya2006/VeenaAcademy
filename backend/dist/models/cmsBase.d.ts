import { Schema, type Types } from "mongoose";
export declare const mediaAssetSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: false;
}, {
    publicId: string;
    secureUrl: string;
    format?: string | null | undefined;
    width?: number | null | undefined;
    height?: number | null | undefined;
    bytes?: number | null | undefined;
    altText?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, {
    publicId: string;
    secureUrl: string;
    format?: string | null | undefined;
    width?: number | null | undefined;
    height?: number | null | undefined;
    bytes?: number | null | undefined;
    altText?: string | null | undefined;
}, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "_id"> & {
    _id: false;
}> & Omit<{
    publicId: string;
    secureUrl: string;
    format?: string | null | undefined;
    width?: number | null | undefined;
    height?: number | null | undefined;
    bytes?: number | null | undefined;
    altText?: string | null | undefined;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    publicId: string;
    secureUrl: string;
    format?: string | null | undefined;
    width?: number | null | undefined;
    height?: number | null | undefined;
    bytes?: number | null | undefined;
    altText?: string | null | undefined;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type CmsBase = {
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    isPublished: boolean;
    publishedAt?: Date | null;
    isDeleted: boolean;
    deletedAt?: Date | null;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
};
export declare function cmsBaseFields(): {
    createdBy: {
        type: typeof Schema.Types.ObjectId;
        ref: string;
        index: boolean;
    };
    updatedBy: {
        type: typeof Schema.Types.ObjectId;
        ref: string;
    };
    isPublished: {
        type: BooleanConstructor;
        default: boolean;
        index: boolean;
    };
    publishedAt: {
        type: DateConstructor;
        default: null;
    };
    isDeleted: {
        type: BooleanConstructor;
        default: boolean;
        index: boolean;
    };
    deletedAt: {
        type: DateConstructor;
        default: null;
    };
    sortOrder: {
        type: NumberConstructor;
        default: number;
        min: number;
        index: boolean;
    };
};
