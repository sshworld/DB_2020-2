const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tjdgjs1218',
    database: 'DB_Project'
});

module.exports = pool;