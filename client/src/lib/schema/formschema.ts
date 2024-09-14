import { z } from "zod";

export const createInvoiceFormSchema = z.object({
  category: z
    .string()
    .min(2, { message: "Category must have 3 or more Character" }),
  quantity: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Price must be positive and reasonable.",
  }),
});

export type CreateInvoiceFormSchema = z.infer<typeof createInvoiceFormSchema>;
