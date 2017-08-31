/**
 * Created by 40681 on 2017/5/13.
 */
let express = require('express');
let app = express()
let path = require('path');
let router = express.Router();
let fs = require('fs')
let bodyParser = require('body-parser')
let datePath = (new Date().getMonth()+1)+''+(new Date().getDate())


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
router.post('/submitUserInfo', function(req, res, next){
    let infoPath = '../data/userInfo'+datePath+'.txt';
    let infoSavePath = '../data/season'+req.query.season+'/userInfo.txt';
    console.log(infoSavePath)
    let userInfo = {};
    let userInfos =[];
    fs.readFile(infoPath,'utf-8',function (err,data) {
        if (!data) {
            userInfo[req.body.name] = req.body.phone;
            userInfos.push(req.body)
            console.log(userInfo);
            fs.writeFile(infoPath,JSON.stringify(userInfo),function (err) {
                fs.writeFile(infoSavePath,JSON.stringify(userInfos), {encoding: 'utf8'},function (err) {
                    if (err) {
                        res.send(err)
                    }else {
                        res.send('success')
                    }
                })
            })
        }else{
            userInfo = JSON.parse(data)
            console.log(userInfo);
            if (userInfo[req.body.name] === req.body.phone) {
                res.send('sameName');
            }else{
                userInfo[req.body.name] = req.body.phone;
                console.log(userInfo);
                fs.writeFile(infoPath,JSON.stringify(userInfo),{encoding: 'utf8'},function (err) {
                    fs.readFile(infoSavePath,'utf-8',function (err,data) {
                        if (data) {
                            userInfos = JSON.parse(data);
                        }
                        userInfos.push(req.body);
                        fs.writeFile(infoSavePath,JSON.stringify(userInfos),{encoding: 'utf8'},function (err) {
                            if (err) {
                                res.send(err)
                            }else {
                                res.send('success')
                            }
                        })
                    })
                })
            }
        }
    })
});
router.post('/submitResearchInfo',function (req,res) {
    let infoSavePath = '../data/season'+req.query.season+'/research.txt';
    let userResearchData = {};
    let userResearchDatas = [];
    let atTech = ''
    if (req.body.atTechOther === '') {
        req.body.atTech.replace(/attachTech=([^&=]+)/g,function ($1) {
            atTech += /attachTech=([^=]+)/.exec($1)[1]+';'
        })
    }else {
        req.body.atTech.replace(/attachTech=([^&=]+)/g,function ($1) {
            atTech += /attachTech=([^=]+)/.exec($1)[1]+';'
        })
        atTech= atTech.substring(0,atTech.length-1) + ":"+req.body.atTechOther;
    }
    userResearchData['老实说，很久以前就知道易车还是今天刚刚知道的?'] = req.body.knowAuto;
    userResearchData['哪种渠道获得今天宣讲会的信息'] = req.body.chanelKnow;
    userResearchData['求职过程中，你最看重哪项'] = atTech;
    userResearchData['你最关注宣讲会上哪个环节'] = req.body.focus;
    userResearchData['建议和期待'] = req.body.want;
    fs.readFile(infoSavePath,'utf-8',function (err,data) {
        if (data) {
            userResearchDatas = JSON.parse(data);
            userResearchDatas.push(userResearchData);
            fs.writeFile(infoSavePath,JSON.stringify(userResearchDatas),{encoding: 'utf8'},function (err) {
                if (err) {
                    res.send(err)
                }else {
                    res.send('success')
                }
            })
        }else {
            userResearchDatas.push(userResearchData);
            fs.writeFile(infoSavePath,JSON.stringify(userResearchDatas),{encoding: 'utf8'},function (err) {
                if (err) {
                    res.send(err)
                }else {
                    res.send('success')
                }
            })
        }

    })
    console.log(userResearchData);
    console.log(req.query);
})
router.get('/getDate',function (req,res) {
    res.send(datePath)
})
router.post('/getUserInfo',function (req,res,next) {
    let infoPath = '../data/userInfo'+req.query.datePath+'.txt';
    console.log(infoPath)
    fs.readFile(infoPath,function (err,data) {
        if (data) {
            res.send(data)
        }else{
            res.send(err)
        }
    })

})
module.exports = router;