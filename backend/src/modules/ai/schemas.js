import { z } from "zod";

export const receiptOCRSchema = z.object({
  merchantName: z.string().nullable(),

  invoiceNumber: z.string().nullable(),

  invoiceDate: z.string().nullable(),

  amount: z.number().nullable(),

  tax: z.number().nullable(),

  ocrText: z.string().nullable(),
});