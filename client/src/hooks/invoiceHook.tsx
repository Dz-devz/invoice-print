import { create } from 'zustand';
import axios from 'axios';

type InvoiceItem = {
  id: number;
  description: string;
  quantity: number;
  price: number;
};

type Invoice = {
  invoice_id: number;
  items: InvoiceItem[];
  createdAt: string;  
};

interface InvoiceStore {
  invoices: Invoice[];
  fetchInvoices: () => Promise<void>;
  clearInvoices: () => void;
}

export const useStore = create<InvoiceStore>((set) => ({
  invoices: [],

  fetchInvoices: async () => {
    try {
      const response = await axios.get<Invoice[]>('http://localhost:8080/getAllInvoice'); 
      set({ invoices: response.data });
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  },

  clearInvoices: () => {
    set({ invoices: [] });
  },
}));
