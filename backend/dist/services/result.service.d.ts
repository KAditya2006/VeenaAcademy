export declare const resultService: {
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
    create(data: Record<string, unknown>, req: import("express").Request): Promise<any>;
    update(id: string, data: Record<string, unknown>, req: import("express").Request): Promise<any>;
    publish(id: string, value: boolean, req: import("express").Request): Promise<any>;
    feature(id: string, value: boolean, req: import("express").Request): Promise<any>;
    softDelete(id: string, req: import("express").Request): Promise<any>;
    reorder(items: Array<{
        id: string;
        sortOrder: number;
    }>, req: import("express").Request): Promise<{
        count: number;
    }>;
};
