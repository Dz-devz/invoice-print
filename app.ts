import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.get("/getAllInvoice", async (req, res) => {
  const invoices = await prisma.invoice.findMany();
  res.json(invoices);
});

app.post("/createInvoice", async (req, res) => {
  const { item_name, quantity, price } = req.body;
  const newInvoice = await prisma.invoice.create({
    data: {
      item_name,
      quantity,
      price,
    },
  });
  res.json(newInvoice);
});

app.put("/invoice/:invoice_id", async (req, res) => {
  const { invoice_id }: { invoice_id: string } = req.params;
  const { item_name, quantity, price } = req.body;
  const post = await prisma.invoice.update({
    where: { invoice_id: Number(invoice_id) },
    data: { item_name, quantity, price },
  });
  res.json(post);
});

app.delete("/user/:invoice_id", async (req, res) => {
  const { invoice_id }: { invoice_id?: string } = req.params;
  const user = await prisma.invoice.delete({
    where: {
      invoice_id: Number(invoice_id),
    },
  });
  res.json(user);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
