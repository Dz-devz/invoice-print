import { invoiceData } from "../lib/invocedata";
const Invoice = () => {
    return (
        <div id="invoice">
            <h1>Invoice</h1>
            <p>Company Name</p>
            <p>Client: {invoiceData.clientName}</p>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceData.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity * item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Total: {invoiceData.total}</h2>
        </div>
    );
};

export default Invoice;
