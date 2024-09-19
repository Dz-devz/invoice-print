import { createFileRoute } from '@tanstack/react-router'
import InvoicePage from '../components/invoicePage'

export const Route = createFileRoute('/invoicesPage')({
  component: InvoicesPage,
})


function InvoicesPage(){
    return(
    <div className="p-2" >
        <InvoicePage />
     </div>

    )
}