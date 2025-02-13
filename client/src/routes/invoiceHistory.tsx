import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useCallback, useEffect, useMemo } from "react";
import { useStore } from "../hooks/invoiceHook";

type InvoiceItem = {
  id: number;
  description: string;
  price: number;
  quantity: number;
  invoiceId: number;
};

export const Route = createFileRoute("/invoiceHistory")({
  component: () => <InvoiceHistory />,
  // validateSearch: (id) => {
  //   return {
  //     id: id,
  //   };
  // },
});

function InvoiceHistory() {
  const { allInvoices, fetchInvoice, loading } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  const handleClickId = useCallback(
    (id: number) => {
      console.log("Handle");
      navigate({
        to: "/history/$id",
        params: { id: id.toString() },
      });
    },
    [navigate]
  );

  const groupedInvoices = useMemo(() => {
    return allInvoices?.map((invoice) => {
      const subtotal = invoice.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
      const tax = subtotal * 0.1;
      const total = subtotal + tax;

      return {
        ...invoice,
        items: invoice.items.filter((item) => item.invoiceId === invoice.id),
        subtotal,
        tax,
        total,
      };
    });
  }, [allInvoices]);

  if (allInvoices?.length === 0) {
    return (
      <div className="text-center text-2xl font-bold">
        No Invoice History data available
      </div>
    );
  }
  if (loading)
    return (
      <div className="text-center text-2xl font-bold">
        Fetching Invoice History...
      </div>
    );

  return (
    <>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {groupedInvoices?.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            onClick={() => handleClickId(invoice.id)}
          />
        ))}
      </div>
    </>
  );
}

const InvoiceCard = React.memo(
  ({
    invoice,
    onClick,
  }: {
    invoice: {
      items: InvoiceItem[];
      subtotal: number;
      tax: number;
      total: number;
      id: number;
      name: string;
      invoice_id: number;
      invoice_no: string;
      createdAt: string;
    };
    onClick: () => void;
  }) => {
    return (
      <div
        key={invoice.id}
        id="invoice"
        className="p-8 print:p-4 max-w-xl mx-auto bg-white shadow-lg border border-gray-300 print:shadow-none print:border-none rounded-lg"
        onClick={onClick}
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
            {invoice.items.map((item) => (
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
            <span>₱{invoice.subtotal}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-600 mt-1">
            <span>Tax (10%)</span>
            <span>₱{invoice.tax}</span>
          </div>
          <div className="flex justify-between text-xl font-bold mt-4">
            <span>Total</span>
            <span>₱{invoice.total}</span>
          </div>
        </div>

        <div className="mt-10 text-sm print:text-xs">
          <div className="flex justify-between">
            <div>
              <p className="font-bold">Customer Name: {invoice.name}</p>
              <p className="font-bold">Invoice no. {invoice.invoice_no}</p>
              <p>
                Date: {new Date(invoice.createdAt).toLocaleDateString("en-US")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
