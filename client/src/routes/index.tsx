import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-5xl font-bold">Welcome to InvoicePro</h1>
      <p className="mt-4 text-lg max-w-md text-center">
        Your one-stop solution for managing invoices efficiently and effortlessly.
      </p>
      <button className="mt-8 px-6 py-2 text-white bg-black rounded hover:bg-gray-800 transition">
        <Link to="/createInvoice">
        Get Started
        </Link>
      </button>
    </div>
  );
}
