import { z } from "zod";
export declare const uploadImageSchema: z.ZodObject<{
    body: z.ZodObject<{
        module: z.ZodDefault<z.ZodEnum<{
            faculty: "faculty";
            course: "course";
            result: "result";
            gallery: "gallery";
            unassigned: "unassigned";
        }>>;
        altText: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
