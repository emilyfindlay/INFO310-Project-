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
        <div className="dashboard-card" style={{ maxWidth: 1200, margin: '0 auto', boxShadow: '0 8px 32px rgba(0,123,190,0.10)' }}>
            <h2 style={{ fontSize: '2rem', color: '#0079be', marginBottom: 8 }}>Product List</h2>
            <p style={{ fontSize: '1.1rem', color: '#4a4a4a', marginBottom: 24 }}>
                Manage and view all your products in one place.
            </p>

            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !products.length && <p>No products found.</p>}

            {/* Summary Bar */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 180, background: '#e6f2f8', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 32, color: '#0079be', fontWeight: 700 }}>{products.length}</div>
                    <div style={{ color: '#0079be', fontWeight: 500 }}>Total Products</div>
                </div>
                <div style={{ flex: 1, minWidth: 180, background: '#e6f2f8', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 32, color: '#0079be', fontWeight: 700 }}>{products.filter(p => p.productPrice > 100).length}</div>
                    <div style={{ color: '#0079be', fontWeight: 500 }}>Premium Products</div>
                </div>
                <div style={{ flex: 1, minWidth: 180, background: '#e6f2f8', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 32, color: '#0079be', fontWeight: 700 }}>{products.filter(p => p.productPrice <= 100).length}</div>
                    <div style={{ color: '#0079be', fontWeight: 500 }}>Standard Products</div>
                </div>
            </div>

            {/* Sorting Controls */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    Sort by:
                    <select 
                        value={sortField} 
                        onChange={(e) => setSortField(e.target.value)} 
                        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                    >
                        <option value="productName">Product Name</option>
                        <option value="productDescription">Description</option>
                        <option value="productPrice">Price</option>
                    </select>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    Order:
                    <select 
                        value={sortDirection} 
                        onChange={(e) => setSortDirection(e.target.value)} 
                        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>

            {/* Product Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
                <thead>
                    <tr>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Product Code</th>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Description</th>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Price</th>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product.productId} style={{ borderBottom: '1px solid #e0e0e0' }}>
                            <td style={{ padding: 12 }}>{product.productName}</td>
                            <td style={{ padding: 12 }}>{product.productDescription}</td>
                            <td style={{ padding: 12 }}>{product.productPrice}</td>
                            <td style={{ padding: 12 }}>
                                <button
                                    onClick={() => handleEdit(product.productId)}
                                    style={{ 
                                        background: 'linear-gradient(90deg, #00b4d8 0%, #0077c8 100%)', 
                                        color: 'white', 
                                        padding: '8px 16px', 
                                        borderRadius: 4, 
                                        border: 'none', 
                                        cursor: 'pointer',
                                        marginRight: 8
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.productId)}
                                    style={{ 
                                        background: 'linear-gradient(90deg, #ff6b6b 0%, #ff4757 100%)', 
                                        color: 'white', 
                                        padding: '8px 16px', 
                                        borderRadius: 4, 
                                        border: 'none', 
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ 
                        padding: '8px 16px', 
                        borderRadius: 4, 
                        border: '1px solid #ccc', 
                        background: currentPage === 1 ? '#f0f0f0' : 'white',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                        key={idx + 1}
                        onClick={() => goToPage(idx + 1)}
                        style={{ 
                            padding: '8px 16px', 
                            borderRadius: 4, 
                            border: '1px solid #ccc', 
                            background: currentPage === idx + 1 ? '#0079be' : 'white',
                            color: currentPage === idx + 1 ? 'white' : 'black',
                            cursor: 'pointer'
                        }}
                    >
                        {idx + 1}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ 
                        padding: '8px 16px', 
                        borderRadius: 4, 
                        border: '1px solid #ccc', 
                        background: currentPage === totalPages ? '#f0f0f0' : 'white',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
