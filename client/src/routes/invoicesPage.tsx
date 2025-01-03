import Invoice from "@/components/invoice";
import { useStore } from "@/hooks/invoiceHook";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/invoicesPage")({
  component: InvoicesPage,
});

function InvoicesPage() {
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
    <div className="p-2">
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
    </div>
  );
}
