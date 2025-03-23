import { z } from "zod";

export const medicationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
  patientId: z.string().length(24, "Invalid patient ID format"),
});

export const patientSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  allergies: z.array(z.string()).optional(),
  weight: z.number().positive("Weight must be a positive number"),
  height: z.number().positive("Height must be a positive number"),
});

export const patientUpdateSchema = patientSchema.partial();
