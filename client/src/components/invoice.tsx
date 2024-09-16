

const Invoice = () => {
  return (
    <div id="invoice" className="p-4 print:p-0 print:w-full">
      <h1 className="text-2xl font-bold print:text-xl">Invoice</h1>
      <p className="text-lg print:text-base">Company Name</p>
      <p className="text-lg print:text-base">Client: {invoiceData.clientName}</p>
      <table className="min-w-full bg-white print:bg-transparent">
        <thead className="bg-gray-50 print:bg-gray-100">
          <tr>
            <th className="py-2 px-4">Item</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{item.quantity}</td>
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.price}</td>
              <td className="py-2 px-4">{item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-lg font-semibold print:text-base mt-4">Total: {invoiceData.total}</h2>
    </div>
  );
};

export default Invoice;
