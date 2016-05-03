/**
 * Created by renzhaotian on 16-5-3.
 */
var request = require("request");

var options = { method: 'POST',
    url: 'http://127.0.0.1:3300/api/erp/4',
    headers:
    { 'content-type': 'application/x-www-form-urlencoded',
        'postman-token': 'af81e981-603a-11e1-e17d-157c790ee1c5',
        'cache-control': 'no-cache' },
    form: { msg: '{"version":"1.0",  "msgId":"133015df30-b64c-48d6-a3e7-89198b0256fc1459926169754000003",  "msgType":"EDI_INQUIRY_CREATE",  "msgData":{  "PURCHASEPLANTEMP":[  {"GUID":"e56e9a51-7e5c-4f42-9c6e-22eed99101d5",  "MATERIELCODE":"900020",  "SUPPLIERCODE":"10001898",  "PLANQUANTITY":10,  "PLATFORMCODE":"9000200",  "CONVERSION":2,  "UNITPRICETAX":5.9,  "PURCHASEUPSET":0,  "BALANCEPERIOD":0},  {"GUID":"e56e9a51-7e5c-4f42-9c6e-22eed99101d5",  "MATERIELCODE":"900022",  "SUPPLIERCODE":"1000000",  "PLATFORMCODE":"9000221",  "CONVERSION":3,  "PLANQUANTITY":5,  "UNITPRICETAX":8,  "PURCHASEUPSET":0,  "BALANCEPERIOD":0}]  },  "checksum":"cd9824063a17d23a6ac255a21a487447"  }' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
