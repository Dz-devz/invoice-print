import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Invoice from "./invoice";

const InvoicePage = () => {
  const [invoiceNum, setInvoiceNum] = useState(1);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Invoice",
    onAfterPrint: () => setInvoiceNum((prev) => prev + 1)  
  });

  return (
    <div>
      <div ref={invoiceRef}>
        <Invoice invoiceNo={invoiceNum}/>
      </div>
      <button onClick={handlePrint}>Print Invoice</button>
    </div>
  );
};

export default InvoicePage;
