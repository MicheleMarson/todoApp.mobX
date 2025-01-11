import { observer } from "mobx-react-lite"
import { useState } from "react"
import todoStore from "./TodoStore"
import { toJS } from "mobx"


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

  const changeTodoStatus = (id) => {
    console.log("id id ", id);
    
    todoStore.isDone(id)
    console.log(toJS(todoStore));
    
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
              <div className={`list ${todo.done?"done":""}`} key={todo.id}>
                <p>{todo.content}</p>
                <button onClick={() => removeTodo(todo.id)} className="btn">X</button>
                <button onClick={() => changeTodoStatus(todo.id)} className="btn">DONE</button>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default observer(Todo)