var express = require('express');
var router = express.Router();

var processController = require('../controllers/ProcessController');

    // todoList Routes
    router
        .get('/',processController.get_values)
        .get('/id/:id',processController.get_values)

/*

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
        */

module.exports = router;