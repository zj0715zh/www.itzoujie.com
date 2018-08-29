var mysql = require('mysql')
var db_name = 'sjCZvakWRrdDVRYHtrKr'; //数据库名称
var db_host = '47.89.249.180'; //数据库地址
var db_port = '3306'; // 数据库端口
var username = 'root'; //用户AK
var password = ''; //用户SK
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