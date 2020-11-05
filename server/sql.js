var sql = {
    // 题库
    item:{
        getitem : 'select * from itembank',
        add : 'insert into itembank(name,section,answer,sort,analysis,difficulty,gold,point) values(?,?,?,?,?,?,?,?)',
        delete : 'delete from itembank where id = ?',
        update : 'update itembank set name = ?,section = ?, answer = ?,sort = ?,analysis = ?, difficulty = ?, gold = ?, point = ? where id = ?',
        search : 'select * from itembank where name like ?',
        select: "select * from itembank where id = ?",
        homesearch : 'select * from homebank where name like ?',
        homegetitem : 'select * from homebank',
        homeupdate : 'update homebank set name = ?,section = ?, answer = ?,sort = ?,analysis = ?, difficulty = ?, gold = ?, point = ? where id = ?',
        homedelete : 'delete from homebank where id = ?',
        homeadd : 'insert into homebank(name,section,answer,sort,analysis,difficulty,gold,point) values(?,?,?,?,?,?,?,?)',
        sortselect : 'select * from itembank where sort = ?'
    },
    // 试卷
    test:{
        add : 'insert into test(name,creator,createtime,showtime,password,complete) values(?,?,?,?,?,?)',
        delete : 'delete from test where id = ?',
        update : 'update test set name = ?,creator = ?, createtime = ?,showtime = ?,password=?, complete = ?, single = ?,multiple=?, judge=?, short=?,time = ?, teacher=?, publish = ? where id = ?',
        select : 'select * from test where name like ?',
        gettest : 'select * from test',
        idselect: 'select * from test where id = ?',
        search: 'select * from test where publish = ?',
        updatepublish:"update test set publish = ? where id = ?"
    },
    user:{
        add:'insert into user(username,password,sort,name,email,phone,class,subject) values(?,?,?,?,?,?,?,?)',
        select : 'select * from user where username = ?',
        selectinfo: "select * from user where username = ? and sort = ?",
        update: 'update user set username = ?, password = ?, name = ?, sno = ?,phone = ?, email = ?, class = ?, subject = ?, teacher = ? where id = ?',
        getclassdata: 'select * from user where subject = ? and sort = ?',
        updateclassdata: 'update user set sno = ?, name = ?, class = ?, phone = ? where id = ? ',
        delclassdata: 'update user set class = "" where id = ?',
        searchclassdata: 'select * from user where (sno like ? or name like ?) and class = ? and sort = ?',
        selectclassdata: 'select * from user where (class = ? and sort = ?)'
    },
    homework:{
        add : 'insert into homework(name,creator,single,multiple,judge,short,time,createtime) values(?,?,?,?,?,?,?,?)',
        delete : 'delete from homework where id = ?',
        update : 'update homework set name = ?,creator = ?, createtime = ?,showtime = ?,password=?, complete = ?, single = ?,multiple=?, judge=?, short=?, teacher=? where id = ?',
        search : 'select * from homework where name like ?',
        gethomework : 'select * from homework',
        select: 'select * from homework where id = ?'
    },
    appraise:{
        getself: 'select * from appraise where appraiser = ? and beappraiser = ?',
        getother: 'select * from appraise where appraiser != ? and beappraiser = ?',
        addself: 'insert into appraise(appraiser,beappraiser,content,createtime) values(?,?,?,?)',
        update: 'update appraise set appraiser = ?, beappraiser = ?, content = ?, createtime = ? where id = ?'
    },
    subject:{
        getsubject:'select * from subject where teacher = ?',
        delete: 'delete from subject where id = ?',
        add:'insert into subject(name,teacher,point,chapter,coursetime,detail) values(?,?,?,?,?,?)',
        update:'update subject set name = ?, teacher = ?, point = ?, chapter = ?, coursetime = ?, detail = ? where id = ?',
        search:"select * from subject where chapter like ? or point like ?",
        select:'select * from subject where name = ?and teacher = ?',
    },
    answer:{
        add:'insert into answer(testname,studentname,createtime,totalgold,sum,answer,finish) values(?,?,?,?,?,?,?)',
        getdata:'select * from answer',
        update:'update answer set testname = ?, studentname = ?, createtime = ?, totalgold = ?, sum = ?, answer = ? ,finish = ? where id = ?',
        search:'select * from answer where testname like ? ',
        searchs:'select * from answer where testname like ? and studentname = ? and finish = ? ',
        select:'select * from answer where studentname = ? and finish = ? '
    },
    feedback:{
        getdata:'select * from feedback',
        getInfo:'select * from studentfeedback where teacher = ? and chapter = ? ',
        update:'update feedback set pointsum = pointsum + 1 where point = ?',
        add:'insert into feedback(point,pointsum,test) values(?,?,?)',
        getalldata:'select * from feedback where test = ? ORDER BY pointsum DESC limit 5',
        addS:'insert into studentfeedback(name,teacher,point,chapter,detail,difficult,info,difficults,studentname) values(?,?,?,?,?,?,?,?,?)',
        getstudentdata:'select id, point,chapter,detail,avg(difficult) avg from studentfeedback where teacher = ? group by(chapter)'
    },
    administrator:{
        //学生
        getstudentdata:'select * from user where sort = ?',
        delstudentdata:'delete from user where id = ?',
        updatestudentdata:'update user set name = ?, sno = ?, class = ?, username = ?, password = ?, subject = ?, teacher = ? where id = ?',
        addstudentdata:'insert into user(name,sno,class,username,password,subject,teacher,sort) values(?,?,?,?,?,?,?,?)',
        searchstudentdata:'select * from user where sort = ? and name like ?',

        //教师
        getTeacherdata:'select * from user where sort = ?',
        delTeacherdata:'delete from user where id = ?',
        updateTeacherdata:'update user set name = ?, class = ?, username = ?, password = ? where id = ?',
        addTeacherdata:'insert into user(name,class,username,password,sort) values(?,?,?,?,?)',
        searchTeacherdata:'select * from user where sort = ? and name like ?',

        //学科
        getSubjectdata:'select * from user where sort = ?',
        delSubjectdata:'update user set subject = "" where id = ? ',
        updateSubjectdata:'update user set name = ?, class = ?, subject = ? where id = ?',
        addSubjectdata:'update user set class = ?, subject = ?  where sort = ? and name = ? ',
        searchSubjectdata:'select * from user where sort = ? and name like ?',

        //班级
        getClassData:'select class, count(class) from user where sort = ? group by class',
        searchClassData:'select class, count(class) from user where sort = ? and class like ? group by class',
        delClassdata:'update user set class = "未分配班级学生" where class = ? ',
    }
}
 
module.exports = sql;