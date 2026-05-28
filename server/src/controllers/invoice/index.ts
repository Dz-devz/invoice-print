import { Context } from "hono";

import {
  createInvoiceData,
  deleteData,
  getInvoiceData,
  getPresentInvoiceData,
  getSpecificData,
  updateData,
} from "../../data/index";

export async function getPresentInvoiceController(c: Context) {
  const invoice = await getPresentInvoiceData();

  return c.json(invoice);
}

export async function getInvoiceController(c: Context) {
  const invoice = await getInvoiceData();

  return c.json(invoice);
}

export async function getSpecificController(c: Context) {
  const id = c.req.param("id");

  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  const invoice = await getSpecificData(id);

  return c.json(invoice);
}

export async function createInvoiceController(c: Context) {
  const { invoice_no, name, items } = await c.req.json();

  const newInvoice = await createInvoiceData(invoice_no, name, items);

  return c.json(newInvoice);
}

export async function updateInvoiceController(c: Context) {
  const invoice_id = c.req.param("invoice_id");

  if (!invoice_id) {
    return c.json({ error: "Invoice ID is required" }, 400);
  }

  const { items } = await c.req.json();

  const newInvoice = await updateData(invoice_id, items);

  return c.json(newInvoice);
}

export async function deleteInvoiceController(c: Context) {
  const invoice_id = c.req.param("invoice_id");

  if (!invoice_id) {
    return c.json({ error: "Invoice ID is required" }, 400);
  }

  const deletedInvoice = await deleteData(invoice_id);

  return c.json(deletedInvoice);
}
