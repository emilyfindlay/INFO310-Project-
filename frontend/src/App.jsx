import { useState, useEffect } from "react";
import { FaFileInvoice, FaUser, FaPlus, FaBoxOpen } from "react-icons/fa";
import InvoiceEditor from "./components/InvoiceEditor";
import InvoiceList from "./components/InvoiceList";
import ClientEditor from "./components/ClientEditor";
import ClientList from "./components/ClientList";
import ProductList from "./components/ProductList";
import ProductEditor from "./components/ProductEditor";
import BusinessEditor from "./components/BusinessEditor";
import BusinessList from "./components/BusinessList";

import './styles/main.css';

export default function App() {
    const [page, setPage] = useState("home");

    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [businesses, setBusinesses] = useState([]);


    // Fetch all data from backend
    useEffect(() => {
        fetch("http://localhost:8080/api/clients")
            .then((res) => res.json())
            .then(setClients)
            .catch((err) => console.error("Failed to load clients", err));

        fetch("http://localhost:8080/api/products")
            .then((res) => res.json())
            .then(setProducts)
            .catch((err) => console.error("Failed to load products", err));

        fetch("http://localhost:8080/api/invoices")
            .then((res) => res.json())
            .then(setInvoices)
            .catch((err) => console.error("Failed to load invoices", err));

        fetch("http://localhost:8080/api/businesses")
            .then((res) => res.json())
            .then(setBusinesses)
            .catch((err) => console.error("Failed to load businesses", err));

    }, []);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-800 text-white p-4 space-y-4">
                <h1 className="text-2xl font-bold mb-6">Invoicing App</h1>
                <nav className="flex flex-col space-y-2">
                    <button
                        onClick={() => setPage("invoice-list")}
                        className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
                    >
                        <FaFileInvoice/> View Invoices
                    </button>
                    <button
                        onClick={() => setPage("invoice-editor")}
                        className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
                    >
                        <FaPlus/> Add Invoice
                    </button>
                    <button
                        onClick={() => setPage("client-list")}
                        className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
                    >
                        <FaUser/> View Clients
                    </button>
                    <button
                        onClick={() => setPage("client-editor")}
                        className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
                    >
                        <FaPlus/> Add Client
                    </button>
                    <button
                        onClick={() => setPage("product-editor")}
                        className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
                    >
                        <FaBoxOpen/> Add Product
                    </button>
                    <button
                        onClick={() => setPage("product-list")}
                        className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
                    >
                        <FaBoxOpen/> View Products
                    </button>
                    <button
                        onClick={() => setPage("business-list")}
                        className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
                    >
                        <FaUser/> View Businesses
                    </button>
                    <button
                        onClick={() => setPage("business-editor")}
                        className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded"
                    >
                        <FaPlus/> Add Business
                    </button>

                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
                {page === "invoice-list" && <InvoiceList invoices={invoices}/>}
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
                    <ClientEditor setClients={setClients} />
                )}
                {page === "product-list" && <ProductList products={products} />}

                {page === "business-editor" && (
                    <BusinessEditor setBusinesses={setBusinesses} />
                )}
                {page === "business-list" && (
                    <BusinessList businesses={businesses} setBusinesses={setBusinesses} />
                )}

            </main>
        </div>
    );
}
