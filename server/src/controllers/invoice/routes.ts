import express from "express";
import {
  createInvoiceController,
  deleteInvoiceController,
  getInvoiceController,
  getPresentInvoiceController,
  getSpecificController,
  updateInvoiceController,
} from ".";

const invoiceRouter = express.Router();

invoiceRouter.get("/getPresentInvoice", getPresentInvoiceController);
invoiceRouter.get("/getInvoice", getInvoiceController);
invoiceRouter.post("/createInvoice", createInvoiceController);
invoiceRouter.get("/getSingleInvoice/:id", getSpecificController);
invoiceRouter.put("/invoice/:invoice_id", updateInvoiceController);
invoiceRouter.delete("/invoice/:invoice_id", deleteInvoiceController);

export default invoiceRouter;
