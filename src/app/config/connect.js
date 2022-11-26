const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Minh2001",
    database: "website_Shopping"
})

connection.connect((err) => {
    if (err) throw err
    console.log("Kết nối thành công !.")
})

module.exports = connection;
