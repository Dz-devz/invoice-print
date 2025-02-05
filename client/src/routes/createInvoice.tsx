import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import axios from "axios";
import { useState } from "react";

type InvoiceItem = {
  description: string;
  quantity: number;
  price: number;
};

export const Route = createFileRoute("/createInvoice")({
  component: CreateInvoice,
});

function CreateInvoice() {
  const navigate = useNavigate();

  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 0, price: 0 },
  ]);

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      name: "",
      items: items,
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/createInvoice",
          {
            invoice_no: "INV-" + new Date().getTime(),
            name: values.value.name,
            items: items,
          }
        );

        console.log("Invoice created:", response.data);

        setItems([{ description: "", quantity: 0, price: 0 }]);

        navigate({ to: "/invoicesPage" });
      } catch (error) {
        console.error("Error creating invoice:", error);
      }
    },
  });

  const handleAddItem = () => {
    setItems([...items, { description: "", quantity: 0, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleChange = <K extends keyof InvoiceItem>(
    index: number,
    field: K,
    value: InvoiceItem[K]
  ) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleFocus = (index: number, field: keyof InvoiceItem) => {
    if (items[index][field] === 0) {
      handleChange(
        index,
        field,
        "" as unknown as InvoiceItem[keyof InvoiceItem]
      );
    }
  };

  const handleBlur = (index: number, field: keyof InvoiceItem) => {
    if (items[index][field] === "" || items[index][field] === null) {
      handleChange(index, field, 0 as InvoiceItem[keyof InvoiceItem]);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Invoice
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field name="name">
            {(field) => (
              <div>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  Customer Name
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            )}
          </form.Field>
        </div>
        {items.map((item, index) => (
          <div key={index} className="space-y-4">
            <div>
              <label
                htmlFor={`description-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                id={`description-${index}`}
                name={`description-${index}`}
                value={item.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor={`quantity-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                value={item.quantity}
                type="number"
                onChange={(e) =>
                  handleChange(index, "quantity", Number(e.target.value))
                }
                onFocus={() => handleFocus(index, "quantity")}
                onBlur={() => handleBlur(index, "quantity")}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor={`price-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                id={`price-${index}`}
                name={`price-${index}`}
                value={item.price}
                type="number"
                onChange={(e) =>
                  handleChange(index, "price", Number(e.target.value))
                }
                onFocus={() => handleFocus(index, "price")}
                onBlur={() => handleBlur(index, "price")}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="w-full mt-4 py-2 bg-red-600 text-white hover:text-black"
            >
              Remove Item
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddItem}
          className="w-full mt-4 py-2 bg-gray-950 text-white font-semibold rounded-md hover:bg-gray-500"
        >
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
