import { action, computed, makeObservable, observable, toJS } from "mobx"

class TodoStore {
  constructor(){
    this.todoList = []

    // observable to enable to track changes.
    // action because they modify the state.
    makeObservable(this, {
      todoList: observable,
      isEmpty: computed,
      addTodo: action,
      removeTodo: action,
      isDone: action
    })

    // load todoList from localStorage when the store is created
    this.loadFromLocalStorage()
  }

  get isEmpty(){
    return this.todoList.length === 0 ? true : false
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

  removeTodo(id){
    this.todoList = this.todoList.filter(t => t.id !== id)
    this.saveToLocalStorage()
  }

  saveToLocalStorage(){
    localStorage.setItem("todoList", JSON.stringify(this.todoList))
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