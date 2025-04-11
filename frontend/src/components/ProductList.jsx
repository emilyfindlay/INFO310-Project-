import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div>
      <h2>Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.productId ?? p.id}>
              {p.productName ?? "Unnamed Product"} — $
              {typeof p.productPrice === "number"
                ? p.productPrice.toFixed(2)
                : Number(p.productPrice).toFixed(2)}{" "}
              ({p.productType === "SERVICE" ? "Service" : "Product"})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}