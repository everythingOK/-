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
var _ = require("underscore")
console.log((_.random(100,500)/100))