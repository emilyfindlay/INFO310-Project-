import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceViewer = ({ invoiceId }) => {
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        axios.get(`/api/invoices/${invoiceId}`).then(response => {
            setInvoice(response.data);
        });
    }, [invoiceId]);

    const handleDelete = () => {
        axios.delete(`/api/invoices/${invoiceId}`).then(() => {
            alert('Invoice deleted successfully');
        });
    };

    if (!invoice) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Invoice Details</h1>
            <div>
                <strong>Client: </strong>{invoice.clientId}
            </div>
            <div>
                <strong>Business: </strong>{invoice.businessId}
            </div>
            <div>
                <strong>Issued Date: </strong>{invoice.issuedDate}
            </div>
            <div>
                <strong>Due Date: </strong>{invoice.dueDate}
            </div>
            <div>
                <strong>Status: </strong>{invoice.status}
            </div>

            <h3>Invoice Items</h3>
            <table>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Discount</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                {invoice.invoiceItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.productId}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unitPrice}</td>
                        <td>{item.discount}</td>
                        <td>{(item.unitPrice * item.quantity - item.discount).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div>
                <h4>Total GST: {invoice.totalGst.toFixed(2)}</h4>
                <h4>Invoice Total: {invoice.invoiceTotal.toFixed(2)}</h4>
            </div>

            <button onClick={handleDelete}>Delete Invoice</button>
            <button>Edit Invoice</button>
        </div>
    );
};

export default InvoiceViewer;
