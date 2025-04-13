export default function BusinessList({ businesses }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Business List</h2>
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
                </tr>
                </thead>
                <tbody>
                {businesses.map((b) => (
                    <tr key={b.businessId}>
                        <td className="border px-2 py-1">{b.businessId}</td>
                        <td className="border px-2 py-1">{b.businessName}</td>
                        <td className="border px-2 py-1">{b.email}</td>
                        <td className="border px-2 py-1">{b.phone}</td>
                        <td className="border px-2 py-1">{b.gstNumber}</td>
                        <td className="border px-2 py-1">{b.bankAccountNumber}</td>
                        <td className="border px-2 py-1">{b.websiteLink}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
