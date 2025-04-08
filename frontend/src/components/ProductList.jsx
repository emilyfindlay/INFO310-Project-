export default function ProductList({ products }) {
    return (
        <div>
            <h2>Product List</h2>
            {products.length === 0 ? (
                <p>No products yet.</p>
            ) : (
                <ul>
                    {products.map((p) => (
                        <li key={p.productId ?? p.id}>
                            {p.productName ?? "Unnamed Product"} — $
                            {typeof p.productPrice === "number"
                                ? p.productPrice.toFixed(2)
                                : Number(p.productPrice).toFixed(2)}
                            {" "}
                            ({p.productType ? "Service" : "Product"})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
