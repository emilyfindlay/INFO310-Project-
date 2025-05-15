import { useState, useEffect } from "react";

export default function ProductEditor( { product, setProducts, setSelectedProduct, setPage }) {
    const [productName, setProductName] = useState(product ? product.productName : "");
    const [productDescription, setProductDescription] = useState(product ? product.productDescription : "");
    const [productPrice, setProductPrice] = useState(product ? product.productPrice : "");
    const [productType, setProductType] = useState(product ? product.productType : "");

    useEffect(() => {
        // If a product is provided (for editing), populate the form
        if (product) {
            setProductName(product.productName);
            setProductDescription(product.productDescription);
            setProductPrice(product.productPrice);
            setProductType(product.productType);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            productName,
            productDescription,
            productPrice: parseFloat(productPrice),
            productType,
        };

        try {
            let response;
            let updatedProduct;

            if (product) {
                // Editing
                response = await fetch(`http://localhost:8080/api/products/${product.productId}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({...product, ...newProduct}),
                });
                if (!response.ok)
                    throw new Error("Failed to update product");
                updatedProduct = await response.json();

                setProducts(prev =>
                    prev.map(p => (p.productId === updatedProduct.productId ? updatedProduct : p))
                );
                alert("Product updated!");
            } else {
                // Adding
                response = await fetch("http://localhost:8080/api/products", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify([newProduct]),
                });
                if (!response.ok)
                    throw new Error("Failed to add product");

                const savedProducts = await response.json();
                const updatedProduct = savedProducts[0]; 

                setProducts((prev) => [...prev, updatedProduct]);
          
                alert("Product added!");
            }

            setProductName("");
            setProductDescription("");
            setProductPrice("");
            setProductType("");
            setSelectedProduct(null);
            setPage("product-list");
        } catch (err) {
            alert("Error submitting product: " + err.message);
        }
    };

    return (
            <form onSubmit={handleSubmit}>
                <h2>{product ? "Edit Product" : "Add Product"}</h2>
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
                    <select value={productType} onChange={(e) => setProductType(e.target.value)} required>
                        <option value="">-- Select Type --</option>
                        <option value="true">Good</option>
                        <option value="false">Service</option>
                    </select>
                </label>
            
                <button type="submit">{product ? "Update Product" : "Add Product"}</button>
            </form>
            );
}