import { useState } from "react";

export default function ClientEditor() {
  const [client, setClient] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted client:", client);
    alert("Client added (mock)");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Client Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <button type="submit">Add Client</button>
    </form>
  );
}