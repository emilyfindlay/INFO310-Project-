import { useEffect, useState } from "react";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/invoices");
        if (!response.ok) {
          throw new Error("Failed to fetch invoices");
        }
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <h2>Invoice List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : invoices.length === 0 ? (
        <p>No invoices yet.</p>
      ) : (
        <ul>
          {invoices.map((inv) => (
            <li key={inv.id}>
              {inv.client?.name ?? "Unknown Client"}
              {inv.invoiceTotal != null && ` — $${inv.invoiceTotal.toFixed(2)}`}
              {inv.status && ` — ${inv.status}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
