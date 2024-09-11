import prisma from "../lib/db"

export async function createInvoice() {
  return (
    await prisma.invoice.create({
        data: {
            invoice_id,
            item_name,
            quantity,
            price,
        }
    })
  )
}
