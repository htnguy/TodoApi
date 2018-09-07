var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/todoapp");
mongoose.Promise = Promise;

// requiring the todo model
module.exports.Todo = require("./todo");