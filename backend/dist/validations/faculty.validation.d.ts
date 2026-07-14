import { z } from "zod";
export declare const createFacultySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        slug: z.ZodOptional<z.ZodString>;
        subject: z.ZodString;
        qualification: z.ZodString;
        experience: z.ZodString;
        bio: z.ZodOptional<z.ZodString>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            publicId: z.ZodString;
            secureUrl: z.ZodString;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
            format: z.ZodOptional<z.ZodString>;
            bytes: z.ZodOptional<z.ZodNumber>;
            altText: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        phone: z.ZodOptional<z.ZodString>;
        socialLinks: z.ZodOptional<z.ZodObject<{
            linkedin: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
            website: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        }, z.core.$strip>>;
        sortOrder: z.ZodOptional<z.ZodNumber>;
        isFeatured: z.ZodOptional<z.ZodBoolean>;
        isPublished: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateFacultySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        subject: z.ZodOptional<z.ZodString>;
        qualification: z.ZodOptional<z.ZodString>;
        experience: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        photo: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
            publicId: z.ZodString;
            secureUrl: z.ZodString;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
            format: z.ZodOptional<z.ZodString>;
            bytes: z.ZodOptional<z.ZodNumber>;
            altText: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>>;
        email: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
        phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        socialLinks: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            linkedin: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
            website: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        }, z.core.$strip>>>;
        sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        isFeatured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        isPublished: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strict>;
}, z.core.$strip>;
