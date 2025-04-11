import { useState } from "react";

export default function ProductEditor() {
  const [productType, setProductType] = useState(true); // true = service
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const parsedPrice = parseFloat(productPrice);
  if (isNaN(parsedPrice)) {
    alert("Please enter a valid product price.");
    return;
  }

  const newProduct = {
    productType: productType, // boolean, true for service
    productName: productName,
    productPrice: parsedPrice,
    productDescription: productDescription // ← required!
  };

  try {
    const response = await fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });

    const responseText = await response.text(); // capture error detail if needed

    if (!response.ok) {
      throw new Error(responseText || "Failed to save product");
    }

    alert("Product added successfully!");
    setProductType(true);
    setProductName("");
    setProductPrice("");
    setProductDescription(""); // reset
  } catch (err) {
    console.error(err);
    alert("Error saving product: " + err.message);
  }
};

  return (
      <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <label>
          Product Type:
          <select
              value={productType}
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
        
        <label>
            Product Description:
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              maxLength={255}
            />
      </label>

        <button type="submit">Add Product</button>
      </form>
  );
}
