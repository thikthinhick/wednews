var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'db4free.net',port: 3306,
    user: 'homnaytuibuon2k1',
    password: 'Chuong03022001',
    database: 'homnaytuibuon',
    multipleStatements: true,
    connectionLimit: 100
});
// var conn = mysql.createConnection({
//     host: "localhost",
//     user: 'root',
//     password: '',
//     database: 'newspaper'
// })
module.exports= conn;