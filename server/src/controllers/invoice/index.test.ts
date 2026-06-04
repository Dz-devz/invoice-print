import { Hono } from "hono";

jest.mock("../../data/index", () => ({
  getPresentInvoiceData: jest.fn(),
  getInvoiceData: jest.fn(),
  getSpecificData: jest.fn(),
  createInvoiceData: jest.fn(),
  updateData: jest.fn(),
  deleteData: jest.fn(),
}));

import * as data from "../../data/index";
import invoiceRouter from "./routes";

// Mirror how app.ts mounts the router so paths match production.
const app = new Hono();
app.route("/api", invoiceRouter);

const mocked = data as jest.Mocked<typeof data>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("invoice controllers", () => {
  it("GET /api/getInvoice returns the data layer's invoices as JSON", async () => {
    const invoices = [{ id: 1, invoice_no: "INV-1", name: "Acme", items: [] }];
    mocked.getInvoiceData.mockResolvedValue(invoices as never);

    const res = await app.request("/api/getInvoice");

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual(invoices);
    expect(mocked.getInvoiceData).toHaveBeenCalledTimes(1);
  });

  it("GET /api/getSingleInvoice/:id forwards the id to the data layer", async () => {
    const invoice = { id: 42, invoice_no: "INV-42", name: "Bob", items: [] };
    mocked.getSpecificData.mockResolvedValue(invoice as never);

    const res = await app.request("/api/getSingleInvoice/42");

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual(invoice);
    expect(mocked.getSpecificData).toHaveBeenCalledWith("42");
  });

  it("PUT /api/invoice/:invoice_id forwards id + items to updateData", async () => {
    const updated = {
      id: 42,
      invoice_no: "INV-42",
      name: "Bob",
      items: [
        { id: 2, description: "Widget Testing", quantity: 5, price: 10.0 },
      ],
    };
    mocked.updateData.mockResolvedValue(updated as never);

    const res = await app.request("/api/invoice/42", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ items: updated.items }),
    });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual(updated);
    expect(mocked.updateData).toHaveBeenCalledWith("42", updated.items);
  });

  it("POST /api/createInvoice passes the parsed body to createInvoiceData", async () => {
    const body = {
      invoice_no: "INV-100",
      name: "Charlie",
      items: [{ description: "Widget", quantity: 2, price: 9.99 }],
    };
    const created = { id: 100, ...body };
    mocked.createInvoiceData.mockResolvedValue(created as never);

    const res = await app.request("/api/createInvoice", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual(created);
    expect(mocked.createInvoiceData).toHaveBeenCalledWith(
      body.invoice_no,
      body.name,
      body.items,
    );
  });

  it("DELETE /api/invoice/:invoice_id forwards the id to deleteData", async () => {
    mocked.deleteData.mockResolvedValue({ id: 7 } as never);

    const res = await app.request("/api/invoice/7", { method: "DELETE" });

    expect(res.status).toBe(200);
    expect(mocked.deleteData).toHaveBeenCalledWith("7");
  });
});
