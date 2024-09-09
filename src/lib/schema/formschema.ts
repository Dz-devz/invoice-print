import {z} from "zod"

const createInvoiceFormSchema = z.object({
    category: z.string().min(2, {message: "Category must have 3 or more Character"}),
    quantity: z.string(),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
        message: "Amount must be positive and reasonable.",
      }),
  });

  export type createInvoiceFormSchema = z.infer<typeof createInvoiceFormSchema>; 