/**
 * Created by 40681 on 2017/5/13.
 */
let express  = require('express');
let router = express.Router();
let path = require('path');

let fs = require('fs');
let archiver = require('archiver')


router.get('/article',function (req,res) {
    let userInfoPath = '../data/season'+req.query.season+'/userInfo.txt';
    let researchPath = '../data/season'+req.query.season+'/research.txt';
    let outPath = '../data/season'+req.query.season+'.zip';
    fs.exists(outPath,function (isThere) {
        if (isThere) {
            fs.unlink(outPath,function () {
                fs.exists(userInfoPath,function (isExist) {
                    if (!isExist) {
                        res.send('本场尚无信息可下载')
                    }else {
                        fs.exists(researchPath,function (_isExist) {
                            if (!_isExist) {
                                res.send('本场尚无信息可下载')
                            } else {
                                let archive = archiver('zip');
                                let output = fs.createWriteStream(path.resolve('../data/season1.zip'));
                                archive.pipe(output);
                                archive.append(fs.createReadStream('../data/season1/userInfo.txt',{encoding: 'utf-8'}),{'name':'userInfo.txt'});
                                archive.append(fs.createReadStream('../data/season1/research.txt',{encoding: 'utf-8'}),{'name':'research.txt'});
                                archive.finalize();
                                output.on('close', function() {
                                    res.download(path.resolve('../data/season1.zip'));
                                });
                            }
                        })
                    }
                })
            })
        }else{
            fs.exists(userInfoPath,function (isExist) {
                if (!isExist) {
                    res.send('本场尚无信息可下载')
                }else {
                    fs.exists(researchPath,function (_isExist) {
                        if (!_isExist) {
                            res.send('本场尚无信息可下载')
                        } else {
                            let archive = archiver('zip');
                            let output = fs.createWriteStream(path.resolve('../data/season1.zip'));
                            archive.pipe(output);
                            archive.append(fs.createReadStream('../data/season1/userInfo.txt',{encoding: 'utf-8'}),{'name':'userInfo.txt'});
                            archive.append(fs.createReadStream('../data/season1/research.txt',{encoding: 'utf-8'}),{'name':'research.txt'});
                            archive.finalize();
                            output.on('close', function() {
                                res.download(path.resolve('../data/season1.zip'));
                            });
                        }
                    })
                }
            })
        }
    })
});
module.exports = router;