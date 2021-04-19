var conn = require('../../connectDatabase/Connection');
module.exports.postNews = function(req, res) {
    var sql1 = 'update tintuc set sapxep = sapxep + 1';
    var object = req.body;

    var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var id_tintuc = '';
    for(let i = 0; i < 8; i++) {
        id_tintuc += _sym[parseInt(Math.random() * (_sym.length))];
    }
    var url = req.file.path;
    var tomtat = object.tomtat;
    var tieude = object.tieude;
    var noidung = object.noidung;
    var iddangtintuc = object.dangtintuc;
    var idtheloai = object.theloai;
    var iduser = 'admin';
    var sql2 = "insert into tintuc(id_tintuc, ngaydang, url, tomtat, tieude, noidung, iddangtintuc, idtheloai, iduser) values ('"+id_tintuc+"', now(),'"+url+"','"+
    tomtat+"','"+tieude+"','"+noidung+"','"+iddangtintuc+"','"+idtheloai+"','"+iduser+"')"
    conn.query(sql1, function(err, data) {
        if(err) throw err
    })
    sql = "update userpost set soluongthongbao = soluongthongbao + 1";
    conn.query(sql, function(err, data) {
    if(err) throw err
    })
    conn.query(sql2, function(err, data){
        if(err) throw err
        if(err){
            res.send('thatbai!')
        }
        else{
            res.render('success')
        }
    })
}