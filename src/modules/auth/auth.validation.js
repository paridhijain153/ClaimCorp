import { z } from "zod";
import { ROLES } from "../../utils/constants.js";

/**
 * Login Validation
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

/**
 * Create User Validation
 * (Admin creates Manager/Employee)
 */
export const createUserSchema = z
  .object({
    name: z.string().trim().min(3).max(100),
    email: z.string().trim().email(),
    password: z
      .string()
      .min(8)
      .max(50)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
      ),
    role: z.enum([
      ROLES.ADMIN,
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