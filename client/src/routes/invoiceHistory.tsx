import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/invoiceHistory')({
  component: () => InvoiceHistory,
})

export function InvoiceHistory(){
    return(
        <div>
            <div>
                Invoice History
            </div>
        </div>
    )
}
