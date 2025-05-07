import { useState, useEffect } from "react";

export default function ClientEditor({ client, setClients, setPage }) {
    const [name, setName] = useState(client ? client.name : "");
    const [email, setEmail] = useState(client ? client.email : "");
    const [phone, setPhone] = useState(client ? client.phone : "");

    const [streetAddress1, setStreetAddress1] = useState(client?.address?.streetAddress1 || "");
    const [streetAddress2, setStreetAddress2] = useState(client?.address?.streetAddress2 || "");
    const [city, setCity] = useState(client?.address?.city || "");
    const [region, setRegion] = useState(client?.address?.region || "");
    const [postCode, setPostCode] = useState(client?.address?.postCode || "");
    const [country, setCountry] = useState(client?.address?.country || "");

    useEffect(() => {
        setName(client ? client.name : "");
        setEmail(client ? client.email : "");
        setPhone(client ? client.phone : "");
        setStreetAddress1(client?.address?.streetAddress1 || "");
        setStreetAddress2(client?.address?.streetAddress2 || "");
        setCity(client?.address?.city || "");
        setRegion(client?.address?.region || "");
        setPostCode(client?.address?.postCode || "");
        setCountry(client?.address?.country || "");
    }, [client]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const address = {
            streetAddress1,
            streetAddress2,
            city,
            region,
            postCode,
            country,
        };

        try {
            const addressCheckResponse = await fetch(`http://localhost:8080/api/addresses?streetAddress1=${encodeURIComponent(streetAddress1)}&streetAddress2=${encodeURIComponent(streetAddress2)}&city=${encodeURIComponent(city)}&region=${encodeURIComponent(region)}&postCode=${encodeURIComponent(postCode)}&country=${encodeURIComponent(country)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            let savedAddress;
            if (addressCheckResponse.ok) {
                const addresses = await addressCheckResponse.json();
                savedAddress = addresses.find((address) => {
                    return address.streetAddress1 === streetAddress1 &&
                           address.streetAddress2 === streetAddress2 &&
                           address.city === city &&
                           address.region === region &&
                           address.postCode === postCode &&
                           address.country === country;
                });

                if (savedAddress) {
                    console.log("Address already exists, using existing addressId");
                } else {
                    const addressResponse = await fetch("http://localhost:8080/api/addresses", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(address),
                    });

                    if (!addressResponse.ok) {
                        throw new Error("Failed to save or retrieve address");
                    }

                    savedAddress = await addressResponse.json();
                }
            } else {
                throw new Error("Failed to check existing address");
            }

            // 2. Create or update the client with the address_id returned from the address API
            const newClient = {
                name,
                email,
                phone,
                address: { addressId: savedAddress.addressId },
            };

            let clientResponse;
            if (client) {
                clientResponse = await fetch(`http://localhost:8080/api/clients/${client.clientId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newClient),
                });
            } else {
                clientResponse = await fetch("http://localhost:8080/api/clients", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newClient),
                });
            }

            if (!clientResponse.ok) {
                throw new Error("Failed to add or update client");
            }

            const createdClient = await clientResponse.json();

            if (client) {
                setClients((prev) =>
                    prev.map((c) => (c.clientId === createdClient.clientId ? createdClient : c))
                );
            } else {
                setClients((prev) => [...prev, createdClient]);
            }

            setPage("client-list");
            alert(client ? "Client updated successfully!" : "Client added successfully!");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>{client ? "Edit Client" : "Add Client"}</h2>

            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>

            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>

            <label>
                Phone:
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>

            <h3>Address</h3>

            <label>
                Street Address 1:
                <input type="text" value={streetAddress1} onChange={(e) => setStreetAddress1(e.target.value)} required />
            </label>

            <label>
                Street Address 2:
                <input type="text" value={streetAddress2} onChange={(e) => setStreetAddress2(e.target.value)} />
            </label>

            <label>
                City:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
            </label>

            <label>
                Region:
                <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
            </label>

            <label>
                Post Code:
                <input type="text" value={postCode} onChange={(e) => setPostCode(e.target.value)} required />
            </label>

            <label>
                Country:
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </label>

            <button type="submit">{client ? "Update Client" : "Add Client"}</button>
        </form>
    );
}