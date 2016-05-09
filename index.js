/**
 * Created by renzhaotian on 16-4-29.
 */

global._base   = __dirname;
global._apps = _base + "/apps";
global._service = _base + "/service";

var express = require("express");
var app = express();

var request = require("superagent");
global._request = request;

var mysql = require('mysql');
var conPool = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"romens@2015",
    connectionLimit:10
});
global._sqlPool = conPool;
global._suffix = "erpTest";

global._logger = require(_service + "/logService");

global._sqlobj = require("sqlobj");

function welcome(req,res,next) {
    res.json('欢迎使用成都雨诺"ERP"系统');
}
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(function(req,res,next){
    console.log("req.headers.host is " + req.headers.host);
    console.log("req._parsedUrl.path is " + req._parsedUrl.path);
    console.log("req.params is " + JSON.stringify(req.params));
    console.log("req.query is " + JSON.stringify(req.query))
    console.log("req.body is " + JSON.stringify(req.body));
    next()
});
app.get("/",welcome);
app.post("/ClientHandler.ashx",function(req,res){
    console.log(JSON.stringify(req.body))
    res.json({"status":200,"text":JSON.stringify(JSON.parse("{\r\n  \"status\": 200,\r\n  \"msg\": \"操作成功\",\r\n  \"data\": {\r\n    \"result\": \"ERP接收报价单成功\"\r\n  }\r\n}"))})
});



//require(_apps+"/auth/controller.js")(app)
//require(_apps+"/goods.js")(app);
//require(_apps+"/order.js")(app);
//require(_apps+"/return.js")(app);
//require(_apps+"/inquiry.js")(app);
//require(_apps+"/quotation.js")(app);
app.listen(9527);