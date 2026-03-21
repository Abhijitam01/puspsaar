import {z} from "zod";

export const basicProductSchema = z.object({
  id: z.string().uuid().optional(),
 name: z.string()
    .min(2, "Product name must be at least 2 characters")
    .max(150, "Product name must not exceed 150 characters"),
   sku: z
    .string()
    .min(2, "SKU must be at least 2 characters")
    .max(50, "SKU must not exceed 50 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(150, "Slug must not exceed 150 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must be URL-friendly (lowercase, numbers, dashes)"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters"),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(300, "Short description must not exceed 300 characters"),
});

export type BasicProduct = z.infer<typeof basicProductSchema>;