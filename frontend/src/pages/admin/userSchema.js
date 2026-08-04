import { z } from "zod";

import { ROLES } from "../../constants/roles";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),

  role: z.enum([
    ROLES.MANAGER,
    ROLES.EMPLOYEE,
  ]),

  department: z
    .string()
    .min(2, "Department is required"),

  designation: z
    .string()
    .min(2, "Designation is required"),

  managerId: z
    .string()
    .optional(),
});