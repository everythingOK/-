/**
 * Created by renzhaotian on 16-5-3.
 */
var async = require("async");
var db = require(_service + "inquiry.js")
module.exports = function(app){

    function inquiryDel(req,res,next) {
        logger.enter();
        logger.debug("del" + req.params.inquiryId);
        res.json("del" + req.params.inquiryId)

    }

    function inquiryPut(req,res,next) {
        logger.enter();
        logger.debug("put" + req.params.inquiryId);
        res.json("put" + req.params.inquiryId)

    }

    function inquiryGet(req,res,next) {
        logger.enter();
        logger.debug("get" + req.params.inquiryId);
        res.json("get" + req.params.inquiryId)

    }

    function inquiryAdd(req,res,next) {
        logger.enter();
        logger.debug("add" + req.params.inquiryId);
        var example = {"version":"1.0",
            "msgId":"133015df30-b64c-48d6-a3e7-89198b0256fc1459926169754000003",
            "msgType":"EDI_INQUIRY_CREATE",
            "msgData":{
            "PURCHASEPLANTEMP":[
                {"GUID":"e56e9a51-7e5c-4f42-9c6e-22eed99101d5",
                    "MATERIELCODE":"100020",
                    "SUPPLIERCODE":"10001",
                    "PLANQUANTITY":10,
                    "PLATFORMCODE":"1000200",
                    "CONVERSION":2,
                    "UNITPRICETAX":5.9,
                    "PURCHASEUPSET":0,
                    "BALANCEPERIOD":0},
                {"GUID":"e56e9a51-7e5c-4f42-9c6e-22eed99101d5",
                    "MATERIELCODE":"100022",
                    "SUPPLIERCODE":"1000000",
                    "PLATFORMCODE":"1000221",
                    "CONVERSION":3,
                    "PLANQUANTITY":5,
                    "UNITPRICETAX":8,
                    "PURCHASEUPSET":0,
                    "BALANCEPERIOD":0}]
        },
            "checksum":"cd9824063a17d23a6ac255a21a487447"
        };
        async.series([
            //存到本地数据库中
            function(cb){
                db.new("test"+"renzhaotian"+_suffix,example,cb)
            },
            function(cb){
                _request.post("127.0.0.1:3300/api/erp/" + erpId)
                    .field
            }
        ],function(err,result){
            if(err){
                _logger.trace(err)
            }
            res.json("add" + req.params.inquiryId + "\n\r" + result)

        })


    }

    app.route('/inquiry/:inquiryId')
        .post(inquiryAdd)
        .delete(inquiryDel)
        .put(inquiryPut)
        .get(inquiryGet)

};