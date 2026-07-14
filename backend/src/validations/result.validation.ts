import { z } from "zod";
import { mediaAssetSchema } from "./cms.validation.js";

export const createResultSchema = z.object({ body: z.object({
  studentName: z.string().trim().min(2).max(100),
  examName: z.string().trim().min(2),
  year: z.number().int().min(2000).max(2100),
  rank: z.string().trim().optional(),
  marks: z.string().trim().optional(),
  maximumMarks: z.string().trim().optional(),
  percentage: z.number().min(0).max(100).optional(),
  course: z.string().trim().optional(),
  achievement: z.string().trim().min(2).max(180),
  photo: mediaAssetSchema,
  sortOrder: z.number().int().min(0).optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
}).strict() });
export const updateResultSchema = z.object({ body: createResultSchema.shape.body.partial() });
