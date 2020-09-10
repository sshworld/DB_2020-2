const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'tjdgjs1218',
    database: 'DB_PROJECT'
});

module.exports = pool;