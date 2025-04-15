import { useState } from "react";

export default function BusinessEditor({ setBusinesses }) {
    const [businessName, setBusinessName] = useState("");
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");

    // Address fields
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
            // Step 1: Save the address
            const addressRes = await fetch("http://localhost:8080/api/addresses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(address),
            });

            if (!addressRes.ok) {
                throw new Error("Failed to save address");
            }

            const savedAddress = await addressRes.json();
            const addressId = savedAddress.addressId;

            // Step 2: Save the business with addressId
            const newBusiness = {
                businessName,
                bankAccountNumber,
                gstNumber,
                email,
                phone,
                websiteLink,
                address: { addressId }
            };

            const businessRes = await fetch("http://localhost:8080/api/businesses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBusiness),
            });

            if (!businessRes.ok) {
                throw new Error("Failed to save business");
            }

            const createdBusiness = await businessRes.json();
            setBusinesses(prev => [...prev, createdBusiness]);

            // Reset fields
            setBusinessName("");
            setBankAccountNumber("");
            setGstNumber("");
            setEmail("");
            setPhone("");
            setWebsiteLink("");
            setStreetAddress1("");
            setStreetAddress2("");
            setCity("");
            setRegion("");
            setPostCode("");
            setCountry("");

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
                <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} required />
            </label>

            <label>
                Bank Account Number:
                <input type="text" value={bankAccountNumber} onChange={e => setBankAccountNumber(e.target.value)} required />
            </label>

            <label>
                GST Number:
                <input type="text" value={gstNumber} onChange={e => setGstNumber(e.target.value)} />
            </label>

            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>

            <label>
                Phone:
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required />
            </label>

            <label>
                Website Link:
                <input type="text" value={websiteLink} onChange={e => setWebsiteLink(e.target.value)} />
            </label>

            <h3 className="mt-4 font-semibold">Address</h3>

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

            <button type="submit">Add Business</button>
        </form>
    );
}
