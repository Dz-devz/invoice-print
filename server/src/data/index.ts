import { PrismaClient } from "@prisma/client";
import { BadRequestError, NotFoundError } from "utils/errors";

const prisma = new PrismaClient();

export async function getPresentInvoiceData() {
  const invoices = await prisma.invoice.findFirst({
    include: {
      items: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return invoices;
}

export async function getInvoiceData() {
  const invoices = await prisma.invoice.findMany({
    include: {
      items: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return invoices;
}

export async function getSpecificData(id: string) {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      items: true,
    },
  });

  if (!invoice) {
    throw new NotFoundError("Specific invoice not found");
  }

  return invoice;
}

export async function createInvoiceData(
  invoice_no: string,
  name: string,
  items: {
    description: string;
    quantity: number;
    price: number;
  }[]
) {
  if (
    !invoice_no ||
    !items ||
    !name ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    throw new BadRequestError("Invalid items data");
  }
  // iterate using for each to all of the items to check if types or any missing fields
  for (const item of items) {
    const { description, quantity, price } = item;

    if (!description || quantity === undefined || price === undefined) {
      throw new BadRequestError("Invalid items data");
    }

    if (
      typeof description !== "string" ||
      typeof quantity !== "number" ||
      typeof price !== "number"
    ) {
      throw new BadRequestError("Invalid items data");
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
  return newInvoice;
}

export async function updateData(
  invoice_id: string,
  items: {
    id: number;
    description: string;
    quantity: number;
    price: number;
  }[]
) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new BadRequestError("Invalid items data");
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

  return updatedInvoice;
}

export async function deleteData(invoice_id: string) {
  const deletedInvoice = await prisma.invoice.delete({
    where: {
      id: Number(invoice_id),
    },
    include: { items: true },
  });

  if (!deletedInvoice) {
    throw new NotFoundError("Invoice not found");
  }

  return deletedInvoice;
}
