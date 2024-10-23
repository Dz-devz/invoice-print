import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Invoice from "./invoice";
import { useStore } from '../hooks/invoiceHook';

const InvoicePage = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const {clearInvoice} = useStore();
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Invoice",
    onAfterPrint: () => {
      clearInvoice(); // Clear invoices after printing is completed
    },
  });

  return (
<div className="flex justify-center space-x-4">
      <div className="relative mb-2 max-w-xl" ref={invoiceRef}>
        <Invoice />
      </div>
      <div>
        <button
          className="p-4 shadow-md text-white bg-gray-950 rounded-lg"
          onClick={handlePrint}
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
