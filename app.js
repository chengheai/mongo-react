const express = require('express');
const hero = require('./routers/hero')
const mongoose = require("mongoose");
const path = require('path')
const fs = require('fs')
const bodyParser = require("body-parser")




//这一句是连接上数据库
//  var db = mongoose.connect('mongodb://127.0.0.1:27017/reactTest',{ useNewUrlParser: true });
// console.log('db:===',db)
// # mongodb 为协议
// # james： 连接数据库的用户
// # 123456: 该用户的密码
// # localhost: 本地的地址（因为这是本地环境）
// # 27017: mongodb的端口号(这个一般是默认值，也可以进行修改)
// # example: 数据库的名字
var db = 'mongodb://admin:123456@127.0.0.1:27017/reactTest'

// 连接
mongoose.connect(db);



const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api',hero)
// app.use(express.static(path.resolve(__dirname, './dist')))
// 首页静态页面
// app.get('*', function(req, res) {
//   const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
//   res.send(html)
// })
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
// 监听80端口
app.listen(10002);
console.log('server is running 10002');


