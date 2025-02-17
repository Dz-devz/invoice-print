import { useEffect } from "react";
import { useStore } from "../hooks/invoiceHook";

const Invoice = () => {
  const { latestInvoice, fetchPresentInvoice, loading } = useStore();

  useEffect(() => {
    fetchPresentInvoice();
  }, [fetchPresentInvoice]);

  const date = new Date();
  const standardDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (!latestInvoice) {
    return <div>No invoice data available</div>;
  }

  if (loading)
    return (
      <div className="text-center text-2xl font-bold">Fetching Invoices...</div>
    );

  return (
    <div
      id="invoice"
      className="p-8 print:p-4 max-w-xl mx-auto bg-white shadow-lg border border-gray-300 print:shadow-none print:border-none rounded-lg"
    >
      <table className="w-full text-sm print:text-xs text-gray-700 border-t border-b border-dashed border-gray-300">
        <thead className="border-b border-dashed border-gray-300">
          <tr>
            <th className="py-3 px-2 text-left font-bold uppercase">
              Description
            </th>
            <th className="py-3 px-2 text-left font-bold uppercase">
              Unit Price
            </th>
            <th className="py-3 px-2 text-left font-bold uppercase">Qty</th>
            <th className="py-3 px-2 text-left font-bold uppercase">Total</th>
          </tr>
        </thead>
        <tbody>
          {latestInvoice?.items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-dashed border-gray-300"
            >
              <td className="py-2 px-2">{item.description}</td>
              <td className="py-2 px-2">₱{item.price.toFixed(2)}</td>
              <td className="py-2 px-2">{item.quantity}</td>
              <td className="py-2 px-2">
                ₱{(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-gray-800 text-lg font-bold border-t border-dashed border-gray-300 pt-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            ₱
            {latestInvoice?.items
              .reduce((sum, item) => sum + item.quantity * item.price, 0)
              .toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-600 mt-1">
          <span>Tax (10%)</span>
          <span>
            ₱
            {(
              latestInvoice?.items.reduce(
                (sum, item) => sum + item.quantity * item.price,
                0
              ) * 0.1
            ).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-xl font-bold mt-4">
          <span>Total</span>
          <span>
            ₱
            {(
              latestInvoice?.items.reduce(
                (sum, item) => sum + item.quantity * item.price,
                0
              ) * 1.1
            ).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-10 text-sm print:text-xs">
        <div className="flex justify-between">
          <div>
            <p className="font-bold">Customer Name: {latestInvoice.name}</p>
            <p className="font-bold">Invoice no. {latestInvoice.invoice_no}</p>
            <p>Date: {standardDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
