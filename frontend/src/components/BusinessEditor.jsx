import { useState } from "react";

export default function BusinessEditor({ setBusinesses }) {
    const [businessName, setBusinessName] = useState("");
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");
    const [addressId, setAddressId] = useState(""); // assuming addressId dropdown or input

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBusiness = {
            businessName,
            bankAccountNumber,
            gstNumber,
            email,
            phone,
            websiteLink,
            address: {
                addressId,
            },
        };

        try {
            const res = await fetch("http://localhost:8080/api/businesses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBusiness),
            });

            if (!res.ok) {
                throw new Error("Failed to add business");
            }

            const created = await res.json();
            setBusinesses((prev) => [...prev, created]);

            // Reset form
            setBusinessName("");
            setBankAccountNumber("");
            setGstNumber("");
            setEmail("");
            setPhone("");
            setWebsiteLink("");
            setAddressId("");

            alert("Business added successfully!");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Add Business</h2>

            <label>
                Business Name:
                <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                />
            </label>

            <label>
                Bank Account Number:
                <input
                    type="text"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    required
                />
            </label>

            <label>
                GST Number:
                <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
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
                    required
                />
            </label>

            <label>
                Website Link:
                <input
                    type="text"
                    value={websiteLink}
                    onChange={(e) => setWebsiteLink(e.target.value)}
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

            <button type="submit">Add Business</button>
        </form>
    );
}
