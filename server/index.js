let express = require('express');
let app = express();
let path = require('path')
let bodyParser = require('body-parser')
let user = require('./user.js');//user 是个函数
let article = require('./article.js');
var basicAuth = require('basic-auth');

var auth = function(req, resp, next) {
    function unauthorized(resp) {
        resp.set('WWW-Authenticate', 'Basic realm=Input User&Password');
        return resp.sendStatus(401);
    }
    var user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        return unauthorized(resp);
    }
    if (user.name === 'bitauto' && user.pass === 'bitautoRecruit') {
        return next();
    } else {
        return unauthorized(resp);
    }
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/user',user);
app.use('/article',article);
app.use(express.static(path.resolve('node_modules')));
app.use(express.static('../public'));


app.get('/',auth,function(req,res){
    res.sendFile(path.resolve('../index.html'))
});
app.get('/searchInfo',function (req,res) {
    let {season} = req.query;
    res.sendFile(path.resolve('../bitauto_research_info.html'))

});
app.get('/search',function (req,res) {
    let {season} = req.query;
    res.sendFile(path.resolve('../bitauto_research.html'))

});
app.get('/success',function (req,res) {
    res.sendFile(path.resolve('../success.html'))
})
app.all('*',function (req,res) {
    res.sendStatus(404);//可以使用send，自动处理编码格式和数据类型，还能自动将statusCode转为对应的status
});

app.listen(8080,function () {
    console.log('serving is running on 8080')
});