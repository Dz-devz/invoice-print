import { useRef } from "react";
import { useStore } from "../hooks/invoiceHook";
import Invoice from "./invoice";

const InvoicePage = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { clearInvoice } = useStore();

  const handlePrint = () => {
    if (invoiceRef.current) {
      const printContent = invoiceRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-x-4">
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
        <button
          className="p-4 shadow-md text-white bg-red-600 rounded-lg ml-2"
          onClick={clearInvoice}
        >
          Clear Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
