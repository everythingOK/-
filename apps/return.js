/**
 * Created by renzhaotian on 16-5-3.
 */
module.exports = function(app){

    //function returnDel(req,res,next) {
    //    logger.enter();
    //    logger.debug("del" + req.params.returnId);
    //    res.json("del" + req.params.returnId)
    //
    //}
    //
    //function returnPut(req,res,next) {
    //    logger.enter();
    //    logger.debug("put" + req.params.returnId);
    //    res.json("put" + req.params.returnId)
    //
    //}
    //
    //function returnGet(req,res,next) {
    //    logger.enter();
    //    logger.debug("get" + req.params.returnId);
    //    res.json("get" + req.params.returnId)
    //
    //}
    //
    //function returnAdd(req,res,next) {
    //    logger.enter();
    //    logger.debug("add" + req.params.returnId);
    //    res.json("add" + req.params.returnId)
    //
    //}
    //
    //app.route('/return/:returnId')
    //    .post(returnAdd)
    //    .delete(returnDel)
    //    .put(returnPut)
    //    .get(returnGet)

};
//var moment = require("moment");
//var billdate = moment("2016-04-08T00:00:00").format('YYYY-MM-DD HH:mm:ss ');
//console.log(billdate)
var moment = require("moment");
var sqlBuilder = require("sqlobj")
var mysql = require("mysql").createPool({
    user:"root",
    password:"romens@2015"
});
var __mysql = mysql.getConnection(function(err,conn){

})

function addToOffLineTask(orderId){
    var taskData={};
    taskData.taskName = 'SCC_CLOSE_OVERDUE_ORDER';                      // 任务名称
    taskData.taskType = 'ORDER_CLOSE_UNPAID';                           // 任务类型
    taskData.taskStatus = 'RUNNING';                                    // 任务状态
    taskData.taskParam =
    {orderId: orderId,customerDB:"CustomerDB_renzhaotian_rzt"};                 // 任务参数
    taskData.maxCount = 1;                                              // 最大执行数
    taskData.customerId=5;                                       // 执行人ID,在这里表示提交订单的客户Id

    var now=new Date(),
        offlineTaskExecuteTime=moment("2016-5-23 19:45:00","YYYY-MM-DD HH:mm:ss"),
        taskDate=offlineTaskExecuteTime.date(),
        taskMonth=offlineTaskExecuteTime.month(),
        hour=offlineTaskExecuteTime.hour(),
        minutes=offlineTaskExecuteTime.minute(),
        seconds=offlineTaskExecuteTime.second();

    taskData.second = seconds;                                          // 秒定时任务
    taskData.minute = minutes;                                          // 分定时任务
    taskData.hour = hour;                                               // 时定时任务
    taskData.dom = taskDate;                                            // 日定时任务
    taskData.mon = taskMonth;

    function insertTask(dbName, taskInfo, callback){

        taskInfo.taskParam = JSON.stringify(taskInfo.taskParam);


        var sql = sqlBuilder({
            INSERT: dbName + ".Task",
            SET: taskInfo
        });
        __mysql.query( sql, function(err, result){
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    callback(null, result.insertId);
                }
            }
        )
    }
    function Taskinsert(taskInfo, socketId, onPubSub, callback){


        insertTask("CloudDB_renzhaotian", taskInfo, function(err, taskId){
            if (err){
                console.log("Add task into database error");
                callback(err);
            } else {


                callback(null, taskId);
            }
        });
    }
    Taskinsert(taskData,0,null,function(err,result){
        if(err){
            console.log('将该条记录插入到订单失败');
        }else{
            console.log('已经将该条订单插入Task里面');
        }
    });
}
addToOffLineTask(10);