var express = require('express');
var router = express.Router();

var customerController = require('../controllers/CutomerController');

    // todoList Routes
    router
        .get('/',customerController.get_customer)
        .get('/id/:orderID',customerController.get_customer)

/*

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
        */

module.exports = router;