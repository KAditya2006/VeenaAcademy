import { z } from "zod";
export declare const createGallerySchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        category: z.ZodEnum<{
            classroom: "classroom";
            events: "events";
            students: "students";
            seminars: "seminars";
            results: "results";
            facilities: "facilities";
        }>;
        image: z.ZodObject<{
            publicId: z.ZodString;
            secureUrl: z.ZodString;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
            format: z.ZodOptional<z.ZodString>;
            bytes: z.ZodOptional<z.ZodNumber>;
            altText: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        altText: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        eventDate: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        sortOrder: z.ZodOptional<z.ZodNumber>;
        isFeatured: z.ZodOptional<z.ZodBoolean>;
        isPublished: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateGallerySchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodEnum<{
            classroom: "classroom";
            events: "events";
            students: "students";
            seminars: "seminars";
            results: "results";
            facilities: "facilities";
        }>>;
        image: z.ZodOptional<z.ZodObject<{
            publicId: z.ZodString;
            secureUrl: z.ZodString;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
            format: z.ZodOptional<z.ZodString>;
            bytes: z.ZodOptional<z.ZodNumber>;
            altText: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        altText: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        eventDate: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
        sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        isFeatured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        isPublished: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strict>;
}, z.core.$strip>;
