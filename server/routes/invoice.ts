import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express.Router();

app.get("/getPresentInvoice", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findFirst({
      include: {
        items: true,
      },
      orderBy: {
        id: "desc", // Optional: Order by invoice id
      },
    });
    console.log(invoices);

    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

app.get("/getInvoice", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        items: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    console.log(invoices);

    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

app.get("/getSingleInvoice/:id", async (req, res) => {
  const { id }: { id: string } = req.params;
  try {
    const invoices = await prisma.invoice.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        items: true,
      },
    });
    console.log(invoices);

    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

// app.get("/getLatestInvoice", async (req, res) => {
//   try{
//     const invoices = await prisma.invoice.findFirst({
//       orderBy: {
//         invoice_id: 'desc',
//       }
//     })
//   } catch (error) {
//     res.status(500).json({error: "Failed to get latest invoices"});
//   }
// });

app.post("/createInvoice", async (req, res) => {
  try {
    const { invoice_no, name, items } = req.body;
    //Check if array or single data
    if (
      !invoice_no ||
      !items ||
      !name ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({ error: "Invalid invoice or items data" });
    }
    // iterate using for each to all of the items to check if types or any missing fields
    for (const item of items) {
      const { description, quantity, price } = item;

      if (!description || quantity === undefined || price === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (
        typeof description !== "string" ||
        typeof quantity !== "number" ||
        typeof price !== "number"
      ) {
        return res.status(400).json({ error: "Invalid data types" });
      }
    }

    const newInvoice = await prisma.invoice.create({
      data: {
        invoice_no: invoice_no,
        name: name,
        items: {
          create: items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
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
  const { items } = req.body;

  // Check if the value of data is null or undefinded
  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided for update." });
    }

    const updatedInvoice = await prisma.invoice.update({
      where: { id: Number(invoice_id) },
      data: {
        items: {
          upsert: items.map((item) => ({
            where: { id: item.id || 0 },
            update: {
              description: item.description,
              quantity: item.quantity,
              price: item.price,
            },
            create: {
              description: item.description,
              quantity: item.quantity,
              price: item.price,
            },
          })),
        },
      },
      include: { items: true },
    });

    res.json(updatedInvoice);
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete data
app.delete("/invoice/:invoice_id", async (req, res) => {
  const { invoice_id }: { invoice_id?: string } = req.params;

  try {
    const deletedInvoice = await prisma.invoice.delete({
      where: {
        id: Number(invoice_id),
      },
      include: { items: true },
    });

    res.json(deletedInvoice);
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { app as invoice };
