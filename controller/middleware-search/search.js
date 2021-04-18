const conn = require('../../connectDatabase/Connection');
module.exports.search = function(req, res){
    var x = req.query.timkiem;
    var sql = "SELECT * FROM tintuc WHERE tomtat LIKE '%" + x + "%';"
    conn.query(sql, function(err, data) {
        if(err) throw err
        res.render('search-page', {data: data});
    })
}
module.exports.search_topic = function(req, res) {
    var id = req.params.loaichude;
    var sql = "select * from tintuc where idtheloai = '" + id + "';"
    conn.query(sql, function(err, data) {
        if(err) throw err
        res.render('search-page', {data: data});
    }) 
}