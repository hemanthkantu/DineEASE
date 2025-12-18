# DineEase – Restaurant Online Ordering System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Import files from Github:
INSTALL GIT (if not installed)

Check first:

git --version


If not installed  download & install:
 https://git-scm.com/downloads

(Choose Windows, keep default options)

 STEP 2: OPEN CMD / POWERSHELL / VS CODE TERMINAL

Go to the folder where you want the project:

cd Desktop

(or any path you want)

 STEP 3: CLONE GITHUB REPOSITORY (FULL FOLDER)
🔹 Command: git clone https://github.com/USERNAME/REPOSITORY_NAME.git


Introduction:

DineEase is a digital restaurant management and online ordering system. It allows customers to browse menus, place orders, and track their orders in real time. Restaurant admins can manage menu items, update order statuses, and view sales performance. This project demonstrates the **READ functionality** and database integration using Node.js, Express, MySQL, and Pug templates.


Brief instructions to run app with Node.js and to initialize a local MySQL database using XAMPP

Prerequisites
Node.js (v14+ recommended)
npm (comes with Node.js)
XAMPP (includes Apache + MySQL / MariaDB)
The SQL dump file (sql_dump.sql) included in this repository
Setup (project)
Open a terminal in the project root (where index.js lives):
cd node_template
Install dependencies:
npm install
Configure database connection
COnfigure environmental variables in .env file. If not then rename env_sample.txt to .env. Backup contents if needed

DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
Adjust keys to match your project's configuration names.

Initialize XAMPP and MySQL
Start XAMPP Control Panel.
Start Apache and MySQL services.
Open phpMyAdmin: http://localhost/phpmyadmin
Paste SQL dump into sql tab of phpMyAdmin
Run the application
Start the Node.js process:

node index.js
For PowerShell
Allows to run Scripts

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force

## Project Overview


---

## Features

- Browse menu items with detailed descriptions and categories  
- View individual item details  
- Dynamic content pulled from MySQL database into Pug templates  
- Admin functionality (manage menu items, view orders)  
- Task board tracking (Trello)  
- GitHub version control for team collaboration  

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Pug templates, HTML/CSS |
| Backend | Node.js, Express.js |
| Database | MySQL (phpMyAdmin for management) |
| Version Control | GitHub |
| Dev Tools | VS Code, Nodemon |

---

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/<your-username>/DineEASE.git
cd DineEASE




2️⃣ Install Dependencies
npm install

3️⃣ Install Nodemon (recommended)
npm install -g nodemon

🗄️ Database Setup (MySQL + phpMyAdmin)
Step 1 — Start MySQL

Use XAMPP → Start Apache + MySQL.

Step 2 — Open phpMyAdmin

Visit:

http://localhost/phpmyadmin

Step 3 — Create the Database
-- ==============================
-- CREATE DATABASE
-- ==============================
CREATE DATABASE IF NOT EXISTS dineease;
USE dineease;

-- ==============================
-- USERS TABLE
-- ==============================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    password VARCHAR(255),
    role ENUM('customer','admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- CATEGORIES TABLE
-- ==============================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- ==============================
-- MENU ITEMS TABLE
-- ==============================
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE SET NULL
);

-- ==============================
-- ORDERS TABLE
-- ==============================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2),
    status ENUM('pending','paid','preparing','completed','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- ORDER ITEMS TABLE
-- ==============================
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    menu_item_id INT,
    quantity INT DEFAULT 1,
    price DECIMAL(10,2)
);

-- ==============================
-- PAYMENTS TABLE
-- ==============================
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    payment_method ENUM('card','cash','upi'),
    payment_status ENUM('pending','completed','failed') DEFAULT 'pending',
    paid_at TIMESTAMP NULL
);

-- ==============================
-- INSERT CATEGORIES
-- ==============================
INSERT INTO categories (id, name) VALUES
(1, 'Starters'),
(2, 'Main Course'),
(3, 'Desserts'),
(4, 'Beverages');

