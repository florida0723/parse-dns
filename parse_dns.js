var querystring = require("querystring"),
	dns = require("dns");

exports.parseDns = function(req, res){
	var postData = "";
	req.addListener("data", function(postDataChunk){
		postData += postDataChunk;
	});

	req.addListener("end", function(){
		var retData = getDns(postData, function(domain, address){
			res.writeHead(200, {'Content-Type':'text/html'});

			var html = '<html><head><title>DNS 查询</title><meta http-equiv="content-type" content="text/html;charset=utf-8" ></head>';
			html += '<body style="text-align:center;"><h1>DNS 查询结果</h1><div style="text-align:left;display: inline-block;">';

			html += '<p>Domain：<span style="color:red;">' + domain + '</span></p>';

			html += '<p>IP：<span style="color:red">' + address.join(',') + '</span></p>';

			html += '</div></body></html>';

			res.end(html);
		});
	});
}

//相当于私有方法
function getDns(postData, callback){
	var domain = querystring.parse(postData).search_dns;

	//异步解析域名
	dns.resolve(domain, function(err, address){
		if(!address){
			address = ['不存在域名'];
		}
		callback(domain, address);    //调用回调函数
	});
}