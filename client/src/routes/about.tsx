import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-2xl rounded-lg max-w-xl mx-auto text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">
          About InvoicePro
        </h2>
        <p className="mb-4">
          Welcome to InvoicePro! Our app is designed to help you manage and streamline your invoicing process with ease. Whether you need to generate professional invoices, track payments, or manage client data, InvoicePro provides the tools to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Create Professional Invoices:</strong> Design, generate, and export invoices tailored to your brand.
          </li>
          <li>
            <strong>Track Invoice Status:</strong> Stay on top of pending, paid, and overdue invoices.
          </li>
          <li>
            <strong>Manage Client Records:</strong> Keep detailed information about your clients and their payment history.
          </li>
        </ul>
        <p>
          Our goal is to help you stay organized and efficient, ensuring your invoicing is as professional and streamlined as possible.
        </p>
      </div>
    </div>
  );
}
