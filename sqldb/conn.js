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
    multipleStatements: true
    //允许执行多条语句connection.query('select column1; select column2; select column3;', function(err, result){}
}
var pool = mysql.createPool(option);

var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports=query;