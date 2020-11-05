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
router.post('/getItemData', (req, res) => {
    var sql = $sql.item.getitem;
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

//修改接口
router.post('/updateItemData', (req, res) => {
    var sql = $sql.item.update;
    var params = req.body;
    console.log(params);
    console.log(sql);
    conn.query(sql, [params.name,params.section, params.answer, params.sort,params.analysis,params.difficulty,params.gold,params.point,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 增加接口
router.post('/addItemData', (req, res) => {
    var sql = $sql.item.add;
    var params = req.body;
    console.log(params);
    
    conn.query(sql, [params.name,params.section, params.answer,params.sort,params.analysis,params.difficulty,params.gold,params.point], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//删除接口
router.post('/delItemData', (req, res) => {
    var sql = $sql.item.delete;
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



// 条件查询接口
router.post('/searchItemData', (req, res) => {
    var sql = $sql.item.search;
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

// id查询接口
router.post('/seleteItemData', (req, res) => {
    var sql = $sql.item.select;
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

// 条件查询接口
router.post('/searchHomeData', (req, res) => {
    var sql = $sql.item.homesearch;
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
 
//查询接口
router.post('/getHomeData', (req, res) => {
    var sql = $sql.item.homegetitem;
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

//修改接口
router.post('/updateHomeData', (req, res) => {
    var sql = $sql.item.homeupdate;
    var params = req.body;
    console.log(params);
    console.log(sql);
    conn.query(sql, [params.name,params.section, params.answer, params.sort,params.analysis,params.difficulty,params.gold,params.point,params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
//删除接口
router.post('/delHomeData', (req, res) => {
    var sql = $sql.item.homedelete;
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
// 增加接口
router.post('/addHomeData', (req, res) => {
    var sql = $sql.item.homeadd;
    var params = req.body;
    console.log(params);
    
    conn.query(sql, [params.name,params.section, params.answer,params.sort,params.analysis,params.difficulty,params.gold,params.point], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/selectSort', (req, res) => {
    var sql = $sql.item.sortselect;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.sort], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
module.exports = router;