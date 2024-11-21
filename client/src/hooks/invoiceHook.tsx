import { create } from 'zustand';
import axios from 'axios';
import Invoice from '@/components/invoice';

type InvoiceItem = {
  id: number;
  description: string;
  quantity: number;
  price: number;
};

type Invoice = {
  invoice_id: number;
  invoice_no: string;
  items: InvoiceItem[];
  createdAt: string;  
};

interface InvoiceStore {
  invoice: Invoice | null;
  fetchPresentInvoice: () => Promise<void>;
  fetchInvoice: () => Promise<void>;
  clearInvoice: () => void;
}

export const useStore = create<InvoiceStore>((set) => ({
  invoice: null,

  fetchPresentInvoice: async () => {
    try {
      const response = await axios.get<Invoice>('http://localhost:8080/getPresentInvoice ');
      set({ invoice: response.data });
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  },

  fetchInvoice: async () => {
    try {
      const response = await axios.get<Invoice>('http://localhost:8000/getInvoice');
      set({invoice: response.data})
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  },

  clearInvoice: () => {
    set({ invoice: null });
  },
}));
