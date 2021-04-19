var conn = require('../../connectDatabase/Connection')
module.exports.home = function(req, res){
    var x = req.cookies
    var sql1 = 'select *, substr(username, 1,1) as firstName from userpost'
    var sql ='SELECT id_tintuc, date(ngaydang) as ngaydang, username, url, tieude, tomtat, tentheloai, sapxep FROM tintuc INNER JOIN  theloai On tintuc.idTheLoai= theloai.idtheloai INNER JOIN userpost on tintuc.idUser = userpost.idUser ORDER by ngaydang DESC';
    conn.query(sql, function(err, data) {
        if(err) throw err
        for(let i = 0; i < data.length; i++) {
           data[i].ngaydang = data[i].ngaydang.toString().substr(0, 15);
        }
        conn.query(sql1, function(err, data2){
            var user = data2.find(value => value.idUser === x['user-id']);
            res.render('index', {data: data, user: user})
        })
    })
}
module.exports.postNew = function(req, res) {

}