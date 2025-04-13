import { useState } from "react";

export default function ProductEditor({ setProducts }) {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productType, setProductType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            productName,
            productDescription,
            productPrice: parseFloat(productPrice), // Ensure it's a number
            productType,
        };

        try {
            const response = await fetch("http://localhost:8080/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            const createdProduct = await response.json();

            setProducts((prev) => [...prev, createdProduct]);

            setProductName("");
            setProductDescription("");
            setProductPrice("");
            setProductType("");
            alert("Product added successfully!");
        } catch (err) {
            alert("Error adding product: " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>

            <label>
                Name:
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </label>

            <label>
                Description:
                <input
                    type="text"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                />
            </label>

            <label>
                Price:
                <input
                    type="number"
                    step="0.01"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />
            </label>

            <label>
                Type:
                <input
                    type="text"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                />
            </label>

            <button type="submit">Add Product</button>
        </form>
    );
}
