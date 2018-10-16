var express = require('express');
var router = express.Router();

var orderController = require('../controllers/OrderController');

    // todoList Routes
    router
        .get('/',orderController.get_order)
        .get('/id/:orderID',orderController.get_order)
        .get('/filter/?',orderController.get_order)
        .delete('/',function(){
            console.log("delete /")
        })
        .delete('/:id',orderController.delete_order)

        .put('/new', orderController.create_order)
        .post('/new', orderController.create_order)
/*

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
        */

module.exports = router;