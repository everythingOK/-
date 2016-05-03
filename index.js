/**
 * Created by renzhaotian on 16-4-29.
 */
var express = require("express");
var request = require("superagent");
var app = express();
var mysql = require('mysql');
var conPool = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"romens@2015",
    connectionLimit:10
});
global._sqlPool = conPool;
global.__base   = __dirname;
console.log(__dirname);
//require("/goods.js")(app);
//require("/order.js")(app);
//require("/return.js")(app);
//require("/inquiry.js")(app);
//require("/quotation.js")
app.listen(9527);