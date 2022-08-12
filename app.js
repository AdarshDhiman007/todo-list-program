const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

document.addEventListener('DOMContentLoaded', getTodo)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('click',filterTodo)

function addTodo(event){

  event.preventDefault();

  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')
  console.log(todoDiv)

  const newTodo = document.createElement('li')
  newTodo.innerText = todoInput.value
  newTodo.classList.add('todo-item')
  todoDiv.appendChild(newTodo)

  saveLocalTodos(todoInput.value)

  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';
  completedButton.classList.add("complete-btn")
  todoDiv.appendChild(completedButton)
 
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
  trashButton.classList.add("trash-btn")
  todoDiv.appendChild(trashButton)

  todoList.appendChild(todoDiv)

  todoInput.value = "";
}

function deleteCheck(e){
  const item = e.target

  if(item.className == 'trash-btn')
  { item.parentElement.classList.add('fall')
    removeLocalTodos(item.parentElement)
    item.parentElement.addEventListener('transitionend',function(){
    item.parentElement.remove()}
    ) 
  }
  
  if(item.className == 'complete-btn')
  {
    item.parentElement.classList.toggle('completed')
  }

}

function filterTodo(e){
  const todos = todoList.childNodes
  
  todos.forEach(function(tod){
    let mstyle = tod.style;
    if((e.target.value) == 'completed')
    { 
      if(tod.className == 'todo completed'){
        mstyle.display = "flex";
      }
      if(tod.className == 'todo'){
        mstyle.display = "none";
      }
    }

    if((e.target.value) == 'uncomplete')
    {
      if(tod.className == 'todo completed'){
        mstyle.display = "none";
      }
      if(tod.className == 'todo'){
        mstyle.display = "flex";
      }
    }

    if((e.target.value) == 'all')
    {
      if(tod.className == 'todo completed'){
        mstyle.display = "flex";
      }
      if(tod.className == 'todo'){
        mstyle.display = "flex";
      }
    }
    

  })

}


function saveLocalTodos(todo){

  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodo(){
  
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function(todo){

  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')
  console.log(todoDiv)

  const newTodo = document.createElement('li')
  newTodo.innerText = todo
  newTodo.classList.add('todo-item')
  todoDiv.appendChild(newTodo)

  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';
  completedButton.classList.add("complete-btn")
  todoDiv.appendChild(completedButton)
 
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
  trashButton.classList.add("trash-btn")
  todoDiv.appendChild(trashButton)

  todoList.appendChild(todoDiv)


})}

function removeLocalTodos(todo){

  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  console.log(todo.children[0].innerText)
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos))
}
