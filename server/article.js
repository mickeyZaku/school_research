/**
 * Created by 40681 on 2017/5/13.
 */
let express  = require('express');
let router = express.Router();
let fs = require('fs')
let path = require('path')
let zlib = require('zlib');
var gzip = zlib.createGzip();

router.get('/article',function (req,res) {
   var inFile = fs.createReadStream('../data/season1');
   var out = fs.createWriteStream('./data/season1.gz');
   inFile.pipe(gzip).pipe(out);
   res.send('success');
   // res.download(path.resolve('../data/season1/userInfo.txt'));
});
module.exports = router;