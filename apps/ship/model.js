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
    "msgId": "12b4ac62c4-080a-4419-b50e-81c2bcd2a4451460030123811aa3121",
    "msgType": "EDI_ORDER_SHIP_FROM_SELLER",
    "msgData": {
        "FHDZKHEAD": [
            {
                "BILLNO": "M16051202511",
                "BILLDATE": "2016-05-06T00:00:00",
                "BILLTIME": "13:21:47",
                "ORDERBILLNO": "M201605060161-12211",
                "ORDERGUID": "M201605060161-12211",
                "NOTES": "",
                "FHRY": null,
                "FHRQ": null,
                "CUSTOMGUID": "06EB2300EC784C1FA032aa9234248CF5",
                "CUSTOMNAME": "雨人健康城(兰州店)"
            }
        ],
        "FHDZK": [
            {
                "CLIENTCODE": "0",
                "KDRQ": "2016-05-06T00:00:00",
                "DH": "M1605060365D",
                "LSH": "M16051202511",
                "HH": "1030101198",
                "SJ": 10,
                "BATCHNO": "空值",
                "BATCHNUM": "201604070272",
                "GOODSVALIDDATE": "2017-04-07T00:00:00",
                "GOODSPRODUCEDATE": "2016-01-01T00:00:00",
                "QUANTITY": 40,
                "REMARK": "",
                "INSPECTREPORTURL": null,
                "TYBZ": 0,
                "SBZ2": "8563007F-7E38-44AA-B30D-EB059DE61B1C",
                "PLATFORMCODE": "2",
                "CONVERSION": "1.0000"
            }
        ],
        "MONITORDETAIL": [{
            "DRUGESC":"",
            "YSDH":"",
            "BZGG":"",
            "FTYPE":1
        }]
    },
    "checksum": "fd0882d8e91147087530e0c7dd20f1fb"
};

mysql.query("select id,unicode,skuNo,licenseNo,commonName,packageQty from CustomerDB_renzhaotian_both1.GoodsInfo",function(err,result) {
    if (err) {
        console.log(err)
    }
    console.log(result.length);
    var shipGuid = "M160505"+ _.random(10000,99999);
    var goodsList = goodsListGen(result,[1,2]);
    var timeObj = {
        "BILLDATE": "2016-05-12T00:00:00",
        "BILLTIME": "13:21:47",
        "KDRQ": "2016-05-06T00:00:00",
        "GOODSVALIDDATE": "2017-04-07T00:00:00",
        "GOODSPRODUCEDATE": "2016-01-01T00:00:00",
    };
    var msgDate = shipMsgDataGen("0",goodsList,shipGuid,timeObj);
    var msg = sellerShipMsgGen(msgDate);
    console.log(msg.msgData);
    request.post("http://127.0.0.1:3300" + "/api/erp/106")
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
var sellerShipMsgGen = function(msgData){
    var order =
    {"version":"1.0",
        "msgId":"",
        "msgType":"EDI_ORDER_SHIP_FROM_SELLER",
        "msgData":{},
        "checksum":"cd9824063a17d23a6ac255a21a487447"
    }
    var msgId = "133015df30-b64c-48d6-a3e7-89198b025626169aaa" + _.random(100000,999999).toString();
    order.msgId = msgId;
    order.msgData = msgData;

    return order;
};
var shipMsgDataGen = function(buyerErpCode, goodsList,shipGuid,timeObj) {
    var msgData = {};
    var fhdzkhead = [];
    var fhdzk = [];
    var monitorDetail = [];
    fhdzkhead[0] ={
        "BILLNO":shipGuid,
        "BILLDATE":timeObj.BILLDATE,
        "BILLTIME": timeObj.BILLTIME,
        "ORDERBILLNO": "M201605060161-" + _.random(10000,99999),
        "ORDERGUID": "M201605060161-" + _.random(10000,99999),
        "NOTES": "脚本生成",
        "FHRY": "FHRY",
        "FHRQ": "FHRQ",
        "CUSTOMGUID": "06EB2300EC784C1FA032aa9234" + _.random(100000,999999),
        "CUSTOMNAME": "成都雨诺脚本"
        };
    _.each(goodsList,function(item,key){
        var tmp = {};
        tmp.CLIENTCODE = buyerErpCode;
        tmp.KDRQ = timeObj.KDRQ;
        tmp.DH = "M1605060365D";
        tmp.LSH = "M16051202511";
        tmp.HH = item.skuNo;
        tmp.SJ = 10;
        tmp.BATCHNO = "空值";
        tmp.BATCHNUM = "20160407" + key + _.random(10,99);
        tmp.GOODSVALIDDATE = timeObj.GOODSVALIDDATE;
        tmp.GOODSPRODUCEDATE = timeObj.GOODSPRODUCEDATE;
        tmp.QUANTITY = key + 10;
        tmp.REMARK = "脚本生成";
        tmp.INSPECTREPORTURL = "inspectReporturl";
        tmp.TYBZ = 0;
        tmp.SBZ2 = "8563007F-7E38-44AA-B30D-EB059D" + _.random(100000,999999);
        tmp.PLATFORMCODE = item.unicode;
        tmp.CONVERSION = item.packageQty;
        fhdzk.push(tmp);
    });
    msgData.FHDZKHEAD = fhdzkhead;
    msgData.FHDZK = fhdzk;
    msgData.MONITORDETAIL = monitorDetail;

    return msgData;

};


