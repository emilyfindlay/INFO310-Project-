import { useState } from "react";

export default function ClientEditor({ setClients }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [streetAddress1, setStreetAddress1] = useState("");
    const [streetAddress2, setStreetAddress2] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [postCode, setPostCode] = useState("");
    const [country, setCountry] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const address = {
            streetAddress1,
            streetAddress2,
            city,
            region,
            postCode,
            country
        };

        try {
            //Create address
            const addressResponse = await fetch("http://localhost:8080/api/addresses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(address),
            });

            if (!addressResponse.ok) {
                throw new Error("Failed to save address");
            }

            const savedAddress = await addressResponse.json();
            const addressId = savedAddress.addressId;

            // Create client with the address ID
            const newClient = {
                name,
                email,
                phone,
                address: {
                    addressId
                }
            };

            const clientResponse = await fetch("http://localhost:8080/api/clients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newClient),
            });

            if (!clientResponse.ok) {
                throw new Error("Failed to add client");
            }

            const createdClient = await clientResponse.json();
            setClients(prev => [...prev, createdClient]);

            // Clear form
            setName("");
            setEmail("");
            setPhone("");
            setStreetAddress1("");
            setStreetAddress2("");
            setCity("");
            setRegion("");
            setPostCode("");
            setCountry("");

            alert("Client added successfully!");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Client</h2>

            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </label>

            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>

            <label>
                Phone:
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
            </label>

            <h3>Address</h3>

            <label>
                Street Address 1:
                <input type="text" value={streetAddress1} onChange={e => setStreetAddress1(e.target.value)} required />
            </label>

            <label>
                Street Address 2:
                <input type="text" value={streetAddress2} onChange={e => setStreetAddress2(e.target.value)} />
            </label>

            <label>
                City:
                <input type="text" value={city} onChange={e => setCity(e.target.value)} required />
            </label>

            <label>
                Region:
                <input type="text" value={region} onChange={e => setRegion(e.target.value)} />
            </label>

            <label>
                Post Code:
                <input type="text" value={postCode} onChange={e => setPostCode(e.target.value)} required />
            </label>

            <label>
                Country:
                <input type="text" value={country} onChange={e => setCountry(e.target.value)} required />
            </label>

            <button type="submit">Add Client</button>
        </form>
    );
}
