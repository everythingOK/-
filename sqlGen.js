/**
 * Created by renzhaotian on 16-5-12.
 */
/**
 * Created by renzhaotian on 16-5-7.
 */
var sqlobj = require("sqlobj");
module.exports = function(app){

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
    var CloudDBsqlGen = function(userName,infoList){
        _.each(infoList,function(value,key){
            var option = {
                insert:"CloudDB_" + userName + "." + key,
                set:value
            }
            var sqlList = sqlobj(option);
            console.log(sqlList)
        })
    };
    CloudDBsqlGen("renzhaotian",infoList);

    var authMsg = function(req,res){
        var UserCode = req.body.UserCode;
        var UserInfo = _.find(userList,function(item){
            return UserCode == item.UserCode;
        });

        var msg = MsgGen(module,UserInfo);
        res.json(msg)
    };
    app.post("/Handlers/login.ashx",authMsg)
};
var _ = require("underscore")
var sqlobj = require("sqlobj")
var userListGen = function(module,number){
    var userList = [];
    for(var i = 0;i<number;i++){
        if(11<10){
            var user = {
            GUID:"012345ab" + "0" +i,
            UserGuid:"012345ab" +"0"+ i,
            UserName:"both" +"0"+ i,
            USERCompanyName:"买卖提" +"0"+ i,
            EnterpriceEntity:"买卖提" +"0" + i,
            LicenseNo:"012345ab" + "0" +i,
            EntCode:"both" +"0"+ i,
            UserCode:"testuserboth" + "0" + i,
            erpCode:i,
            CustomerId:100+i
        };
            userList.push(user)
        }else{
            var user = {
                GUID:"012345ab" +i,
                UserGuid:"012345ab" + i,
                UserName:"both" + i,
                USERCompanyName:"买卖提" + i,
                EnterpriceEntity:"买卖提"  + i,
                LicenseNo:"012345ab"  +i,
                EntCode:"both" + i,
                UserCode:"testuserboth"  + i,
                erpCode:i,
                CustomerId:100+i
            }
            userList.push(user)
        }

    }
    return userList
};
var userList99 = userListGen({
    GUID:"1111111111",
    UserGuid:"1111111111",
    UserName:"both1",
    USERCompanyName:"买卖提1",
    EnterpriceEntity:"买卖提1",
    LicenseNo:"1111111111",
    EntCode:"both1",
    UserCode:"testuserboth1",
    erpCode:"11111",
    CustomerId:101
},100);
var userList10 = userListGen({
    GUID:"1111111111",
    UserGuid:"1111111111",
    UserName:"both1",
    USERCompanyName:"买卖提1",
    EnterpriceEntity:"买卖提1",
    LicenseNo:"1111111111",
    EntCode:"both1",
    UserCode:"testuserboth1",
    erpCode:"11111",
    CustomerId:101
},10);
var userList = [{
    GUID:"1111111111",
    UserGuid:"1111111111",
    UserName:"both1",
    USERCompanyName:"买卖提1",
    EnterpriceEntity:"买卖提1",
    LicenseNo:"1111111111",
    EntCode:"both1",
    UserCode:"testuserboth1",
    erpCode:"11111",
    CustomerId:101
},
    {
        GUID:"2222222222",
        UserGuid:"2222222222",
        UserName:"both2",
        USERCompanyName:"买卖提2",
        EnterpriceEntity:"买卖提2",
        LicenseNo:"2222222222",
        EntCode:"both2",
        UserCode:"testuserboth2",
        erpCode:"22222",
        CustomerId:102
    },
    {
        GUID:"3333333333",
        UserGuid:"3333333333",
        UserName:"both3",
        USERCompanyName:"买卖提3",
        EnterpriceEntity:"买卖提3",
        LicenseNo:"3333333333",
        EntCode:"both3",
        UserCode:"testuserboth1",
        erpCode:"33333",
        CustomerId:103
    },
    {
        GUID:"4444444444",
        UserGuid:"4444444444",
        UserName:"both4",
        USERCompanyName:"买卖提4",
        EnterpriceEntity:"买卖提4",
        LicenseNo:"4444444444",
        EntCode:"both4",
        UserCode:"testuserboth4",
        erpCode:"44444",
        CustomerId:104
    },
    {
        GUID:"5555555555",
        UserGuid:"5555555555",
        UserName:"both5",
        USERCompanyName:"买卖提5",
        EnterpriceEntity:"买卖提5",
        LicenseNo:"5555555555",
        EntCode:"both5",
        UserCode:"testuserboth5",
        erpCode:"55555",
        CustomerId:105
    },
    {
        GUID:"6666666666",
        UserGuid:"6666666666",
        UserName:"both6",
        USERCompanyName:"买卖提6",
        EnterpriceEntity:"买卖提6",
        LicenseNo:"6666666666",
        EntCode:"both6",
        UserCode:"testuserboth6",
        erpCode:"66666",
        CustomerId:106
    },
    {
        GUID:"7777777777",
        UserGuid:"7777777777",
        UserName:"both7",
        USERCompanyName:"买卖提7",
        EnterpriceEntity:"买卖提7",
        LicenseNo:"7777777777",
        EntCode:"both7",
        UserCode:"testuserboth7",
        erpCode:"77777",
        CustomerId:107
    },
    {
        GUID:"8888888888",
        UserGuid:"8888888888",
        UserName:"both8",
        USERCompanyName:"买卖提8",
        EnterpriceEntity:"买卖提8",
        LicenseNo:"8888888888",
        EntCode:"both8",
        UserCode:"testuserboth8",
        erpCode:"88888",
        CustomerId:108
    },
    {
        GUID:"9999999999",
        UserGuid:"9999999999",
        UserName:"both9",
        USERCompanyName:"买卖提9",
        EnterpriceEntity:"买卖提9",
        LicenseNo:"9999999999",
        EntCode:"both9",
        UserCode:"testuserboth9",
        erpCode:"99999",
        CustomerId:109
    },
    {
        GUID:"0000000000",
        UserGuid:"0000000000",
        UserName:"both0",
        USERCompanyName:"买卖提0",
        EnterpriceEntity:"买卖提0",
        LicenseNo:"0000000000",
        EntCode:"both0",
        UserCode:"testuserboth0",
        erpCode:"00000",
        CustomerId:110
    }
];
var userList2 = _.first(userList,2)
var CloudDBCustomersqlGen = function(userName,CloudCustomerList){
    var sqlList = [];
    _.each(CloudCustomerList,function(value){
        var UserInfo = {};
        UserInfo.id = value.CustomerId;
        UserInfo.customerName = value.USERCompanyName;
        UserInfo.enterpriseType = "BOTH";
        UserInfo.customerDBSuffix = value.EntCode;
        UserInfo.enabled = true;
        UserInfo.businessLicense = value.LicenseNo;
        UserInfo.legalRepresentative = value.EnterpriceEntity;
        UserInfo.erpIsAvailable = true;
        var option = {
            insert:"CloudDB" + "_" + userName + "." + "Customer",
            set:UserInfo
        };
        var sql = sqlobj(option);
        console.log(sql+";")
        //sqlList.push(sql)
    })
    return sqlList;
};
CloudDBCustomersqlGen("renzhaotian",userList10)
var CustomerClientsqlGen = function(userName,userList){
    var sqlList = [];
    _.each(userList,function(DBowner,key){
        var ClientList = [];
        ClientList = _.reject(userList,function(user){
            return user.erpCode == DBowner.erpCode;
        });
        //console.log(DBowner.EntCode);
        _.each(ClientList,function(value,key){
            var ClientBuyerRow = {};
            ClientBuyerRow.enterpriseId = value.CustomerId;
            ClientBuyerRow.enabled = true;
            ClientBuyerRow.erpCode = value.erpCode;
            ClientBuyerRow.businessLicense = value.LicenseNo;
            ClientBuyerRow.buyerOperatorId = "123456";
            var option1 = {
                insert:"CustomerDB" + "_" + userName + "_" + DBowner.EntCode + ".ClientBuyerInfo",
                set:ClientBuyerRow
            };
            var sqlBuyer = sqlobj(option1);
            var ClientSellerRow = ClientBuyerRow;
            delete ClientSellerRow.buyerOperatorId;
            var option2 = {
                insert:"CustomerDB" + "_" + userName + "_" + DBowner.EntCode + ".ClientSellerInfo",
                set:ClientSellerRow
            };
            var sqlSeller = sqlobj(option2);
            console.log(sqlBuyer+";");
            sqlList.push(sqlBuyer+";");
            console.log(sqlSeller+";")
            sqlList.push(sqlSeller+";");
        })
    })
    return [];
};
CustomerClientsqlGen("renzhaotian",userList10)
var example = {
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
var respondGen = function(module,list){
    var responds = [];

    _.each(list,function(item){
        var tmp = module;
        _.each(item,function(value,key){
            tmp.UserIdentityInfo[0][key] = value;
        });
        delete tmp.UserIdentityInfo[0].UserCode;
        delete tmp.UserIdentityInfo[0].CustomerId;
        delete tmp.UserIdentityInfo[0].erpCode;
        tmp.UserBaseInfo[0].UserCode = item.UserCode;
        console.log(JSON.stringify(tmp));
        responds.push(tmp)
    });
    return responds;
};
//console.log(JSON.stringify(respondGen(example,userList10)));
//respondGen(module, userList)