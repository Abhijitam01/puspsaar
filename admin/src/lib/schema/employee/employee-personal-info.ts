import { z } from "zod";

export const employeePersonalSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  
  // ✅ Fixed gender enum
  gender: z
    .enum(["male", "female", "other"])
    .refine((val) => val !== undefined, { message: "Gender is required" }),

  profileImages: z.array(z.string().url("Profile images must be valid URLs")).optional(),
  employeeCode: z
    .string()
    .min(1, "Employee Code is required")
    .max(8, "Employee Code must be 8 characters long"),
  dob: z.string().min(1, "Date of Birth is required"),
  userId: z.string().optional(),

  // ✅ Optional role enum
  role: z.enum(["admin", "manager", "employee", "intern"]).optional(),
});
