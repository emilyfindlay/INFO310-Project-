import React, { useState, useEffect } from "react";
import {
    FaFileInvoice,
    FaUser,
    FaPlus,
    FaBoxOpen
} from "react-icons/fa";
import InvoiceEditor from "./components/InvoiceEditor";
import InvoiceList from "./components/InvoiceList";
import QuoteEditor from "./components/QuoteEditor";
import QuoteList from "./components/QuoteList";
import ClientEditor from "./components/ClientEditor";
import ClientList from "./components/ClientList";
import ProductList from "./components/ProductList";
import ProductEditor from "./components/ProductEditor";
import BusinessEditor from "./components/BusinessEditor";
import BusinessList from "./components/BusinessList";
import ContactUs from "./components/contactus";

import "./zeroCSS.css";

export default function App() {
    const [page, setPage] = useState("main-menu");
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [client, setSelectedClient] = useState(null);
    const [business, setSelectedBusiness] = useState(null);
    const [product, setSelectedProduct] = useState(null);
    const [invoice, setSelectedInvoiceId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/clients")
            .then(res => res.json())
            .then(setClients)
            .catch(err => console.error("Failed to load clients", err));
        fetch("http://localhost:8080/api/products")
            .then(res => res.json())
            .then(setProducts)
            .catch(err => console.error("Failed to load products", err));
        fetch("http://localhost:8080/api/invoices")
            .then(res => res.json())
            .then(setInvoices)
            .catch(err => console.error("Failed to load invoices", err));
        fetch("http://localhost:8080/api/quotes")
            .then(res => res.json())
            .then(setQuotes)
            .catch(err => console.error("Failed to load quotes", err));
        fetch("http://localhost:8080/api/businesses")
            .then(res => res.json())
            .then(setBusinesses)
            .catch(err => console.error("Failed to load businesses", err));

        document.title = "Zero";
    }, []);

    return (
        <div className="app-container">
            {/* Top Banner */}
            <div className="banner">Zero</div>

            {/* Navigation Bar */}
            <header className="navbar">
                <div className="dropdown">
                    <button onClick={() => setPage("main-menu")}>Dashboard</button>
                </div>

                <div className="dropdown">
                    <button>Invoices</button>
                    <div className="dropdown-content">
                        <button onClick={() => setPage("invoice-list")}>Invoice List</button>
                        <button onClick={() => setPage("invoice-editor")}>Create Invoice</button>
                    </div>
                </div>

                <div className="dropdown">
                    <button>Quotes</button>
                    <div className="dropdown-content">
                        <button onClick={() => setPage("quote-list")}>Quote List</button>
                        <button onClick={() => setPage("quote-editor")}>Create Quote</button>
                    </div>
                </div>

                <div className="dropdown">
                    <button>Clients</button>
                    <div className="dropdown-content">
                        <button onClick={() => setPage("client-list")}>Client List</button>
                        <button onClick={() => {
                            setSelectedClient(null);
                            setPage("client-editor");
                        }}>Add Client</button>
                    </div>
                </div>

                <div className="dropdown">
                    <button>Products</button>
                    <div className="dropdown-content">
                        <button onClick={() => setPage("product-list")}>Product List</button>
                        <button onClick={() => setPage("product-editor")}>Add Product</button>
                    </div>
                </div>

                <div className="dropdown">
                    <button>Business</button>
                    <div className="dropdown-content">
                        <button onClick={() => setPage("business-list")}>Business List</button>
                        <button onClick={() => {
                            setSelectedBusiness(null);
                            setPage("business-editor");
                        }}>Add Business</button>
                    </div>
                </div>

                <div className="dropdown">
                    <button onClick={() => setPage("contact-us")}>Contact Us</button>
                </div>

            </header>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
                {page === "invoice-list" && <InvoiceList 
                        invoices={invoices}
                        setSelectedInvoiceId={setSelectedInvoiceId}
                        setPage={setPage}/>}
                {page === "invoice-editor" && (
                    <InvoiceEditor
                        clients={clients}
                        products={products}
                        setInvoices={setInvoices}
                        invoiceId={invoice}
                        setSelectedInvoiceId={setSelectedInvoiceId}
                    />
                )}
                {page === "quote-list" && <QuoteList quotes={quotes} />}
                {page === "quote-editor" && (
                    <QuoteEditor
                        clients={clients}
                        products={products}
                        setQuotes={setQuotes}
                    />
                )}
                {page === "client-list" && (
                    <ClientList
                        clients={clients}
                        setClients={setClients}
                        setSelectedClient={setSelectedClient}
                        setPage={setPage}
                    />
                )}
                {page === "client-editor" && (
                    <ClientEditor
                        client={client}
                        setClients={setClients}
                        setPage={setPage}
                    />
                )}
                {page === "product-list" && (
                    <ProductList products={products} setProducts={setProducts} />
                )}
                {page === "product-editor" && (
                    <ProductEditor 
                        products={products} 
                        setProducts={setProducts} 
                        setPage={setPage}
                        setSelectedProduct={setSelectedProduct}
                        />
                )}
                {page === "business-list" && (
                    <BusinessList
                        businesses={businesses}
                        setBusinesses={setBusinesses}
                        setSelectedBusiness={setSelectedBusiness}
                        setPage={setPage}
                    />
                )}
                {page === "business-editor" && (
                    <BusinessEditor
                        business={business}
                        setBusinesses={setBusinesses}
                        setPage={setPage}
                    />
                )}
                {page === "contact-us" && <ContactUs />}
            </main>
        </div>
    );
}
