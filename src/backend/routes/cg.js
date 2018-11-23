var express = require('express');
var router = express.Router();

var commodityGroupController = require('../controllers/CommodityGroupController');

    // todoList Routes
    router
        .get('/',commodityGroupController.get_values)
        .get('/id/:id',commodityGroupController.get_values)

/*

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
        */

module.exports = router;