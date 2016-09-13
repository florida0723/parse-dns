var fs  = require("fs"),
	url = require("url");

//定义goIndex跳转首页函数
exports.goIndex = function(req, res){
	var readPath = __dirname + '/' + url.parse("index.html").pathname;
	var indexPage = fs.readFileSync(readPath);

	res.end(indexPage);
}