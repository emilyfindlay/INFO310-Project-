import { useEffect, useState } from "react";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInvoices([
        { invoiceId: 1, total: 99.99, status: "PAID" },
        { invoiceId: 2, total: 199.49, status: "DUE" }
      ]);
    }, 500);
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {invoices.map(inv => (
          <li key={inv.invoiceId}>
            #{inv.invoiceId} — ${inv.total} — {inv.status}
          </li>
        ))}
      </ul>
    </div>
  );
}