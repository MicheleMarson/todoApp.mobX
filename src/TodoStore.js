import { action, computed, makeObservable, observable} from "mobx"

class TodoStore {
  constructor(){
    this.todoList = []
    this.filter = "all"
    this.textFilter = ""

    // observable to enable to track changes.
    // action because they modify the state.
    makeObservable(this, {
      todoList: observable,
      isEmpty: computed,
      filteredTodos: computed,
      addTodo: action,
      removeTodo: action,
      isDone: action,
      filter: observable,
      setFilter: action,
      textFilter: observable,
      setTextFilter: action,
      editTodo: action
    })

    // load todoList from localStorage when the store is created
    this.loadFromLocalStorage()
  }

  get isEmpty(){
    return this.todoList.length === 0 ? true : false
  }

  get filteredTodos(){
    let todos = this.todoList

    //apply completed/active filter 
    if(this.filter === "completed"){
      todos = todos.filter(todo => todo.done)
    }else if(this.filter === "active"){
      todos = todos.filter(todo => !todo.done)
    }

    //apply text filter
    const search = this.textFilter.trim().toLocaleLowerCase()
    todos = todos.filter(todo => todo.content.toLocaleLowerCase().includes(search))

    return todos
  }

  isDone(id){
    const todo = this.todoList.find(todo => todo.id === id)

    if(todo){
      todo.done = !todo.done
      this.saveToLocalStorage()
    }
  }

  addTodo(todo){
    const newTodo = {
      id: Date.now(),
      content: todo,
      done: false
    }

    this.todoList.push(newTodo)
    this.saveToLocalStorage()
  }

  editTodo(id, content){
    if(content){
      let editedTodo = this.todoList.find(todo => todo.id === id)
      editedTodo.content = content
      this.saveToLocalStorage()
    }
  }

  removeTodo(id){
    this.todoList = this.todoList.filter(t => t.id !== id)
    this.saveToLocalStorage()
  }

  saveToLocalStorage(){
    localStorage.setItem("todoList", JSON.stringify(this.todoList))
  }

  setFilter(newFilter){
    this.filter = newFilter // completed, active or null
  }

  setTextFilter(text){
    this.textFilter = text
  }

  loadFromLocalStorage(){
    const savedTodos = localStorage.getItem("todoList")
    if(savedTodos){
      this.todoList = JSON.parse(savedTodos)
    }
  }

}

const todoStore = new TodoStore()
export default todoStore