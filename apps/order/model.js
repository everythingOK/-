/**
 * Created by renzhaotian on 16-5-6.
 */
var _ = require("underscore");
var mysql = require("mysql").createConnection({
    host:"localhost",
    user:"root",
    password:"romens@2015"
});
var request = require("superagent");
var moment = require("moment");
var example =
    {
        "version":"1.0","msgId":"13e518ff1b-635c-4703-953c-4cf45e07b6761462444172984000001",
        "msgType":"EDI_ORDER_CREATE_FROM_BUYER",
        "msgData":{
            "STOCKORDERFORM":
                [{"GUID":"M201605050160-10002",
                    "BILLNO":"M20160505016010002",
                    "SUPPLIERCODE":"88888",
                    "SUPPLIERNAME":"甘肃众友药业中药饮片加工有限公司(江英)",
                    "BILLDATE":"2016-05-05T00:00:00",
                    "EMPLOYEECODE":"SZQ",
                    "EMPLOYEENAME":"Song",
                    "USEFULDATE":"2016-06-19T00:00:00",
                    "SUPPLIEREMPLOYEENAME":"张文远",
                    "ADVGOODSARRIVEDATE":"2016-06-04T00:00:00",
                    "CUSTOMERADDER":"adsasdas",
                    "REMARK":"由比价生成"}],
            "STOCKORDERFORMDETAIL":
                [{"GUID":"78FAA0D2-A39F-440D-91A8-D56E6B9B8453",
                    "STOCKORDERFORMGUID":"M201605050160-10002",
                    "QUANTITY":17,
                    "INPRICE":9.9,
                    "HH":"1080102028",
                    "PZWH":"国药准字Z20026560",
                    "AMOUNTTAX":168.3,
                    "DETAILNO":"1",
                    "PLATFORMCODE":"5",
                    "CONVERSION": "2.0000"}]
    },
    "checksum":"f1105032b9918e10c6c64116ea82d4e7"};
var sellerList = [
    {"UserCode":"testuserboth1",SUPPLIERCODE:"11111",idNum:101,Type:"both"},
    {"UserCode":"testuserboth2",SUPPLIERCODE:"22222",idNum:102,Type:"both"},
    {"UserCode":"testuserboth3",SUPPLIERCODE:"33333",idNum:103,Type:"both"},
    {"UserCode":"testuserboth4",SUPPLIERCODE:"44444",idNum:104,Type:"both"},
    {"UserCode":"testuserboth5",SUPPLIERCODE:"55555",idNum:105,Type:"both"},
    {"UserCode":"testuserboth6",SUPPLIERCODE:"66666",idNum:106,Type:"both"},
    {"UserCode":"testuserboth7",SUPPLIERCODE:"77777",idNum:107,Type:"both"},
    {"UserCode":"testuserboth8",SUPPLIERCODE:"88888",idNum:108,Type:"both"},
    {"UserCode":"testuserboth9",SUPPLIERCODE:"99999",idNum:109,Type:"both"},
    {"UserCode":"testuserboth0",SUPPLIERCODE:"00000",idNum:110,Type:"both"}
];
mysql.query("select id,unicode,skuNo,licenseNo,commonName,packageQty from CustomerDB_renzhaotian_both1.GoodsInfo",function(err,result) {
    if (err) {
        console.log(err)
    }
    console.log(result.length);
    var orderGUID = "M201605050160-" + _.random(10000,99999);
    var goodsList = goodsListGen(result,[2]);
    var timeObj1 = {
        "billDate": "2016-05-08T11:11:11",
        "usefulData":"2016-10-08T12:12:12",
        "advGoodsArriveDate":"2016-06-08T23:23:23"
    };
    var timeObj2 = {
        "billDate": "2016-05-11T11:11:11",
        "usefulData":"2016-11-08T12:12:12",
        "advGoodsArriveDate":"2016-04-08T23:23:23"
    };
    var buyerErpCode = "1";
    var msgData = orderMsgDataGen(buyerErpCode, goodsList,orderGUID,timeObj1);
    var msg = orderMsgGen(msgData);
    console.log(msg.msgData);
    request.post("http://127.0.0.1:3300" + "/api/erp/100")
        .send({msg: JSON.stringify(msg)})
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


    mysql.destroy();
});
var goodsListGen = function(allGoodsList,numList){
    var goodsList = [];
    _.each(numList,function(num){
        var good = _.find(allGoodsList,function(goods){
            return goods.id == num;
        });
        goodsList.push(good);
    })
    return goodsList;
};
var orderMsgGen = function(msgData){
    var order =
    {"version":"1.0",
        "msgId":"",
        "msgType":"EDI_ORDER_CREATE_FROM_BUYER",
        "msgData":{},
        "checksum":"cd9824063a17d23a6ac255a21a487447"//TODO 将来利用apiRobot替换
    };
    var msgId = "133015df30-b64c-48d6-a3e7-89198b025626169aaa" + _.random(100000,999999).toString();
    order.msgId = msgId;
    order.msgData = msgData;

    return order;
};
var orderMsgDataGen = function(buyerErpCode, goodsList,orderGuid,times) {
    var msgData = {};
    var stockOrderForm = [];
    var stockOrderDetails = [];
    var supplierCode = buyerErpCode;
    var supplierName = "买卖提" + buyerErpCode;
    stockOrderForm[0] ={
        "GUID":orderGuid,
        "BILLNO":"M201605050160"+ _.random(10000,99999),
        "SUPPLIERCODE":supplierCode,
        "SUPPLIERNAME":supplierName,
        "BILLDATE":times.billDate,
        "EMPLOYEECODE":"MMT",
        "EMPLOYEENAME":"MAI",
        "USEFULDATE":times.usefulData,
        "SUPPLIEREMPLOYEENAME":"卖卖提" + supplierName,
        "ADVGOODSARRIVEDATE":times.advGoodsArriveDate,
        "CUSTOMERADDER":"送货地址",
        "REMARK":"由脚本生成"};
    _.each(goodsList,function(item,key){
        var tmp = {};
        tmp.GUID = "78FAA0D2-A39F-440D-91A8-D56E6B" + _.random(100000,999999);
        tmp.STOCKORDERFORMGUID = orderGuid;
        tmp.QUANTITY = key + 10;
        tmp.INPRICE = 9.9;
        tmp.HH = item.skuNo;
        tmp.PZWH = item.licenseNo;
        tmp.AMOUNTTAX = (key+10) * 9.9;
        tmp.DETAILNO = "1";
        tmp.PLATFORMCODE = item.unicode;
        tmp.CONVERSION = item.packageQty;
        stockOrderDetails.push(tmp);
    });
    msgData.STOCKORDERFORM = stockOrderForm;
    msgData.STOCKORDERFORMDETAIL = stockOrderDetails;



    return msgData;

};