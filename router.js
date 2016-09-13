var ParseDns = require("./parse_dns.js"),
	MainIndex = require("./main_index.js");

//创建router方法，并将该方法暴露给外部接口
exports.router = function(req, res, pathname){
	switch(pathname){
		case "/parse":
			ParseDns.parseDns(req, res);    //执行DNS解析
			break;
		default:
			MainIndex.goIndex(req, res);    //响应HTML到客户端
	}
}