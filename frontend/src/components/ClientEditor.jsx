import { useState } from "react";

export default function ClientEditor({ setClients }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClient = {
      id: Math.floor(Math.random() * 100000),
      name,
      email,
      phone
    };

    setClients((prev) => [...prev, newClient]);
    setName("");
    setEmail("");
    setPhone("");
    alert("Mock client added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Client</h2>

      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Phone (optional):
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <button type="submit">Add Client</button>
    </form>
  );
}
