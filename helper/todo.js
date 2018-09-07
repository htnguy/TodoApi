 
var db = require("../models");

 exports.getTodos = function(res,res){
	db.Todo.find()
	.then(function(todos){
		res.json(todos);
	}).catch(function(err){
		res.send(err);
	})
}

exports.createTodo = function(req,res){
	db.Todo.create(req.body)
		.then(function(newTodo){
			res.status(201).json(newTodo);
		}).catch(function(err){
			res.send(err);
		});
}

exports.showTodo = function(req,res){
	db.Todo.findById(req.params.todoId)
		.then(function(foundTodo){
			res.json(foundTodo);
		}).catch(function(err){
			res.send(err);
		})
}

exports.updateTodo = function(req,res){
	// the first params locates the todo to update,
	// the second params obtains data from req.body to update with
	// the third param: {new:true}; tells the function to return
	// the updated version instead of the orgiginal
	db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body,{ new:true})
		.then(function(updatedTodo){
			res.json(updatedTodo);
		}).catch(function(err){
			res.send(err);
		});
}

exports.deleteTodo = function(req,res){
	db.Todo.remove({_id:req.params.todoId})
	.then(function(){
		res.json({message: "We deleted it!"});
	}).catch(function(err){
		res.send(err);
	});
}

module.exports = exports;