var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',port: 3306,
    user: 'sql6406825',
    password: 'fd37EjeA9E',
    database: 'sql6406825',
    multipleStatements: true,
    connectionLimit: 100
});
module.exports= conn;