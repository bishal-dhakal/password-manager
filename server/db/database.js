const mysql = require('mysql')

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'software',
    database:'passwordmanager'
})

module.exports = db;