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
 
//自我评价查询接口
router.post('/getSelf', (req, res) => {
    var sql = $sql.appraise.getself;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql,[params.appraiser,params.beappraiser], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            // console.log(result);
            jsonWrite(res, result);
        }
    })
});

//自我评价查询接口
router.post('/getOther', (req, res) => {
    var sql = $sql.appraise.getother;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql,[params.appraiser,params.beappraiser], function(err, result) {
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
router.post('/updateSelf', (req, res) => {
    var sql = $sql.appraise.update;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql, [params.appraiser,params.beappraiser, params.content,params.createtime,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 增加接口
router.post('/addSelf', (req, res) => {
    var sql = $sql.appraise.addself;
    var params = req.body;
    console.log(params);
    
    conn.query(sql, [params.appraiser,params.beappraiser, params.content,params.createtime], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});







module.exports = router;