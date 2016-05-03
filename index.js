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
app.get("/",welcome);
require(_apps+"/goods.js")(app);
require(_apps+"/order.js")(app);
require(_apps+"/return.js")(app);
require(_apps+"/inquiry.js")(app);
require(_apps+"/quotation.js")(app);
app.listen(9527);