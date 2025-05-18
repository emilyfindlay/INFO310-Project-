import { useState, useEffect } from "react";

export default function BusinessList({ businesses, setBusinesses, setSelectedBusiness, setPage }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch businesses from the API when the component mounts
    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/businesses");

                if (!response.ok) {
                    throw new Error("Failed to fetch businesses");
                }

                const data = await response.json();
                setBusinesses(data);
            } catch (err) {
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, [setBusinesses]); // Ensures that businesses are fetched when this component loads

    // Handle business deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this business?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/businesses/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete business");
                }

                // Update the businesses state by filtering out the deleted business
                setBusinesses((prev) => prev.filter((business) => business.businessId !== id));
                alert("Business deleted!");
            } catch (err) {
                setError(err.message || "Something went wrong while deleting.");
            }
        }
    };

    // Handle business edits
    const handleEdit = async (id) => {
        if (window.confirm("Are you sure you want to edit this business?")) {
            try {
                const selected = businesses.find((c) => c.businessId === id);
                if (selected) {
                    console.log("Editing business with id:", id);
                    setSelectedBusiness(selected);
                    setPage("business-editor");
                }
            } catch (err) {
                setError(err.message || "Something went wrong while editing.");
            }
        }
    };

    return (
        <div className="dashboard-card">
            <h2>Business List</h2>
            <p>Manage and view all your business profiles in one place.</p>

            {loading && <p className="loading-text">Loading businesses...</p>}
            {error && <p className="error-text">{error}</p>}
            {!loading && !businesses.length && <p className="empty-state">No businesses found.</p>}

            <div className="summary-bar">
                <div className="summary-item">
                    <div className="summary-number">{businesses.length}</div>
                    <div className="summary-label">Total Businesses</div>
                </div>
                <div className="summary-item">
                    <div className="summary-number">{businesses.filter(b => b.websiteLink).length}</div>
                    <div className="summary-label">Businesses with Website</div>
                </div>
                <div className="summary-item">
                    <div className="summary-number">{businesses.filter(b => b.gstNumber).length}</div>
                    <div className="summary-label">GST Registered</div>
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>GST</th>
                        <th>Bank Account</th>
                        <th>Website</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {businesses.map((business) => (
                        <tr key={business.businessId}>
                            <td>{business.businessId}</td>
                            <td>{business.businessName}</td>
                            <td>{business.email}</td>
                            <td>{business.phone}</td>
                            <td>{business.gstNumber}</td>
                            <td>{business.bankAccountNumber}</td>
                            <td>{business.websiteLink}</td>
                            <td className="action-buttons">
                                <button
                                    onClick={() => handleEdit(business.businessId)}
                                    className="btn btn-primary"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(business.businessId)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
