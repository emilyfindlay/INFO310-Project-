import React from 'react';

export default function QuoteList({ quotes }) {
    const handleDownload = async (quoteId) => {
        try {
            const response = await fetch(`/api/quotes/${quoteId}/pdf`);
            if (!response.ok) {
                throw new Error('Failed to fetch PDF');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `quote-${quoteId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url); // Clean up the object URL
        } catch (err) {
            console.error('Error downloading PDF:', err);
            alert('Failed to download PDF');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Quote List</h2>
            <table className="w-full border-collapse">
                <thead>
                <tr>
                    <th className="border px-2 py-1">Quote ID</th>
                    <th className="border px-2 py-1">Client Name</th>
                    <th className="border px-2 py-1">Business Name</th>
                    <th className="border px-2 py-1">Issued Date</th>
                    <th className="border px-2 py-1">Due Date</th>
                    <th className="border px-2 py-1">Total Amount</th>
                    <th className="border px-2 py-1">Status</th>
                    <th className="border px-2 py-1">Download PDF</th>
                </tr>
                </thead>
                <tbody>
                {quotes.map((quote) => (
                    <tr key={quote.quoteId}>
                        <td className="border px-2 py-1">{quote.quoteId}</td>
                        <td className="border px-2 py-1">{quote.client.name}</td>
                        <td className="border px-2 py-1">{quote.business.businessName}</td>
                        <td className="border px-2 py-1">{quote.issuedDate}</td>
                        <td className="border px-2 py-1">{quote.dueDate}</td>
                        <td className="border px-2 py-1">{quote.quoteTotal}</td>
                        <td className="border px-2 py-1">{quote.status}</td>
                        <td className="border px-2 py-1">
                            <button
                                onClick={() => handleDownload(quote.quoteId)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Download
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
