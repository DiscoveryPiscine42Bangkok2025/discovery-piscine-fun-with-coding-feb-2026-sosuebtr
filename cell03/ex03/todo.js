document.addEventListener('DOMContentLoaded', function () {

  const newTodoBtn = document.getElementById('newTodo')
  const todoList = document.getElementById('ft_list')

  loadTodosFromCookie()

  newTodoBtn.addEventListener('click', function () {
    const todoText = prompt('Enter a new TO DO:')
    if (todoText && todoText.trim() !== '') {
      addTodo(todoText)
      saveTodosToCookie()
    }
  })

  function addTodo(text) {
    const newTodo = document.createElement('div')
    newTodo.className = 'todo-item'
    newTodo.textContent = text

    todoList.prepend(newTodo)

    newTodo.addEventListener('click', function () {
      const confirmDelete = confirm('Do you really want to delete this TO DO?')
      if (confirmDelete) {
        newTodo.remove()
        saveTodosToCookie()
      }
    })
  }

  function saveTodosToCookie() {
    const todos = []
    const todoItems = document.querySelectorAll('#ft_list .todo-item')

    todoItems.forEach(function (item) {
      todos.push(item.textContent)
    })

    document.cookie = 'todos=' + JSON.stringify(todos) + '; path=/'
  }


  function loadTodosFromCookie() {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('todos='))

    if (cookie) {
      const todoArray = JSON.parse(cookie.split('=')[1])
      todoArray.forEach(function (todoText) {
        addTodo(todoText)
      })
    }
  }

})
