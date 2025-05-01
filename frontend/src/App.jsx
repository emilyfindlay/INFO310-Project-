import { useState, useEffect } from "react";
import { FaFileInvoice, FaUser, FaPlus, FaBoxOpen } from "react-icons/fa";
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
import Dropdown from "./components/Dropdown/Dropdown";

// import './styles/main.css';
import './zeroCSS.css';

//const App = () => {
//    const items = [1, 2, 3, 4, 5, 6, 7, 8];
//            return (
////                    <div> className="App">
////    <div className="content">
//        <Dropdown />
//    </div>//
//    <div/>
//    );
//    };

export default function App()

{
    const [page, setPage] = useState("home");

    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [quotes, setQuotes] = useState([]);
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

        fetch("http://localhost:8080/api/quotes")
                .then((res) => res.json())
                .then(setQuotes)
                .catch((err) => console.error("Failed to load quotes", err));

        fetch("http://localhost:8080/api/businesses")
                .then((res) => res.json())
                .then(setBusinesses)
                .catch((err) => console.error("Failed to load businesses", err));

        document.title = "Zero";
    }, []);

    return (
            <div className="flex flex-col h-screen">
                {/* Top Navigation Bar */}
                <header className="bg-blue-800 text-white p-4">
                    <nav className="flex flex-row flex-wrap items-center gap-6">
                        <h1 className="text-xl font-bold mr-4">Zero</h1>
            
                        <Dropdown label="Main Menu">
                            <button
                                onClick={() => setPage("main-menu")}
                                className="hover:bg-blue-700 p-2 rounded"
                                >
                                Dashboard
                            </button>
                        </Dropdown>
            
                        <Dropdown label="Invoices">
                            <button
                                onClick={() => setPage("invoice-list")}
                                className="hover:bg-blue-700 p-2 rounded"
                                >
                                Invoice List
                            </button>
                            <button
                                onClick={() => setPage("invoice-editor")}
                                className="hover:bg-blue-700 p-2 rounded"
                                >
                                Create Invoice
                            </button>
                        </Dropdown>
            
                        <Dropdown label="Quotes">
                            <button
                                onClick={() => setPage("quote-list")}
                                className="hover:bg-blue-700 p-2 rounded"
                                >
                                Quote List
                            </button>
                            <button
                                onClick={() => setPage("quote-editor")}
                                className="hover:bg-blue-700 p-2 rounded"
                                >
                                Create Quote
                            </button>
                        </Dropdown>
            
                        <Dropdown label="Clients">
                            <button
                                onClick={() => setPage("client-list")}
                                className="hover:bg-blue-700 p-2 rounded"
                                >
                                Client List
                            </button>
                            <button
                                onClick={() => setPage("client-editor")}
                                className="hover:bg-blue-700 p-2 rounded"
                                >
                                Add Client
                            </button>
                        </Dropdown>
            
                        <Dropdown label="Products">
                            <button
                                onClick={() => setPage("product-list")}
                                className="hover:bg-blue-700 p-2 rounded"
                                >
                                Product List
                            </button>
                            <button
                                onClick={() => setPage("product-editor")}
                                className="hover:bg-blue-700 p-2 rounded"
                                >
                                Add Product
                            </button>
                        </Dropdown>
            
                        <Dropdown label="Business">
                            <button
                                onClick={() => setPage("business-list")}
                                className="hover:bg-blue-700 p-2 rounded"
                                >
                                Business List
                            </button>
                            <button
                                onClick={() => setPage("business-editor")}
                                className="hover:bg-blue-700 p-2 rounded"
                                >
                                Add Business
                            </button>
                        </Dropdown>
                    </nav>
                </header>
            
            
            
                {/* Main Content */}
                <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
                    {page === "invoice-list" && <InvoiceList invoices={invoices} />}
                    {page === "invoice-editor" && (
                            <InvoiceEditor
                                clients={clients}
                                products={products}
                                setInvoices={setInvoices}
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
                            <ClientList clients={clients} setClients={setClients} />
                                )}
                    {page === "client-editor" && <ClientEditor setClients={setClients} />}
            
                    {page === "product-list" && (
                            <ProductList products={products} setProducts={setProducts} />
                                )}
                    {page === "product-editor" && (
                            <ProductEditor
                                products={products}
                                setProducts={setProducts}
                                />
                                )}
            
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


