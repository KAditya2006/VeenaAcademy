import { z } from "zod";
export declare const objectIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const slugParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        slug: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const querySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
        limit: z.ZodOptional<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
        search: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        subject: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        examName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        year: z.ZodOptional<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
        course: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
            published: "published";
            draft: "draft";
        }>>>;
        featured: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
            true: "true";
            false: "false";
        }>>>;
        sortBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        sortOrder: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
            asc: "asc";
            desc: "desc";
        }>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const toggleSchema: z.ZodObject<{
    body: z.ZodObject<{
        value: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const reorderSchema: z.ZodObject<{
    body: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            sortOrder: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const mediaAssetSchema: z.ZodOptional<z.ZodNullable<z.ZodObject<{
    publicId: z.ZodString;
    secureUrl: z.ZodString;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    format: z.ZodOptional<z.ZodString>;
    bytes: z.ZodOptional<z.ZodNumber>;
    altText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>>;
export declare const stringArray: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
