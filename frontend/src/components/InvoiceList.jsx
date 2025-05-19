import React, { useState } from 'react';

export default function InvoiceList({ invoices, setSelectedInvoiceId, setPage }) {
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

    const handleView = async (invoiceId) => {
        try {
            const response = await fetch(`/api/invoices/${invoiceId}/pdf`);
            if (!response.ok) throw new Error('Failed to fetch PDF');
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const popup = window.open('', '_blank', 'width=800,height=600');
            if (!popup) {
                alert('Popup blocked! Please allow popups for this site.');
                return;
            }

            popup.document.write(`
      <html>
        <head><title>Invoice PDF - ${invoiceId}</title></head>
        <body style="margin:0">
          <embed width="100%" height="100%" src="${url}" type="application/pdf" />
        </body>
      </html>
    `);
            popup.document.close();

            popup.onunload = () => URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error viewing PDF:', error);
            alert('Failed to load PDF');
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
        <div className="dashboard-card" style={{ maxWidth: 1200, margin: '0 auto', boxShadow: '0 8px 32px rgba(0,123,190,0.10)' }}>
            <h2 style={{ fontSize: '2rem', color: '#0079be', marginBottom: 8 }}>Invoice List</h2>
            <p style={{ fontSize: '1.1rem', color: '#4a4a4a', marginBottom: 24 }}>
                Manage and view all your invoices in one place.
            </p>

            {/* Summary Bar */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 180, background: '#e6f2f8', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 32, color: '#0079be', fontWeight: 700 }}>{invoices.length}</div>
                    <div style={{ color: '#0079be', fontWeight: 500 }}>Total Invoices</div>
                </div>
                <div style={{ flex: 1, minWidth: 180, background: '#e6f2f8', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 32, color: '#0079be', fontWeight: 700 }}>{invoices.filter(inv => inv.status === 'Paid').length}</div>
                    <div style={{ color: '#0079be', fontWeight: 500 }}>Paid Invoices</div>
                </div>
                <div style={{ flex: 1, minWidth: 180, background: '#e6f2f8', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 32, color: '#0079be', fontWeight: 700 }}>{invoices.filter(inv => inv.status === 'Pending').length}</div>
                    <div style={{ color: '#0079be', fontWeight: 500 }}>Pending Invoices</div>
                </div>
            </div>

            {/* Sorting controls */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    Sort by:{' '}
                    <select 
                        value={sortField} 
                        onChange={(e) => setSortField(e.target.value)} 
                        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                    >
                        <option value="invoiceId">Invoice ID</option>
                        <option value="issuedDate">Issued Date</option>
                        <option value="dueDate">Due Date</option>
                        <option value="invoiceTotal">Total Amount</option>
                        <option value="status">Status</option>
                    </select>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    Order:{' '}
                    <select 
                        value={sortDirection} 
                        onChange={(e) => setSortDirection(e.target.value)} 
                        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
                <thead>
                    <tr>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Invoice ID</th>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Client Name</th>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Business Name</th>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Issued Date</th>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Due Date</th>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Total Amount</th>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Status</th>
                        <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0', color: '#0079be' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentInvoices.map((invoice) => (
                        <tr key={invoice.invoiceId} style={{ borderBottom: '1px solid #e0e0e0' }}>
                            <td style={{ padding: 12 }}>{invoice.invoiceId}</td>
                            <td style={{ padding: 12 }}>{invoice.client.name}</td>
                            <td style={{ padding: 12 }}>{invoice.business.businessName}</td>
                            <td style={{ padding: 12 }}>{invoice.issuedDate}</td>
                            <td style={{ padding: 12 }}>{invoice.dueDate}</td>
                            <td style={{ padding: 12 }}>{invoice.invoiceTotal}</td>
                            <td style={{ padding: 12 }}>{invoice.status}</td>
                            <td style={{ padding: 12 }}>
                                <button
                                    onClick={() => handleDownload(invoice.invoiceId)}
                                    style={{ 
                                        background: 'linear-gradient(90deg, #00b4d8 0%, #0077c8 100%)', 
                                        color: 'white', 
                                        padding: '8px 16px', 
                                        borderRadius: 4, 
                                        border: 'none', 
                                        cursor: 'pointer',
                                        marginRight: 8
                                    }}
                                >
                                    Download
                                </button>
                                <button
                                    onClick={() => handleView(invoice.invoiceId)}
                                    style={{
                                        background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: 4,
                                        border: 'none',
                                        cursor: 'pointer',
                                        marginRight: '8px'
                                    }}
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedInvoiceId(invoice.invoiceId);
                                        setPage("invoice-editor");
                                    }}
                                    style={{ 
                                        background: 'linear-gradient(90deg, #00b4d8 0%, #0077c8 100%)', 
                                        color: 'white', 
                                        padding: '8px 16px', 
                                        borderRadius: 4, 
                                        border: 'none', 
                                        cursor: 'pointer',
                                        marginRight: 8
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(invoice.invoiceId)}
                                    style={{ 
                                        background: 'linear-gradient(90deg, #ff6b6b 0%, #ff4757 100%)', 
                                        color: 'white', 
                                        padding: '8px 16px', 
                                        borderRadius: 4, 
                                        border: 'none', 
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ 
                        padding: '8px 16px', 
                        borderRadius: 4, 
                        border: '1px solid #ccc', 
                        background: currentPage === 1 ? '#f0f0f0' : 'white',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        style={{ 
                            padding: '8px 16px', 
                            borderRadius: 4, 
                            border: '1px solid #ccc', 
                            background: currentPage === index + 1 ? '#0079be' : 'white',
                            color: currentPage === index + 1 ? 'white' : 'black',
                            cursor: 'pointer'
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ 
                        padding: '8px 16px', 
                        borderRadius: 4, 
                        border: '1px solid #ccc', 
                        background: currentPage === totalPages ? '#f0f0f0' : 'white',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