-- ==============================
-- INSERT MENU ITEMS (1–24)
-- ==============================
INSERT INTO menu_items (id, name, description, price, image, category_id) VALUES
(1, 'Veg Spring Rolls', 'Crispy vegetable rolls', 120.00, 'spring_rolls.jpg', 1),
(2, 'Paneer Tikka', 'Grilled paneer cubes', 180.00, 'paneer_tikka.jpg', 1),
(3, 'Chicken 65', 'Spicy fried chicken', 200.00, 'chicken_65.jpg', 1),
(4, 'French Fries', 'Golden fried potatoes', 100.00, 'fries.jpg', 1),
(5, 'Veg Biryani', 'Aromatic rice with vegetables', 220.00, 'veg_biryani.jpg', 2),
(6, 'Chicken Biryani', 'Hyderabadi chicken biryani', 280.00, 'chicken_biryani.jpg', 2),
(7, 'Paneer Butter Masala', 'Creamy paneer curry', 250.00, 'paneer_butter.jpg', 2),
(8, 'Butter Chicken', 'Rich tomato chicken curry', 300.00, 'butter_chicken.jpg', 2),
(9, 'Dal Tadka', 'Yellow lentils tempered', 180.00, 'dal_tadka.jpg', 2),
(10, 'Veg Fried Rice', 'Rice with mixed vegetables', 170.00, 'veg_fried_rice.jpg', 2),
(11, 'Chicken Fried Rice', 'Rice with chicken & spices', 210.00, 'chicken_fried_rice.jpg', 2),
(12, 'Veg Noodles', 'Stir fried noodles', 160.00, 'veg_noodles.jpg', 2),
(13, 'Chicken Noodles', 'Noodles with chicken', 200.00, 'chicken_noodles.jpg', 2),
(14, 'Gulab Jamun', 'Milk-based sweet balls', 90.00, 'gulab_jamun.jpg', 3),
(15, 'Ice Cream', 'Vanilla ice cream scoop', 80.00, 'ice_cream.jpg', 3),
(16, 'Brownie', 'Chocolate brownie', 120.00, 'brownie.jpg', 3),
(17, 'Chocolate Cake', 'Soft chocolate cake', 150.00, 'cake.jpg', 3),
(18, 'Soft Drink', 'Chilled carbonated drink', 50.00, 'soft_drink.jpg', 4),
(19, 'Fresh Lime Soda', 'Refreshing lime drink', 60.00, 'lime_soda.jpg', 4),
(20, 'Cold Coffee', 'Chilled coffee with cream', 90.00, 'cold_coffee.jpg', 4),
(21, 'Hot Coffee', 'Fresh brewed coffee', 70.00, 'hot_coffee.jpg', 4),
(22, 'Tea', 'Indian masala tea', 40.00, 'tea.jpg', 4),
(23, 'Milk Shake', 'Thick flavoured shake', 110.00, 'milkshake.jpg', 4),
(24, 'Mineral Water', 'Packaged drinking water', 30.00, 'water.jpg', 4);


Step 4 — Import Seed Data

Open the SQL tab

Paste all content from:

/seeds/seed.sql


Click Go

Step 5 — Verify Tables

Make sure the following tables exist:

users

categories

menu_items

orders

order_items

payments

▶️ Running the Server
Development mode (auto-reload)
npm run dev

Production mode
npm start

Open in browser:

Home (static) → http://localhost:3000

Menu (dynamic) → http://localhost:3000/menu

Item detail → http://localhost:3000/menu/1

📁 Project Structure
dineease/
│  app.js
│  db.js
│  package.json
│  README.md
│
├── routes/
│     menu.js
│
├── views/
│     layout.pug
│     index.pug
│     menu.pug
│     item.pug
│
├── public/
│     styles.css
│
└── seeds/
      seed.sql

🖼️ Screenshots
🔹 Homepage

🔹 Menu Page (Dynamic)

🔹 Item Details Page

🔹 Trello Taskboard

(Replace screenshots after uploading them in /screenshots/)

👥 Team Members
Name	Role
Hemanth Naga Kiran Kantu	Backend Developer
Achyuth Konda	UI/UX Designer
Anusha Erumalla	Database Administrator
Shaik Haseena Begum	Frontend Developer
Sanjana Kukal	Project Manager & DevOps
