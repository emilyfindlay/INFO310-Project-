INSERT INTO address (street_address1, street_address2, city, region, post_code, country) VALUES ('123 Main St', NULL, 'Wellington', 'Wellington', '6011', 'New Zealand');
INSERT INTO address (street_address1, street_address2, city, region, post_code, country) VALUES ('456 Queen St', 'Suite 5', 'Auckland', 'Auckland', '1010', 'New Zealand');
INSERT INTO address (street_address1, street_address2, city, region, post_code, country) VALUES ('789 Beach Rd', NULL, 'Christchurch', 'Canterbury', '8023', 'New Zealand');

INSERT INTO business (address_id, business_name, bank_account_number, gst_number, email, phone, website_link) VALUES (1, 'CodeCraft Ltd', '12-3456-7890123-00', 'GST123456789', 'contact@codecraft.co.nz', '0211234567', 'https://codecraft.co.nz');
INSERT INTO business (address_id, business_name, bank_account_number, gst_number, email, phone, website_link) VALUES (2, 'Designify Studio', '01-2345-6789012-00', 'GST987654321', 'hello@designify.nz', '0227654321', 'https://designify.nz');

INSERT INTO client (address_id, name, email, phone) VALUES (3, 'Acme Corp', 'info@acmecorp.nz', '0209988776');
INSERT INTO client (address_id, name, email, phone) VALUES (1, 'Freelancer Jane', 'jane.doe@email.com', '0201122334');
INSERT INTO client (address_id, name, email, phone) VALUES (2, 'Sen Macmaster', 'sen@email.nz', NULL);

INSERT INTO product (product_type, user_defined_product_name, product_description, product_price, product_name) VALUES (TRUE, 'Web Package A', 'Basic 5-page responsive website', 1500.00, 'Web Package A');\n
INSERT INTO product (product_type, user_defined_product_name, product_description, product_price, product_name) VALUES (TRUE, 'Maintenance Plan', 'Monthly site maintenance', 200.00, 'Maintenance Plan');\n
INSERT INTO product (product_type, user_defined_product_name, product_description, product_price, product_name) VALUES (FALSE, NULL, 'Logo redesign work', 300.00, 'Logo Redesign Work');

INSERT INTO invoice (business_id, client_id, creation_date, issued_date, due_date, status, total_gst, invoice_total) VALUES (1, 1000, '2025-04-01', '2025-04-01', '2025-04-15', 'Issued', 270.00, 2070.00);
INSERT INTO invoice (business_id, client_id, creation_date, issued_date, due_date, status, total_gst, invoice_total) VALUES (2, 1001, '2025-04-02', NULL, '2025-04-16', 'Draft', 45.00, 345.00);

INSERT INTO invoice_item (invoice_id, product_id, product_description, quantity, discount, unit_price, subtotal) VALUES (1, 1, 'Basic 5-page responsive website', 1, 0.00, 1500.00, 1500.00);
INSERT INTO invoice_item (invoice_id, product_id, product_description, quantity, discount, unit_price, subtotal) VALUES (1, 2, 'Monthly site maintenance', 1, 0.00, 200.00, 200.00);
INSERT INTO invoice_item (invoice_id, product_id, product_description, quantity, discount, unit_price, subtotal) VALUES (1, 3, 'Logo redesign work', 1, 0.00, 300.00, 300.00);
INSERT INTO invoice_item (invoice_id, product_id, product_description, quantity, discount, unit_price, subtotal) VALUES (2, 2, 'Monthly site maintenance', 1, 5.00, 200.00, 190.00);
INSERT INTO invoice_item (invoice_id, product_id, product_description, quantity, discount, unit_price, subtotal) VALUES (2, 3, 'Logo redesign work', 1, 0.00, 300.00, 300.00);
