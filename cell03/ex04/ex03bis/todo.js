$(function(){

  const todoList = $("#ft_list");

  loadTodosFromCookie();

  $("#newTodo").off("click").on("click", function(){
    let todoText = prompt("Enter a new TO DO:");
    if (todoText && todoText.trim() !== "") {
      addTodo(todoText);
      saveTodosToCookie();
    }
  });

  function addTodo(text){
    let newTodo = $("<div></div>");
    newTodo.addClass("todo-item");
    newTodo.text(text);

    todoList.prepend(newTodo);

    newTodo.on("click", function(){
      if (confirm("Do you really want to delete this TO DO?")) {
        $(this).remove();
        saveTodosToCookie();
      }
    });
  }

  function saveTodosToCookie(){
    let todos = [];

    $("#ft_list .todo-item").each(function(){
      todos.push($(this).text());
    });

    document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
  }

  function loadTodosFromCookie(){
    let cookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("todos="));

    if (cookie) {
      let todoArray = JSON.parse(cookie.split("=")[1]);
      $.each(todoArray, function(index, todoText){
        addTodo(todoText);
      });
    }
  }

});
