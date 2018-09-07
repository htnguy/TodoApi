// code that executes when the dom is finished loading, such as, fetching data 
// from the api that can only be done when the dom is ready
$(document).ready(function(){
	$.getJSON("/api/todos")
	.then(addTodos)
	$("#todoInput").keypress(function(event){
		if(event.which ==13){
			// the keypress 13 represenst the enter key
			createTodo();
		}
	});
	
	// it is not guarantee that the spans will 
	// be there on page load, therefore the event listener
	// is set on the ul with the class list
	// a second parameter is introduced to set the listerner
	// to span within the ul only.
	$('.list').on('click', 'span', function(event){
		event.stopPropagation();
		 // prevents the event of clicking on the span from 
		// triggering the event for the li only
		// removing the specific todo
		removeTodo.call(this);
	});
	$('.list').on('click', 'li', function(){
		toggleCompletion($(this));
	});
	

});
// adding all of the todos from the api to the page
function addTodos(todos){
	// add todos to the page
	todos.forEach(function(todo){
		addTodo(todo);
	});
}// adding a single todo to the page
function addTodo(todo){
	var newTodo = $('<li class="task">' + todo.name  +'<span>X</span></li>');
		if (todo.completed){
			newTodo.addClass("done");
		}
		newTodo.data('id', todo._id);
		newTodo.data('completed', todo.completed);
		$(".list").append(newTodo);

}
function removeTodo(){
		//$(this).parent().remove();// this will remove them from the dom
		var id  = $(this).parent().data('id');
		var url = '/api/todos/' + id;
		$(this).parent().remove(); // remove from the dom
		// removing from database
		$.ajax({
			method: 'DELETE',
			url: url

		}).then(function(data){
			console.log(data);
		})
}
function toggleCompletion(todo){
	// send a put request to server to update the completed status
	var updateUrl = '/api/todos/'+ todo.data('id');
	var isDone = !todo.data('completed');
	// .data('completed') is a different memory set stored by the dom and is not
	// the same value as todo.completed, which is a part of the database
	// therefore it must be toggled manually.
	var updateData = {completed: isDone};
	$.ajax({
		method: 'PUT',
		url: updateUrl,
		data: updateData
	}).then(function(updatedTodo){
		// if the put request was successful
		todo.toggleClass("done");
		todo.data('completed', isDone);
		
	}).catch(function(err){
		console.log(err);
	})

}




// steps for creating new Todo:
//1. selecting the form using jquery
// extracting the data from the from
// sending a post request using the data extracted

function createTodo(){
	var userInput = $('#todoInput').val();
	// send request to create new todo
	$.post("/api/todos", {name: userInput })
	.then(function(newTodo){
		$('#todoInput').val(''); // clearing the input box
		addTodo(newTodo);
	})
	.catch(function(err){
		console.log(err);
	})
}