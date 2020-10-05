//const config = require('./config.json')["labtop"]
const config = require('./config.json')["computer"]

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: config.host,
    port: 3306,
    user: config.user,
    password: config.password,
    database: config.database
});

async function query(sql, args) {
    return new Promise(async (resolve, reject) => {
        // Arrow Function
        try {
            // Check to connection of database
            const conn = await pool.getConnection()

            // 정규표현식 : Regular Expression
            // const query = xss.encode(args)
            // console.log(query)

            const [rows, fields] = await pool.query(sql, args)

            conn.release()

            resolve(rows)
        } catch(err) {
            console.error(err)

            resolve(err)
        }
    })
}

module.exports = query;