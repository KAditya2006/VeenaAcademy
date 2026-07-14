import type { Model } from "mongoose";
import type { Request } from "express";
type CmsConfig = {
    module: string;
    model: Model<any>;
    searchFields: string[];
    filterFields?: string[];
    publicFields?: string;
    adminFields?: string;
    defaultSort?: string;
};
export declare function createCmsService(config: CmsConfig): {
    listAdmin(query: Record<string, unknown>): Promise<{
        records: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    listPublic(query: Record<string, unknown>, limitDefault?: number): Promise<{
        records: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    getAdmin(id: string): Promise<any>;
    getPublicBySlug(slug: string): Promise<any>;
    create(data: Record<string, unknown>, req: Request): Promise<any>;
    update(id: string, data: Record<string, unknown>, req: Request): Promise<any>;
    publish(id: string, value: boolean, req: Request): Promise<any>;
    feature(id: string, value: boolean, req: Request): Promise<any>;
    softDelete(id: string, req: Request): Promise<any>;
    reorder(items: Array<{
        id: string;
        sortOrder: number;
    }>, req: Request): Promise<{
        count: number;
    }>;
};
export {};
