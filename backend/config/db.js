const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Vinish@2008',
    database: process.env.DB_NAME || 'ecommerce_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection()
    .then(conn => {
        console.log('Successfully connected to MySQL database');
        conn.release();
    })
    .catch(err => {
        console.error('Error connecting to MySQL database:', err);
        process.exit(1);
    });

module.exports = pool;