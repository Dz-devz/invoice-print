import axios from "axios";
import { create } from "zustand";

type InvoiceItem = {
  id: number;
  description: string;
  quantity: number;
  price: number;
  invoiceId: number;
};

type InvoiceType = {
  id: number;
  invoice_id: number;
  invoice_no: string;
  items: InvoiceItem[];
  createdAt: string;
};

interface InvoiceStore {
  latestInvoice: InvoiceType | null;
  allInvoices: InvoiceType[] | null;
  singleInvoice: InvoiceType | null;
  fetchPresentInvoice: () => Promise<void>;
  fetchInvoice: () => Promise<void>;
  fetchSingleInvoice: (id: number) => Promise<void>;
  clearInvoice: () => void;
}

export const useStore = create<InvoiceStore>((set) => ({
  latestInvoice: null,
  allInvoices: [],
  singleInvoice: null,

  fetchPresentInvoice: async () => {
    try {
      const response = await axios.get<InvoiceType>(
        "http://localhost:8080/getPresentInvoice "
      );
      set({ latestInvoice: response.data });
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  },

  fetchInvoice: async () => {
    try {
      const response = await axios.get<InvoiceType[]>(
        "http://localhost:8080/getInvoice"
      );
      set({ allInvoices: response.data });
      console.log("API Response:", JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  },

  fetchSingleInvoice: async (id: number) => {
    try {
      const response = await axios.get<InvoiceType>(
        `http://localhost:8080/getSingleInvoice/${id}`
      );
      set({ singleInvoice: response.data });
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  },

  clearInvoice: () => {
    set({ latestInvoice: null });
  },
}));
