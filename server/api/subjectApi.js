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
 
//查询接口
router.post('/getSubjectData', (req, res) => {
    var sql = $sql.subject.getsubject;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql,[params.teacher], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            // console.log(result);
            jsonWrite(res, result);
        }
    })
});

//删除
router.post('/delSubjectData', (req, res) => {
    var sql = $sql.subject.delete;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql,[params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            // console.log(result);
            jsonWrite(res, result);
        }
    })
});

//修改接口
router.post('/updateSubjectData', (req, res) => {
    var sql = $sql.subject.update;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql, [params.name,params.teacher, params.point,params.chapter,params.coursetime,params.detail,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 增加接口
router.post('/addSubjectData', (req, res) => {
    var sql = $sql.subject.add;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql, [params.name,params.teacher, params.point,params.chapter,params.course,params.detail], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询接口
router.post('/searchSubjectData', (req, res) => {
    var sql = $sql.subject.search;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql, [params.chapter,params.point], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 学生查询接口
router.post('/getData', (req, res) => {
    var sql = $sql.subject.select;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql, [params.name,params.teacher], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


module.exports = router;