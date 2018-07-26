var mongoose = require("mongoose");
mongoose.set("debug");
mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true });

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
