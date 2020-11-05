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
router.post('/addHomework', (req, res) => {
    var sql = $sql.homework.add;
    var params = req.body;
    console.log(params);
    console.log(sql)
    conn.query(sql, [params.name,params.creator, params.single,params.multiple,params.judge,params.short,params.time,params.createtime], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//查询接口
router.post('/getWorkData', (req, res) => {
    var sql = $sql.homework.gethomework;
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

// //修改接口
// router.post('/updatehomeworkData', (req, res) => {
//     var sql = $sql.homework.update;
//     var params = req.body;
//     console.log(params);
//     console.log(sql);
//     conn.query(sql, [params.name,params.section, params.answer, params.sort,params.analysis,params.difficulty,params.gold,params.id], function(err, result) {
//         if (err) {
//             console.log(err);
//         }
//         if (result) {
//             jsonWrite(res, result);
//         }
//     })
// });


// //删除接口
// router.post('/delhomeworkData', (req, res) => {
//     var sql = $sql.homework.delete;
//     var params = req.body;
//     console.log(params);
//     conn.query(sql, [params.id], function(err, result) {
//         if (err) {
//             console.log(err);
//         }
//         if (result) {
//             jsonWrite(res, result);
//         }
//     })
// });



// 条件查询接口
router.post('/searchWorkData', (req, res) => {
    var sql = $sql.homework.search;
    var params = req.body;
    console.log(params);
    // console.log(sql)
    conn.query(sql, [params.name], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 条件查询接口
router.post('/selecthomeworkData', (req, res) => {
    var sql = $sql.homework.select;
    var params = req.body;
    console.log(params);
    // console.log(sql)
    conn.query(sql, [params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
 



module.exports = router;