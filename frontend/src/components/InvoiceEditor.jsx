import { useState } from "react";

export default function InvoiceEditor() {
  const [form, setForm] = useState({
    issuedDate: "",
    dueDate: "",
    status: "DUE",
    totalGst: "",
    invoiceTotal: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted invoice:", form);
    alert("Mock submission successful!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="issuedDate" type="date" onChange={handleChange} required />
      <input name="dueDate" type="date" onChange={handleChange} required />
      <input name="status" placeholder="Status" onChange={handleChange} required />
      <input name="totalGst" type="number" placeholder="GST" onChange={handleChange} required />
      <input name="invoiceTotal" type="number" placeholder="Total" onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}
