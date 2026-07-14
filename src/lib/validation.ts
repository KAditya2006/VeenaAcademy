import { z } from "zod";

export const enquirySchema = z.object({
  studentName: z.string().min(2, "Enter the student's full name."),
  studentClass: z.string().min(1, "Class is required."),
  courseInterested: z.string().min(1, "Please select a course."),
  phone: z
    .string()
    .min(10, "Enter a valid phone number.")
    .regex(/^[0-9+\-\s()]{10,16}$/, "Enter a valid phone number."),
  message: z.string().max(500, "Message must be under 500 characters.").optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
