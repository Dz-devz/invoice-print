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
  name: string;
  invoice_id: number;
  invoice_no: string;
  items: InvoiceItem[];
  createdAt: string;
};

interface InvoiceStore {
  loading: boolean;
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
  loading: false,

  fetchPresentInvoice: async () => {
    set({ loading: true });
    try {
      const response = await axios.get<InvoiceType>(
        "http://localhost:8080/api/getPresentInvoice "
      );
      set({ latestInvoice: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  },

  fetchInvoice: async () => {
    set({ loading: true });
    try {
      const response = await axios.get<InvoiceType[]>(
        "http://localhost:8080/api/getInvoice"
      );
      set({ allInvoices: response.data, loading: false });
      // console.log("API Response:", JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  },

  fetchSingleInvoice: async (id: number) => {
    try {
      const response = await axios.get<InvoiceType>(
        `http://localhost:8080/api/getSingleInvoice/${id}`
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
