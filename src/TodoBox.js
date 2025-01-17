import { useEffect, useRef, useState } from "react"
import todoStore from "./TodoStore"
import { observer } from "mobx-react-lite"

const TodoBox = ({todo}) => {
  const inputRef = useRef()
  const [editing, setEditing] = useState(false)
  const [editedInput, setEditedInput] = useState(todo.content)

  const removeTodo = (todo) => {
    todoStore.removeTodo(todo)
  }

  const changeTodoStatus = (id) => {
    todoStore.isDone(id)
  }

  const editTodo = (id) => {
    if(editing && editedInput){
      let trimedTodo = editedInput.trim().replace(/\s+/g, " ")
      todoStore.editTodo(id, trimedTodo)
      setEditedInput(trimedTodo)
    }
    setEditing(!editing)
  }

  // Focus the input element when editing is enabled
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return(
    <div className={`list ${todo.done?"done":editing?"edit":""}`} key={todo.id}>
      {editing ? 
      (<input ref={inputRef} className="editing" type="text" value={editedInput} onChange={(e) => setEditedInput(e.target.value)} />) 
      : (<p className="content">{todo.content}</p>)}
      <div className="buttons">
        <button onClick={() => removeTodo(todo.id)} className="btn">X</button>
        <button disabled={todo.done} onClick={() => editTodo(todo.id)} className="btn">{editing?"SAVE":"EDIT"}</button>
        <button onClick={() => changeTodoStatus(todo.id)} className="btn">DONE</button>
      </div>
    </div>)
}

export default observer(TodoBox)