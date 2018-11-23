var express = require('express');
var router = express.Router();

var genderController = require('../controllers/GenderController');

    // todoList Routes
    router
        .get('/',genderController.get_values)
        .get('/id/:id',genderController.get_values)

/*

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
        */

module.exports = router;