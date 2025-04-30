import React, { useState } from 'react';

export default function QuoteList({ quotes }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState('quoteId');
    const [sortDirection, setSortDirection] = useState('asc');
    const quotesPerPage = 10;

    const totalPages = Math.ceil(quotes.length / quotesPerPage);

    const sortedQuotes = [...quotes].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const startIndex = (currentPage - 1) * quotesPerPage;
    const currentQuotes = sortedQuotes.slice(startIndex, startIndex + quotesPerPage);

    const handleDownload = async (quoteId) => {
        try {
            const response = await fetch(`/api/quotes/${quoteId}/pdf`);
            if (!response.ok) throw new Error('Failed to fetch PDF');
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `quote-${quoteId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading PDF:', err);
            alert('Failed to download PDF');
        }
    };

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Quote List</h2>

            {/* Sort controls */}
            <div className="flex items-center gap-4 mb-4">
                <label>
                    Sort by:{' '}
                    <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="border p-1">
                        <option value="quoteId">Quote ID</option>
                        <option value="issuedDate">Issued Date</option>
                        <option value="dueDate">Due Date</option>
                        <option value="quoteTotal">Total Amount</option>
                        <option value="status">Status</option>
                    </select>
                </label>
                <label>
                    Order:{' '}
                    <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)} className="border p-1">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>

            {/* Table */}
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
                {currentQuotes.map((quote) => (
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

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        className={`px-3 py-1 border rounded ${
                            currentPage === index + 1 ? 'bg-blue-500 text-white' : ''
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
