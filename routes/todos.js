var express = require("express"),
	router = express.Router(),
	db = require("../models"),
	helper = require("../helper/todo");
// showing all of the todo
router.route("/")
.get(helper.getTodos)
.post(helper.createTodo)
// showing a specific todo using the todoId

router.route("/:todoId")
	.get(helper.showTodo)
	.put(helper.updateTodo)
	.delete(helper.deleteTodo)


module.exports = router;
