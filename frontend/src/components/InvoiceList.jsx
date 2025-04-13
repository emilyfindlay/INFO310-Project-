import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Fetch list of invoices
    axios.get('/api/invoices')
        .then(response => {
          setInvoices(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching invoices:', error);
        });
  }, []);

  return (
      <div>
        <h1>Invoice List</h1>
        <table>
          <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Client</th>
            <th>Issued Date</th>
            <th>Due Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {invoices.map(invoice => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.clientName}</td>
                <td>{invoice.issuedDate}</td>
                <td>{invoice.dueDate}</td>
                <td>{(invoice.invoiceTotal).toFixed(2)}</td>
                <td>{invoice.status}</td>
                <td>
                  <Link to={`/invoice/${invoice.id}`}>View</Link>
                  {/* You can add more actions here, such as Edit or Delete */}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default InvoiceList;
