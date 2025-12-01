const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'Hemanth',
  password: '0722',
  database: 'dineease'
});

module.exports = db;
