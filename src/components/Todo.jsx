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
  isCompleted,
}) => {
  const [editedText, setEditedText] = useState(text)
  const isEditing = editingTodo && editingTodo.id === id

  const [isVisible, setIsVisible] = useState(true)
  const [showWarning, setShowWarning] = useState(false)

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
    if (!editedText.trim()) {
      setShowWarning(true)
      return
    }
    setShowWarning(false)
    saveEdit(id, editedText, Date.now())
    stopEditing()
  }

  const changeHandler = (e) => {
    setEditedText(e.target.value)
    if (e.target.value.trim()) {
      setShowWarning(false)
    }
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

  useEffect(() => {
    if (selectedRadio === 'radio2') {
      setIsVisible(isChecked)
    } else if (selectedRadio === 'radio3') {
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
      onDragOver={(e) => {
        e.preventDefault()
      }}
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
          onKeyDown={enterHandler}
          minLength={1}
          maxLength={75}
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
        isCompleted={isCompleted}
        setIsCompleted={setIsChecked}
      />

      {!isEditing ? (
        <button onClick={editHandler}>Edit</button>
      ) : (
        <div>
          <button onClick={saveHandler} className={classes.saveButton}>
            Save
          </button>
          <button onClick={cancelHandler}>Cancel</button>
          {showWarning && (
            <p className={classes.warning}>Please enter a valid todo.</p>
          )}
        </div>
      )}
    </div>
  ) : null
}

export default Todo
