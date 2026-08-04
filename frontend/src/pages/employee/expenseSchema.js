import { z } from "zod";

export const expenseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(
      3,
      "Title must be at least 3 characters."
    )
    .max(
      100,
      "Title cannot exceed 100 characters."
    ),

  categoryId: z
    .string()
    .min(1, "Please select a category."),

  amount: z
    .number({
      required_error: "Amount is required.",
    })
    .positive(
      "Amount must be greater than 0."
    ),

  tax: z
    .number({
      required_error: "Tax is required.",
    })
    .min(
      0,
      "Tax cannot be negative."
    ),

  expenseDate: z
    .string()
    .min(
      1,
      "Please select an expense date."
    ),

  description: z
    .string()
    .trim()
    .optional(),
});