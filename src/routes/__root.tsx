import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <span> | </span>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/createInvoice" className="[&.active]:font-bold">Create Invoice</Link>
      </div>
      <hr /> 
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})
