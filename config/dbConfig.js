const config = require('./config.json')["labtop"]
// const config = require('./config.json')["computer"]

const mysql = require('mysql');

const pool = mysql.createPool({
    host: config.host,
    port: 3306,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = pool;