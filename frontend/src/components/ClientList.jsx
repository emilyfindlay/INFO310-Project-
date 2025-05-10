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
        <div>
            <h2>Client List</h2>

            {loading && <p>Loading clients...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !clients.length && <p>No clients found.</p>}

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.clientId}>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                        <td>
                            <button
                                onClick={() => handleEdit(client.clientId)}
                                title="Edit"
                                aria-label="Edit"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                }}
                            >
                                <img
                                    alt="Edit"
                                    src="/icons/edits.png"
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={() => handleDelete(client.clientId)}
                                title="Delete"
                                aria-label="Delete"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                }}
                            >
                                <img
                                    alt="Delete"
                                    src="/icons/deletes.png"
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
