/**
 * Created by 40681 on 2017/5/13.
 */
let express = require('express');
let app = express()
let path = require('path');
let router = express.Router();
let fs = require('fs')
let bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
router.post('/submitUserInfo', function(req, res, next){
    let datePath = (new Date().getMonth()+1)+''+(new Date().getDate())
    let infoPath = '../data/userInfo'+datePath+'.txt';
    let infoSavePath = '../data/season'+req.query.season+'/userInfo.txt';
    console.log(infoSavePath)
    let userInfo = {};
    let userInfos =[];
    fs.readFile(infoPath,'utf-8',function (err,data) {
        if (!data) {
            userInfo[req.body.name] = req.body.phone;
            console.log(userInfo);
            fs.writeFile(infoPath,JSON.stringify(userInfo),function (err) {
                fs.readFile(infoSavePath,'utf-8',function (err,data) {
                    if (data) {
                        userInfos = JSON.parse(data);
                    }
                    userInfos.push(req.body)
                    fs.writeFile(infoSavePath,JSON.stringify(userInfos),{encoding: 'utf8'},function (err) {
                        if (err) {
                            res.send(err)
                        }else {
                            res.send('success')
                        }
                    })
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
    req.body.atTech.replace(/attachTech=([^&=]+)/g,function ($1) {
        atTech += /attachTech=([^=]+)/.exec($1)[1]+';'
    });
    let company = ''
    req.body.company.replace(/getCompany=([^&=]+)/g,function ($1) {
        company += /getCompany=([^=]+)/.exec($1)[1]+';'
    });
    // if (req.body.atTechOther === '') {
    //
    // }else {
    //     req.body.atTech.replace(/attachTech=([^&=]+)/g,function ($1) {
    //         atTech += /attachTech=([^=]+)/.exec($1)[1]+';'
    //     })
    //     atTech= atTech.substring(0,atTech.length-1) + ":"+req.body.atTechOther;
    // }
    userResearchData['1'] = req.body.chanelKnow;
    userResearchData['2'] = req.body.toArea;
    userResearchData['3'] = req.body.focus;
    userResearchData['4'] = company;
    userResearchData['5'] = atTech;
    userResearchData['6'] = req.body.want;
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
})
router.get('/getDate',function (req,res) {
    let datePath = (new Date().getMonth()+1)+''+(new Date().getDate())
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