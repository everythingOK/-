/**
 * Created by renzhaotian on 16-5-3.
 */
    var underscore = require("underscore")
var goods = require("./goods");
var xxx = [ '货号', '商品名称', '别名', '批准文号', '规格', '生产单位', '产地', '单位', '中包装数量', '剂型' ];
var yyy = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ];
var xxx1 = [ '货号', '商品名称', '别名', '批准文号','生产单位', '产地', '单位', '中包装数量']
var yyy1 = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'i' ];
var map = underscore.object(yyy,xxx);
var sqlList = [];
goods.("/home/renzhaotian/WebstormProjects/weberp/smsp.csv",map,sqlList,function(err,result){
        console.log(JSON.stringify(err) + JSON.stringify(result))
    }
);