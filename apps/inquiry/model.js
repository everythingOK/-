/**
 * Created by renzhaotian on 16-5-6.
 */
var _ = require("underscore");
var service = require("../../service/inquiry.js")();
var request = require("superagent");
var goodsList = [
    {
        "commonName":"金花消痤颗粒",
        "MATERIELCODE":"1020101130",
        "PLANQUANTITY":1,
        "PLATFORMCODE":"1",
        "CONVERSION":2,
        "UNITPRICETAX":5.9,
        "PURCHASEUPSET":0,
        "BILLNO": "SC201511010029-SZQ-01",
        "BALANCEPERIOD":0
    },
    {
        "commonName":"愈创甘油醚糖浆",
        "MATERIELCODE":"1030101198",
        "PLANQUANTITY":10,
        "PLATFORMCODE":"2",
        "CONVERSION":2,
        "UNITPRICETAX":5.9,
        "PURCHASEUPSET":0,
        "BILLNO": "SC201511010029-SZQ-01",
        "BALANCEPERIOD":0},
    {
        "commonName":"复方片仔癀含片",
        "MATERIELCODE":"1070401016",
        "PLANQUANTITY":11,
        "PLATFORMCODE":"4",
        "CONVERSION":2,
        "UNITPRICETAX":5.9,
        "PURCHASEUPSET":0,
        "BILLNO": "SC201511010029-SZQ-01",
        "BALANCEPERIOD":0},
    {
        "commonName":"舒秘胶囊",
        "MATERIELCODE":"1080402024",
        "PLANQUANTITY":100,
        "PLATFORMCODE":"6",
        "CONVERSION":2,
        "UNITPRICETAX":5.9,
        "PURCHASEUPSET":0,
        "BILLNO": "SC201511010029-SZQ-01",
        "BALANCEPERIOD":0},
    {
        "commonName":"维妇康洗液",
        "MATERIELCODE":"1100101178",
        "PLANQUANTITY":101,
        "PLATFORMCODE":"7",
        "CONVERSION":2,
        "UNITPRICETAX":5.9,
        "PURCHASEUPSET":0,
        "BILLNO": "SC201511010029-SZQ-01",
        "BALANCEPERIOD":0}];
var sellerList = [
    {"UserCode":"testuserbuyer",SUPPLIERCODE:"11111",idNum:4,Type:"both"},
    {"UserCode":"testuserseller",SUPPLIERCODE:"22222",idNum:4,Type:"both"},
    {"UserCode":"testuserboth1",SUPPLIERCODE:"33333",idNum:5,Type:"both"}];

var UGmap = {
    "金花消痤颗粒":["testuserseller","testuserboth1"],
    "愈创甘油醚糖浆":["testuserseller"]
};
var inquiryMsgDataGen = function(sellerList, goodsList, UGmap,inquiryGuid) {
    var msgData = [];
    _.each(UGmap,function(value,key,list){
        _.each(value,function(item){
            msgData.push({good:key,seller:item})
        })
    });

    _.map(msgData,function(item){
        item.GUID = inquiryGuid;
        var goodInfo = _.find(goodsList,function(good){
            return good.commonName == item.good;
        });
        item.MATERIELCODE = goodInfo.MATERIELCODE;
        var supplierInfo = _.find(sellerList,function(seller){
            return seller.UserCode == item.seller;
        });
        item.SUPPLIERCODE = supplierInfo.SUPPLIERCODE;
        item.PLATFORMCODE = goodInfo.PLATFORMCODE;
        item.PLANQUANTITY = goodInfo.PLANQUANTITY;
        item.CONVERSION = goodInfo.CONVERSION;
        item.UNITPRICETAX = goodInfo.UNITPRICETAX;
        item.PURCHASEUPSET = goodInfo.PURCHASEUPSET;
        item.BALANCEPERIOD = goodInfo.BALANCEPERIOD;
        item.BILLNO = goodInfo.BILLNO;
        delete item.good;
        delete item.seller;
    });
    return msgData;

};
var inquiryGuid = ("e56e9a51-7e5c-4f42-9c6e-22eaaa" + _.random(100000,999999).toString());
var inquiry = inquiryMsgDataGen(sellerList,goodsList,UGmap,inquiryGuid);
var testGen = function(msgData){
    var inquiry =
    {"version":"1.0",
        "msgId":"",
        "msgType":"EDI_INQUIRY_CREATE",
        "msgData":{
            "PURCHASEPLANTEMP":[]
        },
        "checksum":"cd9824063a17d23a6ac255a21a487447"
    }
    var msgId = "133015df30-b64c-48d6-a3e7-89198b025626169aaa" + _.random(100000,999999).toString();
    inquiry.msgId = msgId;
    inquiry.msgData.PURCHASEPLANTEMP = msgData;
    return inquiry;
}
var testMsg = testGen(inquiry);
request.post("http://127.0.0.1:3300" + "/api/erp/3")
    .send({msg: JSON.stringify(testMsg)})
    .set('Accept', 'application/json')
    .end(function(err,res){
        if(err){
            console.log("ERR")
            console.log(err)
        }else{
            if(res.ok){
                console.log("OK")
            }
        }
    });