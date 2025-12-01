CREATE DATABASE IF NOT EXISTS dineease;
USE dineease;

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255),
  role ENUM('customer','admin') DEFAULT 'customer'
);

CREATE TABLE IF NOT EXISTS categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS menu_items (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(8,2) NOT NULL,
  category_id INT,
  image VARCHAR(255),
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total_amount DECIMAL(10,2),
  status ENUM('pending','preparing','ready','delivered') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  item_id INT,
  quantity INT DEFAULT 1,
  price DECIMAL(8,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES menu_items(item_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  amount DECIMAL(10,2) NOT NULL,
  method ENUM('card','paypal','cash'),
  status ENUM('success','failed'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

INSERT INTO users (name, email, role) VALUES
('John Doe', 'john@example.com', 'customer'),
('Admin User', 'admin@dineease.com', 'admin');

INSERT INTO categories (name) VALUES
('Pizza'),('Burger'),('Pasta');

INSERT INTO menu_items (name, description, price, category_id) VALUES
('Margherita Pizza','Classic tomato, mozzarella, basil',8.99,1),
('Pepperoni Pizza','Pepperoni, tomato, mozzarella',9.99,1),
('Chicken Burger','Grilled chicken patty with lettuce and mayo',6.49,2),
('Pasta Alfredo','Creamy Alfredo sauce with fettuccine',7.99,3);

INSERT INTO orders (user_id, total_amount, status) VALUES
(1, 16.48, 'preparing');

INSERT INTO order_items (order_id, item_id, quantity, price) VALUES
(1, 3, 1, 6.49),
(1, 4, 1, 7.99);
