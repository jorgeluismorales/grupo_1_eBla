DROP DATABASE IF EXISTS ebla_db;
CREATE DATABASE ebla_db;
USE ebla_db;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
firstname VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
image VARCHAR(255) NOT NULL,
role ENUM ('user', 'admin') NOT NULL DEFAULT 'user',
detail VARCHAR(255) NOT NULL);

DROP TABLE IF EXISTS products;
CREATE TABLE products (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
name VARCHAR(255) NOT NULL,
description LONGTEXT NOT NULL,
image VARCHAR(255) NOT NULL,
categoryId INT NOT NULL,
price INT NOT NULL,
discount INT NOT NULL,
detail VARCHAR(255) NOT NULL);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
categoryName VARCHAR(255) NOT NULL);

DROP TABLE IF EXISTS products_users;
CREATE TABLE products_users (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
productId INT NOT NULL,
userId INT NOT NULL);

ALTER TABLE products ADD CONSTRAINT products_categoryId_categories_id FOREIGN KEY (categoryId) REFERENCES categories(id);
ALTER TABLE products_users ADD CONSTRAINT products_users_productId_products_id FOREIGN KEY (productId) REFERENCES products(id);
ALTER TABLE products_users ADD CONSTRAINT products_users_userId_users_id FOREIGN KEY (userId) REFERENCES users(id);
