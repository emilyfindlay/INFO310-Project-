import { useState, useEffect } from "react";




export default function ProductList({ products, setProducts }) {

    console.log("Products:", products);
    console.log("setProducts:", setProducts);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch products from the API when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/products");

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [setProducts]); // Ensures that products are fetched when this component loads

    // Handle product deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete product");
                }

                setProducts((prev) => prev.filter((product) => product.productId !== id));
                alert("Product deleted!");
            } catch (err) {
                setError(err.message || "Something went wrong while deleting.");
            }
        }
    };

    return (
        <div>
            <h2>Product List</h2>

            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !products.length && <p>No products found.</p>}

            <table>
                <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.productId}>
                        <td>{product.productName}</td>
                        <td>{product.productDescription}</td>
                        <td>{product.productPrice}</td>
                        <td>
                            <button onClick={() => handleDelete(product.productId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
