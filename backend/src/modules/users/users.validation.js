import { z } from "zod";
import { ROLES } from "../../utils/constants.js";

export const createUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name cannot exceed 100 characters"),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password cannot exceed 50 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    role: z.enum([
      ROLES.MANAGER,
      ROLES.EMPLOYEE,
    ]),

    department: z.string().trim().optional(),

    designation: z.string().trim().optional(),

    managerId: z.string().trim().optional(),

    isActive: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === ROLES.EMPLOYEE && !data.managerId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["managerId"],
        message: "Manager is required for an employee.",
      });
    }
  });

export const updateUserSchema = z.object({
  name: z.string().trim().min(3).max(100).optional(),

  department: z.string().trim().optional(),

  designation: z.string().trim().optional(),

  isActive: z.boolean().optional(),
});

export const assignManagerSchema = z.object({
  managerId: z
    .string()
    .trim()
    .min(1, "Manager ID is required"),
});

export const updateUserStatusSchema = z.object({
    isActive: z.boolean(),
});
export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
});