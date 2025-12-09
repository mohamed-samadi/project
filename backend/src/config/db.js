
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async function testConnection() {
  try {
    const conn = await pool.getConnection();
    await conn.ping(); // throws if can't connect
    conn.release();
    console.log('MySQL pool connected to', process.env.DB_HOST, process.env.DB_NAME);
  } catch (err) {
    console.error('MySQL connection failed :', err.message || err);
    // exit so you don't run the server with a broken DB config
    process.exit(1);
  }
})();

module.exports = pool;