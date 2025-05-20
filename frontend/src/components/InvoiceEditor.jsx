import { useState, useEffect } from "react";

export default function InvoiceEditor( { setInvoices, invoiceId, setSelectedInvoiceId, setPage }) {
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
        async function loadAllData() {
            // Step 1: Load supporting data first
            const [clientsRes, businessesRes, productsRes] = await Promise.all([
                fetch("http://localhost:8080/api/clients"),
                fetch("http://localhost:8080/api/businesses"),
                fetch("http://localhost:8080/api/products")
            ]);
            const [clientsData, businessesData, productsData] = await Promise.all([
                clientsRes.json(),
                businessesRes.json(),
                productsRes.json()
            ]);

            setClients(clientsData);
            setBusinesses(businessesData);
            setProducts(productsData);

            if (invoiceId) {
                fetch(`http://localhost:8080/api/invoices/${invoiceId}`)
                        .then(res => res.json())
                        .then(data => {
                            setClientId(data.client.clientId);
                            setBusinessId(data.business.businessId);
                            setIssuedDate(data.issuedDate);
                            setDueDate(data.dueDate);
                            setStatus(data.status);

                            const resolvedItems = data.invoiceItems.map(item => {
                                const fullProduct = productsData.find(p => p.productId === item.product.productId) || {
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
        }
        loadAllData();
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
    // ✅ Step 1: Separate new and existing products
    const newProducts = invoiceItems
      .filter(item => !item.product.productId)
      .map(item => ({
        productName: item.product.productName,
        productDescription: item.product.productDescription,
        productPrice: item.product.productPrice,
        productType: item.product.productType || "true"
      }));

    // ✅ Step 2: Save only new products
    let savedNewProducts = [];
    if (newProducts.length > 0) {
      const productResponse = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProducts),
      });

      if (!productResponse.ok)
        throw new Error("Failed to save new products");

      savedNewProducts = await productResponse.json();
    }

    // ✅ Step 3: Map invoice items with correct productId
    const items = invoiceItems.map((item) => {
      if (item.product.productId) {
        return {
          productId: item.product.productId,
          quantity: item.quantity,
          unitPrice: item.product.productPrice,
          discount: item.discount,
          productType: true,
        };
      } else {
        const newProduct = savedNewProducts.shift();
        return {
          productId: newProduct.productId,
          quantity: item.quantity,
          unitPrice: newProduct.productPrice,
          discount: item.discount,
          productType: true,
        };
      }
    });

    // ✅ Step 4: Create or Update invoice
    if (invoiceId) {
      const updatedInvoice = {
        clientId: Number(clientId),
        businessId: Number(businessId),
        issuedDate,
        dueDate,
        status,
        invoiceItems: items,
      };

      const response = await fetch(`http://localhost:8080/api/invoices/${invoiceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInvoice),
      });

      if (!response.ok)
        throw new Error("Failed to update invoice");

      const result = await response.json();

      setInvoices(prev =>
        prev.map(inv => inv.invoiceId === invoiceId ? result : inv)
      );
      setSelectedInvoiceId(null);
      setPage("invoice-list");
      alert("Invoice updated successfully!");
    } else {
      // 🆕 Step 5: Create invoice without items
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(baseInvoice),
      });

      if (!invoiceResponse.ok)
        throw new Error("Failed to create invoice");

      const createdInvoice = await invoiceResponse.json();
      const newInvoiceId = createdInvoice.invoiceId;

      // 🧾 Step 6: Save invoice items
      const invoiceItemsToSave = items.map(item => ({
        ...item,
        invoiceId: newInvoiceId,
      }));

      const itemsResponse = await fetch("http://localhost:8080/api/invoice-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceItemsToSave),
      });

      if (!itemsResponse.ok)
        throw new Error("Failed to save invoice items");
    
    // 🧾 Step 7: Fetch updated invoice with correct totals
    const refreshedResponse = await fetch(`http://localhost:8080/api/invoices/${newInvoiceId}`);
    const updatedInvoice = await refreshedResponse.json();
    
      // ✅ This line fixed — use createdInvoice not updatedInvoice
      setInvoices(prev => [...prev, updatedInvoice]);
      setPage("invoice-list");
      alert("Invoice created successfully!");
    }
  } catch (err) {
    console.error("Error saving invoice:", err);
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
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: 'white',
                            fontSize: '1rem'
                        }}
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
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
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button type="button" onClick={addInvoiceItem}>Add Item</button>
            
                <button type="submit" disabled={!businessId || !dueDate || !status}>
                    {invoiceId ? "Update Invoice" : "Create Invoice"}
                </button>
                </div>
            </form>
            );
}
