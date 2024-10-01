import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import axios from "axios";
import { createInvoiceFormSchema } from "../lib/schema/formschema";

export const Route = createFileRoute("/createInvoice")({
  component: CreateInvoice,
});

function CreateInvoice() {
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      category: "",
      quantity: "",
      price: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/createInvoice",
          {
            category: value.category,
            quantity: Number(value.quantity),
            price: Number(value.price),
          }
        );
        console.log("Invoice created:", response.data);
      } catch (error) {
        console.error("Error creating invoice:", error);
      }
    },
  });

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
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <form.Field
            name="category"
            validators={{ onChange: createInvoiceFormSchema.shape.category }}
            children={(field) => (
              <>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <form.Field
            name="quantity"
            children={(field) => (
              <>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value === "0" ? "" : field.state.value}
                  placeholder="0"
                  onBlur={field.handleBlur}
                  type="number"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <form.Field
            name="price"
            children={(field) => (
              <>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value === "0" ? "" : field.state.value}
                  placeholder="0"                  
                  onBlur={field.handleBlur}
                  type="number"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit} className="w-full mt-4 py-2 bg-gray-950 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        />
      </form>
    </div>
  );
}
