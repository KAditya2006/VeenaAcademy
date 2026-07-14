import { z } from "zod";

export const objectIdParamSchema = z.object({ params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid record id") }) });
export const slugParamSchema = z.object({ params: z.object({ slug: z.string().min(1) }) });

export const querySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    search: z.string().optional(),
    category: z.string().optional(),
    subject: z.string().optional(),
    examName: z.string().optional(),
    year: z.coerce.number().optional(),
    course: z.string().optional(),
    status: z.enum(["published", "draft"]).optional(),
    featured: z.enum(["true", "false"]).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }).partial(),
});

export const toggleSchema = z.object({ body: z.object({ value: z.boolean() }) });
export const reorderSchema = z.object({ body: z.object({ items: z.array(z.object({ id: z.string().regex(/^[a-f\d]{24}$/i), sortOrder: z.number().int().min(0) })).min(1) }) });

export const mediaAssetSchema = z.object({
  publicId: z.string().min(1),
  secureUrl: z.string().url(),
  width: z.number().optional(),
  height: z.number().optional(),
  format: z.string().optional(),
  bytes: z.number().optional(),
  altText: z.string().optional(),
}).nullable().optional();

export const stringArray = z.array(z.string().trim().min(1)).optional().default([]);
