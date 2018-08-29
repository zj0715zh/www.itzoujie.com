var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var _ = require("underscore")
var port = process.env.PORT || 18080
var app = express()
// var connectMysql = require('./sqldb/conn')
var routes = require('./route/index');
var mysql = require('mysql')
var db_name = 'sjCZvakWRrdDVRYHtrKr'; //数据库名称
var db_host = 'sqld.duapp.com'; //数据库地址
var db_port = '4050'; // 数据库端口
var username = 'f85532d64f5a416187dd61c64db680d4'; //用户AK
var password = 'd1c37a60aae64ee6a1304ce736a56df2'; //用户SK
var option = {
    host: db_host,
    port: db_port,
    user: username,
    password: password,
    database: db_name,
    multipleStatements: true//允许执行多条语句connection.query('select column1; select column2; select column3;', function(err, result){}
}
var client = mysql.createConnection(option);
var DB_WebLog = 'DB_WebLog';
var DB_WebLog_Discuss = 'DB_WebLog_Discuss';
var DB_WebLog_Tag = 'DB_WebLog_Tag';
var DB_Message_Board = 'DB_Message_Board';
var DB_User = 'DB_User';

//连接数据库
function connectMysql(req,res){
    client.connect(function(err){
        if (err) {
            console.log('connect error');
            console.log(err);
        return;
        }
        console.log('connected success\n');
        createTable();

    });
    client.on('error',function(err) {
      if (err.errno != 'ECONNRESET') {
        throw err;
      } else {
        //do nothing
      }
    });
}

//建表
function createTable(){
    client.query(
        'CREATE TABLE '+ DB_WebLog +
        '(id INT(11) AUTO_INCREMENT, '+'title VARCHAR(255), '+'content TEXT, '+'tags VARCHAR(255), '+
        'discussnum INT(11), '+'createdate DATE, '+'dianzan INT(11), '+'collect INT(11), '+
        'PRIMARY KEY (id));', function(err, results) {
        if (err && err.number != client.ERROR_TABLE_EXISTS_ERROR) {
            console.log(err);
            return;
        }
            console.log("create table success \n");
            // client.end();
        }
    );
    client.query(
        'CREATE TABLE '+ DB_Message_Board +
        '(id INT(11) AUTO_INCREMENT, '+'username VARCHAR(255), '+'content VARCHAR(255), '+'email VARCHAR(255), '+
        'createdate DATE, '+'PRIMARY KEY (id));', function(err, results) {
        if (err && err.number != client.ERROR_TABLE_EXISTS_ERROR) {
            console.log(err);
            return;
        }
            console.log("create table success \n");
            // client.end();
        }
    );
    client.query(
        'CREATE TABLE '+ DB_WebLog_Discuss +
        '(id INT(11) AUTO_INCREMENT, '+'weblogId INT(11), '+'content TEXT, '+'dianzan INT(11), '+
        'createdate DATE, '+'useId INT(11), '+'useName VARCHAR(255), '+
        'PRIMARY KEY (id));', function(err, results) {
        if (err && err.number != client.ERROR_TABLE_EXISTS_ERROR) {
            console.log(err);
            return;
        }
            console.log("create table success \n");
            // client.end();
        }
    );
    client.query(
        'CREATE TABLE '+ DB_WebLog_Tag +
        '(id INT(11) AUTO_INCREMENT, '+'tagid INT(11), '+'tagname VARCHAR(255), '+
        'PRIMARY KEY (id));', function(err, results) {
        if (err && err.number != client.ERROR_TABLE_EXISTS_ERROR) {
            console.log(err);
            return;
        }
            console.log("create table success \n");
            // client.end();
        }
    );
    client.query(
        'CREATE TABLE '+ DB_User +
        '(id INT(11) AUTO_INCREMENT, '+'useName VARCHAR(255), '+'createdate DATE, '+'mobile VARCHAR(255), '+
        'email VARCHAR(255), '+'address VARCHAR(255), '+
        'PRIMARY KEY (id));', function(err, results) {
        if (err && err.number != client.ERROR_TABLE_EXISTS_ERROR) {
            console.log(err);
            return;
        }
            console.log("create table success \n");
            client.end();
        }
    );
}

connectMysql();

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
    var client = mysql.createConnection(option);
    var type = req.query.type || "all";
    var response;
    console.log(type)
    var responseDate = {code:1,msg:'success',content:[]}
    client.connect(function(err){
        if (err) {
            console.log('connect error');
            console.log(err);
            return;
        }
        console.log('connected success\n');
        client.query(
            'SELECT * FROM '+DB_WebLog,
            function (err, results, fields) {
                if (err) {
                  res.end('query error');
                  console.log(err);
                  return;
                }
                console.log('query success \n');
                responseDate.content = results;
                res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'})
                res.end(JSON.stringify(responseDate))
                client.end();
            }
        );
    });
    client.on('error',function(err) {
        if (err.errno != 'ECONNRESET') {
            throw err;
        } else {
            //do nothing
        }
        client.end();
    });
})


app.post('/msg/submit',function(req,res){
    var client = mysql.createConnection(option);
    var data = req.body;
    var dbname = 'DB_Message_Board';
    if(data.username&&data.email&&data.message){
        client.connect(function(err){
            if (err) {
                console.log('connect error');
                console.log(err);
                return;
            }
            console.log('connected success\n');
            client.query(
                'INSERT INTO '+ dbname +
                ' SET username = ?, email = ?, content = ?, createdate = ?',
                [data.username,data.email,data.message,new Date()],
                function(err, results) {
                    if (err) {
                      res.end('insertData error');
                      console.log(err);
                      client.end();
                      return;
                    }
                    console.log('insert success \n');
                    res.json({code:200,message:'提交成功'});
                    res.end();
                    client.end();
                }
            );
        });
        client.on('error',function(err) {
            if (err.errno != 'ECONNRESET') {
                throw err;
            } else {
                //do nothing
            }
            client.end();
        });
    }else{
        res.json({code:-1,message:'内容不能为空'});
        res.end();
    }
})

app.get('/house/:user',function(req,res){
    var client = mysql.createConnection(option);
    var user = req.params.user || "zoujie";
    var TEST_TABLE = 'baeSql';
    client.connect(function(err){
        if (err) {
            console.log('connect error');
            console.log(err);
            return;
        }
        console.log('connected success\n');
        client.query(
            'INSERT INTO '+ TEST_TABLE +
            ' SET title = ?, text = ?',
            [user, 'welcome to BAE'],
            function(err, results) {
                if (err) {
                  res.end('insertData error');
                  console.log(err);
                  return;
                }
            console.log('insert success \n');
          }
        );
    });
    client.on('error',function(err) {
        if (err.errno != 'ECONNRESET') {
            throw err;
        } else {
            //do nothing
        }
    });
    res.render('house',{
	   title:'这是测试页',
    })
})





