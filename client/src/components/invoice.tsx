import { create } from 'zustand';
import axios from 'axios';
import { useEffect } from 'react';

type Invoice = {
  id: number;
  category: string;
  quantity: number;
  amount: number;
};

interface InvoiceStore {
  invoices: Invoice[];
  fetchInvoices: () => Promise<void>;
}

// Define Zustand store outside of the component
export const useStore = create<InvoiceStore>((set) => ({
  invoices: [],
  
  // Fetch invoices from the API
  fetchInvoices: async () => {
    const response = await axios.get<Invoice[]>('http://localhost:8080/getAllInvoice');  // Change port if needed
    set({ invoices: response.data });
  },
}));

const Invoice = () => {
  
  const {invoices, fetchInvoices} = useStore();

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div id="invoice" className="p-4 print:p-0 print:w-full">
      <h1 className="text-2xl font-bold print:text-xl">Invoice</h1>
      <p className="text-lg print:text-base">Company Name</p>
      <table className="min-w-full bg-white print:bg-transparent">
        <thead className="bg-gray-50 print:bg-gray-100">
          <tr>
            <th className="py-2 px-4">Item</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-t">
              <td className="py-2 px-4">{invoice.id}</td>
              <td className="py-2 px-4">{invoice.category}</td>
              <td className="py-2 px-4">{invoice.quantity}</td>
              <td className="py-2 px-4">{invoice.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-lg font-semibold print:text-base mt-4">Total:</h2>
    </div>
  );
};

export default Invoice;
