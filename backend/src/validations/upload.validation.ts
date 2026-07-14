import { z } from "zod";

export const uploadImageSchema = z.object({ body: z.object({
  module: z.enum(["course", "faculty", "result", "gallery", "unassigned"]).default("unassigned"),
  altText: z.string().trim().max(160).optional(),
}) });
