// i instelled mysql2 by npm install mysql2


const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'simo365',
    database: 'todo_list',
    waitForConnections: true,
    connectionLimit: 10,
    enableKeepAlive: true,
    keepAliveInitialDelayMs: 0
});

pool.on('error', (err) => {
    console.error('Pool error:', err);
});

module.exports = pool;