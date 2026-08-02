import { z } from "zod";

export const createExpenseSchema = z.object({
  categoryId: z.string().min(1, "Category is required."),
  title: z.string().min(3).max(100),
  description: z.string().optional(),
  expenseDate: z.coerce.date(),
  amount: z.coerce.number().positive(),
  tax: z.coerce.number().min(0),
});

export const updateExpenseSchema = z.object({
  categoryId: z.string().min(1, "Category is required."),
  title: z.string().min(3).max(100),
  description: z.string().optional(),
  expenseDate: z.coerce.date(),
  amount: z.coerce.number().positive(),
  tax: z.coerce.number().min(0),
});