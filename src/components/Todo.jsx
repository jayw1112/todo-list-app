import { useState } from 'react'
import classes from './Todo.module.css'

const Todo = ({
  id,
  text,
  timestamp,
  deleteTodo,
  editingTodo,
  startEditing,
  stopEditing,
  saveEdit,
}) => {
  const [editedText, setEditedText] = useState(text)
  const isEditing = editingTodo && editingTodo.id === id

  const editHandler = () => {
    startEditing(id)
  }

  const deleteHandler = () => {
    deleteTodo(id)
  }

  const saveHandler = () => {
    saveEdit(id, editedText)
    stopEditing()
  }

  const changeHandler = (e) => {
    setEditedText(e.target.value)
  }

  const enterHandler = (e) => {
    if (e.key === 'Enter') {
      saveHandler()
    }
  }

  //   const cancelHandler = () => {
  //     setEditedText(text)
  //     stopEditing()
  //   }

  //   const blurHandler = () => {
  //     saveHandler()
  //   }

  return (
    <div className={classes.todo}>
      {!isEditing && (
        <button onClick={deleteHandler} className={classes.delete}>
          X
        </button>
      )}
      {isEditing ? (
        <input
          type='text'
          defaultValue={text}
          onChange={changeHandler}
          onBlur={saveHandler}
          onKeyDown={enterHandler}
        />
      ) : (
        <p>{text}</p>
      )}
      <p className={classes.stamp}>
        Created at: {new Date(timestamp).toLocaleString()}
      </p>
      {!isEditing ? (
        <button onClick={editHandler}>Edit</button>
      ) : (
        <div>
          <button onClick={saveHandler}>Save</button>
          {/* <button onClick={cancelHandler}>Cancel</button> */}
        </div>
      )}
    </div>
  )
}

export default Todo
