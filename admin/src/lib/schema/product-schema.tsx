import { z } from 'zod';

// Helper schemas
const nonEmptyString = z.string().min(1, "This field is required");
const positiveNumber = z.number().positive("Must be a positive number");
const nonNegativeNumber = z.number().nonnegative("Cannot be negative");

// Sub-schemas (defined first since they're used in the main schema)
export const productImageSchema = z.object({
  url: nonEmptyString.url("Invalid URL format"),
  thumbnailUrl: z.string().url("Invalid URL format").optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  isPrimary: z.boolean().optional(),
  displayOrder: z.number().int().nonnegative().optional(),
});

export const productDimensionsSchema = z.object({
  length: positiveNumber.optional(),
  width: positiveNumber.optional(),
  height: positiveNumber.optional(),
  unit: z.enum(['cm', 'inches', 'mm']).optional(),
});

export const productAttributeSchema = z.object({
  attributeTypeId: nonEmptyString,
  attributeName: nonEmptyString,
  dataType: z.enum(['TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'ENUM']),
  isRequired: z.boolean(),
  value: z.union([z.string(), z.number(), z.boolean(), z.date()]),
  values: z.array(z.string()).optional(),
}).superRefine((data, ctx) => {
  if (data.dataType === 'ENUM' && (!data.values || data.values.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "ENUM attributes must have values",
      path: ["values"],
    });
  }
  
  if (data.dataType === 'TEXT' && typeof data.value !== 'string') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Value must be a string for TEXT type",
      path: ["value"],
    });
  }
  // Add similar checks for other data types as needed
});

export const productVariantSchema = z.object({
  variantSku: nonEmptyString,
  variantName: nonEmptyString,
  attributes: z.record(z.string(), z.string().min(1, "Attribute value is required")),
  pricingOverride: z.boolean().optional(),
  mrp: nonNegativeNumber.optional(),
  sellingPrice: nonNegativeNumber.optional(),
  weight: nonNegativeNumber.optional(),
  images: z.array(productImageSchema).optional(),
  isActive: z.boolean().optional(),
});

export const warehouseInventorySchema = z.object({
  warehouseId: nonEmptyString,
  availableQuantity: nonNegativeNumber,
  minStockLevel: nonNegativeNumber.optional(),
  maxStockLevel: nonNegativeNumber.optional(),
  reorderPoint: nonNegativeNumber.optional(),
  reorderQuantity: nonNegativeNumber.optional(),
  location: z.object({
    rack: z.string().optional(),
    shelf: z.string().optional(),
    bin: z.string().optional(),
  }).optional(),
});

// Main product schema
export const productSchema = z.object({
  // Basic product info
  name: z.string()
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name cannot exceed 50 characters"),
  sku: z.string()
    .min(3, "SKU must be at least 3 characters")
    .max(20, "SKU cannot exceed 20 characters"),
  slug: z.string()
    .min(2, "Slug must be at least 2 characters")
    .max(50, "Slug cannot exceed 50 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  shortDescription: z.string()
    .min(5, "Short description must be at least 5 characters")
    .max(200, "Short description cannot exceed 200 characters"),

  // Pricing
  mrp: z.number()
    .min(0, "MRP must be a positive number")
    .max(1000000, "MRP cannot exceed ₹10,00,000"),
  sellingPrice: z.number()
    .min(0, "Selling price must be a positive number")
    .max(1000000, "Selling price cannot exceed ₹10,00,000"),
  costPrice: z.number()
    .min(0, "Cost price must be a positive number")
    .max(1000000, "Cost price cannot exceed ₹10,00,000")
    .optional(),
  taxRate: z.number()
    .min(0, "Tax rate must be 0% or higher")
    .max(100, "Tax rate cannot exceed 100%")
    .optional(),
  hsnCode: z.string()
    .min(4, "HSN code must be at least 4 characters")
    .max(10, "HSN code cannot exceed 10 characters")
    .regex(/^[0-9]+$/, "HSN code must contain only numbers")
    .optional(),

  // Brand
  brandId: z.string().optional(),

  // Categories & Attributes
  categoryIds: z.array(nonEmptyString).min(1, "At least one category is required"),
  tags: z.array(z.string()).optional(),
  attributes: z.array(productAttributeSchema).optional(),

  // Images
  images: z.array(productImageSchema).min(1, "At least one image is required"),

  // Physical attributes
  weight: nonNegativeNumber.optional(),
  dimensions: z.array(productDimensionsSchema).optional(),

  // Variants
  hasVariants: z.boolean().optional(),
  variants: z.array(productVariantSchema).optional(),

  // Inventory
  stockStatus: z.enum(['IN_STOCK', 'OUT_OF_STOCK', 'BACKORDER', 'PREORDER']),
  warehouseInventory: z.array(warehouseInventorySchema).optional(),

  // Return policy
  isReturnable: z.boolean().optional(),
  returnPeriodDays: z.number().int().nonnegative().optional(),

  // Status & dates
  status: z.enum(['DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED']),
  publishedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).superRefine((data, ctx) => {
  // Validate selling price is not greater than MRP
  if (data.sellingPrice > data.mrp) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Selling price cannot be greater than MRP",
      path: ["sellingPrice"],
    });
  }

  // Validate variants exist if hasVariants is true
  if (data.hasVariants && (!data.variants || data.variants.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Product has variants but no variants provided",
      path: ["variants"],
    });
  }

  // Validate primary image is set if multiple images exist
  if (data.images.length > 1 && !data.images.some(img => img.isPrimary)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "One image must be marked as primary when multiple images exist",
      path: ["images"],
    });
  }
});


// Type exports
export type ProductFormValues = z.infer<typeof productSchema>;
export type ProductImage = z.infer<typeof productImageSchema>;
export type ProductDimensions = z.infer<typeof productDimensionsSchema>;
export type ProductAttribute = z.infer<typeof productAttributeSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type WarehouseInventory = z.infer<typeof warehouseInventorySchema>;