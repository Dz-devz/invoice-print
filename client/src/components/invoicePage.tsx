import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Invoice from "./invoice";

const InvoicePage = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Invoice",
  });

  return (
    <div>
      <div className="relative mb-2" ref={invoiceRef}>
        <Invoice/>
      </div>
      <div className="flex ml-96">
      <button className="p-4 shadow-md text-white bg-gray-950 rounded-lg" onClick={handlePrint}>Print Invoice</button>
      </div>
    </div>
  );
};

export default InvoicePage;
