/**
 * Created by renzhaotian on 16-5-4.
 */
module.exports = function() {
    var logger = _logger;
    var model = {
        goodsInfoSqlGen: function (csvFileName, srcMap, sqlList, callback) {
            _logger.enter();
            //筛选出属于goodsInfo表的列
            var map = mapFilter(srcMap, goodsInfoColumnList);
            _logger.debug(JSON.stringify(map));
            //打开文件，解析
            fs.readFile(csvFileName, function (err, data) {
                if (err) {
                    _logger.error(err, "read File failed, name is " + csvFileName);
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
                var newMap = underscore.pick(map, function (val, key, object) {
                    return !(underscore.isNaN(val) || underscore.isNull(val) || underscore.isUndefined(val))
                });
                _logger.debug(JSON.stringify(newMap));
                //对调key,value
                var realMap = underscore.invert(newMap);
                _logger.debug(JSON.stringify(realMap));

                csv.parse(data, function (err, data) {
                    //如果map中keys数量和文件中列数不同，返回错误
                    if (underscore.keys(map).length !== data[0].length) {
                        _logger.debug("缺少对应关系");
                        callback("缺少对应关系")
                    }//TODO：没有具体缺哪一列的，以后写
                    //收集所有没有匹配到条目
                    var lostColnumNamesList = [];
                    var transedColmun = underscore.map(data[0], function (value) {
                        if (realMap[value] == null) {
                            lostColnumNamesList.push(value);
                        }
                        return realMap[value];
                    });
                    if (lostColnumNamesList.length !== 0) {
                        _logger.debug(lostColnumNamesList);
                        callback(lostColnumNamesList);
                    }

                    csv.transform(underscore.rest(data), function (row) {
                        return underscore.object(transedColmun, row);
                    }, function (err, srcObj) {
                        //没有填的项目都写默认值，因为前面已经检查过必填项目都填了
                        var Obj = fillObjList(srcObj, goodsInfoColumnList);
                        var options = {
                            insert: "goodsInfo",
                            set: Obj
                        };
                        var sql = sqlObj(options);
                        _logger.debug(sql);
                        sqlList.push(sql, function (err, result) {
                            if (err) {
                                callback(err);
                            }
                        })
                    })
                })
            });
        },
        goodsOtherInfoSqlGen : function(csvFileName,srcMap,sqlList,callback){
            _logger.enter();
            var inventoryMap = mapFilter(srcMap,goodsInventoryColumnList);
            var gspMap = mapFilter(srcMap,goodsGspColumnList);
            var priceMap = mapFilter(srcMap,goodsPriceColumnList);
            callback(null);
        },
        excuteSqlList:function(sqlList,callback){},

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
    return model;
}