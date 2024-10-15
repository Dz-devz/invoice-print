import { create } from 'zustand';
import axios from 'axios';

type Invoice = {
  invoice_id: number;
  category: string;
  quantity: number;
  price: number;
};

interface InvoiceStore {
  invoices: Invoice[];
  fetchInvoices: () => Promise<void>;
  clearInvoices: () => void;  // Added function to clear invoices
}

// Define Zustand store outside of the component
export const useStore = create<InvoiceStore>((set) => ({
  invoices: [],

  // Fetch invoices from the API
  fetchInvoices: async () => {
    const response = await axios.get<Invoice[]>('http://localhost:8080/getAllInvoice');  // Change port if needed
    set({ invoices: response.data });
  },

  // Clear invoices by resetting the array
  clearInvoices: () => {
    set({ invoices: [] });
  },
}));
