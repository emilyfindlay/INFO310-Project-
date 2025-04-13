import { useState } from "react";

export default function ClientEditor({ setClients }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [addressId, setAddressId] = useState(""); // Assuming you have a dropdown for address selection or similar

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newClient = {
            name,
            email,
            phone,
            address: {
                addressId, // Assuming this is the selected address ID
            },
        };

        try {
            const response = await fetch("http://localhost:8080/api/clients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newClient),
            });

            if (!response.ok) {
                throw new Error("Failed to add client");
            }

            const createdClient = await response.json();

            // Update the clients list in parent component
            setClients((prevClients) => [...prevClients, createdClient]);

            setName("");
            setEmail("");
            setPhone("");
            setAddressId("");
            alert("Client added successfully!");
        } catch (err) {
            alert("Error adding client: " + err.message);
        }
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
                Phone:
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </label>

            <label>
                Address ID:
                <input
                    type="number"
                    value={addressId}
                    onChange={(e) => setAddressId(e.target.value)}
                    required
                />
            </label>

            <button type="submit">Add Client</button>
        </form>
    );
}
