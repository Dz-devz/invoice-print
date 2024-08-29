import Invoice from "./invoice";

const InvoicePage = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <Invoice />
            <button onClick={handlePrint}>Print Invoice</button>
        </div>
    );
};

export default InvoicePage;
