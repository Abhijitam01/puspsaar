import {z} from "zod";

export const addressSchema = z.object({
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, 'Pincode is required').regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  country: z.string().min(1, "Country is required"),
})

