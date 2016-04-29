/**
 * Created by renzhaotian on 16-4-29.
 */
var express = require("express");
var request = require("superagent");
var app = express();
global.__base   = __dirname;
require("./goods.js")(app)
app.listen(9527);