import { useEffect, useState } from "react";

export default function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setClients([
      { id: 1, name: "Kevin", email: "kev@email.com" },
      { id: 2, name: "Tele", email: "tele@email.com" }
    ]);
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map(client => (
          <li key={client.id}>{client.name} — {client.email}</li>
        ))}
      </ul>
    </div>
  );
}