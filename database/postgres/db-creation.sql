CREATE TABLE IF NOT EXISTS companies(
	id SERIAL PRIMARY KEY,
    cnpj VARCHAR(100) NOT NULL,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    phone VARCHAR(45) NOT NULL,
    address VARCHAR(45) NOT NULL,
    city VARCHAR(45) NOT NULL,
    state VARCHAR(45) NOT NULL,
    zipcode VARCHAR(9) NOT NULL,
    created_at timestamp,
    updated_at timestamp 
);

CREATE TABLE IF NOT EXISTS users(
	id VARCHAR(200) PRIMARY KEY,
	email VARCHAR(45) UNIQUE,
    password VARCHAR(200) NOT NULL,
	name VARCHAR(45) NOT NULL,
    cpf VARCHAR(14),
    date_of_birth VARCHAR(10),
    phone VARCHAR(20),
    image VARCHAR(200),
    created_at timestamp,
    updated_at timestamp 
);

CREATE TABLE IF NOT EXISTS cards(
	id VARCHAR(200) PRIMARY KEY,
	number VARCHAR(19) NOT NULL,
	name VARCHAR(80) NOT NULL,
    date VARCHAR(7) NOT NULL,
    cod VARCHAR(3) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    user_id VARCHAR(200) NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT fk_user_card FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS addresses(
	id SERIAL PRIMARY KEY,
    zipcode VARCHAR(9) NOT NULL,
    city VARCHAR(45) NOT NULL,
    state VARCHAR(45) NOT NULL,
    street VARCHAR(45) NOT NULL,
    neighborhood VARCHAR(45) NOT NULL,
    number VARCHAR(10) NOT NULL,
    complement VARCHAR(45),
    name VARCHAR(45) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    user_id VARCHAR(200) NOT NULL,
    is_main BOOLEAN NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT fk_user_address FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS categories(
	id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    image VARCHAR(200),
    created_at timestamp,
    updated_at timestamp
);

CREATE TABLE IF NOT EXISTS subcategories(
	id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    image VARCHAR(200),
    category_id INT NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT fk_sub_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS brands(
	id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    image VARCHAR(200),
    created_at timestamp,
    updated_at timestamp
);

CREATE TABLE IF NOT EXISTS products(
	id SERIAL PRIMARY KEY,
	cod VARCHAR(45) NOT NULL,
	title VARCHAR(200) NOT NULL,
    price float NOT NULL,
    quantity INT NOT NULL,
    category_id INT NOT NULL,
    brand_id INT NOT NULL,
    company_id INT NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT fk_company_products FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES subcategories(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_product_brand FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE images(
	id VARCHAR(200) PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
    product_id INT NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT fk_product_image FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS carts(
	id SERIAL PRIMARY KEY,
    user_id VARCHAR(200) NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    freight FLOAT,
    praze INT,
    discount FLOAT,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT fk_user_cart FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_product_cart FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE table IF NOT EXISTS favorites(
	id SERIAL PRIMARY KEY,
    user_id VARCHAR(200) NOT NULL,
    product_id INT NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT fk_user_favorites FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_product_favorites FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE orders(
	id SERIAL PRIMARY KEY,
    buy_info JSON NOT NULL,
    user_id VARCHAR(200) NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT fk_user_order FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE status(
	id SERIAL PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
    created_at timestamp,
    updated_at timestamp
);

CREATE TABLE order_products(
	id SERIAL PRIMARY KEY,
    buy_date timestamp,
    send_date timestamp,
    delivery_date timestamp,
    buy_quantity INT NOT NULL,
    buy_freight FLOAT,
    buy_term INT,
    discount FLOAT,
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    status_id INT NOT NULL,
    created_at timestamp,
    updated_at timestamp,
	CONSTRAINT fk_product_order FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_order_status FOREIGN KEY (status_id) REFERENCES status(id) ON DELETE CASCADE ON UPDATE CASCADE
);