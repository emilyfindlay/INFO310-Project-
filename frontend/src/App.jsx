import { useState, useEffect } from "react";
import InvoiceEditor from "./components/InvoiceEditor";
import InvoiceList from "./components/InvoiceList";
import ClientEditor from "./components/ClientEditor";
import ClientList from "./components/ClientList";
import ProductList from "./components/ProductList";
import ProductEditor from "./components/ProductEditor";

export default function App() {
  const [page, setPage] = useState("home");

  const [clients, setClients] = useState([
    { id: 1, name: "Client A", email: "clienta@email.com" },
    { id: 2, name: "Client B", email: "clientb@email.com" }
  ]);

  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch products");
          }
          return res.json();
        })
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error loading products:", error));
  }, []); // Runs once on component mount

  return (
      <div>
        <h1>Invoicing App</h1>
        <nav>
          <button onClick={() => setPage("invoice-list")}>View Invoices</button>
          <button onClick={() => setPage("invoice-editor")}>Add Invoice</button>
          <button onClick={() => setPage("client-list")}>View Clients</button>
          <button onClick={() => setPage("client-editor")}>Add Client</button>
          <button onClick={() => setPage("product-editor")}>Add Product</button>
          <button onClick={() => setPage("product-list")}>View Products</button>
        </nav>

        {page === "invoice-list" && <InvoiceList invoices={invoices} />}
        {page === "invoice-editor" && (
            <InvoiceEditor
                clients={clients}
                products={products}
                setInvoices={setInvoices}
            />
        )}
        {page === "product-editor" && (
            <ProductEditor products={products} setProducts={setProducts} />
        )}
        {page === "client-list" && <ClientList clients={clients} />}
        {page === "client-editor" && (
            <ClientEditor clients={clients} setClients={setClients} />
        )}
        {page === "product-list" && <ProductList products={products} />}
      </div>
  );
}
