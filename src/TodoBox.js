import { useState } from "react"
import todoStore from "./TodoStore"
import { observer } from "mobx-react-lite"

const TodoBox = ({todo}) => {
  const [editing, setEditing] = useState(false)
  const [editedInput, setEditedInput] = useState("")

  const removeTodo = (todo) => {
    todoStore.removeTodo(todo)
  }

  const changeTodoStatus = (id) => {
    todoStore.isDone(id)
  }

  const editTodo = (id) => {
    setEditing(!editing)
    if(editedInput){
      todoStore.editTodo(id, editedInput)
    }
  }

  return(
    <div className={`list ${todo.done?"done":""}`} key={todo.id}>
      {editing ? 
      (<input type="text" value={editedInput} onChange={(e) => setEditedInput(e.target.value)} />) 
      : (<p>{todo.content}</p>)}
      <button onClick={() => removeTodo(todo.id)} className="btn">X</button>
      <button onClick={() => editTodo(todo.id)} className="btn">{editing?"SAVE":"EDIT"}</button>
      <button onClick={() => changeTodoStatus(todo.id)} className="btn">DONE</button>
    </div>)
}

export default observer(TodoBox)