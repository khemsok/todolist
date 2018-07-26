$(document).ready(function () {
    $.getJSON("/api/todos")
        .then(addTodos)

    $("#todoInput").keypress(function (event) {
        if (event.which == 13) {
            createTodo();
        }
    })

    $(".list").on("click", "span", function (e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    })

    $(".list").on("click", "li", function () {
        updateTodo($(this));
    })
});



// Add todos to the page

function addTodos(todos) {
    todos.forEach(function (el) {
        addTodo(el);

    })
}

// Add one todo to the page

function addTodo(el) {
    var todo = $('<li class = "task">' + el.name + '<span>x</span></li>');
    todo.data("id", el._id);
    todo.data("completed", el.completed);
    if (el.completed) {
        todo.addClass("done");
    }
    $(".list").append(todo);
}

// Create todos to the page

function createTodo() {
    var input = $("#todoInput").val();
    $.post("/api/todos", {
            name: input
        })
        .then(function (newTodo) {
            $("#todoInput").val("");
            addTodo(newTodo)
        })
        .catch(function (err) {
            console.log(err);
        })
}

// Remove the todo

function removeTodo(el) {
    var deleteURL = "/api/todos/" + el.data("id");
    $.ajax({
            method: "DELETE",
            url: deleteURL
        })
        .then(function () {
            el.remove();
        });

}

// Update the todo

function updateTodo(el) {
    var isDone = !el.data("completed");
    var updateData = {
        completed: isDone
    };
    console.log(updateData);

    $.ajax({
            method: "PUT",
            url: "/api/todos/" + el.data("id"),
            data: updateData
        })
        .then(function (todo) {
            el.toggleClass("done");
            el.data("completed", isDone);
        })

}