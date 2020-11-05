const itemApi = require('./api/itemApi');
const testApi = require('./api/testApi');
const userApi = require('./api/userApi');
const homeworkApi = require('./api/homeworkApi');
const appraiseApi = require('./api/appraiseApi');
const subjectApi = require('./api/subjectApi');
const answerApi = require('./api/answerApi');
const feedbackApi = require('./api/feedbackApi');
const administratorApi = require('./api/administratorApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

// 后端api路由
app.use('/api/item', itemApi);
app.use('/api/test', testApi);
app.use('/api/user', userApi);
app.use('/api/homework', homeworkApi);
app.use('/api/appraise', appraiseApi);
app.use('/api/subject', subjectApi);
app.use('/api/answer', answerApi);
app.use('/api/feedback', feedbackApi);
app.use('/api/administrator', administratorApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');