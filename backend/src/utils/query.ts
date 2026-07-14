export function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function searchRegex(value?: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  return new RegExp(escapeRegex(value.trim()), "i");
}
