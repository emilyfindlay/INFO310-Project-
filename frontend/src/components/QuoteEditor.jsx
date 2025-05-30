import { useState, useEffect } from "react";

export default function QuoteEditor({ setQuotes, quoteId, setSelectedQuoteId, setPage }) {
    const [clientId, setClientId] = useState("");
    const [businessId, setBusinessId] = useState("");
    const [issuedDate, setIssuedDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [status, setStatus] = useState("");
    const [quoteItems, setQuoteItems] = useState([
        { product: { productName: "", productDescription: "", productPrice: 0 }, quantity: 1, discount: 0 },
    ]);

    const [clients, setClients] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("quoteId passed to editor:", quoteId); // ✅ Add this
    async function loadAllData() {
      const [clientsRes, businessesRes, productsRes] = await Promise.all([
        fetch("http://localhost:8080/api/clients"),
        fetch("http://localhost:8080/api/businesses"),
        fetch("http://localhost:8080/api/products"),
      ]);

      const [clientsData, businessesData, productsData] = await Promise.all([
        clientsRes.json(),
        businessesRes.json(),
        productsRes.json(),
      ]);

      setClients(clientsData);
      setBusinesses(businessesData);
      setProducts(productsData);

      if (quoteId) {
        const quoteRes = await fetch(`http://localhost:8080/api/quotes/${quoteId}`);
        const quoteData = await quoteRes.json();

        setClientId(quoteData.client.clientId);
        setBusinessId(quoteData.business.businessId);
        setIssuedDate(quoteData.issuedDate);
        setExpiryDate(quoteData.expiryDate);
        setStatus(quoteData.status);

        const resolvedItems = quoteData.quoteItems.map(item => {
          const fullProduct = productsData.find(p => p.productId === item.product.productId) || {
            productid: null,
            productName: item.product.productName,
            productDescription:item.product.productDescription,
            productPrice: item.product.productPrice,
          };
          return {
            product: fullProduct,
            quantity: item.quantity,
            discount: item.discount,
          };
        });
        setQuoteItems(resolvedItems);
      } else {
                setClientId("");
                setBusinessId("");
                setIssuedDate("");
                setExpiryDate("");
                setStatus("");
                setQuoteItems([
                    { product: { productName: "", productDescription: "", productPrice: 0}, quantity: 1, discount: 0}
                ]);
        }
    }
    loadAllData();
  }, [quoteId]);


    const handleQuoteItemChange = (index, field, value) => {
        const updatedItems = [...quoteItems];
        if (field === "quantity" || field === "discount") {
            updatedItems[index][field] = Number(value);
        } else if (field.startsWith("product.")) {
            const productField = field.split(".")[1];
            updatedItems[index].product = {
                ...updatedItems[index].product,
                [productField]: productField === "productPrice" ? Number(value) : value,
            };
        }
        setQuoteItems(updatedItems);
    };

    const addQuoteItem = () => {
        setQuoteItems([
            ...quoteItems,
            { product: { productName: "", productDescription: "", productPrice: 0 }, quantity: 1, discount: 0 }
        ]);
    };

    const removeQuoteItem = (index) => {
        const updated = [...quoteItems];
        updated.splice(index, 1);
        setQuoteItems(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const newProducts = quoteItems.filter(item=>!item.product.productId).map(item => ({
                productName: item.product.productName,
                productDescription: item.product.productDescription,
                productPrice: item.product.productPrice,
                productType: item.product.productType || "true"
            }));
            
            let savedNewProducts =[];
            if(newProducts.length > 0){
                const productResponse = await fetch("http://localhost:8080/api/products",
                        {
                            method: "POST",
                            headers: {"Content-Type":"application/json"},
                            body: JSON.stringify(newProducts),
                        });
                        if(!productResponse.ok) throw new Error ("Failed to save new products");
                        savedNewProducts = await productResponse.json();
            }
            
            const items = quoteItems.map((item) => {
                if(item.product.productId){
                    return{
                        productId: item.product.productId,
                        quantity: item.quantity,
                        unitPrice: item.product.productPrice,
                        discount: item.discount,
                        productType: true,
                    };
                } else {
                    const newProduct = savedNewProducts.shift();
                    return{
                        productId: newProduct.productId,
                        quantity: item.quantity,
                        unitPrice: newProduct.productPrice,
                        discount: item.discount,
                    };
                }
            });
            
            if(quoteId){
                const updatedQuote = {
                    clientId: Number(clientId),
                    businessId: Number(businessId),
                    issuedDate,
                    expiryDate,
                    status,
                    quoteItems: items,
                };
                
            const res = await fetch(`http://localhost:8080/api/quotes/${quoteId}`,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(updatedQuote),
            });
            if(!res.ok) throw new Error("Failed to update quote");
            
            const result = await res.json();           
            const refreshed = await fetch(`http://localhost:8080/api/quotes/${quoteId}`);
            const freshQuote = await refreshed.json();
            
            setQuotes(prev => {
                const others = prev.filter(q => q.quoteId !== freshQuote.quoteId);
                return [...others, freshQuote];
            });
            setSelectedQuoteId(null);
            setPage("quote-list");
            alert("Quote updated successfully?");
           }
           else //no quoteid so creating mode
           {
               const baseQuote = {
                   clientId : Number(clientId),
                   businessId : Number(businessId),
                   issuedDate,
                   expiryDate,
                   status,
                   quoteItems: []
               };
               
            const res = await fetch("http://localhost:8080/api/quotes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(baseQuote),
            });
            
            if(!res.ok) throw new Error("Failed to create quote"); 
            
            const createdQuote = await res.json();
            const newQuoteId = createdQuote.quoteId;
            
            const quoteItemsToSave = items.map(item => ({
                        ...item, quoteId: newQuoteId,
            }));
            
            const itemsRes = await fetch("http://localhost:8080/api/quote-items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quoteItemsToSave),
          });

          if (!itemsRes.ok) throw new Error("Failed to save quote items");
            
            const refreshed = await fetch(`http://localhost:8080/api/quotes/${newQuoteId}`);
            const freshQuote = await refreshed.json();
            setQuotes(prev=> [...prev, freshQuote]);
            
            setPage("quote-list");
            alert("Quote created successfully!");
           }
        }catch (err){
            console.error("Error saving quote",err);
            alert("error saving quooe: "+err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{quoteId ? "Edit Quote" : "Create Quote"}</h2>

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
                Expiry Date:
                <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
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
                    <option value="Open">Open</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                </select>
            </label>

            <h3>Quote Items</h3>
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
                {quoteItems.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <select
                                value={item.product.productId || ""}
                                onChange={(e) => {
                                  const selectedProduct = products.find(p => p.productId === Number(e.target.value));
                                  if (selectedProduct) {
                                    handleQuoteItemChange(index, "product.productId", selectedProduct.productId);
                                    handleQuoteItemChange(index, "product.productName", selectedProduct.productName);
                                    handleQuoteItemChange(index, "product.productPrice", selectedProduct.productPrice);
                                    handleQuoteItemChange(index, "product.productDescription", selectedProduct.productDescription);
                                  } else {
                                    handleQuoteItemChange(index, "product.productId", null);
                                  }
                                }}
                              >
                                <option value="">Select</option>
                                {products.map(product => (
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
                                onChange={(e) => handleQuoteItemChange(index, "product.productDescription", e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={item.product.productPrice}
                                readOnly={!!item.product.productId}
                                onChange={(e) => handleQuoteItemChange(index, "product.productPrice", e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuoteItemChange(index, "quantity", e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={item.discount}
                                onChange={(e) => handleQuoteItemChange(index, "discount", e.target.value)}
                            />
                        </td>
                        <td>
                            {(item.product.productPrice * item.quantity - item.discount).toFixed(2)}
                        </td>
                        <td>
                            <button type="button" onClick={() => removeQuoteItem(index)}>Remove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
  <button type="button" onClick={addQuoteItem}>Add Item</button>

  <button type="submit" disabled={!businessId || !expiryDate || !status}>
    {quoteId ? "Update Quote" : "Create Quote"}
  </button>
</div>
        </form>
    );
}