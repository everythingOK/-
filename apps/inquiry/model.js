/**
 * Created by renzhaotian on 16-5-6.
 */
var _ = require("underscore");
var service = require("../../service/inquiry.js")();
var request = require("superagent");
var mysql = require("mysql").createConnection({
    host:"localhost",
    user:"root",
    password:"romens@2015"
});
var GoodsList = function(item){
    var GoodsList = [];
    GoodsList.push(item);
    this.result = GoodsList;
};
GoodsList.result = [];
var abc = [];
var goodsListxxx = [];
var sellerList = [
    {"UserCode":"testuserboth1",SUPPLIERCODE:"1",idNum:101,Type:"both"},
    {"UserCode":"testuserboth2",SUPPLIERCODE:"2",idNum:102,Type:"both"},
    {"UserCode":"testuserboth3",SUPPLIERCODE:"3",idNum:103,Type:"both"},
    {"UserCode":"testuserboth4",SUPPLIERCODE:"4",idNum:104,Type:"both"},
    {"UserCode":"testuserboth5",SUPPLIERCODE:"5",idNum:105,Type:"both"},
    {"UserCode":"testuserboth6",SUPPLIERCODE:"6",idNum:106,Type:"both"},
    {"UserCode":"testuserboth7",SUPPLIERCODE:"7",idNum:107,Type:"both"},
    {"UserCode":"testuserboth8",SUPPLIERCODE:"8",idNum:108,Type:"both"},
    {"UserCode":"testuserboth9",SUPPLIERCODE:"9",idNum:109,Type:"both"},
    {"UserCode":"testuserboth10",SUPPLIERCODE:"10",idNum:110,Type:"both"},
    {"UserCode":"testuserboth0",SUPPLIERCODE:"0",idNum:100,Type:"both"}
];
mysql.query("select unicode,skuNo,goodsNo,commonName,packageQty from CustomerDB_renzhaotian_both7.GoodsInfo",function(err,result){
    if(err){
        console.log(err)
    }
    abc = result;
    var counter = 1;

    _.each(result,function(item){
        var goods = {};
        goods.commonName = item.commonName;
        goods.MATERIELCODE = item.skuNo;
        goods.PLANQUANTITY = counter;
        goods.PLATFORMCODE = item.unicode;
        goods.CONVERSION = item.packageQty;
        goods.UNITPRICETAX = 5.9;
        goods.PURCHASEUPSET = counter+ _.random(1,9999)/10000;
        goods.BILLNO = "SC201511" + _.random(100000,999999) + "-SZQ-01";
        goods.BALANCEPERIOD = 0;
        counter++;
        goodsListxxx.push(goods);
    });
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
                return good.PLATFORMCODE == item.good;
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
    var UGmap = {
        "1":["testuserboth8","testuserboth0"],
        "2":["testuserboth8"],
        "3":["testuserboth9","testuserboth0","testuserboth1"]
    };
    var oneGoodoneSupply = {
        "1":["testuserboth6"]
    };
    var thirtyGoodsOneSupplies = {

    };
    var sups = [];
    for(var j = 8; j<=9; j++){
        sups.push("testuserboth"+j)
    }
    var sups1 = ["testuserboth0","testuserboth2"]
    for(var i = 3;i<=5;i++){


        thirtyGoodsOneSupplies[i] = sups1;
    }
    console.log(thirtyGoodsOneSupplies);
    var inquiry = inquiryMsgDataGen(sellerList,goodsListxxx,thirtyGoodsOneSupplies,inquiryGuid);
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
    };
    var testMsg = testGen(inquiry);

    console.log(testMsg.msgData.PURCHASEPLANTEMP);
    request.post("http://127.0.0.1:3300" + "/api/erp/106")
        .send({msg: JSON.stringify(testMsg)})
        .set('Accept', 'application/json')
        .end(function(err,res){
            if(err){
                console.log("ERR");
                console.log(err)
            }else{
                if(res.ok){
                    console.log("OK")
                }
            }
        });
    mysql.destroy()
});
//setTimeout(function(){
//    console.log(goodsListxxx)
//},5000);
//var goodsInfoList = {
//    id: 1,
//    guid: 'CC3855DD-6FAE-4598-94D7-1AEBE23496AF',
//    unicode: '1',
//    packageQty: 1,
//    goodsTypeId: 67,
//    goodsType: null,
//    goodsNo: '1020101130',
//    skuNo: null,
//    barcode: '123456abc',
//    isPrescriptionDrugs: 0,
//    commonName: '金花消痤颗粒',
//    pinyinInitials: '',
//    alias: '△金花消痤颗粒',
//    licenseNo: '国药准字Z20040143',
//    filingNumberValidDate: "Fri Jan 01 2100 00:00:00 GMT+0800 (CST)",
//    spec: '6克*6袋',
//    supplier: '成都雨诺',
//    birthPlace: '四川成都',
//    producer: '上海华源制药安徽广生药业有限公司',
//    measureUnit: '盒',
//    imageUrl: 'http://files.yunuo365.com/images/conew_1020101130_small.jpg',
//    largePackUnit: '',
//    largePackNum: '1',
//    largePackBarcode: '',
//    middlePackUnit: '',
//    middlePackNum: '2',
//    middlePackBarcode: '',
//    smallPackUnit: '盒',
//    smallPackNum: '1',
//    smallPackBarcode: '',
//    drugsType: null,
//    gspTypeId: 1,
//    negSell: null,
//    isForbidden: 0,
//    isDeleted: 0,
//    isCheckStore: 0,
//    isAreaLimited: 0,
//    areaDesc: '',
//    clientDesc: null,
//    goodsDetails: '商品详情描述',
//    erpUpdatedOn: null,
//    lastAsyncTime: null
//    };
//var goodsList = [
//    {
//        "commonName":"金花消痤颗粒",
//        "MATERIELCODE":"1020101130",
//        "PLANQUANTITY":1,
//        "PLATFORMCODE":"1",
//        "CONVERSION":2,
//        "UNITPRICETAX":5.9,
//        "PURCHASEUPSET":0,
//        "BILLNO": "SC201511010029-SZQ-01",
//        "BALANCEPERIOD":0
//    },
//    {
//        "commonName":"愈创甘油醚糖浆",
//        "MATERIELCODE":"1030101198",
//        "PLANQUANTITY":10,
//        "PLATFORMCODE":"2",
//        "CONVERSION":2,
//        "UNITPRICETAX":5.9,
//        "PURCHASEUPSET":0,
//        "BILLNO": "SC201511010029-SZQ-01",
//        "BALANCEPERIOD":0},
//    {
//        "commonName":"复方片仔癀含片",
//        "MATERIELCODE":"1070401016",
//        "PLANQUANTITY":11,
//        "PLATFORMCODE":"4",
//        "CONVERSION":2,
//        "UNITPRICETAX":5.9,
//        "PURCHASEUPSET":0,
//        "BILLNO": "SC201511010029-SZQ-01",
//        "BALANCEPERIOD":0},
//    {
//        "commonName":"舒秘胶囊",
//        "MATERIELCODE":"1080402024",
//        "PLANQUANTITY":100,
//        "PLATFORMCODE":"6",
//        "CONVERSION":2,
//        "UNITPRICETAX":5.9,
//        "PURCHASEUPSET":0,
//        "BILLNO": "SC201511010029-SZQ-01",
//        "BALANCEPERIOD":0},
//    {
//        "commonName":"维妇康洗液",
//        "MATERIELCODE":"1100101178",
//        "PLANQUANTITY":101,
//        "PLATFORMCODE":"7",
//        "CONVERSION":2,
//        "UNITPRICETAX":5.9,
//        "PURCHASEUPSET":0,
//        "BILLNO": "SC201511010029-SZQ-01",
//        "BALANCEPERIOD":0}];
//
//var inquiryMsgDataGen = function(sellerList, goodsList, UGmap,inquiryGuid) {
//    var msgData = [];
//    _.each(UGmap,function(value,key,list){
//        _.each(value,function(item){
//            msgData.push({good:key,seller:item})
//        })
//    });
//
//    _.map(msgData,function(item){
//        item.GUID = inquiryGuid;
//        var goodInfo = _.find(goodsList,function(good){
//            return good.commonName == item.good;
//        });
//        item.MATERIELCODE = goodInfo.MATERIELCODE;
//        var supplierInfo = _.find(sellerList,function(seller){
//            return seller.UserCode == item.seller;
//        });
//        item.SUPPLIERCODE = supplierInfo.SUPPLIERCODE;
//        item.PLATFORMCODE = goodInfo.PLATFORMCODE;
//        item.PLANQUANTITY = goodInfo.PLANQUANTITY;
//        item.CONVERSION = goodInfo.CONVERSION;
//        item.UNITPRICETAX = goodInfo.UNITPRICETAX;
//        item.PURCHASEUPSET = goodInfo.PURCHASEUPSET;
//        item.BALANCEPERIOD = goodInfo.BALANCEPERIOD;
//        item.BILLNO = goodInfo.BILLNO;
//        delete item.good;
//        delete item.seller;
//    });
//    return msgData;
//
//};
//var inquiryGuid = ("e56e9a51-7e5c-4f42-9c6e-22eaaa" + _.random(100000,999999).toString());
//var UGmap = {
//    "金花消痤颗粒":["testuserboth1","testuserboth2"],
//    "愈创甘油醚糖浆":["testuserboth1"],
//    "复方片仔癀含片":["testuserboth1","testuserboth2","testuserboth3"]
//};
//var inquiry = inquiryMsgDataGen(sellerList,goodsList,UGmap,inquiryGuid);
//var testGen = function(msgData){
//    var inquiry =
//    {"version":"1.0",
//        "msgId":"",
//        "msgType":"EDI_INQUIRY_CREATE",
//        "msgData":{
//            "PURCHASEPLANTEMP":[]
//        },
//        "checksum":"cd9824063a17d23a6ac255a21a487447"
//    }
//    var msgId = "133015df30-b64c-48d6-a3e7-89198b025626169aaa" + _.random(100000,999999).toString();
//    inquiry.msgId = msgId;
//    inquiry.msgData.PURCHASEPLANTEMP = msgData;
//    return inquiry;
//};
//var testMsg = testGen(inquiry);
//
////console.log(testMsg);
//request.post("http://127.0.0.1:3300" + "/api/erp/104")
//    .send({msg: JSON.stringify(testMsg)})
//    .set('Accept', 'application/json')
//    .end(function(err,res){
//        if(err){
//            console.log("ERR");
//            console.log(err)
//        }else{
//            if(res.ok){
//                console.log("OK")
//            }
//        }
//    });