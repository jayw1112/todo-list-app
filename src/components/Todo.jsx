import { useState, useEffect } from 'react'
import classes from './Todo.module.css'
import Checkbox from './Checkbox'

const Todo = ({
  id,
  text,
  timestamp,
  deleteTodo,
  editingTodo,
  startEditing,
  stopEditing,
  saveEdit,
  isEdited,
  dragStart,
  dragEnter,
  drop,
  selectedRadio,
}) => {
  const [editedText, setEditedText] = useState(text)
  const isEditing = editingTodo && editingTodo.id === id

  const [isVisible, setIsVisible] = useState(true)

  const initialState = () => {
    const savedState = localStorage.getItem(`checkbox-${id}`)
    return savedState ? JSON.parse(savedState) : false
  }

  const [isChecked, setIsChecked] = useState(initialState)

  const editHandler = () => {
    startEditing(id)
  }

  const deleteHandler = () => {
    deleteTodo(id)
  }

  const saveHandler = () => {
    saveEdit(id, editedText, Date.now())
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

  const cancelHandler = () => {
    setEditedText(text)
    stopEditing()
  }

  //   const blurHandler = () => {
  //     saveHandler()
  //   }

  useEffect(() => {
    if (selectedRadio === 'completed') {
      setIsVisible(isChecked)
    } else if (selectedRadio === 'inProgress') {
      setIsVisible(!isChecked)
    } else {
      setIsVisible(true)
    }
  }, [selectedRadio, isChecked])

  return isVisible ? (
    <div
      className={classes.todo}
      draggable
      onDragStart={dragStart}
      onDragEnter={dragEnter}
      onDrop={drop}
      onDragOver={(e) => e.preventDefault()}
      // data-index={index}
    >
      {!isEditing && (
        <button onClick={deleteHandler} className={classes.delete}>
          X
        </button>
      )}
      {isEditing ? (
        <input
          type='text'
          className={classes.todoInput}
          defaultValue={text}
          onChange={changeHandler}
          //   onBlur={cancelHandler}
          onKeyDown={enterHandler}
        />
      ) : (
        <p
          className={`${classes.todoText} ${
            isChecked ? classes.lineThrough : ''
          }`}
        >
          {text}
        </p>
      )}
      <p className={classes.stamp}>
        {!isEdited ? 'Created' : 'Edited'} at:{' '}
        {new Date(timestamp).toLocaleString()}
      </p>
      <Checkbox
        todoId={id}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        // initialState={initialState}
      />

      {!isEditing ? (
        <button onClick={editHandler}>Edit</button>
      ) : (
        <div>
          <button onClick={saveHandler} className={classes.saveButton}>
            Save
          </button>
          <button onClick={cancelHandler}>Cancel</button>
        </div>
      )}
    </div>
  ) : null
}

export default Todo
