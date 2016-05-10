/**
 * Created by renzhaotian on 16-5-3.
 */
module.exports = function(app){

    function quotationDel(req,res,next) {
        logger.enter();
        logger.debug("del" + req.params.quotationId);
        res.json("del" + req.params.quotationId)

    }

    function quotationPut(req,res,next) {
        logger.enter();
        logger.debug("put" + req.params.quotationId);
        res.json("put" + req.params.quotationId)

    }

    function quotationGet(req,res,next) {
        logger.enter();
        logger.debug("get" + req.params.quotationId);
        res.json("get" + req.params.quotationId)

    }

    function quotationAdd(req,res,next) {
        logger.enter();
        logger.debug("add" + req.params.quotationId);
        res.json("add" + req.params.quotationId)

    }

    app.route('/quotation/:quotationId')
        .post(quotationAdd)
        .delete(quotationDel)
        .put(quotationPut)
        .get(quotationGet)

};
var _ = require("underscore")
console.log(_.random(1,10))