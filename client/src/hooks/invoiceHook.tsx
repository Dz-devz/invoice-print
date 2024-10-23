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
  invoice: Invoice | null;
  fetchInvoice: () => Promise<void>;
  clearInvoice: () => void;
}

export const useStore = create<InvoiceStore>((set) => ({
  invoice: null,

  fetchInvoice: async () => {
    try {
      const response = await axios.get<Invoice>('http://localhost:8080/getAllInvoice');
      set({ invoice: response.data });
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  },

  clearInvoice: () => {
    set({ invoice: null });
  },
}));
