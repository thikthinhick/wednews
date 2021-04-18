const express = require('express');
const router = express.Router();
var multer = require('multer');
var upload = multer({dest:'./public/upload/'})
var conn = require('../connectDatabase/Connection');
router.get('/taobaiviet', function(req,res) {
    res.render('postNews');
})
module.exports = router;