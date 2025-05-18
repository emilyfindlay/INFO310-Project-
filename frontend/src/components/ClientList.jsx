import { useState, useEffect } from "react";

export default function ClientList({ clients, setClients, setSelectedClient, setPage }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch clients from the API when the component mounts
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/clients");

                if (!response.ok) {
                    throw new Error("Failed to fetch clients");
                }

                const data = await response.json();
                setClients(data);
            } catch (err) {
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, [setClients]); // Ensures that clients are fetched when this component loads

    // Handle client deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/clients/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete client");
                }

                // Update the clients state by filtering out the deleted client
                setClients((prev) => prev.filter((client) => client.clientId !== id));
                alert("Client deleted!");
            } catch (err) {
                setError(err.message || "Something went wrong while deleting.");
            }
        }
    };

    // Handle client edits
    const handleEdit = async (id) => {
        if (window.confirm("Are you sure you want to edit this client?")) {
            try {
                const selected = clients.find((c) => c.clientId === id);
                if (selected) {
                    console.log("Editing client with id:", id);
                    setSelectedClient(selected);
                    setPage("client-editor");
                }
            } catch (err) {
                setError(err.message || "Something went wrong while editing.");
            }
        }
    };

    return (
        <div className="dashboard-card">
            <h2>Client List</h2>
            <p>Manage and view all your clients in one place.</p>

            {loading && <p className="loading-text">Loading clients...</p>}
            {error && <p className="error-text">{error}</p>}
            {!loading && !clients.length && <p className="empty-state">No clients found.</p>}

            <div className="summary-bar">
                <div className="summary-item">
                    <div className="summary-number">{clients.length}</div>
                    <div className="summary-label">Total Clients</div>
                </div>
                <div className="summary-item">
                    <div className="summary-number">{clients.filter(c => c.email).length}</div>
                    <div className="summary-label">Clients with Email</div>
                </div>
                <div className="summary-item">
                    <div className="summary-number">{clients.filter(c => c.phone).length}</div>
                    <div className="summary-label">Clients with Phone</div>
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.clientId}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td className="action-buttons">
                                <button
                                    onClick={() => handleEdit(client.clientId)}
                                    className="btn btn-primary"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(client.clientId)}
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
