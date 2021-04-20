
const conn = require("../../connectDatabase/Connection");

module.exports = function(req, res, next) {
    var sql1 = "SELECT count(id_visitor) as views, extract(day from date_visitor) as day from visitors GROUP BY date_visitor HAVING date_visitor <= date(now()) and date_visitor >= adddate(date(now()), interval - 15 day)" ;
    var sql2 =  "SELECT count(*) as soluongview from visitors";
    var sql3 = "select * from userpost ORDER by ngaytaotaikhoan desc";
    var sql4 = 'select id_tintuc,tendangtintuc,tintuc.iddangtintuc, tintuc.idtheloai, tieude, tentheloai, noidung FROM tintuc INNER JOIN  theloai On tintuc.idTheLoai= theloai.idtheloai INNER JOIN dangtintuc on tintuc.idDangTinTuc = dangtintuc.iddangtintuc ORDER by ngaydang desc'
    conn.query(sql1, function(err, data1) {
        if(err) throw err
        var value = [];
        for(var i = 0; i <= 15; i++) {
            value.push(data1[i].views)
        }
        conn.query(sql2,function(err, data2) {
            if(err) throw err
            conn.query(sql3, function(err, data3) {
                if(err) throw err
                conn.query(sql4, function(err, data4){
                    if(err)throw err
                    res.render('admin', {data1: value, data2: data2, data3: data3, data4: data4})
                })
            })
        })
    })
}