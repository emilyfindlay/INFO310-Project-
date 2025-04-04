import { useState } from "react";
import InvoiceEditor from "./components/InvoiceEditor";
import InvoiceList from "./components/InvoiceList";
import ClientEditor from "./components/ClientEditor";
import ClientList from "./components/ClientList";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <h1>Invoicing App</h1>
      <nav>
        <button onClick={() => setPage("invoice-list")}>View Invoices</button>
        <button onClick={() => setPage("invoice-editor")}>Add Invoice</button>
        <button onClick={() => setPage("client-list")}>View Clients</button>
        <button onClick={() => setPage("client-editor")}>Add Client</button>
      </nav>

      {page === "invoice-list" && <InvoiceList />}
      {page === "invoice-editor" && <InvoiceEditor />}
      {page === "client-list" && <ClientList />}
      {page === "client-editor" && <ClientEditor />}
    </div>
  );
}