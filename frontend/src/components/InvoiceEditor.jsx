import { useState, useEffect } from "react";

export default function InvoiceEditor({ setInvoices, invoiceId }) {
    const [clientId, setClientId] = useState("");
    const [businessId, setBusinessId] = useState("");
    const [issuedDate, setIssuedDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");
    const [invoiceItems, setInvoiceItems] = useState([
        { product: { productName: "", productDescription: "", productPrice: 0 }, quantity: 1, discount: 0 },
    ]);


    const [clients, setClients] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/clients")
            .then((response) => response.json())
            .then((data) => {
                console.log("Clients fetched:", data); // Log clients to check the data
                setClients(data);
            });

        fetch("http://localhost:8080/api/businesses")
            .then((response) => response.json())
            .then((data) => {
                console.log("Businesses fetched:", data); // Log businesses to check the data
                setBusinesses(data);
            });

        fetch("http://localhost:8080/api/products")
            .then((response) => response.json())
            .then((data) => {
                console.log("Products fetched:", data); // Log products to check the data
                setProducts(data);
            });

        if (invoiceId) {
            fetch(`http://localhost:8080/api/invoices/${invoiceId}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Invoice fetched:", data); // Log the invoice to check the data
                    setClientId(data.clientId);
                    setBusinessId(data.businessId);
                    setIssuedDate(data.issuedDate);
                    setDueDate(data.dueDate);
                    setStatus(data.status);

                    const resolvedItems = data.invoiceItems.map((item) => {
                        const fullProduct = products.find(p => p.id === item.productId) || {
                            productName: "",
                            productDescription: "",
                            productPrice: 0,
                        };
                        return {
                            product: fullProduct,
                            quantity: item.quantity,
                            discount: item.discount,
                        };
                    });
                    setInvoiceItems(resolvedItems);
                });
        }

    }, [invoiceId]);


    const handleInvoiceItemChange = (index, field, value) => {
        const updatedItems = [...invoiceItems];
        if (field === "quantity" || field === "discount") {
            updatedItems[index][field] = Number(value);
        } else if (field.startsWith("product.")) {
            const productField = field.split(".")[1];
            updatedItems[index].product = {
                ...updatedItems[index].product,
                [productField]: productField === "productPrice" ? Number(value) : value,
            };
        } else {
            updatedItems[index][field] = value;
        }

        setInvoiceItems(updatedItems);
    };


    const addInvoiceItem = () => {
        setInvoiceItems([
            ...invoiceItems,
            {
                product: {
                    productName: "",
                    productDescription: "",
                    productPrice: 0,
                },
                quantity: 1,
                discount: 0,
            },
        ]);
    };


    const removeInvoiceItem = (index) => {
        const updatedItems = [...invoiceItems];
        updatedItems.splice(index, 1);
        setInvoiceItems(updatedItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Save Products
            console.log("Invoice Items to save:", invoiceItems);
            const productsToSave = invoiceItems.map((item) => ({
                productName: item.product.productName,
                productType: true,
                productDescription: item.product.productDescription,
                productPrice: item.product.productPrice,
            }));

            const productResponse = await fetch("http://localhost:8080/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productsToSave),
            });

            if (!productResponse.ok) throw new Error("Failed to save products");
            const savedProducts = await productResponse.json();


            // Step 2: Create Invoice without items
            const baseInvoice = {
                clientId: Number(clientId),
                businessId: Number(businessId),
                issuedDate,
                dueDate,
                status,
                invoiceItems: [], // initially empty
            };

            console.log("Base Invoice:", baseInvoice);

            const invoiceResponse = await fetch("http://localhost:8080/api/invoices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(baseInvoice),
            });

            if (!invoiceResponse.ok) throw new Error("Failed to create invoice");

            const createdInvoice = await invoiceResponse.json();
            const newInvoiceId = createdInvoice.invoiceId;
            console.log("Created Invoice:", createdInvoice);

            // Step 3: Save Invoice Items with reference to invoice ID
            const invoiceItemsToSave = invoiceItems.map((item, idx) => ({
                productId: savedProducts[idx].productId,
                invoiceId: newInvoiceId,
                quantity: item.quantity,
                unitPrice: item.product.productPrice,
                discount: item.discount,
            }));

            const itemsResponse = await fetch("http://localhost:8080/api/invoice-items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(invoiceItemsToSave),
            });

            if (!itemsResponse.ok) throw new Error("Failed to save invoice items");
            const savedInvoiceItems = await itemsResponse.json();

            // Step 4: Patch invoice with saved items
            const finalInvoiceUpdate = {
                ...createdInvoice,
                invoiceItems: savedInvoiceItems,
            };

            const patchResponse = await fetch(`http://localhost:8080/api/invoices/${newInvoiceId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalInvoiceUpdate),
            });

            if (!patchResponse.ok) throw new Error("Failed to update invoice with items");

            const updatedInvoice = await patchResponse.json();
            setInvoices((prev) => [...prev, updatedInvoice]);

            alert("Invoice created successfully!");
        } catch (err) {
            console.error("Error during invoice submission:", err);
            alert("Error saving invoice: " + err.message);
        }
    };




    return (
        <form onSubmit={handleSubmit}>
            <h2>{invoiceId ? "Edit Invoice" : "Create Invoice"}</h2>

            <label>
                {clientId && <span> (ID: {clientId})</span>} {/* Display client ID next to label */} Client:
                <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    required
                >
                    <option value="">Select a client</option>
                    {clients.map((client) => (
                        <option key={client.clientId} value={client.clientId}>
                            {client.name}
                        </option>
                    ))}
                </select>

                    </label>

                    <label>
                {businessId && <span> (ID: {businessId})</span>} {/* Display business ID next to label */} Business:
                    <select
                    value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
                required
            >
                <option value="">Select a business</option>
                {businesses.map((business) => (
                    <option key={business.businessId} value={business.businessId}>
                        {business.businessName}
                    </option>
                ))}
            </select>

                </label>


                <label>
                Issued Date:
                <input
                    type="date"
                    value={issuedDate}
                    onChange={(e) => setIssuedDate(e.target.value)}
                    required
                />
            </label>

            <label>
                Due Date:
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </label>

            <label>
                Status:
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                />
            </label>

            <h3>Invoice Items</h3>
            <table>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Discount</th>
                    <th>Subtotal</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {invoiceItems.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <input
                                type="text"
                                value={item.product.productName}
                                onChange={(e) =>
                                    handleInvoiceItemChange(index, "product.productName", e.target.value)
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={item.product.productDescription}
                                onChange={(e) =>
                                    handleInvoiceItemChange(index, "product.productDescription", e.target.value)
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={item.product.productPrice}
                                onChange={(e) =>
                                    handleInvoiceItemChange(index, "product.productPrice", e.target.value)
                                }
                            />

                        </td>
                        <td>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                    handleInvoiceItemChange(index, "quantity", e.target.value)
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={item.discount}
                                onChange={(e) =>
                                    handleInvoiceItemChange(index, "discount", e.target.value)
                                }
                            />
                        </td>
                        <td>
                            {(item.product.productPrice * item.quantity - item.discount).toFixed(2)}
                        </td>
                        <td>
                            <button type="button" onClick={() => removeInvoiceItem(index)}>
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button type="button" onClick={addInvoiceItem}>
                Add Item
            </button>

            <button
                type="submit"
                disabled={!clientId || !businessId || !issuedDate || !dueDate || !status}
            >
                {invoiceId ? "Update Invoice" : "Create Invoice"}
            </button>

        </form>
    );
}
