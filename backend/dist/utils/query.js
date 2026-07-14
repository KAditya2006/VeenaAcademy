export function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
export function searchRegex(value) {
    if (typeof value !== "string" || !value.trim())
        return undefined;
    return new RegExp(escapeRegex(value.trim()), "i");
}
//# sourceMappingURL=query.js.map