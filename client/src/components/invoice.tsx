import { create } from 'zustand';
import axios from 'axios';
import { useEffect } from 'react';

type Invoice = {
  invoice_id: number;
  category: string;
  quantity: number;
  price: number;
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
  }, [fetchInvoices]);

 // useStore.getState().fetchInvoices();

  return (
<div id="invoice" className="p-8 print:p-4 max-w-xl mx-auto bg-white shadow-lg border border-gray-300 print:shadow-none print:border-none rounded-lg">
  {/* Invoice Header */}
  <div className="text-center mb-8">
    <h1 className="text-6xl font-bold italic border text-gray-800 print:text-5xl mb-2">hello</h1>
    <h2 className="text-lg font-light border border-2 text-red-500">THIS IS YOUR INVOICE</h2>
  </div>

  {/* Invoice Details Section */}
  <div className="mb-8 text-sm print:text-xs text-gray-700">
    <div className="grid grid-cols-2 gap-y-1">
      <div className="font-bold">BILLED TO:</div>
      <div>Jonathan Patterson</div>
      
      <div className="font-bold">PAY TO:</div>
      <div>Liceria & Co.</div>

      <div className="font-bold">Bank:</div>
      <div>Borcele Bank</div>
      
      <div className="font-bold">Account No:</div>
      <div>0123 4567 8901</div>
    </div>
  </div>

  {/* Invoice Table */}
  <table className="w-full text-sm print:text-xs text-gray-700 border-t border-b border-dashed border-gray-300">
    <thead className="border-b border-dashed border-gray-300">
      <tr>
        <th className="py-3 px-2 text-left font-bold uppercase">Description</th>
        <th className="py-3 px-2 text-left font-bold uppercase">Unit Price</th>
        <th className="py-3 px-2 text-left font-bold uppercase">Qty</th>
        <th className="py-3 px-2 text-left font-bold uppercase">Total</th>
      </tr>
    </thead>
    <tbody>
      {invoices.map((invoice) => (
        <tr key={invoice.invoice_id} className="border-b border-dashed border-gray-300">
          <td className="py-2 px-2">{invoice.category}</td>
          <td className="py-2 px-2">${invoice.price.toFixed(2)}</td>
          <td className="py-2 px-2">{invoice.quantity}</td>
          <td className="py-2 px-2">${(invoice.quantity * invoice.price).toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Subtotal and Total */}
  <div className="mt-4 text-gray-800 text-lg font-bold border-t border-dashed border-gray-300 pt-4">
    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>${invoices.reduce((sum, invoice) => sum + invoice.quantity * invoice.price, 0).toFixed(2)}</span>
    </div>
    <div className="flex justify-between text-sm font-medium text-gray-600 mt-1">
      <span>Tax (10%)</span>
      <span>${(invoices.reduce((sum, invoice) => sum + invoice.quantity * invoice.price, 0) * 0.1).toFixed(2)}</span>
    </div>
    <div className="flex justify-between text-xl font-bold mt-4">
      <span>Total</span>
      <span>${(invoices.reduce((sum, invoice) => sum + invoice.quantity * invoice.price, 0) * 1.1).toFixed(2)}</span>
    </div>
  </div>

  {/* Footer */}
  <div className="mt-10 text-sm print:text-xs">
    <div className="flex justify-between">
      <div>
        <p className="font-bold">INVOICE NO: 01234</p>
        <p>Date: 11.02.2030</p>
        <p>Due Date: 11.03.2030</p>
      </div>
      <div className="text-right">
        <p className="font-bold">THANK YOU</p>
        <p className="mt-4">_______________________</p>
        <p>Avery Davis</p>
      </div>
    </div>
  </div>
</div>
  );
};

export default Invoice;
