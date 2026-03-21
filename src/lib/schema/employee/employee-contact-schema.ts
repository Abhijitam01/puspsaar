import {z} from "zod";

export const contactSchema = z.object({
  personalEmail:z.string().email('Invalid email address'),
  workPhone: z.string().regex(/^\d{10}$/, 'Phone Number must be exactly 10 digits'),
  emergencyContactPhone: z.string().regex(/^\d{10}$/, 'Emergency Contact Phone Number must be exactly 10 digits'),
  emergencyContactRelation: z.string().optional(),
})