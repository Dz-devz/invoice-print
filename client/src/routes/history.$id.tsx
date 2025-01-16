import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../hooks/invoiceHook";

export const Route = createFileRoute("/history/$id")({
  component: RouteComponent,
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  invoice: {
    padding: 16,
    width: 500,
    margin: "auto",
    backgroundColor: "white",
    border: "1px solid #d3d3d3",
    borderRadius: 8,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderTop: "1px dashed #d3d3d3",
    borderBottom: "1px dashed #d3d3d3",
    marginBottom: 16,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px dashed #d3d3d3",
    backgroundColor: "#f4f4f4",
  },
  tableRow: {
    borderBottom: "1px dashed #d3d3d3",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  tableCell: {
    padding: 8,
    textAlign: "left",
  },
  descriptionCell: {
    flex: 2,
  },
  priceCell: {
    flex: 1,
  },
  qtyCell: {
    flex: 1,
  },
  totalCell: {
    flex: 1,
  },
  subtotal: {
    marginTop: 16,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
  },
  tax: {
    marginTop: 4,
    fontSize: 10,
    color: "#6b6b6b",
  },
  total: {
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 18,
    display: "flex",
    justifyContent: "space-between",
  },
  customerInfo: {
    marginTop: 20,
    fontSize: 10,
    color: "#6b6b6b",
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

interface InvoiceItem {
  id: number;
  description: string;
  price: number;
  quantity: number;
}

interface Invoice {
  name: string;
  invoice_no: string;
  createdAt: string;
  items: InvoiceItem[];
}

const MyDocument = ({
  singleInvoice,
  subtotal,
  total,
}: {
  singleInvoice: Invoice;
  subtotal: number;
  total: number;
}) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.invoice}>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text
                style={[
                  styles.tableCell,
                  styles.descriptionCell,
                  { fontWeight: "bold" },
                ]}
              >
                Description
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.priceCell,
                  { fontWeight: "bold" },
                ]}
              >
                Unit Price
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.qtyCell,
                  { fontWeight: "bold" },
                ]}
              >
                Qty
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.totalCell,
                  { fontWeight: "bold" },
                ]}
              >
                Total
              </Text>
            </View>
            {singleInvoice?.items.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.descriptionCell]}>
                  {item.description}
                </Text>
                <Text style={[styles.tableCell, styles.priceCell]}>
                  {item.price.toFixed(2)}
                </Text>
                <Text style={[styles.tableCell, styles.qtyCell]}>
                  {item.quantity}
                </Text>
                <Text style={[styles.tableCell, styles.totalCell]}>
                  {(item.quantity * item.price).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.subtotal}>
            <Text>Subtotal</Text>
            <Text>{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.tax}>
            <Text>Tax (10%): {(subtotal * 0.1).toFixed(2)}</Text>
          </View>
          <View style={styles.total}>
            <Text>Total</Text>
            <Text>{total.toFixed(2)}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.header}>
              Customer Name: {singleInvoice?.name}
            </Text>
            <Text style={styles.header}>
              Invoice No.: {singleInvoice?.invoice_no}
            </Text>
            <Text style={styles.header}>
              Date:{" "}
              {singleInvoice?.createdAt
                ? new Date(singleInvoice.createdAt).toLocaleDateString("en-US")
                : "Error not retrieving date"}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
function DownloadPDF({
  singleInvoice,
  subtotal,
  total,
}: {
  singleInvoice: Invoice;
  subtotal: number;
  total: number;
}) {
  return (
    <div>
      <PDFDownloadLink
        document={
          <MyDocument
            singleInvoice={singleInvoice}
            subtotal={subtotal}
            total={total}
          />
        }
        fileName="somename.pdf"
      >
        Download Invoice
      </PDFDownloadLink>
    </div>
  );
}

function RouteComponent() {
  const { id } = Route.useParams();
  const { singleInvoice, fetchSingleInvoice } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const pdfViewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSingleInvoice(parseInt(id));
  }, [fetchSingleInvoice, id]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pdfViewerRef.current &&
        !pdfViewerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const subtotal =
    singleInvoice?.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ) || 0;

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <>
      <div
        id="invoice"
        className="p-8 print:p-4 max-w-xl mx-auto  bg-white shadow-lg border border-gray-300 print:shadow-none print:border-none rounded-lg"
      >
        <table className="w-full text-sm print:text-xs text-gray-700 border-t border-b border-dashed border-gray-300">
          <thead className="border-b border-dashed border-gray-300">
            <tr>
              <th className="py-3 px-2 text-left font-bold uppercase">
                Description
              </th>
              <th className="py-3 px-2 text-left font-bold uppercase">
                Unit Price
              </th>
              <th className="py-3 px-2 text-left font-bold uppercase">Qty</th>
              <th className="py-3 px-2 text-left font-bold uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {singleInvoice?.items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-dashed border-gray-300"
              >
                <td className="py-2 px-2">{item.description}</td>
                <td className="py-2 px-2">₱{item.price.toFixed(2)}</td>
                <td className="py-2 px-2">{item.quantity}</td>
                <td className="py-2 px-2">
                  ₱{(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-gray-800 text-lg font-bold border-t border-dashed border-gray-300 pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-600 mt-1">
            <span>Tax (10%)</span>
            <span>₱{(subtotal * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold mt-4">
            <span>Total</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-10 text-sm print:text-xs">
          <div className="flex justify-between">
            <div>
              <p className="font-bold">Customer Name: {singleInvoice?.name}</p>
              <p className="font-bold">
                Invoice no. {singleInvoice?.invoice_no}
              </p>
              <p>
                Date:{" "}
                {singleInvoice?.createdAt
                  ? new Date(singleInvoice.createdAt).toLocaleDateString(
                      "en-US"
                    )
                  : "Error not retrieving date"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {singleInvoice && (
        <div className="flex items-center gap-4 justify-center">
          <button
            className="mt-4 px-6 py-2 text-white bg-black rounded hover:bg-gray-800 transition"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Toggle Preview
          </button>
          <button className="mt-4 px-6 py-2 text-white bg-black rounded hover:bg-gray-800 transition">
            <DownloadPDF
              singleInvoice={singleInvoice}
              subtotal={subtotal}
              total={total}
            />
          </button>
        </div>
      )}
      {isOpen && singleInvoice && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={pdfViewerRef} className="w-[500px] h-[750px]">
            <PDFViewer className="w-full h-full">
              <MyDocument
                singleInvoice={singleInvoice}
                subtotal={subtotal}
                total={total}
              />
            </PDFViewer>
          </div>
        </div>
      )}
    </>
  );
}
