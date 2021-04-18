var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',port: 3306,
    user: 'sql6406479',
    password: 'XfwWDUQexJ',
    database: 'sql6406479',
    multipleStatements: true,
    connectionLimit: 100
});
module.exports= conn;