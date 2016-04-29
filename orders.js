/**
 * Created by renzhaotian on 16-4-29.
 */
module.exports = function(app){
    function orderAdd(req,res,next) {

    }

    function orderPut(req,res,next) {

    }

    function orderDel(req,res,next) {

    }

    app.route('/order/:orderId')
        .post(orderAdd)
        .put(orderPut)
        .del(orderDel)
};