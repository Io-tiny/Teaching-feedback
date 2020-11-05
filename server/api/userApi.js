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
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    
    conn.query(sql, [params.username,params.password, params.sort,params.name,params.email,params.phone, params.class, params.subject], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 条件查询接口
router.post('/selectUser', (req, res) => {
    var sql = $sql.user.select;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.username], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 信息查询接口
router.post('/selectInfo', (req, res) => {
    var sql = $sql.user.selectinfo;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql, [params.username,params.sort], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//修改接口
router.post('/updateInfo', (req, res) => {
    var sql = $sql.user.update;
    var params = req.body;
    console.log(params);
    console.log(sql)
    conn.query(sql, [params.username,params.password, params.name, params.sno, params.phone,params.email,params.class,params.subject,params.teacher,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 班級信息查詢
router.post('/getClassData', (req, res) => {
    var sql = $sql.user.getclassdata;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql, [params.subject,params.sort], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 班級信息修改
router.post('/updateClassData', (req, res) => {
    var sql = $sql.user.updateclassdata;
    var params = req.body;
    console.log(params);
    console.log(sql);
    conn.query(sql, [params.sno,params.name,params.class,params.phone,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 删除学生信息
router.post('/delClassData', (req, res) => {
    var sql = $sql.user.delclassdata;
    var params = req.body;
    console.log(params);
    console.log(sql);
    conn.query(sql, [params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查找学生信息
router.post('/searchClassData', (req, res) => {
    var sql = $sql.user.searchclassdata;
    var params = req.body;
    console.log(params);
    console.log(sql);
    conn.query(sql, [params.sno,params.name,params.class,params.sort], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查找学生信息
router.post('/selectClassData', (req, res) => {
    var sql = $sql.user.selectclassdata;
    var params = req.body;
    console.log(params);
    console.log(sql);
    conn.query(sql, [params.class,params.sort], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


module.exports = router;