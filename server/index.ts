import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { createServer } from "http";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/getAllInvoice", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany();
    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

app.get("/getLatestInvoice", async (req, res) => {
  try{
    const invoices = await prisma.invoice.findFirst({
      orderBy: {
        invoice_id: 'desc',
      }
    })
  } catch (error) {
    res.status(500).json({error: "Failed to get latest invoices"});
  }
});

app.post("/createInvoice", async (req, res) => {
  try {
    const invoices = req.body;

    // Check if the incoming data is an array or a single object
    const invoicesArray = Array.isArray(invoices) ? invoices : [invoices];

    // Validate each invoice object
    for (const invoice of invoicesArray) {
      const { category, quantity, price } = invoice;

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
    }

    // Create invoices in the database
    const newInvoices = await prisma.invoice.createMany({
      data: invoicesArray,
    });

    res.json(newInvoices);
  } catch (error) {
    console.error("Error creating invoices:", error);
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
