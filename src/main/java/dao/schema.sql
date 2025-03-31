DROP TABLE IF EXISTS product_discount;
DROP TABLE IF EXISTS invoice_item;
DROP TABLE IF EXISTS invoice;
DROP TABLE IF EXISTS discount;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS product_type;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS business;
DROP TABLE IF EXISTS address;

CREATE TABLE address (
    address_id SERIAL,
    street_address1 VARCHAR(50) NOT NULL,
    street_address2 VARCHAR(50),
    city VARCHAR(50) NOT NULL,
    region VARCHAR(50),
    post_code VARCHAR(10) NOT NULL,
    country VARCHAR(50) NOT NULL,
    CONSTRAINT address_pk PRIMARY KEY (address_id)
);

CREATE TABLE business (
    business_id SERIAL,
    address_id INT NOT NULL,
    business_name VARCHAR(50) NOT NULL,
    bank_account_name VARCHAR(50) NOT NULL,
    business_description TEXT,
    gst_number VARCHAR(15),
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    website_link VARCHAR(255),
    logo BYTEA,
    CONSTRAINT business_pk PRIMARY KEY (business_id),
    CONSTRAINT business_fk_address FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE client (
    client_id SERIAL,
    address_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(10),
    CONSTRAINT client_pk PRIMARY KEY (client_id),
    CONSTRAINT client_fk_address FOREIGN KEY (address_id) REFERENCES address(address_id),
    CONSTRAINT client_uq_email UNIQUE (email)
);

CREATE TABLE product_type (
    product_type_id SERIAL,
    product_type_name VARCHAR(50) NOT NULL,
    CONSTRAINT product_type_pk PRIMARY KEY (product_type_id)
);

CREATE TABLE discount (
    discount_code SERIAL,
    discount_percentage DECIMAL(5, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN NOT NULL,
    CONSTRAINT discount_pk PRIMARY KEY (discount_code)
);

CREATE TABLE product (
    product_code SERIAL,
    product_type_id INT NOT NULL,
    discount_code INT,
    product_name VARCHAR(50) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    product_description TEXT,
    product_stocked INT NOT NULL,
    product_available BOOLEAN NOT NULL,
    CONSTRAINT product_pk PRIMARY KEY (product_code),
    CONSTRAINT product_fk_product_type FOREIGN KEY (product_type_id) REFERENCES product_type(product_type_id),
    CONSTRAINT product_fk_discount FOREIGN KEY (discount_code) REFERENCES discount(discount_code)
);

CREATE TABLE invoice (
    invoice_id SERIAL,
    client_id INT NOT NULL,
    business_id INT NOT NULL,
    product_code INT,
    issued_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    total_gst DECIMAL(10, 2) NOT NULL,
    invoice_total DECIMAL(10, 2) NOT NULL,
    CONSTRAINT invoice_pk PRIMARY KEY (invoice_id),
    CONSTRAINT invoice_fk_client FOREIGN KEY (client_id) REFERENCES client(client_id),
    CONSTRAINT invoice_fk_business FOREIGN KEY (business_id) REFERENCES business(business_id),
    CONSTRAINT invoice_fk_product FOREIGN KEY (product_code) REFERENCES product(product_code)
);

CREATE TABLE invoice_item (
    invoice_id INT NOT NULL,
    product_code INT NOT NULL,
    quantity INT NOT NULL,
    discount DECIMAL(5, 2),
    discount_total DECIMAL(10, 2),
    subtotal DECIMAL(10, 2) NOT NULL,
    CONSTRAINT invoice_item_pk PRIMARY KEY (invoice_id, product_code),
    CONSTRAINT invoice_item_fk_invoice FOREIGN KEY (invoice_id) REFERENCES invoice(invoice_id),
    CONSTRAINT invoice_item_fk_product FOREIGN KEY (product_code) REFERENCES product(product_code)
);

CREATE TABLE product_discount (
    product_code INT NOT NULL,
    discount_code INT NOT NULL,
    total_discount_percentage DECIMAL(5, 2) NOT NULL,
    CONSTRAINT product_discount_pk PRIMARY KEY (product_code, discount_code),
    CONSTRAINT product_discount_fk_product FOREIGN KEY (product_code) REFERENCES product(product_code),
    CONSTRAINT product_discount_fk_discount FOREIGN KEY (discount_code) REFERENCES discount(discount_code)
);