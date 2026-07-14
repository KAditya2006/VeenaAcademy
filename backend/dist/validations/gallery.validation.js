import { z } from "zod";
import { galleryCategories } from "../models/GalleryItem.model.js";
export const createGallerySchema = z.object({ body: z.object({
        title: z.string().trim().min(2).max(120),
        category: z.enum(galleryCategories),
        image: z.object({ publicId: z.string().min(1), secureUrl: z.string().url(), width: z.number().optional(), height: z.number().optional(), format: z.string().optional(), bytes: z.number().optional(), altText: z.string().optional() }),
        altText: z.string().trim().min(3).max(160),
        description: z.string().trim().max(1000).optional(),
        eventDate: z.string().datetime().optional().or(z.literal("")),
        sortOrder: z.number().int().min(0).optional(),
        isFeatured: z.boolean().optional(),
        isPublished: z.boolean().optional(),
    }).strict() });
export const updateGallerySchema = z.object({ body: createGallerySchema.shape.body.partial() });
//# sourceMappingURL=gallery.validation.js.map