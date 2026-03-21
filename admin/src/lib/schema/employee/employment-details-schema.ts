import { z } from "zod";

// Enums
export const employeeStatusEnum = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);
export const employmentTypeEnum = z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"]);

export const departmentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().min(1, "Department ID is required"),
    name: z.string().min(1, "Department name is required"),
    code: z.string().min(1, "Department code is required"),
    description: z.string().optional(),
    parentId: z.string().optional(),
    isActive: z.boolean(),
    parent: z.lazy(() => departmentSchema).optional(),
    children: z.array(z.lazy(() => departmentSchema)).optional(),
    employees: z.array(z.lazy(() => employeeSchema)).optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
);

// Employment details schema (no duplication)
export const employmentDetailsSchema = z.object({
  designation: z.string().min(1, "Designation is required"),

  // Either reference the department object OR just store departmentId
  department: departmentSchema.optional(),
  departmentId: z.string().optional(),

  reportingTo: z.lazy(() => employeeSchema).optional(),
  reportingToId: z.string().optional(),

  status: employeeStatusEnum,
  employmentType: employmentTypeEnum,
});

// Employee schema forward declaration
export const employeeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().min(1, "Employee ID is required"),
    userId: z.string().min(1, "User ID is required"),
    employeeCode: z.string().min(1, "Employee code is required"),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
);