var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql');
 
// 连接数据库
var conn = mysql.createConnection(models.mysql);
 
conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

//添加接口
router.post('/addAnswerData', (req, res) => {
    var sql = $sql.answer.add;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.testname,params.studentname,params.createtime,params.totalgold,params.sum,params.answer,params.finish], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/getAnswerData', (req, res) => {
    var sql = $sql.answer.getdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/searchAnswerData', (req, res) => {
    var sql = $sql.answer.search;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.testname], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/searchAnswerDatas', (req, res) => {
    var sql = $sql.answer.searchs;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.testname,params.studentname,params.finish], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/updateAnswerData', (req, res) => {
    var sql = $sql.answer.update;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.testname,params.studentname,params.createtime,params.totalgold,params.sum,params.answer,params.finish,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/getScoreData', (req, res) => {
    var sql = $sql.answer.select;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.studentname,params.finish], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;