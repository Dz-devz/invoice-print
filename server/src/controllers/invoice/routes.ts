import {
  createInvoiceController,
  deleteInvoiceController,
  getInvoiceController,
  getPresentInvoiceController,
  getSpecificController,
  updateInvoiceController,
} from ".";
import { Hono } from "hono";

// const invoiceRouter = express.Router();
const invoiceRouter = new Hono();

invoiceRouter.get("/getPresentInvoice", getPresentInvoiceController);
invoiceRouter.get("/getInvoice", getInvoiceController);
invoiceRouter.post("/createInvoice", createInvoiceController);
invoiceRouter.get("/getSingleInvoice/:id", getSpecificController);
invoiceRouter.put("/invoice/:invoice_id", updateInvoiceController);
invoiceRouter.delete("/invoice/:invoice_id", deleteInvoiceController);

export default invoiceRouter;
