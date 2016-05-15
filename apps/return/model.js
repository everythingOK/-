/**
 * Created by renzhaotian on 16-5-11.
 */
var _ = require("underscore");
var mysql = require("mysql").createConnection({
    host:"localhost",
    user:"root",
    password:"romens@2015"
});
var request = require("superagent");
var example =
{
    "version": "1.0",
    "msgId": "12f4487116-27f3-4d11-95ba-db254cdaaaae14601aa959523012301",
    "msgType": "EDI_ORDER_RETURN_CREATE_FROM_BUYER",
    "msgData": {
        "STOCKRETURNAPPROVE": [
            {
                "GUID": "12C11710-4A11-1286-A73F-7AE829FEB333",
                "BILLNO": "201604080142",
                "BILLDATE": "2016-04-08T00:00:00",
                "SUPPLIERCODE": "22222",
                "STOCKTYPE": 0,
                "REMARK": "",
                "RETURNREASON": "调换商品",
                "USERNAME": null
            }
        ],
        "STOCKRETURNAPPROVEDETAIL": [
            {
                "GUID": "3F90111E-1211-46BC-8719-CFD88B022333",
                "DETAILNO": "1",
                "MATERIELCODE": "1020101130",
                "BATCHNO": "空值",
                "BATCHNUMBER": "201604080270",
                "QUANTITY": -2,
                "TAXUNITPRICE": 8,
                "UNITPRICE": 6.837607,
                "AMOUNT": -13.68,
                "TAXAMOUNT": -2.32,
                "AMOUNTTAX": -16,
                "REMARK": "123123",
                "RETURNREASON": "调换商品",
                "ORDERDETAILGUID": "786d5694-bcc4-4370-bfc6-5a5bef049123"
            }
        ]
    },
    "checksum": "8cbf6e1911c97ab1640ce1faed29a57e"
};
mysql.query("select id,unicode,skuNo,licenseNo,commonName,packageQty from CustomerDB_renzhaotian_both1.GoodsInfo",function(err,result) {
    if (err) {
        console.log(err)
    }
    console.log(result.length);
    var orderGUID = "M201605050160-" + _.random(10000,99999);
    var goodsList = goodsListGen(result,[1,2]);
    var timeObj = {
        "billDate": "2016-05-12T11:11:11",
        "usefulData":"2016-10-08T12:12:12",
        "advGoodsArriveDate":"2016-06-08T23:23:23"
    };
    var buyerErpCode = "3";
    var msgData = returnMsgDataGen(buyerErpCode, goodsList,true,orderGUID);
    var msg = returnMsgGen(msgData);
    console.log(msg.msgData);
    var userId = "106";
    request.post("http://127.0.0.1:3300" + "/api/erp/" + userId)
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
    });
    return goodsList;
};
var returnMsgGen = function(msgData){
    var order =
    {"version":"1.0",
        "msgId":"",
        "msgType":"EDI_ORDER_RETURN_CREATE_FROM_BUYER",
        "msgData":{},
        "checksum":"cd9824063a17d23a6ac255a21a487447"//TODO 将来利用apiRobot替换
    };
    var msgId = "133015df30-b64c-48d6-a3e7-89198b025626169aaa" + _.random(100000,999999).toString();
    order.msgId = msgId;
    order.msgData = msgData;

    return order;
};
var returnMsgDataGen = function(buyerErpCode, goodsList,multi,orderGuid) {
    var msgData = {};
    var stockReturnForm = [];
    var stockReturnDetails = [];
    var supplierCode = buyerErpCode;
    var supplierName = "买卖提" + buyerErpCode;
    stockReturnForm[0] ={
        "GUID":orderGuid,
        "BILLNO":"M201605050160"+ _.random(10000,99999),
        "BILLDATE": "2016-05-12T00:00:00",
        "SUPPLIERCODE":supplierCode,
        "STOCKTYPE" : 0,
        "REMARK":"由脚本生成",
        "RETURNREASON" : "脚本换货",
        "USERNAME" : "买卖提" + buyerErpCode
    };
    var counter = 0;
    _.each(goodsList,function(item,key){
        var tmp1 = {};
        tmp1.GUID = "3F90111E-1211-46BC-8719-CFD88B" + _.random(100000,999999);
        tmp1.DETAILNO = counter;
        tmp1.MATERIELCODE = item.skuNo;
        tmp1.BATCHNO = "BATCHNO";
        tmp1.BATCHNUMBER = "20160408" + _.random(1000,9999);
        tmp1.QUANTITY = -100+key;
        tmp1.TAXUNITPRICE = key;
        tmp1.UNITPRICE = 1.234567;
        tmp1.AMOUNTTAX = 0 - key*10;
        tmp1.TAXAMOUNT = 0 - key*(_.random(100,500)/100);
        tmp1.AMOUNT =  tmp1.AMOUNTTAX-tmp1.TAXAMOUNT;
        tmp1.REMARK = "脚本生成商品";
        tmp1.RETURNREASON = "脚本原因商品";
        tmp1.ORDERDETAILGUID = "786d5694-bcc4-4370-bfc6-5a5bef" + _.random(100000,999999);
        if(multi) {
            var tmp2 = {};
            tmp2.GUID = "3F90111E-1211-46BC-8719-CFD88B" + _.random(100000,999999);
            tmp2.DETAILNO = counter;
            tmp2.MATERIELCODE = item.skuNo;
            tmp2.BATCHNO = "BATCHNO";
            tmp2.BATCHNUMBER = "20161108" + _.random(1000,9999);
            tmp2.QUANTITY = -100+key;
            tmp2.TAXUNITPRICE = key;
            tmp2.UNITPRICE = 1.234567;
            tmp2.AMOUNTTAX = 0 - key*10;
            tmp2.TAXAMOUNT = 0 - key*(_.random(100,500)/100);
            tmp2.AMOUNT =  tmp1.AMOUNTTAX-tmp1.TAXAMOUNT;
            tmp2.REMARK = "脚本生成商品";
            tmp2.RETURNREASON = "脚本原因商品";
            tmp2.ORDERDETAILGUID = "786d5694-bcc4-4370-bfc6-5a5bef" + _.random(100000,999999);
            stockReturnDetails.push(tmp2);
        }
        counter++;
        stockReturnDetails.push(tmp1);

    });

    msgData.STOCKRETURNAPPROVE = stockReturnForm;
    msgData.STOCKRETURNAPPROVEDETAIL = stockReturnDetails;



    return msgData;

};