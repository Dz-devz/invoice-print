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
      quantity: "0",
      price: "0",
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
    <div>
      <h1>Invoice Form</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="category"
            validators={{ onChange: createInvoiceFormSchema.shape.category }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Category</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="quantity"
            validators={{ onChange: createInvoiceFormSchema.shape.quantity }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Quantity</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="number"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="price"
            validators={{ onChange: createInvoiceFormSchema.shape.price }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Price</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="number"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        />
      </form>
    </div>
  );
}
