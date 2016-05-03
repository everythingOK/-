/**
 * Created by renzhaotian on 16-5-3.
 */
var mysql = require("mysql");
var csv = require("csv");
var fs = require("fs");
var underscore = require("underscore");
module.exports = function(app){
    function csvGoodsListParse(req,res,next) {
        var connet = null;
        var nameMap = null;
        var fileName = null;
        var sqlList = [];
        async.series([
            function(cb){
                //按照页面参数，建立数据库连接
                connet = mysql.createConnection(
                    {
                        host:req.body.db.host,
                        user:req.body.db.user,
                        password:req.body.db.password
                    }
                );
                //取得名称对应关系，例如：{'skuNo':"货号"}
                nameMap = req.body.nameMap;
                //取得上传的商品信息文件文件名
                fileName = req.params.fileName;
                _logger.debug("sqlconnet host is " + req.body.db.host + "\n\r"
                +"user is" + req.body.db.user + "\n\r"
                +"password is " + req.body.db.password + "\n\r"
                +"nameMap is " + JSON.stringify(nameMap) + "\n\r"
                +"fileName is " + fileName)
            },
            //检查必填项目是否填写
            function(cb){
                var lost = checkMap(nameMap);
                _logger.debug("必填项目缺少" + JSON.stringify(lost));
                if(lost.length!==0){
                    cb(lost);
                }
                    cb(null);

            },
            //生成插入数据表goodsInfo表的sql语句
            function(cb){
                sqlGoodsInfo(fileName,nameMap,sqlList,cb);
            },
            //生成插入数据表goodsInventory,goodsGsp,goodsPrice的sql语句
            function(cb){
                sqlGoodsOtherInfo(fileName,nameMap,sqlList,cb);
            },
            //执行sqlList
            function(cb){
                connet.query(sqlList,function(err,result){
                    if(err){
                        cb(err)
                    }
                    cb(result);
                })
            }
        ],function(err,resultList){
            if(err){
                res.json("something is wrong");
            }
            res.json(resultList);
        })

    }
    var checkMap = function(checkingMap){
        return [];
    };
    var sqlGoodsInfo = function(csvFileName,map,sqlList,callback){
        //打开文件，解析
        fs.readFile(csvFileName,function(err,data){
            if(err){
                _logger.error(err,"read File failed, name is " + csvFileName)
                callback(err);
            }
            _logger.debug("readFile success, name is " + csvFileName);
            /*
            检查文件第一行中的列名和前端传来的列名对应表中是否一一对应。
            例如前端传来的map为{"skuNo":"货号","commenName":"商品名称"}
            第一行中内容为["货号","商品名称"]，正确
            如果第一行中内容为["货号","商品名称","单位"]，错误；["货号"]，错误；["通用名"]，错误
            */
            //去掉没有填写的项目
            var newMap = underscore.pick(map,function(val,key,object){
                return !(underscore.isNaN(val)||underscore.isNull(val)||underscore.isUndefined(val))
            });
            //对调key,value
            var realMap = underscore.invert(newMap);

            csv.parse(data,function(err,data){
                //如果map中keys数量和文件中列数不同，返回错误
                if(underscore.keys(map).length!==data[0].length){
                    callback("缺少对应关系")
                }//TODO：没有具体缺哪一列的，以后写
                //收集所有没有匹配到条目
                var lostColnumNames = [];
                var transedColmun = underscore.map(data[0],function(value){
                    if(realMap[value]==null){
                        lostColnumName.push(value);
                    }
                    return realMap[value];
                });
                if(lostColnumNames.length!==0){
                    callback(lostColnumNames)
                }
                csv.transform(underscore.rest(data),function(row){
                    return underscore.object(transcolumn,row);
                    },function(err,Obj){

                })
            })
        });
    }

    var sqlGoodsOtherInfo = function(csvFileName,map,sqlList,callback){
        callback(null);
    };

    app.route("csv/goods/:fileName")
        .post(csvGoodsListParse)
        .get(csvGoodsListEcho)
}
