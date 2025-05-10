import { useState, useEffect } from "react";

export default function InvoiceEditor( { setInvoices, invoiceId }) {
    const [clientId, setClientId] = useState("");
    const [businessId, setBusinessId] = useState("");
    const [issuedDate, setIssuedDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");
    const [invoiceItems, setInvoiceItems] = useState([
        {product: {productName: "", productDescription: "", productPrice: 0}, quantity: 1, discount: 0},
    ]);

    const [clients, setClients] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/clients").then(res => res.json()).then(setClients);
        fetch("http://localhost:8080/api/businesses").then(res => res.json()).then(setBusinesses);
        fetch("http://localhost:8080/api/products").then(res => res.json()).then(setProducts);

        if (invoiceId) {
            fetch(`http://localhost:8080/api/invoices/${invoiceId}`)
                    .then(res => res.json())
                    .then(data => {
                        setClientId(data.clientId);
                        setBusinessId(data.businessId);
                        setIssuedDate(data.issuedDate);
                        setDueDate(data.dueDate);
                        setStatus(data.status);

                        const resolvedItems = data.invoiceItems.map(item => {
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
        }
        setInvoiceItems(updatedItems);
    };

    const addInvoiceItem = () => {
        setInvoiceItems([
            ...invoiceItems,
            {product: {productName: "", productDescription: "", productPrice: 0}, quantity: 1, discount: 0}
        ]);
    };

    const removeInvoiceItem = (index) => {
        const updated = [...invoiceItems];
        updated.splice(index, 1);
        setInvoiceItems(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productsToSave = invoiceItems.map(item => ({
                    productName: item.product.productName,
                    productDescription: item.product.productDescription,
                    productPrice: item.product.productPrice,
                    productType: item.product.productType || "true"
                }));

            const productResponse = await fetch("http://localhost:8080/api/products", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(productsToSave),
            });

            if (!productResponse.ok)
                throw new Error("Failed to save products");
            const savedProducts = await productResponse.json();

            const baseInvoice = {
                clientId: Number(clientId) || null,
                businessId: Number(businessId),
                issuedDate,
                dueDate,
                status,
                invoiceItems: []
            };

            const invoiceResponse = await fetch("http://localhost:8080/api/invoices", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(baseInvoice),
            });

            if (!invoiceResponse.ok)
                throw new Error("Failed to create invoice");

            const createdInvoice = await invoiceResponse.json();
            const newInvoiceId = createdInvoice.invoiceId;

            const invoiceItemsToSave = invoiceItems.map((item, idx) => ({
                    productId: savedProducts[idx].productId,
                    invoiceId: newInvoiceId,
                    quantity: item.quantity,
                    unitPrice: item.product.productPrice,
                    discount: item.discount,
                    productType: true
                }));

            const itemsResponse = await fetch("http://localhost:8080/api/invoice-items", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(invoiceItemsToSave),
            });

            if (!itemsResponse.ok)
                throw new Error("Failed to save invoice items");

            const savedInvoiceItems = await itemsResponse.json();

            const finalInvoiceUpdate = {
                ...createdInvoice,
                invoiceItems: savedInvoiceItems.map(item => ({
                        id: {
                            invoiceId: item.invoiceId,
                            productId: item.productId
                        },
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        discount: item.discount
                    }))
            };

            const patchResponse = await fetch(`http://localhost:8080/api/invoices/${newInvoiceId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(finalInvoiceUpdate),
            });

            if (!patchResponse.ok)
                throw new Error("Failed to update invoice");

            const updatedInvoice = await patchResponse.json();
            setInvoices(prev => [...prev, updatedInvoice]);

            alert("Invoice created successfully!");
        } catch (err) {
            console.error("Error creating invoice:", err);
            alert("Error saving invoice: " + err.message);
        }
    };

    return (
            <form onSubmit={handleSubmit}>
                <h2>{invoiceId ? "Edit Invoice" : "Create Invoice"}</h2>
            
                <label>
                    Client:
                    <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select a client</option>
                        {clients.map((client) => (
                                <option key={client.clientId} value={client.clientId}>{client.name}</option>
                                        ))}
                    </select>
                </label>
            
                <label>
                    Business:
                    <select value={businessId} onChange={(e) => setBusinessId(e.target.value)} required>
                        <option value="">Select a business</option>
                        {businesses.map((business) => (
                                <option key={business.businessId} value={business.businessId}>{business.businessName}</option>
                                        ))}
                    </select>
                </label>
            
                <label>
                    Issued Date:
                    <input type="date" value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} />
                </label>
            
                <label>
                    Due Date:
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                </label>
            
                <label>
                    Status:
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
                </label>
            
                <h3>Invoice Items</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                            <th>Subtotal</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceItems.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <select
                                            value={item.product.productId || ""}
                                            onChange={(e) => {
                                                                const selectedProduct = products.find(p => p.productId === Number(e.target.value));
                                                                if (selectedProduct) {
                                                                handleInvoiceItemChange(index, "product.productId", selectedProduct.productId);
                                                                handleInvoiceItemChange(index, "product.productName", selectedProduct.productName);
                                                                handleInvoiceItemChange(index, "product.productPrice", selectedProduct.productPrice);
                                                                handleInvoiceItemChange(index, "product.productDescription", selectedProduct.productDescription);
                                                            } else {
                                                                handleInvoiceItemChange(index, "product.productId", null);
                                                            }
                                                        }}                                
                                            >
                                            <option value="">Select</option>
                                            {products.map((product) => (
                                                            <option key={product.productId} value={product.productId}>
                                                                {product.productName}
                                                            </option>
                                                                        ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            value={item.product.productDescription}
                                            readOnly={!!item.product.productId}
                                            onChange={(e) => handleInvoiceItemChange(index, "product.productDescription", e.target.value)}
                                            />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.product.productPrice}
                                            readOnly={!!item.product.productId}
                                            onChange={(e) => handleInvoiceItemChange(index, "product.productPrice", e.target.value)}
                                            />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleInvoiceItemChange(index, "quantity", e.target.value)}
                                            />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.discount}
                                            onChange={(e) => handleInvoiceItemChange(index, "discount", e.target.value)}
                                            />
                                    </td>
                                    <td>
                                        {(item.product.productPrice * item.quantity - item.discount).toFixed(2)}
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => removeInvoiceItem(index)}>Remove</button>
                                    </td>
                                </tr>
                                        ))}
                    </tbody>
                </table>
            
                <button type="button" onClick={addInvoiceItem}>Add Item</button>
            
                <button type="submit" disabled={!businessId || !dueDate || !status}>
                    {invoiceId ? "Update Invoice" : "Create Invoice"}
                </button>
            </form>
            );
}
