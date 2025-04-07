export default function InvoiceList({ invoices = [] }) {
  return (
    <div>
      <h2>Invoice List</h2>
      {invoices.length === 0 ? (
        <p>No invoices yet.</p>
      ) : (
        <ul>
          {invoices.map((inv) => (
            <li key={inv.id}>
              {inv.client?.name} — ${inv.invoiceTotal?.toFixed(2)} — {inv.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
