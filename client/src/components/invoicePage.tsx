import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Invoice from "./invoice";

const InvoicePage = () => {
  const [invoiceNum, setInvoiceNum] = useState<number>(1);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Invoice",
    onAfterPrint: () => setInvoiceNum((prev) => prev + 1)  
  });

  const formatInvoiceNumber = (num: number) => {
    return num.toString().padStart(3, '0'); // Change 3 to the desired length
  };

  return (
    <div>
      <div className="relative mb-2" ref={invoiceRef}>
        <Invoice invoiceNo={Number(formatInvoiceNumber(invoiceNum))}/>
      </div>
      <div className="flex ml-96">
      <button className="p-4 shadow-md text-white bg-gray-950 rounded-lg" onClick={handlePrint}>Print Invoice</button>
      </div>
    </div>
  );
};

export default InvoicePage;
