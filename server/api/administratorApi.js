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


//学生
router.post('/getStudentData', (req, res) => {
    var sql = $sql.administrator.getstudentdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.sort], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/delStudentData', (req, res) => {
    var sql = $sql.administrator.delstudentdata;
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
router.post('/updateStudentData', (req, res) => {
    var sql = $sql.administrator.updatestudentdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.name,params.sno,params.class,params.username,params.password,params.subject,params.teacher,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/addStudentData', (req, res) => {
    var sql = $sql.administrator.addstudentdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.name,params.sno,params.class,params.username,params.password,params.subject,params.teacher,params.sort], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/searchStudentData', (req, res) => {
    var sql = $sql.administrator.searchstudentdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.sort,params.name], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//教师
router.post('/getTeacherData', (req, res) => {
    var sql = $sql.administrator.getTeacherdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.sort], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/delTeacherData', (req, res) => {
    var sql = $sql.administrator.delTeacherdata;
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
router.post('/updateTeacherData', (req, res) => {
    var sql = $sql.administrator.updateTeacherdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.name,params.class,params.username,params.password,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/addTeacherData', (req, res) => {
    var sql = $sql.administrator.addTeacherdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.name,params.class,params.username,params.password,params.sort], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/searchTeacherData', (req, res) => {
    var sql = $sql.administrator.searchTeacherdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.sort,params.name], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//学科
router.post('/getSubjectData', (req, res) => {
    var sql = $sql.administrator.getSubjectdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.sort], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/delSubjectData', (req, res) => {
    var sql = $sql.administrator.delSubjectdata;
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
router.post('/updateSubjectData', (req, res) => {
    var sql = $sql.administrator.updateSubjectdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.name,params.class,params.subject,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/addSubjectData', (req, res) => {
    var sql = $sql.administrator.addSubjectdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.class,params.subject,params.sort,params.name], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/searchSubjectData', (req, res) => {
    var sql = $sql.administrator.searchSubjectdata;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.sort,params.name], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
//班级管理
router.post('/getClassData', (req, res) => {
    var sql = $sql.administrator.getClassData;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.sort], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/searchClassData', (req, res) => {
    var sql = $sql.administrator.searchClassData;
    var params = req.body;
    console.log(params);
    console.log(sql);
    conn.query(sql,[ params.sort,params.class], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
router.post('/delClassData', (req, res) => {
    var sql = $sql.administrator.delClassdata;
    var params = req.body;
    console.log(params);
    // console.log(sql);
    conn.query(sql,[params.class], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;