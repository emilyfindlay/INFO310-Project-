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
                {page === "main-menu" && (
                    <div className="dashboard-card" style={{ maxWidth: 900, margin: '0 auto', boxShadow: '0 8px 32px rgba(0,123,190,0.10)' }}>
                        <img 
                            src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=900&q=80" 
                            alt="Accounting Dashboard" 
                            style={{ width: '100%', borderRadius: '8px', marginBottom: '24px', objectFit: 'cover', maxHeight: 220 }} 
                        />
                        <h2 style={{ fontSize: '2rem', marginBottom: 8 }}>Welcome to Zero</h2>
                        <p style={{ fontSize: '1.1rem', color: '#4a4a4a', marginBottom: 24 }}>
                            Your all-in-one accounting dashboard. Effortlessly manage invoices, quotes, clients, products, and business insights with a modern, intuitive interface inspired by Xero.
                        </p>
                        <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: 180, background: '#e6f2f8', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 32, color: '#0079be', fontWeight: 700 }}>{invoices.length}</div>
                                <div style={{ color: '#0079be', fontWeight: 500 }}>Invoices</div>
                            </div>
                            <div style={{ flex: 1, minWidth: 180, background: '#e6f2f8', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 32, color: '#0079be', fontWeight: 700 }}>{quotes.length}</div>
                                <div style={{ color: '#0079be', fontWeight: 500 }}>Quotes</div>
                            </div>
                            <div style={{ flex: 1, minWidth: 180, background: '#e6f2f8', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 32, color: '#0079be', fontWeight: 700 }}>{clients.length}</div>
                                <div style={{ color: '#0079be', fontWeight: 500 }}>Clients</div>
                            </div>
                            <div style={{ flex: 1, minWidth: 180, background: '#e6f2f8', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 32, color: '#0079be', fontWeight: 700 }}>{products.length}</div>
                                <div style={{ color: '#0079be', fontWeight: 500 }}>Products</div>
                            </div>
                        </div>
                        <div style={{ marginBottom: 24 }}>
                            <h3 style={{ color: '#0079be', marginBottom: 8 }}>Why Zero?</h3>
                            <ul style={{ color: '#4a4a4a', fontSize: '1rem', paddingLeft: 20 }}>
                                <li>Modern, clean, and responsive design</li>
                                <li>Instant access to all your business data</li>
                                <li>Easy invoice and quote management</li>
                                <li>Client and product tracking</li>
                                <li>Inspired by the best: Xero</li>
                            </ul>
                        </div>
                        <a 
                            href="https://github.com/emilyfindlay/INFO310-Project-" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ 
                                display: 'inline-block', 
                                background: 'linear-gradient(90deg, #00b4d8 0%, #0077c8 100%)', 
                                color: 'white', 
                                padding: '14px 32px', 
                                borderRadius: 8, 
                                fontWeight: 700, 
                                fontSize: '1.1rem', 
                                textDecoration: 'none', 
                                boxShadow: '0 2px 8px rgba(0,123,190,0.10)',
                                transition: 'background 0.2s',
                            }}
                        >
                            Download from GitHub
                        </a>
                    </div>
                )}
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
