/**
 * Created by renzhaotian on 16-5-7.
 */
var sqlobj = require("sqlobj");
module.exports = function(app){
    var _  = require("underscore");
    var module = {
        "UserIdentityInfo": [
            {
                "GUID": "0000011111",
                "UserGuid": "0000011111",
                "UserImage": "images/defaultuser.png",
                "RegisteTime": "2014-07-19T11:45:55.47",
                "RegisteType": 1,
                "ResisteSource": "0000011111",
                "UserName": "冯张龙",
                "Sex": "1",
                "Phone": "18653206277",
                "Tel": "",
                "EMail": "cloud@romens.cn",
                "IMCode": "270130490",
                "CompanyGUID": "222222",
                "Address": "成都雨诺地2",
                "HomePage": null,
                "USERCompanyName": "成都雨诺公司名2",
                "GUID1": "222222",
                "EntCode": "seller1",
                "EntName": "成都雨诺",
                "Address1": "成都雨诺地址21",
                "EnterpriceEntity": "张力",
                "Tel1": "18653206277",
                "ZipCode": "266071",
                "EMail1": "cloud@romens.cn",
                "AdministerGUID": "0000011111",
                "State": 0,
                "LicenseNo": "0000011111",
                "LicenseImageUrl": "http://IMMgr.yiyao365.cn/Img/20160429133116123.png"
            }
        ],
        "UserBaseInfo": [
            {
                "UserCode": "testuserseller"
            }
        ],
        "UserType": [
            {
                "Role": "1"
            }
        ]
    };
    var userList = [{
            GUID:"0000000000",
            UserGuid:"0000000000",
            UserName:"buyer1",
            USERCompanyName:"买家1",
            EnterpriceEntity:"买买提",
            LicenseNo:"0000000000",
            EntCode:"buyer1",
            UserCode:"testuserbuyer",
            erpCode:"00000",
            CustomerId:101
        },
        {
            GUID:"0000000001",
            UserGuid:"0000000001",
            UserName:"seller1",
            USERCompanyName:"卖家1",
            EnterpriceEntity:"卖卖提",
            LicenseNo:"0000000001",
            EntCode:"seller1",
            UserCode:"testuserseller",
            erpCode:"00001",
            CustomerId:102
        },
        {
            GUID:"1111111111",
            UserGuid:"1111111111",
            UserName:"both1",
            USERCompanyName:"双双1",
            EnterpriceEntity:"双双提1",
            LicenseNo:"1111111111",
            EntCode:"both1",
            UserCode:"testuserboth1",
            erpCode:"11111",
            CustomerId:201
        },
        {
            GUID:"2222222222",
            UserGuid:"2222222222",
            UserName:"both2",
            USERCompanyName:"双双2",
            EnterpriceEntity:"双双提2",
            LicenseNo:"2222222222",
            EntCode:"both2",
            UserCode:"testuserboth2",
            erpCode:"22222",
            CustomerId:202
        },
        {
            GUID:"3333333333",
            UserGuid:"3333333333",
            UserName:"both3",
            USERCompanyName:"双双3",
            EnterpriceEntity:"双双提3",
            LicenseNo:"3333333333",
            EntCode:"both3",
            UserCode:"testuserboth3",
            erpCode:"33333",
            CustomerId:203
        },
        {
            GUID:"4444444444",
            UserGuid:"4444444444",
            UserName:"both4",
            USERCompanyName:"双双4",
            EnterpriceEntity:"双双提4",
            LicenseNo:"4444444444",
            EntCode:"both4",
            UserCode:"testuserboth4",
            erpCode:"44444",
            CustomerId:204
        },
        {
            GUID:"5555555555",
            UserGuid:"5555555555",
            UserName:"both5",
            USERCompanyName:"双双5",
            EnterpriceEntity:"双双提5",
            LicenseNo:"5555555555",
            EntCode:"both5",
            UserCode:"testuserboth5",
            erpCode:"55555",
            CustomerId:205
        }];
    var MsgGen = function(module,userInfo){
        var tmp = module;
        _.each(userInfo,function(value,key,list){
            tmp.UserIdentityInfo[0][key] = value;

        });
        tmp.UserBaseInfo[0].UserCode = userInfo.UserCode;
        delete tmp.UserIdentityInfo[0].UserCode;
        console.log(tmp)

        return tmp;
    };
    var sqlGen = function(userList,type){
        "INSERT INTO `ClientSellerInfo` VALUES (1,4,1,'22222','2222222222','2016-05-06 08:29:14','2016-05-06 08:29:14')"
        _u.each(userList,function(value){
            var option = {
                insert:"CustomerDB_renzhaotian_" + value.UserName +".ClientSellerInfo",
                set:[{

                }]
            }
        })
        var customerDB = "CustomerDB_renzhaotian_";

    }
    var authMsg = function(req,res){
        var UserCode = req.body.UserCode;
        var UserInfo = _.find(userList,function(item){
            return UserCode == item.UserCode;
        });

        var msg = MsgGen(module,UserInfo);
        res.json(msg)
    };
    app.post("/Handlers/login.ashx",authMsg)
}