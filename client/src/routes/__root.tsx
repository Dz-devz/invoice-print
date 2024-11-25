import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4 bg-slate-50">
        <div className="container mx-auto flex gap-6 justify-center">
          <Link to="/" className="hover:text-green-500 text-gray-700 font-medium transition-all duration-200 ease-in-out [&.active]:font-bold">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-500 text-gray-700 font-medium transition-all duration-200 ease-in-out [&.active]:font-bold">
            About
          </Link>
          <Link to="/invoicesPage" className="hover:text-green-500 text-gray-700 font-medium transition-all duration-200 ease-in-out [&.active]:font-bold">
            Invoices
          </Link>
          <Link to="/invoiceHistory" className="hover:text-green-500 text-gray-700 font-medium transition-all duration-200 ease-in-out [&.active]:font-bold">
            Invoice History
          </Link>
          <Link to="/createInvoice" className="hover:text-green-500 text-gray-700 font-medium transition-all duration-200 ease-in-out [&.active]:font-bold">
            Create Invoice
          </Link>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="container mx-auto mt-4 p-4">
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
