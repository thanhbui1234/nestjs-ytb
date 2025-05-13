import { ROLE } from 'src/interface';
import { z } from 'zod';

// Base employee schema
export const employeeSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.nativeEnum(ROLE, {
    errorMap: () => ({ message: 'Invalid role' }),
  }),
  // Add other fields based on your Prisma schema
});

// Schema for creating an employee
export const createEmployeeSchema = employeeSchema;

// Schema for updating an employee
export const updateEmployeeSchema = employeeSchema.partial();

// Type inference
export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
