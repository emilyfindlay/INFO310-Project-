import { useState, useEffect } from "react";

export default function ProductList({ products, setProducts, setSelectedProduct, setPage }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState("productName");
    const [sortDirection, setSortDirection] = useState("asc");

    const productsPerPage = 10;

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
    }, [setProducts]);

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

    const handleEdit = (id) => {
        const selected = products.find((p) => p.productId === id);
        if (selected) {
            setSelectedProduct(selected);
            setPage("product-editor");
        }
    };

    const sortedProducts = [...products].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

    const goToPage = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
        }
    };

    return (
        <div>
            <h2>Product List</h2>

            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !products.length && <p>No products found.</p>}

            {/* Sorting Controls */}
            <div style={{ marginBottom: "1rem" }}>
                <label>
                    Sort by:
                    <select value={sortField} onChange={(e) => setSortField(e.target.value)} style={{ marginLeft: 8 }}>
                        <option value="productName">Product Name</option>
                        <option value="productDescription">Description</option>
                        <option value="productPrice">Price</option>
                    </select>
                </label>
                <label style={{ marginLeft: 16 }}>
                    Order:
                    <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)} style={{ marginLeft: 8 }}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>

            {/* Product Table */}
            <table>
                <thead>
                <tr>
                    <th>Product Code</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentProducts.map((product) => (
                    <tr key={product.productId}>
                        <td>{product.productName}</td>
                        <td>{product.productDescription}</td>
                        <td>{product.productPrice}</td>
                        <td>
                            <button onClick={() => handleEdit(product.productId)}>Edit</button>
                            <button onClick={() => handleDelete(product.productId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div style={{ marginTop: "1rem", display: "flex", gap: 8 }}>
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                        key={idx + 1}
                        onClick={() => goToPage(idx + 1)}
                        style={{
                            fontWeight: currentPage === idx + 1 ? "bold" : "normal",
                            background: currentPage === idx + 1 ? "#d1eaff" : "transparent",
                        }}
                    >
                        {idx + 1}
                    </button>
                ))}
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}
