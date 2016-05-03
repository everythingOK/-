/**
 * Created by renzhaotian on 16-5-3.
 */
var inquiryService = function(){
    var dataService = {
        new:function(dbName,info,callback){
            _logger.enter();
            var set = [];
            for(var i = 0;i < info.length; i++){
                set.push(info[i]);
            }
            var option = {
                insert : inquiry,
                set : set
            };
            var sql = _sqlobj(option);
            query(sql,function(err,result){
                if(err){
                    callback(err);
                }
                callback(null,result)
            })

        },
        delete:function(dbName,info,callback){

        },
        update:function(dbName,info,callback){

        },
        get:function(dbName,info,callback){

        }

    };
    var query = function(sql,callback){
        _logger.sql(sql);
        _sqlPool.query(sql,callback);
    };

    return dataService;
};
module.exports = inquiryService;