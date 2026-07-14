import { z } from "zod";
import { mediaAssetSchema } from "./cms.validation.js";

export const createFacultySchema = z.object({ body: z.object({
  name: z.string().trim().min(2).max(100),
  slug: z.string().trim().optional(),
  subject: z.string().trim().min(2),
  qualification: z.string().trim().min(2),
  experience: z.string().trim().min(2),
  bio: z.string().trim().max(3000).optional(),
  photo: mediaAssetSchema,
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().trim().optional(),
  socialLinks: z.object({ linkedin: z.string().url().optional().or(z.literal("")), website: z.string().url().optional().or(z.literal("")) }).optional(),
  sortOrder: z.number().int().min(0).optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
}).strict() });
export const updateFacultySchema = z.object({ body: createFacultySchema.shape.body.partial() });
