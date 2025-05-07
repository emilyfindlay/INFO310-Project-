import { useState, useEffect } from "react";

export default function BusinessEditor({ business, setBusinesses, setPage }) {
    const [businessName, setBusinessName] = useState(business ? business.businessName : "");
    const [bankAccountNumber, setBankAccountNumber] = useState(business ? business.bankAccountNumber : "");
    const [gstNumber, setGstNumber] = useState(business ? business.gstNumber : "");
    const [email, setEmail] = useState(business ? business.email : "");
    const [phone, setPhone] = useState(business ? business.phone : "");
    const [websiteLink, setWebsiteLink] = useState(business ? business.websiteLink : "");

    const [streetAddress1, setStreetAddress1] = useState(business?.address?.streetAddress1 || "");
    const [streetAddress2, setStreetAddress2] = useState(business?.address?.streetAddress2 || "");
    const [city, setCity] = useState(business?.address?.city || "");
    const [region, setRegion] = useState(business?.address?.region || "");
    const [postCode, setPostCode] = useState(business?.address?.postCode || "");
    const [country, setCountry] = useState(business?.address?.country || "");

    const [invoiceFooter, setInvoiceFooter] = useState(business ? business.invoiceFooter : "Thank you for your business!");
    const [quoteFooter, setQuoteFooter] = useState(business ? business.quoteFooter : "Thank you for your business!");

    useEffect(() => {
        setBusinessName(business ? business.businessName : "");
        setBankAccountNumber(business ? business.bankAccountNumber : "");
        setGstNumber(business ? business.gstNumber : "");
        setEmail(business ? business.email : "");
        setPhone(business ? business.phone : "");
        setWebsiteLink(business ? business.websiteLink : "");
        setStreetAddress1(business?.address?.streetAddress1 || "");
        setStreetAddress2(business?.address?.streetAddress2 || "");
        setCity(business?.address?.city || "");
        setRegion(business?.address?.region || "");
        setPostCode(business?.address?.postCode || "");
        setCountry(business?.address?.country || "");
        setInvoiceFooter(business ? business.invoiceFooter : "Thank you for your business!");
        setQuoteFooter(business ? business.quoteFooter : "Thank you for your business!");
    }, [business]);

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
            // Step 1: Check if address already exists
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

            // Step 2: Create or update the business with address_id
            const newBusiness = {
                businessName,
                bankAccountNumber,
                gstNumber,
                email,
                phone,
                websiteLink,
                address: { addressId: savedAddress.addressId },
                invoiceFooter,
                quoteFooter
            };

            let businessResponse;
            if (business) {
                businessResponse = await fetch(`http://localhost:8080/api/businesses/${business.businessId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBusiness),
                });
            } else {
                businessResponse = await fetch("http://localhost:8080/api/businesses", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBusiness),
                });
            }

            if (!businessResponse.ok) {
                throw new Error("Failed to add or update business");
            }

            const createdBusiness = await businessResponse.json();

            if (business) {
                setBusinesses((prev) =>
                    prev.map((b) => (b.businessId === createdBusiness.businessId ? createdBusiness : b))
                );
            } else {
                setBusinesses((prev) => [...prev, createdBusiness]);
            }

            setPage("business-list");
            alert(business ? "Business updated successfully!" : "Business added successfully!");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{business ? "Edit Business" : "Add Business"}</h2>

            <label>
                Business Name:
                <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
            </label>

            <label>
                Bank Account Number:
                <input type="text" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} required />
            </label>

            <label>
                GST Number:
                <input type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
            </label>

            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>

            <label>
                Phone:
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </label>

            <label>
                Website Link:
                <input type="text" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} />
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

            <h3>Invoice & Quote Details</h3>

            <label>
                Invoice Footer:
                <input type="text" value={invoiceFooter} onChange={(e) => setInvoiceFooter(e.target.value)} required />
            </label>

            <label>
                Quote Footer:
                <input type="text" value={quoteFooter} onChange={(e) => setQuoteFooter(e.target.value)} required />
            </label>

            <button type="submit">{business ? "Update Business" : "Add Business"}</button>
        </form>
    );
}
