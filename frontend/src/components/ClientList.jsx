import { useState, useEffect } from "react";

export default function ClientList({ clients, setClients }) {
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

        setClients((prev) => prev.filter((client) => client.clientId !== id));
        alert("Client deleted!");
      } catch (err) {
        setError(err.message || "Something went wrong while deleting.");
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
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {clients.map((client) => (
              <tr key={client.clientId}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <button onClick={() => handleDelete(client.clientId)}>Delete</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}
