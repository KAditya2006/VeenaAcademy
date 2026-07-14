export function parsePagination(query, defaults = {}) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || defaults.limit || 10));
    const sortBy = typeof query.sortBy === "string" ? query.sortBy : defaults.sortBy || "sortOrder";
    const sortOrder = query.sortOrder === "asc" ? 1 : -1;
    return { page, limit, skip: (page - 1) * limit, sort: { [sortBy]: sortOrder } };
}
export function paginationMeta(page, limit, total) {
    const pages = Math.max(1, Math.ceil(total / limit));
    return { page, limit, total, pages, hasNextPage: page < pages, hasPreviousPage: page > 1 };
}
//# sourceMappingURL=pagination.js.map