/**
 * Created by renzhaotian on 16-5-3.
 */
var mysql = require("mysql");
var csv = require("csv");
var fs = require("fs");
var underscore = require("underscore");
var sqlObj = require("sqlobj");
//TODO:这些定义应该放在配置文件中，未来前端页面展示也需要用到
var necessaryColumns = [];
var goodsInfoColumnList = [];
var defaultColumnList = [];
var goodsInventoryColumnList = [];
var goodsGspColumnList = [];
var goodsPriceColumnList = [];
global.__base = __dirname;
var _logger = require('../../service/logService.js')
module.exports = function(app){
    function csvGoodsListParse(req,res) {
        var connet = null;
        var nameMap = null;
        var fileName = null;
        var sqlList = [];
        async.series([
            function(cb){
                _logger.debug(1);
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
                _logger.debug(2);
                var lost = checkMap(nameMap);
                _logger.debug("必填项目缺少" + JSON.stringify(lost));
                if(lost.length!==0){
                    cb(lost);
                }
                    cb(null);

            },
            //生成插入数据表goodsInfo表的sql语句
            function(cb){
                _logger.debug(3);
                sqlGoodsInfo(fileName,nameMap,sqlList,cb);
            },
            //生成插入数据表goodsInventory,goodsGsp,goodsPrice的sql语句
            function(cb){
                _logger.debug(4);
                sqlGoodsOtherInfo(fileName,nameMap,sqlList,cb);
            },
            //执行sqlList
            function(cb){
                _logger.debug(5);
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
        _logger.enter();
        return [];
    };
    var sqlGoodsInfo = function(csvFileName,srcMap,sqlList,callback){
        _logger.enter();
        //筛选出属于goodsInfo表的列
        var map = mapFilter(srcMap,goodsInfoColumnList);
        _logger.debug(JSON.stringify(map));
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
            _logger.debug(JSON.stringify(newMap));
            //对调key,value
            var realMap = underscore.invert(newMap);
            _logger.debug(JSON.stringify(realMap));

            csv.parse(data,function(err,data){
                //如果map中keys数量和文件中列数不同，返回错误
                if(underscore.keys(map).length!==data[0].length){
                    _logger.debug("缺少对应关系")
                    callback("缺少对应关系")
                }//TODO：没有具体缺哪一列的，以后写
                //收集所有没有匹配到条目
                var lostColnumNamesList = [];
                var transedColmun = underscore.map(data[0],function(value){
                    if(realMap[value]==null){
                        lostColnumNamesList.push(value);
                    }
                    return realMap[value];
                });
                if(lostColnumNamesList.length!==0){
                    _logger.debug(lostColnumNamesList);
                    callback(lostColnumNamesList);
                }

                csv.transform(underscore.rest(data),function(row){
                    return underscore.object(transedColmun,row);
                },function(err,srcObj){
                    //没有填的项目都写默认值，因为前面已经检查过必填项目都填了
                    var Obj = fillObjList(srcObj,goodsInfoColumnList);
                    var options = {
                        insert:"goodsInfo",
                        set:Obj
                    };
                    var sql = sqlObj(options);
                    _logger.debug(sql);
                    sqlList.push(sql,function(err,result){
                        if(err){
                            callback(err);
                        }
                    })
                })
            })
        });
    };

    var sqlGoodsOtherInfo = function(csvFileName,srcMap,sqlList,callback){
        _logger.enter();
        var inventoryMap = mapFilter(srcMap,goodsInventoryColumnList);
        var gspMap = mapFilter(srcMap,goodsGspColumnList);
        var priceMap = mapFilter(srcMap,goodsPriceColumnList);
        callback(null);
    };
    //返回map中key属于collection的元素组成的map，如果集合为空，返回原来的map
    var mapFilter = function(map,collection){
        _logger.enter();
        if(underscore.isNaN(collection)||underscore.isNull(collection)||underscore.isUndefined(collection)||collection.length == 0){
            return map;
        }
        return underscore.pick(map,function(value,key,object){
            return underscore.contains(collection,key);
        })
    };
    var fillObjList = function(srcMapList,columnList){
        var outputList = [];
        underscore.each(srcMapList,function(value){
            outputList.push(fillObj(value,columnList))
        });
        _logger.debug(JSON.stringify(outputList))
        return outputList;
    };
    var fillObj = function(srcMap,columnList){
        _logger.enter();
        _logger.debug(JSON.stringify(srcMap));
        if(underscore.isNaN(columnList)||underscore.isNull(columnList)||underscore.isUndefined(columnList)||columnList.length == 0){
            return srcMap;
        }

        var map = {};
        underscore.each(columnList,function(value){
            if(!underscore.isNull(srcMap[value])){
                underscore.extend(map,{value:srcMap[value]})
            }
            underscore.extend(map,{value:defaultColumnList[value]})
        });
        _logger.debug(JSON.stringify(map))
        return map;
    };

    app.route("csv/goods/:fileName")
        .post(csvGoodsListParse)
        .get(csvGoodsListEcho)
};
var mapFilter = function(map,collection){
    _logger.enter();
    if(underscore.isNaN(collection)||underscore.isNull(collection)||underscore.isUndefined(collection)||collection.length == 0){
        return map;
    }
    return underscore.pick(map,function(value,key,object){
        return underscore.contains(collection,key);
    })
};
var fillObjList = function(srcMapList,columnList){
    var outputList = [];
    underscore.each(srcMapList,function(value){
        outputList.push(fillObj(value,columnList))
    });
    _logger.debug(JSON.stringify(outputList))
    return outputList;
};
var fillObj = function(srcMap,columnList){
    _logger.enter();
    _logger.debug(JSON.stringify(srcMap));
    if(underscore.isNaN(columnList)||underscore.isNull(columnList)||underscore.isUndefined(columnList)||columnList.length == 0){
        return srcMap;
    }

    var map = {};
    underscore.each(columnList,function(value){
        if(!underscore.isNull(srcMap[value])){
            underscore.extend(map,{value:srcMap[value]})
        }
        underscore.extend(map,{value:defaultColumnList[value]})
    });
    _logger.debug(JSON.stringify(map))
    return map;
};
var sqlGoodsInfo = function(csvFileName,srcMap,sqlList,callback){
    _logger.enter();
    //筛选出属于goodsInfo表的列
    var map = mapFilter(srcMap,goodsInfoColumnList);
    _logger.debug(JSON.stringify(map));
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
        _logger.debug(JSON.stringify(newMap));
        //对调key,value
        var realMap = underscore.invert(newMap);
        _logger.debug(JSON.stringify(realMap));

        csv.parse(data,function(err,data){
            //如果map中keys数量和文件中列数不同，返回错误
            if(underscore.keys(map).length!==data[0].length){
                _logger.debug("缺少对应关系")
                callback("缺少对应关系")
            }//TODO：没有具体缺哪一列的，以后写
            //收集所有没有匹配到条目
            var lostColnumNamesList = [];
            var transedColmun = underscore.map(data[0],function(value){
                if(realMap[value]==null){
                    lostColnumNamesList.push(value);
                }
                return realMap[value];
            });
            if(lostColnumNamesList.length!==0){
                _logger.debug(lostColnumNamesList);
                callback(lostColnumNamesList);
            }

            csv.transform(underscore.rest(data),function(row){
                return underscore.object(transedColmun,row);
            },function(err,srcObj){
                //没有填的项目都写默认值，因为前面已经检查过必填项目都填了
                var Obj = fillObjList(srcObj,goodsInfoColumnList);
                var options = {
                    insert:"goodsInfo",
                    set:Obj
                };
                var sql = sqlObj(options);
                _logger.debug(sql);
                sqlList.push(sql,function(err,result){
                    if(err){
                        callback(err);
                    }
                })
            })
        })
    });
};
var xxx = [ '货号', '商品名称', '别名', '批准文号', '规格', '生产单位', '产地', '单位', '中包装数量', '剂型' ];
var yyy = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ];
var xxx1 = [ '货号', '商品名称', '别名', '批准文号','生产单位', '产地', '单位', '中包装数量']
var yyy1 = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'i' ]
var map = underscore.object(yyy,xxx);
var sqlList = [];

sqlGoodsInfo("/home/renzhaotian/WebstormProjects/weberp/smsp.csv",map,sqlList,function(err,result){
        console.log(JSON.stringify(err) + JSON.stringify(result))
    }
);