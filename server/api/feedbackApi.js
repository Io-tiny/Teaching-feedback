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
router.post('/addfeedbackData', (req, res) => {
    var sql = $sql.feedback.add;
    var params = req.body;
    console.log(params);
    
    conn.query(sql, [params.point,params.pointsum,params.test], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// //查询接口
// router.post('/getWorkData', (req, res) => {
//     var sql = $sql.homework.gethomework;
//     var params = req.body;
//     console.log(params);
//     conn.query(sql, function(err, result) {
//         if (err) {
//             console.log(err);
//         }
//         if (result) {
//             jsonWrite(res, result);
//         }
//     })
// });

//修改接口
router.post('/updatefeedbackData', (req, res) => {
    var sql = $sql.feedback.update;
    var params = req.body;
    console.log(params);
    console.log(sql);
    conn.query(sql, [params.point], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


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
router.post('/getData', (req, res) => {
    var sql = $sql.feedback.getalldata;
    var params = req.body;
    console.log(params);
    // console.log(sql)
    conn.query(sql, [params.test], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 条件查询接口
router.post('/getStudentData', (req, res) => {
    var sql = $sql.feedback.getstudentdata;
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

// 条件查询接口
router.post('/selectfeedbackData', (req, res) => {
    var sql = $sql.feedback.getdata;
    var params = req.body;
    console.log(params);
    // console.log(sql)
    conn.query(sql, [], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
 

// 增加接口
router.post('/addStudentData', (req, res) => {
    var sql = $sql.feedback.addS;
    var params = req.body;
    console.log(params);
    
    conn.query(sql, [params.name,params.teacher,params.point,params.chapter,params.detail,params.difficult,params.info,params.difficults,params.studentname], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
//获取详细信息
router.post('/getInfo', (req, res) => {
    var sql = $sql.feedback.getInfo;
    var params = req.body;
    console.log(params);
    
    conn.query(sql, [params.name, params.chapter], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;