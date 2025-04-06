import { useState } from "react";

export default function ProductEditor({ setProducts }) {
  const [productType, setProductType] = useState(true); // true = service
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(productPrice);
    if (isNaN(parsedPrice)) {
      alert("Please enter a valid product price.");
      return;
    }

    const newProduct = {
      id: Math.floor(Math.random() * 100000),
      productType,
      productName,
      productPrice: parsedPrice
    };

    setProducts((prev) => [...prev, newProduct]);

    // Reset form fields
    setProductType(true);
    setProductName("");
    setProductPrice("");
    alert("Mock product added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <label>
        Product Type:
        <select
          value={productType.toString()}
          onChange={(e) => setProductType(e.target.value === "true")}
        >
          <option value="true">Service</option>
          <option value="false">Physical Product</option>
        </select>
      </label>

      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          minLength={2}
          maxLength={50}
        />
      </label>

      <label>
        Product Price:
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
          step="0.01"
        />
      </label>

      <button type="submit">Add Product</button>
    </form>
  );
}
