var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var _ = require("underscore")
var port = process.env.PORT || 18080
var app = express()

var query = require('./sqldb/conn');
var routes = require('./route/index');
var commonfuc = require('./commonfuc');

var DB_WebLog = 'DB_WebLog';
var DB_WebLog_Discuss = 'DB_WebLog_Discuss';
var DB_WebLog_Tag = 'DB_WebLog_Tag';
var DB_Message_Board = 'DB_Message_Board';
var DB_User = 'DB_User';
var DB_ActiveList = 'DB_ActiveList';
var DB_JoinList = 'DB_JoinList';
var DB_reportError = 'report_error';

app.set('views','./views')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))//接受form表单提交的数据
app.use(bodyParser.json())//接受json数据格式提交的数据
app.use(express.static(path.join(__dirname,'static')))
app.listen(port)

console.log("node start success at port:"+port)

//页面路由
app.get('/',routes.index)
app.get('/door',routes.door)
app.get('/weblog',routes.weblog)
app.get('/teacms',routes.teacms)
app.get('/wxpay',routes.wxpay)


//以下为API接口
app.get('/weblog/fetchWebLogs',function(req,res){
    var type = req.query.type || "all";
    var responseDate = {code:200,msg:'success',content:[]}
    query('SELECT * FROM '+DB_WebLog
        ,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:'查询失败'});
            res.end();
            return;
        }
        console.log('query success \n');
        responseDate.content = vals;
        res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'})
        res.end(JSON.stringify(responseDate))
    });
})

//获取最新羽毛球活动信息
app.get('/active/getLatestActive',function(req,res){
    var activeid = req.query.activeid || 0;
    var responseDate = {code:200,msg:'success',content:[]}
    var sqlstr  = '';
    if(activeid==0){
        sqlstr = 'SELECT * FROM '+DB_ActiveList+' order by id DESC limit 1'
    }else{
        sqlstr = 'SELECT * FROM '+DB_ActiveList+' WHERE id='+activeid
    }
    query(sqlstr,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:err});
            res.end();
            return;
        }
        console.log('query success \n');
        responseDate.content = vals;
        res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'})
        res.end(JSON.stringify(responseDate))
    });
})

//获取对应羽毛球活动参加的人员列表
app.get('/active/getJoinUser',function(req,res){
    var activeid = req.query.activeid;
    var responseDate = {code:200,msg:'success',content:[]}
    var sqlstr  = '';
    if(activeid){
        sqlstr = 'SELECT * FROM '+DB_JoinList+' WHERE activeid='+activeid
    }else{
        res.json({code:-1,message:'缺少query参数activeid'});
        res.end();
        return;
    }
    query(sqlstr,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:err});
            res.end();
            return;
        }
        console.log('query success \n');
        responseDate.content = vals;
        res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'})
        res.end(JSON.stringify(responseDate))
    });
})

//报名接口
app.post('/active/addJoinUser',function(req,res){
    var data = req.body;
    var sqlstr  = '';
    if(data.name){
        sqlstr = 'INSERT INTO '+DB_JoinList+" (name,province,country,activeid,avatarUrl,city) VALUES('"+data.name+"','"+data.province+"','"+data.country+"','"+data.activeid+"','"+data.avatarUrl+"','"+data.city+"')"
    }else{
        res.json({code:-1,message:'报名失败，缺少用户信息'});
        res.end();
        return;
    }
    query(sqlstr,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:err});
            res.end();
            return;
        }
        console.log('query success \n');
        res.json({code:200,message:'报名成功'});
        res.end();
    });
})

//取消报名接口
app.post('/active/cancelJoin',function(req,res){
    var data = req.body;
    var sqlstr  = '';
    if(data.userid){
        sqlstr = 'DELETE FROM '+DB_JoinList+' WHERE id='+data.userid
    }else{
        res.json({code:-1,message:'缺少参数userid'});
        res.end();
        return;
    }
    query(sqlstr,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:err});
            res.end();
            return;
        }
        console.log('query success \n');
        res.json({code:200,message:'取消成功'});
        res.end();
    });
})

//根据用户名查活动ID
app.post('/active/getActiveByUser',function(req,res){
    var data = req.body;
    var responseDate = {code:200,msg:'success'}
    var sqlstr  = '';
    if(data.userid){
        sqlstr = "SELECT * FROM "+DB_JoinList+" WHERE name='"+data.nickname+"' order by activeid DESC limit 1";
    }else{
        res.json({code:-1,message:'缺少参数nickname'});
        res.end();
        return;
    }
    query(sqlstr,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:err});
            res.end();
            return;
        }
        if(vals.length<1){
            sqlstr = "SELECT * FROM "+DB_ActiveList+" WHERE createuser='"+data.nickname+"'";
            query(sqlstr,function(err,vals,fields){
                if (err) {
                    res.json({code:-1,message:err});
                    res.end();
                    return;
                }
                responseDate.content = vals;
                res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'})
                res.end(JSON.stringify(responseDate))
            });
        }else{
            responseDate.content = vals;
            res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'})
            res.end(JSON.stringify(responseDate))
        }        
    });
})

//活动录入
app.post('/active/addActive',function(req,res){
    var data = req.body;
    var sqlstr  = '';
    if(data.name&&data.time&&data.address&&data.createuser){
        sqlstr = 'INSERT INTO '+DB_ActiveList+" (name,time,address,createuser) VALUES('"+data.name+"','"+data.time+"','"+data.address+"','"+data.createuser+"')"
    }else{
        res.json({code:-1,message:'请填写完整的活动信息'});
        res.end();
        return;
    }
    query(sqlstr,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:err});
            res.end();
            return;
        }
        console.log('query success \n');
        res.json({code:200,message:'活动添加成功'});
        res.end();
    });
})

//个人博客留言板接口
app.post('/msg/submit',function(req,res){
    var data = req.body;
    var client_ip = commonfuc.get_ip(req); 
    if(data.username&&data.email&&data.message){
        query("INSERT INTO "+ DB_Message_Board +"(username,email,content,clientip) VALUES('"+data.username+"','"+data.email+"','"+data.message+"','"+client_ip+"')"
            ,function(err,vals,fields){
            if (err) {
                res.end('insertData error');
                console.log(err);
                return;
            }
            console.log('insert success \n');
            res.json({code:200,message:'提交成功'});
            res.end();
        });
    }else{
        res.json({code:-1,message:'内容不能为空'});
        res.end();
    }
})

//前端错误上报
app.post('/error/report',function(req,res){
    var data = req.body;
    var client_ip = commonfuc.get_ip(req); 
    try{
        query("INSERT INTO "+ DB_reportError +"(current_url,err_msg,cookie_value,err_from,extro_info,client_ip) VALUES('"+data.localUrl+"','"+data.errorMsg+"','"+data.cookieValue+"','"+data.errorFrom+"','"+data.extroInfo+"','"+client_ip+"')"
            ,function(err,vals,fields){
            if (err) {
                res.json({code:-1,message:err.sqlMessage});
                res.end();
                console.log(err);
                return;
            }
            console.log('insert success \n');
            res.json({code:200,message:'上报成功'});
            res.end();
        });
    }catch(err){
        res.json({code:-1,message:err});
        res.end();
    }
})





