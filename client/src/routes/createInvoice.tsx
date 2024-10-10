import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import axios from "axios";
// import { createInvoiceFormSchema } from "../lib/schema/formschema";
import { useState } from "react";

// Define the Invoice Item type
type InvoiceItem = {
  category: string;
  quantity: number;
  price: number;
};

export const Route = createFileRoute("/createInvoice")({
  component: CreateInvoice,
});

function CreateInvoice() {
  // Use the InvoiceItem type in the state
  const [items, setItems] = useState<InvoiceItem[]>([
    { category: "", quantity: 0, price: 0 },
  ]);
  
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      category: "",
      quantity: 0,
      price: 0,
    },
    onSubmit: async () => {
      try {
        // Sending the items array directly
        const response = await axios.post("http://localhost:8080/createInvoice", items);        
        console.log("Invoice created:", response.data);
        // Optionally clear the items after successful submission
        setItems([{ category: "", quantity: 0, price: 0 }]);
      } catch (error) {
        console.error("Error creating invoice:", error);
      }
    },
  });

  const handleAddItem = () => {
    setItems([...items, { category: "", quantity: 0, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, params) => params !== index));
  };

  const handleChange = <K extends keyof InvoiceItem>(index: number, field: K, value: InvoiceItem[K]) => {
    const newItems = [...items];
    newItems[index][field] = value; // Type-safe assignment
    setItems(newItems);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Invoice</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {items.map((item, index) => (
          <div key={index} className="space-y-4">
            <div>
              <label htmlFor={`category-${index}`} className="block text-sm font-medium text-gray-700">Category</label>
              <input
                id={`category-${index}`}
                name={`category-${index}`}
                value={item.category}
                onChange={(e) => handleChange(index, 'category', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                value={item.quantity}
                type="number"
                onChange={(e) => handleChange(index, 'quantity', Number(e.target.value))}
                onFocus={() => handleChange(index, 'quantity', 0)}
                onBlur={() => {
                  if (item.quantity === 0) handleChange(index, 'quantity', 0);
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-700">Price</label>
              <input
                id={`price-${index}`}
                name={`price-${index}`}
                value={item.price}
                type="number"
                onChange={(e) => handleChange(index, 'price', Number(e.target.value))}
                onBlur={() => {
                  if (item.price === 0) handleChange(index, 'price', 0);
                }}
                onFocus={() => handleChange(index, 'price', 0)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button type="button" onClick={() => handleRemoveItem(index)} className="w-full mt-4 py-2 bg-red-600 text-white hover:text-black">
              Remove Item
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddItem} className="w-full mt-4 py-2 bg-gray-950 text-white font-semibold rounded-md hover:bg-gray-500">
          Add Item
        </button>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full mt-4 py-2 bg-gray-950 text-white font-semibold rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Submit Invoice"}
            </button>
          )}
        />
      </form>
    </div>
  );
}

export default CreateInvoice;
