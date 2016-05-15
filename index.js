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

var _ = require("underscore")

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
var authList = JSON.parse('[{"UserIdentityInfo":[{"GUID":"012345ab0","UserGuid":"012345ab0","UserImage":"images/defaultuser.png","RegisteTime":"2014-07-19T11:45:55.47","RegisteType":1,"ResisteSource":"0000011111","UserName":"both0","Sex":"1","Phone":"18653206277","Tel":"","EMail":"cloud@romens.cn","IMCode":"270130490","CompanyGUID":"222222","Address":"成都雨诺地2","HomePage":null,"USERCompanyName":"买卖提0","GUID1":"222222","EntCode":"both0","EntName":"成都雨诺","Address1":"成都雨诺地址21","EnterpriceEntity":"买卖提0","Tel1":"18653206277","ZipCode":"266071","EMail1":"cloud@romens.cn","AdministerGUID":"0000011111","State":0,"LicenseNo":"012345ab0","LicenseImageUrl":"http://IMMgr.yiyao365.cn/Img/20160429133116123.png"}],"UserBaseInfo":[{"UserCode":"testuserboth0"}],"UserType":[{"Role":"1"}]},{"UserIdentityInfo":[{"GUID":"012345ab1","UserGuid":"012345ab1","UserImage":"images/defaultuser.png","RegisteTime":"2014-07-19T11:45:55.47","RegisteType":1,"ResisteSource":"0000011111","UserName":"both1","Sex":"1","Phone":"18653206277","Tel":"","EMail":"cloud@romens.cn","IMCode":"270130490","CompanyGUID":"222222","Address":"成都雨诺地2","HomePage":null,"USERCompanyName":"买卖提1","GUID1":"222222","EntCode":"both1","EntName":"成都雨诺","Address1":"成都雨诺地址21","EnterpriceEntity":"买卖提1","Tel1":"18653206277","ZipCode":"266071","EMail1":"cloud@romens.cn","AdministerGUID":"0000011111","State":0,"LicenseNo":"012345ab1","LicenseImageUrl":"http://IMMgr.yiyao365.cn/Img/20160429133116123.png"}],"UserBaseInfo":[{"UserCode":"testuserboth1"}],"UserType":[{"Role":"1"}]},{"UserIdentityInfo":[{"GUID":"012345ab2","UserGuid":"012345ab2","UserImage":"images/defaultuser.png","RegisteTime":"2014-07-19T11:45:55.47","RegisteType":1,"ResisteSource":"0000011111","UserName":"both2","Sex":"1","Phone":"18653206277","Tel":"","EMail":"cloud@romens.cn","IMCode":"270130490","CompanyGUID":"222222","Address":"成都雨诺地2","HomePage":null,"USERCompanyName":"买卖提2","GUID1":"222222","EntCode":"both2","EntName":"成都雨诺","Address1":"成都雨诺地址21","EnterpriceEntity":"买卖提2","Tel1":"18653206277","ZipCode":"266071","EMail1":"cloud@romens.cn","AdministerGUID":"0000011111","State":0,"LicenseNo":"012345ab2","LicenseImageUrl":"http://IMMgr.yiyao365.cn/Img/20160429133116123.png"}],"UserBaseInfo":[{"UserCode":"testuserboth2"}],"UserType":[{"Role":"1"}]},{"UserIdentityInfo":[{"GUID":"012345ab3","UserGuid":"012345ab3","UserImage":"images/defaultuser.png","RegisteTime":"2014-07-19T11:45:55.47","RegisteType":1,"ResisteSource":"0000011111","UserName":"both3","Sex":"1","Phone":"18653206277","Tel":"","EMail":"cloud@romens.cn","IMCode":"270130490","CompanyGUID":"222222","Address":"成都雨诺地2","HomePage":null,"USERCompanyName":"买卖提3","GUID1":"222222","EntCode":"both3","EntName":"成都雨诺","Address1":"成都雨诺地址21","EnterpriceEntity":"买卖提3","Tel1":"18653206277","ZipCode":"266071","EMail1":"cloud@romens.cn","AdministerGUID":"0000011111","State":0,"LicenseNo":"012345ab3","LicenseImageUrl":"http://IMMgr.yiyao365.cn/Img/20160429133116123.png"}],"UserBaseInfo":[{"UserCode":"testuserboth3"}],"UserType":[{"Role":"1"}]},{"UserIdentityInfo":[{"GUID":"012345ab4","UserGuid":"012345ab4","UserImage":"images/defaultuser.png","RegisteTime":"2014-07-19T11:45:55.47","RegisteType":1,"ResisteSource":"0000011111","UserName":"both4","Sex":"1","Phone":"18653206277","Tel":"","EMail":"cloud@romens.cn","IMCode":"270130490","CompanyGUID":"222222","Address":"成都雨诺地2","HomePage":null,"USERCompanyName":"买卖提4","GUID1":"222222","EntCode":"both4","EntName":"成都雨诺","Address1":"成都雨诺地址21","EnterpriceEntity":"买卖提4","Tel1":"18653206277","ZipCode":"266071","EMail1":"cloud@romens.cn","AdministerGUID":"0000011111","State":0,"LicenseNo":"012345ab4","LicenseImageUrl":"http://IMMgr.yiyao365.cn/Img/20160429133116123.png"}],"UserBaseInfo":[{"UserCode":"testuserboth4"}],"UserType":[{"Role":"1"}]},{"UserIdentityInfo":[{"GUID":"012345ab5","UserGuid":"012345ab5","UserImage":"images/defaultuser.png","RegisteTime":"2014-07-19T11:45:55.47","RegisteType":1,"ResisteSource":"0000011111","UserName":"both5","Sex":"1","Phone":"18653206277","Tel":"","EMail":"cloud@romens.cn","IMCode":"270130490","CompanyGUID":"222222","Address":"成都雨诺地2","HomePage":null,"USERCompanyName":"买卖提5","GUID1":"222222","EntCode":"both5","EntName":"成都雨诺","Address1":"成都雨诺地址21","EnterpriceEntity":"买卖提5","Tel1":"18653206277","ZipCode":"266071","EMail1":"cloud@romens.cn","AdministerGUID":"0000011111","State":0,"LicenseNo":"012345ab5","LicenseImageUrl":"http://IMMgr.yiyao365.cn/Img/20160429133116123.png"}],"UserBaseInfo":[{"UserCode":"testuserboth5"}],"UserType":[{"Role":"1"}]},{"UserIdentityInfo":[{"GUID":"012345ab6","UserGuid":"012345ab6","UserImage":"images/defaultuser.png","RegisteTime":"2014-07-19T11:45:55.47","RegisteType":1,"ResisteSource":"0000011111","UserName":"both6","Sex":"1","Phone":"18653206277","Tel":"","EMail":"cloud@romens.cn","IMCode":"270130490","CompanyGUID":"222222","Address":"成都雨诺地2","HomePage":null,"USERCompanyName":"买卖提6","GUID1":"222222","EntCode":"both6","EntName":"成都雨诺","Address1":"成都雨诺地址21","EnterpriceEntity":"买卖提6","Tel1":"18653206277","ZipCode":"266071","EMail1":"cloud@romens.cn","AdministerGUID":"0000011111","State":0,"LicenseNo":"012345ab6","LicenseImageUrl":"http://IMMgr.yiyao365.cn/Img/20160429133116123.png"}],"UserBaseInfo":[{"UserCode":"testuserboth6"}],"UserType":[{"Role":"1"}]},{"UserIdentityInfo":[{"GUID":"012345ab7","UserGuid":"012345ab7","UserImage":"images/defaultuser.png","RegisteTime":"2014-07-19T11:45:55.47","RegisteType":1,"ResisteSource":"0000011111","UserName":"both7","Sex":"1","Phone":"18653206277","Tel":"","EMail":"cloud@romens.cn","IMCode":"270130490","CompanyGUID":"222222","Address":"成都雨诺地2","HomePage":null,"USERCompanyName":"买卖提7","GUID1":"222222","EntCode":"both7","EntName":"成都雨诺","Address1":"成都雨诺地址21","EnterpriceEntity":"买卖提7","Tel1":"18653206277","ZipCode":"266071","EMail1":"cloud@romens.cn","AdministerGUID":"0000011111","State":0,"LicenseNo":"012345ab7","LicenseImageUrl":"http://IMMgr.yiyao365.cn/Img/20160429133116123.png"}],"UserBaseInfo":[{"UserCode":"testuserboth7"}],"UserType":[{"Role":"1"}]},{"UserIdentityInfo":[{"GUID":"012345ab8","UserGuid":"012345ab8","UserImage":"images/defaultuser.png","RegisteTime":"2014-07-19T11:45:55.47","RegisteType":1,"ResisteSource":"0000011111","UserName":"both8","Sex":"1","Phone":"18653206277","Tel":"","EMail":"cloud@romens.cn","IMCode":"270130490","CompanyGUID":"222222","Address":"成都雨诺地2","HomePage":null,"USERCompanyName":"买卖提8","GUID1":"222222","EntCode":"both8","EntName":"成都雨诺","Address1":"成都雨诺地址21","EnterpriceEntity":"买卖提8","Tel1":"18653206277","ZipCode":"266071","EMail1":"cloud@romens.cn","AdministerGUID":"0000011111","State":0,"LicenseNo":"012345ab8","LicenseImageUrl":"http://IMMgr.yiyao365.cn/Img/20160429133116123.png"}],"UserBaseInfo":[{"UserCode":"testuserboth8"}],"UserType":[{"Role":"1"}]},{"UserIdentityInfo":[{"GUID":"012345ab9","UserGuid":"012345ab9","UserImage":"images/defaultuser.png","RegisteTime":"2014-07-19T11:45:55.47","RegisteType":1,"ResisteSource":"0000011111","UserName":"both9","Sex":"1","Phone":"18653206277","Tel":"","EMail":"cloud@romens.cn","IMCode":"270130490","CompanyGUID":"222222","Address":"成都雨诺地2","HomePage":null,"USERCompanyName":"买卖提9","GUID1":"222222","EntCode":"both9","EntName":"成都雨诺","Address1":"成都雨诺地址21","EnterpriceEntity":"买卖提9","Tel1":"18653206277","ZipCode":"266071","EMail1":"cloud@romens.cn","AdministerGUID":"0000011111","State":0,"LicenseNo":"012345ab9","LicenseImageUrl":"http://IMMgr.yiyao365.cn/Img/20160429133116123.png"}],"UserBaseInfo":[{"UserCode":"testuserboth9"}],"UserType":[{"Role":"1"}]}]');
app.post("/Handlers/login.ashx?",function(req,res){
    var userInfo = _.find(authList,function(item){
        return req.body.UserCode == item.UserBaseInfo[0].UserCode;


    });
    if(userInfo){
        res.json(userInfo)
    }else {


        res.json("!ERROR!密码错误，错误的登录信息")
    }
});



//require(_apps+"/auth/controller.js")(app)
//require(_apps+"/goods.js")(app);
//require(_apps+"/order.js")(app);
//require(_apps+"/return.js")(app);
//require(_apps+"/inquiry.js")(app);
//require(_apps+"/quotation.js")(app);
app.listen(9527);