import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { createServer } from "http";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/getAllInvoice", async (req, res) => {
  const invoices = await prisma.invoice.findMany();
  res.json(invoices);
});

app.post("/createInvoice", async (req, res) => {
  try {
    const { category, quantity, price } = req.body;

    // Basic validation to check if required fields are provided
    if (!category || quantity === undefined || price === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure quantity and price are the correct types
    if (
      typeof category !== "string" ||
      typeof quantity !== "number" ||
      typeof price !== "number"
    ) {
      return res.status(400).json({ error: "Invalid data types" });
    }

    const newInvoice = await prisma.invoice.create({
      data: {
        category,
        quantity,
        price,
      },
    });

    res.json(newInvoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/invoice/:invoice_id", async (req, res) => {
  const { invoice_id }: { invoice_id: string } = req.params;
  const { category, quantity, price } = req.body;
  const post = await prisma.invoice.update({
    where: { invoice_id: Number(invoice_id) },
    data: { category, quantity, price },
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

const server = createServer(app); // Use app as the handler

// Serve the app similar to Hono's approach
server.listen(8080, () => {
  console.log(`Server running on port 8080`);
});
