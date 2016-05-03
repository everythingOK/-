/**
 * Created by renzhaotian on 16-4-29.
 */
var logger = require("./logService");
module.exports = function(app){

    function goodsDel(req,res,next) {
        logger.enter();
        logger.debug("del" + req.params.goodsId);
        res.json("del" + req.params.goodsId)

    }

    function goodsPut(req,res,next) {
        logger.enter();
        logger.debug("put" + req.params.goodsId);
        res.json("put" + req.params.goodsId)

    }

    function goodsGet(req,res,next) {
        logger.enter();
        logger.debug("get" + req.params.goodsId);
        res.json("get" + req.params.goodsId)

    }

    function goodsAdd(req,res,next) {
        logger.enter();
        logger.debug("add" + req.params.goodsId);
        res.json("add" + req.params.goodsId)

    }

    app.route('/goods/:goodsId')
        .post(goodsAdd)
        .delete(goodsDel)
        .put(goodsPut)
        .get(goodsGet)

}