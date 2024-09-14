import { createFileRoute } from '@tanstack/react-router'
import InvoicePage from '../components/invoicePage'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <InvoicePage />
    </div>
  )
}
