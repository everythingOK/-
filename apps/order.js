/**
 * Created by renzhaotian on 16-5-3.
 */
module.exports = function(app){

    function orderDel(req,res,next) {
        logger.enter();
        logger.debug("del" + req.params.orderId);
        res.json("del" + req.params.orderId)

    }

    function orderPut(req,res,next) {
        logger.enter();
        logger.debug("put" + req.params.orderId);
        res.json("put" + req.params.orderId)

    }

    function orderGet(req,res,next) {
        logger.enter();
        logger.debug("get" + req.params.orderId);
        res.json("get" + req.params.orderId)

    }

    function orderAdd(req,res,next) {
        logger.enter();
        logger.debug("add" + req.params.orderId);
        res.json("add" + req.params.orderId)

    }

    app.route('/order/:orderId')
        .post(orderAdd)
        .delete(orderDel)
        .put(orderPut)
        .get(orderGet)

};