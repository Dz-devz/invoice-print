import { z } from "zod";

export const createInvoiceFormSchema = z.object({
  category: z
    .string()
    .min(2, { message: "Category must have 3 or more Character" }),
  quantity: z.number().positive({
    message: "Price must be positive and reasonable.",
  }).min(0),
  price: z.number().positive({
    message: "Price must be positive and reasonable.",
  }).min(0),
});

export type CreateInvoiceFormSchema = z.infer<typeof createInvoiceFormSchema>;
