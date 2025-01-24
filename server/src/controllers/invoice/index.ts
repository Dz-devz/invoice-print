import { Request, Response } from "express";
import {
  createInvoiceData,
  deleteData,
  getInvoiceData,
  getPresentInvoiceData,
  getSpecificData,
  updateData,
} from "../../data/index";

export async function getPresentInvoiceController(req: Request, res: Response) {
  const invoice = await getPresentInvoiceData();
  res.json(invoice);
}

export async function getInvoiceController(req: Request, res: Response) {
  const invoice = await getInvoiceData();
  res.json(invoice);
}

export async function getSpecificController(req: Request, res: Response) {
  const { id } = req.params;
  const invoice = await getSpecificData(id);

  res.json(invoice);
}

export async function createInvoiceController(req: Request, res: Response) {
  const { invoice_no, name, items } = req.body;
  const newInvoice = createInvoiceData(invoice_no, name, items);

  return res.json(newInvoice);
}

export async function updateInvoiceController(req: Request, res: Response) {
  const { invoice_id } = req.params;
  const { items } = req.body;
  const newInvoice = updateData(invoice_id, items);

  return res.json(newInvoice);
}

export async function deleteInvoiceController(req: Request, res: Response) {
  const { invoice_id } = req.params;

  const deletedInvoice = deleteData(invoice_id);

  return res.json(deletedInvoice);
}
