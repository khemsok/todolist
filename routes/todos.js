var express = require("express"),
    router = express.Router(),
    db = require("../models"),
    helpers = require("../helpers/todos");


router.route("/")
    .get(helpers.getTodos)
    .post(helpers.createTodos)


router.route("/:todoId")
    .get(helpers.getTodo)
    .put(helpers.updateTodos)
    .delete(helpers.deleteTodos)


module.exports = router;