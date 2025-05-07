import { useState, useEffect } from "react";

export default function BusinessList({ businesses, setBusinesses, setSelectedBusiness, setPage }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch business from the API when the component mounts
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/businesses");

        if (!response.ok) {
          throw new Error("Failed to fetch businesses");
        }

        const data = await response.json();
        setBusinesses(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [setBusinesses]); // Ensures that businesses are fetched when this component loads
  
    // Handle business deletion
    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this business?")) {
        try {
            const response = await fetch(`http://localhost:8080/api/businesses/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete business");
          }

          setBusinesses((prev) => prev.filter((business) => business.businessId !== id));
          alert("Business deleted!");
        } catch (err) {
          setError(err.message || "Something went wrong while deleting.");
        }
      }
    };
  
    // Handle client edits
    const handleEdit = async (id) => {
        if (window.confirm("Are you sure you want to edit this business?")) {
          try {
             const selected = businesses.find(c => c.businessId === id);
              if (selected) {
                  console.log("Editing business with id:", id);
                  setSelectedBusiness(selected);
                  setPage("business-editor");
              }
          } catch (err) {
              setError(err.message || "Something went wrong while editing.");
          }
      }
    }
    
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Business List</h2>
            
            {loading && <p>Loading businesses...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !businesses.length && <p>No businesses found.</p>}

            <table className="w-full border-collapse">
                <thead>
                <tr>
                    <th className="border px-2 py-1">ID</th>
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Email</th>
                    <th className="border px-2 py-1">Phone</th>
                    <th className="border px-2 py-1">GST</th>
                    <th className="border px-2 py-1">Bank Account</th>
                    <th className="border px-2 py-1">Website</th>
                    <th className="border px-2 py-1">Actions</th>
                </tr>
                </thead>
                <tbody>
                {businesses.map((business) => (
                    <tr key={business.businessId}>
                        <td classNsame="border px-2 py-1">{business.businessId}</td>
                        <td className="border px-2 py-1">{business.businessName}</td>
                        <td className="border px-2 py-1">{business.email}</td>
                        <td className="border px-2 py-1">{business.phone}</td>
                        <td className="border px-2 py-1">{business.gstNumber}</td>
                        <td className="border px-2 py-1">{business.bankAccountNumber}</td>
                        <td className="border px-2 py-1">{business.websiteLink}</td>
                        <td>
                            <button onClick={() => handleEdit(business.businessId)}>Edit</button>
                            <button onClick={() => handleDelete(business.businessId)}>Delete</button>
                        </td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
