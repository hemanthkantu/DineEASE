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
CREATE DATABASE dineease;
USE dineease;

-- Create database
CREATE DATABASE IF NOT EXISTS dineease;
USE dineease;

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================
-- CATEGORIES TABLE
-- =========================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- =========================
-- MENU ITEMS TABLE
-- =========================
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- ORDERS TABLE
-- =========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'paid', 'preparing', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- ORDER ITEMS TABLE
-- =========================
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- PAYMENTS TABLE
-- =========================
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method ENUM('card', 'cash', 'upi') NOT NULL,
    payment_status ENUM('pe_


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
