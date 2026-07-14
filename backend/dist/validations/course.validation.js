import { z } from "zod";
import { mediaAssetSchema, stringArray } from "./cms.validation.js";
export const createCourseSchema = z.object({ body: z.object({
        title: z.string().trim().min(2).max(120),
        slug: z.string().trim().optional(),
        category: z.string().trim().min(2),
        shortDescription: z.string().trim().min(10).max(260),
        longDescription: z.string().trim().max(4000).optional(),
        duration: z.string().trim().optional(),
        eligibility: z.string().trim().optional(),
        subjects: stringArray,
        features: stringArray,
        outcomes: stringArray,
        batchTimings: stringArray,
        image: mediaAssetSchema,
        icon: z.string().trim().nullable().optional(),
        sortOrder: z.number().int().min(0).optional(),
        isFeatured: z.boolean().optional(),
        isPublished: z.boolean().optional(),
        seoTitle: z.string().trim().max(70).nullable().optional(),
        seoDescription: z.string().trim().max(170).nullable().optional(),
    }).strict() });
export const updateCourseSchema = z.object({ body: createCourseSchema.shape.body.partial() });
//# sourceMappingURL=course.validation.js.map