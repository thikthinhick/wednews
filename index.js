const express = require('express');
var bodyParser= require('body-parser')
var session = require('./controller/middleware_sesstion/sesstion_id')
var middle = require('./controller/middlewareDB/databaseMysql')
var x = require('./controller/middlewareDB/databaseLogic');
var timkiem = require('./controller/middleware-search/search')
var login = require('./controller/middleware-login/login')
const userRouter = require('./Router/user.route');
var page = require('./controller/page/pagemiddle')
var admin = require('./controller/admin/middleadmin')
var conn = require('./connectDatabase/Connection');
const app = express();
const { render } = require('pug');
const cookieParser = require('cookie-parser');
const { query } = require('./connectDatabase/Connection');
app.set('view engine', 'pug');  
app.set('views', './views');
// khai bao su dung body.parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use( function(req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }
  return next();
});
app.use(express.static('public'));
app.use('/', userRouter);
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
  cloud_name: 'clouduet',
  api_key: '573147231385865',
  api_secret: 'a6XHlMNsiDYiBJaeoY8bWcUW350'
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'upload',
    format: async (req, file) => 'jpg',
    public_id: (req, file) => 'computed-filename-using-request',
  },
});
const parser = multer({ storage: storage });
app.get('/',session, middle.home);
app.post('/success', parser.single('avatar'), x.postNews)
app.get('/login', function(req, res) {
  res.render('login')
})
app.post('/xulilogin', login.login)
app.post('/xulitao', login.signup)
app.post('/comment-page', function(req, res) {
  var value = req.body;
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var idbinhluan = '';
  for(let i = 0; i < 4; i++) {
      idbinhluan += _sym[parseInt(Math.random() * (_sym.length))];
  }
  var sql = "insert into binhluan (idbinhluan, iduser, id_tintuc, luotthich, luotkhongthich, ngaybinhluan, noidung_binhluan) values('" + idbinhluan +  "', '" + value.iduser + "', '" + value.id_tintuc + "', 0, 0" + ", now(), '" + value.noidung + "')";
  conn.query(sql, function(err, data) {
    if(err) throw err
    res.send(idbinhluan)
  }) 
})
app.get('/chude/:loaichude', timkiem.search_topic)
app.post('/dolike', function(req, res){
  var id = req.body.id;
  var likes = req.body.likes
  conn.query("update binhluan set luotthich = " + likes + " where idbinhluan = '" + id + "'", function(err, data){
    if (err) throw err
  })
})
app.get('/dangxuat', function(req, res) {
  res.clearCookie('user-id')
  res.redirect('/')
})
app.get('/dodislike', function(req, res){
  var id = req.query.id;
  var dislikes = req.query.dislikes
  conn.query("update binhluan set luotkhongthich = " + dislikes + " where idbinhluan = '" + id + "'", function(err, data){
    if (err) throw err
  })
 
})

app.post('/replycomment', function(req, res){
  var value = req.body;
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var idbinhluan = '';
  for(let i = 0; i < 4; i++) {
      idbinhluan += _sym[parseInt(Math.random() * (_sym.length))];
  }
  var sql = "insert into binhluan (idbinhluan, iduser, id_tintuc, id_binhluan_me, ngaybinhluan, noidung_binhluan) values('" + idbinhluan +  "', '" + value.iduser  + "', '" + value.id_tintuc + "', '" + value.id
  + "', now() , '" + value.noidung + "')";
  conn.query(sql, function(err, data) {
    if(err) throw err
  })
  sql = "update userpost set soluongthongbao = soluongthongbao + 1 where iduser = (select idUser from binhluan where idbinhluan = '" + value.id + "');";
  conn.query(sql, function(err, data) {
    if(err) throw err
  })
})
app.post('/showlistcomment', function(req, res) {
  var value = req.body.id;
  var sql = "select * from binhluan inner join userpost on binhluan.iduser = userpost.iduser where id_binhluan_me = '" + value + "'";
  conn.query(sql, function(err,data){
    res.send(data)
  })
})
app.post('/updatetintuc',function(req, res){
  var value = req.body;
  var sql = "update tintuc set tieude = '" + value.tieude + "', idtheloai = '" + value.idtheloai + "', iddangtintuc = '" + value.iddangtintuc + "', noidung = '" + value.noidung + "' where id_tintuc = '" + value.id_tintuc + "';"
  conn.query(sql, function(err, data) {
    if(err) throw err
  })
})
app.post('/deletenews', function(req, res) {
  var id = req.body.id;
  var sql = "delete from tintuc where id_tintuc = '" + id + "';"
  conn.query(sql, function(err, data) {
    if(err) throw err
  })
})
app.post('/thongbao', function(req, res) {
  var id = req.body.iduser;
  var sql = "select usercolor, userurl, ngaybinhluan, url, noidung_binhluan, userName,('binhluan') as type from binhluan inner join tintuc on binhluan.id_tintuc = tintuc.id_tintuc inner join userpost on userpost.iduser = binhluan.iduser where id_binhluan_me in (select idbinhluan from binhluan where iduser = '" + id + "' and id_binhluan_me is null) union select 'red' as usercolor, './img/avatar2.png' as userurl, NgayDang as ngaybinhluan, url, tieude as noidung_binhluan, iduser as username, ('baidang') as type from tintuc where ngaydang >= (select ngaytaotaikhoan from userpost where iduser = '" + id + "') order by ngaybinhluan DESC"
  
  conn.query(sql, function(err, data) {
    if(err) throw err
    res.send(data)
  })
  sql = "update userpost set soluongthongbao = 0 where iduser = '" + id + "';"
  conn.query(sql, function(err, data) {
    if(err) throw err
    
  })
})
app.get('/admin',admin)

app.get('/news/timkiem', timkiem.search);
app.get('/page/:idtintuc', page.loadpage)
app.listen(process.env.PORT, function(){
})