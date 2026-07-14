export type PaginationInput = {
    page?: unknown;
    limit?: unknown;
    sortBy?: unknown;
    sortOrder?: unknown;
};
export declare function parsePagination(query: PaginationInput, defaults?: {
    limit?: number;
    sortBy?: string;
}): {
    page: number;
    limit: number;
    skip: number;
    sort: Record<string, 1 | -1>;
};
export declare function paginationMeta(page: number, limit: number, total: number): {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
