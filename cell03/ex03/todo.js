document.addEventListener('DOMContentLoaded', function () {

  const newTodoBtn = document.getElementById('newTodo')
  const todoList = document.getElementById('ft_list')

  // โหลด TO DO จาก cookie
  loadTodosFromCookie()

  // ปุ่ม New TO DO
  newTodoBtn.addEventListener('click', function () {
    const todoText = prompt('Enter a new TO DO:')
    if (todoText && todoText.trim() !== '') {
      addTodo(todoText)
      saveTodosToCookie()
    }
  })

  // เพิ่ม TO DO
  function addTodo(text) {
    const newTodo = document.createElement('div')
    newTodo.className = 'todo-item'
    newTodo.textContent = text

    // เพิ่มไว้บนสุด
    todoList.prepend(newTodo)

    // คลิกเพื่อลบ
    newTodo.addEventListener('click', function () {
      const confirmDelete = confirm('Do you really want to delete this TO DO?')
      if (confirmDelete) {
        newTodo.remove()
        saveTodosToCookie()
      }
    })
  }

  // บันทึก TO DO ลง cookie
  function saveTodosToCookie() {
    const todos = []
    const todoItems = document.querySelectorAll('#ft_list .todo-item')

    todoItems.forEach(function (item) {
      todos.push(item.textContent)
    })

    document.cookie = 'todos=' + JSON.stringify(todos) + '; path=/'
  }

  // โหลด TO DO จาก cookie
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