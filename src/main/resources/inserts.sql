-- Insert data into address table
INSERT INTO address (street_address1, street_address2, city, region, post_code, country) VALUES ('123 Main St', NULL, 'Dunedin', 'Otago', '9016', 'New Zealand');
INSERT INTO address (street_address1, street_address2, city, region, post_code, country) VALUES ('456 Queen St', 'Apt 9B', 'Auckland', 'Auckland', '1010', 'New Zealand');
INSERT INTO address (street_address1, street_address2, city, region, post_code, country) VALUES ('789 George St', NULL, 'Wellington', 'Wellington', '6011', 'New Zealand');

-- Insert data into business table
INSERT INTO business (address_id, business_name, bank_account_name, business_description, gst_number, email, phone, website_link, logo) VALUES (1, 'Otago Tech Ltd', 'Otago Tech Ltd', 'IT Services and Solutions', '123456789', 'contact@otagotech.co.nz', '034567890', 'https://otagotech.co.nz', NULL);
INSERT INTO business (address_id, business_name, bank_account_name, business_description, gst_number, email, phone, website_link, logo) VALUES (2, 'Kiwi Retailers', 'Kiwi Retailers', 'Retail company for electronics', '987654321', 'sales@kiwiretail.co.nz', '098765432', 'https://kiwiretail.co.nz', NULL);
INSERT INTO business (address_id, business_name, bank_account_name, business_description, gst_number, email, phone, website_link, logo) VALUES (3, 'Green Foods', 'Green Foods Ltd', 'Organic food distributor', '456789123', 'info@greenfoods.co.nz', '022334455', 'https://greenfoods.co.nz', NULL);

-- Insert data into client table
INSERT INTO client (address_id, name, email, phone) VALUES (1, 'Alice Smith', 'alice@example.com', '0211234567');
INSERT INTO client (address_id, name, email, phone) VALUES (2, 'Bob Johnson', 'bob@example.com', '0229876543');
INSERT INTO client (address_id, name, email, phone) VALUES (3, 'Charlie Brown', 'charlie@example.com', '0204567890');

-- Insert data into product table
INSERT INTO product (product_type, product_name, product_price) VALUES (TRUE, 'Web Hosting Package', 120.00);
INSERT INTO product (product_type, product_name, product_price) VALUES (FALSE, 'Laptop', 999.99);
INSERT INTO product (product_type, product_name, product_price) VALUES (TRUE, 'Consulting Service', 75.50);

-- Insert data into invoice table
INSERT INTO invoice (client_id, business_id, product_id, issued_date, due_date, status, total_gst, invoice_total) VALUES (1, 1, 1, '2025-04-01', '2025-04-15', 'Pending', 18.00, 138.00);
INSERT INTO invoice (client_id, business_id, product_id, issued_date, due_date, status, total_gst, invoice_total) VALUES (2, 2, 2, '2025-04-02', '2025-04-16', 'Paid', 130.43, 1130.42);
INSERT INTO invoice (client_id, business_id, product_id, issued_date, due_date, status, total_gst, invoice_total) VALUES (3, 3, 3, '2025-04-03', '2025-04-17', 'Overdue', 11.33, 86.83);

-- Insert data into invoice_item table
INSERT INTO invoice_item (invoice_id, product_id, quantity, discount, subtotal) VALUES (1, 1, 1, 0.00, 120.00);
INSERT INTO invoice_item (invoice_id, product_id, quantity, discount, subtotal) VALUES (2, 2, 1, 0.00, 999.99);
INSERT INTO invoice_item (invoice_id, product_id, quantity, discount, subtotal) VALUES (3, 3, 1, 0.00, 75.50);
