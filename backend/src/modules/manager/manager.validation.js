import { z } from "zod";

export const rejectExpenseSchema = z.object({
  managerComment: z
    .string()
    .trim()
    .min(5, "Comment must be at least 5 characters.")
    .max(500),
});