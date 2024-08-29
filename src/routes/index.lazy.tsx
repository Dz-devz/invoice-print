import { createLazyFileRoute } from '@tanstack/react-router'
import InvoicePage from '../components/invoicePage'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <InvoicePage />
    </div>
  )
}
