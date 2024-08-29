import Invoice from "./invoice";

const InvoicePage = () => {
    const handlePrint = () => {
        const invoiceElement = document.getElementById('invoice');
        if (invoiceElement) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                    <head>
                        <title>Invoice</title>
                        <style>
                            /* Include any additional print-specific styles here */
                            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                            #invoice { width: 100%; }
                            table { width: 100%; border-collapse: collapse; }
                            th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
                        </style>
                    </head>
                    <body>
                        ${invoiceElement.innerHTML}
                    </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }
        } else {
            console.error('Invoice element not found');
        }
    };

    return (
        <div>
            <Invoice />
            <button onClick={handlePrint}>Print Invoice</button>
        </div>
    );
};

export default InvoicePage;
