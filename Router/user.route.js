const express = require('express');
const router = express.Router();
var multer = require('multer');
var upload = multer({dest:'./public/upload/'})
var conn = require('../connectDatabase/Connection');
router.get('/taobaiviet', function(req,res) {
    res.render('postNews');
})
router.get('/avatar', function(req, res) {
    console.log(res.body)
    res.render('selectavatar');
})
module.exports = router;