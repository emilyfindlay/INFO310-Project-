import { useState } from "react";

export default function InvoiceEditor({ clients, products, setInvoices }) {
  const [clientId, setClientId] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: 1 }]);

  const GST_RATE = 0.15;

  // Update product line
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  // Add new line
  const addItem = () => {
    setItems([...items, { productId: "", quantity: 1 }]);
  };

  // Remove line
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Calculate subtotal (sum of line items)
  const subtotal = items.reduce((sum, item) => {
    const product = products.find(p => p.id.toString() === item.productId);
    if (!product) return sum;
    return sum + (product.productPrice * item.quantity);
  }, 0);

  const totalGst = subtotal * GST_RATE;
  const invoiceTotal = subtotal + totalGst;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInvoice = {
      id: Math.floor(Math.random() * 100000),
      client: clients.find(c => c.id.toString() === clientId),
      items: items.map(item => ({
        product: products.find(p => p.id.toString() === item.productId),
        quantity: item.quantity
      })),
      issuedDate,
      dueDate,
      status,
      totalGst: parseFloat(totalGst.toFixed(2)),
      invoiceTotal: parseFloat(invoiceTotal.toFixed(2))
    };

    setInvoices(prev => [...prev, newInvoice]);
    alert("Mock invoice added!");

    // Reset
    setClientId("");
    setIssuedDate("");
    setDueDate("");
    setStatus("");
    setItems([{ productId: "", quantity: 1 }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Invoice</h2>

      <label>
        Client:
        <select value={clientId} onChange={e => setClientId(e.target.value)} required>
          <option value="">Select Client</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>

      <label>
        Issued Date:
        <input
          type="date"
          value={issuedDate}
          onChange={e => setIssuedDate(e.target.value)}
          required
        />
      </label>

      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
        />
      </label>

      <label>
        Status:
        <input
          type="text"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
        />
      </label>

      <hr />
      <h3>Invoice Items</h3>

      {items.map((item, index) => {
        const product = products.find(p => p.id.toString() === item.productId);
        const price = product ? product.productPrice : 0;
        const lineTotal = price * item.quantity;

        return (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <select
              value={item.productId}
              onChange={e => updateItem(index, "productId", e.target.value)}
              required
            >
              <option value="">Select Product</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.productName} (${p.productPrice})
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={e => updateItem(index, "quantity", parseInt(e.target.value))}
              required
            />

            <span style={{ marginLeft: "10px" }}>
              Line total: ${lineTotal.toFixed(2)}
            </span>

            <button type="button" onClick={() => removeItem(index)} style={{ marginLeft: "10px" }}>
              🗑️
            </button>
          </div>
        );
      })}

      <button type="button" onClick={addItem}>➕ Add Product</button>

      <hr />
      <h4>Subtotal: ${subtotal.toFixed(2)}</h4>
      <h4>GST (15%): ${totalGst.toFixed(2)}</h4>
      <h3>Invoice Total: ${invoiceTotal.toFixed(2)}</h3>

      <button type="submit">Add Invoice</button>
    </form>
  );
}
