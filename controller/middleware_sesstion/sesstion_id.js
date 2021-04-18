var conn = require('../../connectDatabase/Connection')
module.exports = function(req, res, next){
    if(!req.signedCookies.sessionId){
        var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
        var sessionId = '';
        for(let i = 0; i < 10; i++) {
            sessionId += _sym[parseInt(Math.random() * (_sym.length))];
        }
        res.cookie('sessionId', sessionId);
        var day = new Date();
        var date = day.getUTCFullYear() + "/" + (day.getUTCMonth() + 1) + '/' + day.getUTCDate();
        var sql = "insert into visitors (ip_address, date_visitor) values ('" + req.ip + "', date(now()))";
        conn.query(sql, function(err, data) {
            if(err) throw err
        })
    }
    next();
}
