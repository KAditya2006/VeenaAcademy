import type { Request, Response } from "express";
type CmsService = {
    listAdmin(query: Record<string, unknown>): Promise<{
        records: unknown[];
        pagination: unknown;
    }>;
    listPublic(query: Record<string, unknown>, limitDefault?: number): Promise<{
        records: unknown[];
        pagination: unknown;
    }>;
    getAdmin(id: string): Promise<unknown>;
    getPublicBySlug?(slug: string): Promise<unknown>;
    create(data: Record<string, unknown>, req: Request): Promise<unknown>;
    update(id: string, data: Record<string, unknown>, req: Request): Promise<unknown>;
    publish(id: string, value: boolean, req: Request): Promise<unknown>;
    feature(id: string, value: boolean, req: Request): Promise<unknown>;
    softDelete(id: string, req: Request): Promise<unknown>;
    reorder(items: Array<{
        id: string;
        sortOrder: number;
    }>, req: Request): Promise<unknown>;
};
export declare function createCmsController(service: CmsService, labels: {
    singular: string;
    plural: string;
    publicDetail?: boolean;
}): {
    listAdmin: (req: Request, res: Response, next: import("express").NextFunction) => void;
    listPublic: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getAdmin: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getPublicBySlug: (req: Request, res: Response, next: import("express").NextFunction) => void;
    create: (req: Request, res: Response, next: import("express").NextFunction) => void;
    update: (req: Request, res: Response, next: import("express").NextFunction) => void;
    remove: (req: Request, res: Response, next: import("express").NextFunction) => void;
    publish: (req: Request, res: Response, next: import("express").NextFunction) => void;
    feature: (req: Request, res: Response, next: import("express").NextFunction) => void;
    reorder: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
export {};
