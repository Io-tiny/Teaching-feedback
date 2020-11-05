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
 
// 增加接口
router.post('/addTestData', (req, res) => {
    var sql = $sql.test.add;
    var params = req.body;
    console.log(params);
    
    conn.query(sql, [params.name,params.creator, params.createtime,params.showtime,params.password,params.complete], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//删除接口
router.post('/delTestData', (req, res) => {
    var sql = $sql.test.delete;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//修改接口
router.post('/updateTestData', (req, res) => {
    var sql = $sql.test.update;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.name,params.creator, params.createtime, params.showtime,params.password,params.complete,params.single,params.multiple,params.judge,params.short, params.time,params.teacher,params.publish,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 条件查询接口
router.post('/searchTestData', (req, res) => {
    var sql = $sql.test.select;
    var params = req.body;
    console.log(params);
    console.log(sql)
    conn.query(sql, [params.name], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// update接口
router.post('/updatePublishData', (req, res) => {
    var sql = $sql.test.updatepublish;
    var params = req.body;
    console.log(params);
    // console.log(sql)
    conn.query(sql, [params.publish,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
 
//查询接口
router.post('/getTestData', (req, res) => {
    var sql = $sql.test.gettest;

    var params = req.body;
    console.log(params);
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//查询接口
router.post('/getData', (req, res) => {
    var sql = $sql.test.search;

    var params = req.body;
    console.log(params);
    conn.query(sql,[params.publish], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//完善信息查询接口
router.post('/selectTestData', (req, res) => {
    var sql = $sql.test.idselect;

    var params = req.body;
    console.log(params);
    conn.query(sql,[params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;