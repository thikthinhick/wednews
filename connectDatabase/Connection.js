var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',port: 3306,
    user: 'sql6413081',
    password: '1RmmzGQxYH',
    database: 'sql6413081',
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