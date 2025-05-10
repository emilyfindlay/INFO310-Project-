import React, { useState } from 'react';

export default function InvoiceList({ invoices }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState('invoiceId');
    const [sortDirection, setSortDirection] = useState('asc');
    const invoicesPerPage = 10;

    const totalPages = Math.ceil(invoices.length / invoicesPerPage);

    // Sort logic
    const sortedInvoices = [...invoices].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const startIndex = (currentPage - 1) * invoicesPerPage;
    const currentInvoices = sortedInvoices.slice(startIndex, startIndex + invoicesPerPage);

    const handleDownload = async (invoiceId) => {
        try {
            const response = await fetch(`/api/invoices/${invoiceId}/pdf`);
            if (!response.ok) {
                throw new Error('Failed to fetch PDF');
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `invoice-${invoiceId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading PDF:', err);
            alert('Failed to download PDF');
        }
    };

    const handleDelete = async (invoiceId) => {
        if (!window.confirm('Are you sure you want to delete this invoice?')) return;

        try {
            const response = await fetch(`/api/invoices/${invoiceId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete invoice');
            }
            alert('Invoice deleted successfully');
            window.location.reload();
        } catch (err) {
            console.error('Error deleting invoice:', err);
            alert('Failed to delete invoice');
        }
    };


    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Invoice List</h2>

            {/* Sorting controls */}
            <div className="flex items-center gap-4 mb-4">
                <label>
                    Sort by:{' '}
                    <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="border p-1">
                        <option value="invoiceId">Invoice ID</option>
                        <option value="issuedDate">Issued Date</option>
                        <option value="dueDate">Due Date</option>
                        <option value="invoiceTotal">Total Amount</option>
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
                    <th className="border px-2 py-1">Invoice ID</th>
                    <th className="border px-2 py-1">Client Name</th>
                    <th className="border px-2 py-1">Business Name</th>
                    <th className="border px-2 py-1">Issued Date</th>
                    <th className="border px-2 py-1">Due Date</th>
                    <th className="border px-2 py-1">Total Amount</th>
                    <th className="border px-2 py-1">Status</th>
                    <th className="border px-2 py-1">Download PDF</th>
                    <th className="border px-2 py-1">Delete</th>

                </tr>
                </thead>
                <tbody>
                {currentInvoices.map((invoice) => (
                    <tr key={invoice.invoiceId}>
                        <td className="border px-2 py-1">{invoice.invoiceId}</td>
                        <td className="border px-2 py-1">{invoice.client.name}</td>
                        <td className="border px-2 py-1">{invoice.business.businessName}</td>
                        <td className="border px-2 py-1">{invoice.issuedDate}</td>
                        <td className="border px-2 py-1">{invoice.dueDate}</td>
                        <td className="border px-2 py-1">{invoice.invoiceTotal}</td>
                        <td className="border px-2 py-1">{invoice.status}</td>
                        <td className="border px-2 py-1">
                            <button
                                onClick={() => handleDownload(invoice.invoiceId)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Download
                            </button>
                        </td>
                        <td className="border px-2 py-1">
                            <button
                                onClick={() => handleDelete(invoice.invoiceId)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
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
