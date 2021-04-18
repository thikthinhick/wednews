const { render } = require('pug');
var conn = require('../../connectDatabase/Connection')
module.exports.login = function(req, res, next){
    var value = req.body;
    var sql = "select * from userpost where username = '" + value.Username + "' and password = '" + value.Password + "';";
    conn.query(sql, function(err, data) {
        if(data.length == 0){
            res.render('login')
        }
        else{
            res.cookie('user-id', data[0].idUser);
            res.redirect('/');
        }
    })
}
module.exports.signup = function(req, res, next){
    var value = req.body;
    var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var iduser = '';
    for(let i = 0; i < 7; i++) {
        iduser += _sym[parseInt(Math.random() * (_sym.length))];
    }
    if(value.Password === value.Confirmpassword){
        var sql = "insert into userpost (iduser, username, password, soluongthongbao, ngaytaotaikhoan ) values ('" + iduser + "', '" + value.Username + "', '" + value.Password + "', 0, now());";
        conn.query(sql, function(err, data) {
            if(err) throw err
        })
        res.cookie('user-id', iduser);
        res.redirect('/');
    }
    else{
        res.redirect('/login')
    }
}