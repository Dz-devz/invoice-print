import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Invoice from './invoice';

const InvoicePage = () => {
    const invoiceRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
        documentTitle: 'Invoice',
        onAfterPrint: () => console.log('Print successful!'),
    });

    return (
        <div>
            <div ref={invoiceRef}>
                <Invoice />
            </div>
            <button onClick={handlePrint}>Print Invoice</button>
        </div>
    );
};

export default InvoicePage;