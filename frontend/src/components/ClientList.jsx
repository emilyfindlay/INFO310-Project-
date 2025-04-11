import { useEffect, useState } from "react";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products when component mounts
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/clients");
        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div>
      <h2>Client List</h2>
      {loading ? (
        <p>Loading clients...</p>
      ) : clients.length === 0 ? (
        <p>No clients added.</p>
      ) : (
        <ul>
          {clients.map((c) => (
            <li key={c.id}>
              {c.name} — {c.email}
              {c.phone && ` (${c.phone})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
