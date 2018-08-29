//视图路由
exports.index = function(req, res, next) {
  	res.render('index',{title:'空间首页'})
};
exports.door = function(req,res){
	res.render('door',{title: '茶社门面'});
};
exports.weblog = function(req,res){
	res.render('weblog',{title: '网络日志'});
}
exports.teacms = function(req,res){
	res.render('teacms',{title: '茶社后台管理系统'});
}
exports.wxpay = function(req,res){
	res.render('wxpay',{title: '微信支付'});
}
