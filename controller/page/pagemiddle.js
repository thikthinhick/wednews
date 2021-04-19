const { render } = require('pug');
const conn = require('../../connectDatabase/Connection');
module.exports.loadpage = function (req, res) {
    var id = req.params.idtintuc;
    var user_id;
    if(req.cookies)
    user_id = req.cookies['user-id'];
    else
    user_id = ''
    var sql1 = "SELECT * from tintuc inner join userpost on tintuc.iduser = userpost.iduser where id_tintuc = '" + id + "'";
    var sql2 = "Select *, substr(username,1,1) as firstname from binhluan inner join userpost on binhluan.iduser = userpost.iduser where id_tintuc = '" + id + "' and id_binhluan_me is null" 
    var sql3 = "select *, substr(username,1,1) as firstname from userpost where iduser = '" + user_id + "'";
    conn.query('update tintuc set numberofviews = numberofviews + 1 where id_tintuc = ' + "'" + id + "'" , function (err, data) {
        if (err) throw err
    });
    conn.query(sql1, function (err, data1) {
        conn.query(sql2, function(err, data2){
            conn.query(sql3, function(err, data3){
                res.render('page', { data1: data1, data2: data2, data3: data3})
            })
        })
    })
}