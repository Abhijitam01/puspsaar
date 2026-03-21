import {z} from "zod";


export const CompensationSchema = z.object({
  salary: z.number().min(0, "Salary must be positive"),
  currency: z.string().min(3, "Currency code must be 3 letters").max(3, "Currency code must be 3 letters"),
});

export const joiningDateSchema = z.object({
  joiningDate: z.string().datetime({ message: "Invalid ISO datetime" }),
  confirmationDate: z.string().datetime({ message: "Invalid ISO datetime" }).optional(),
  lastWorkingDate: z.string().datetime({ message: "Invalid ISO datetime" }).optional(),
});
