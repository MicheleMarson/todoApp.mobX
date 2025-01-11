import { observer } from "mobx-react-lite"
import { useState } from "react"
import todoStore from "./TodoStore"


const Todo = () => {
  const [todoInput, setTodoInput] = useState("")
  const addTodo = () => {
    if(todoInput){
      todoStore.addTodo(todoInput)
    }
    setTodoInput("")
  }

  const removeTodo = (todo) => {
    todoStore.removeTodo(todo)
  }

  return(
    <div className="todo">
      <h2>Todo List</h2>
      <div>
        <input placeholder="Add todo..." type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)}/>
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="container">
        {todoStore.isEmpty ? "Todo is empty!" : 
          (
            todoStore.todoList.map(todo => (
              <div className="list" key={todo.id}>
                <p>{todo.content}</p>
                <button onClick={() => removeTodo(todo.id)} className="btn">X</button>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default observer(Todo)