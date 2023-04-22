import React, { useState } from 'react'
import classes from './AddBox.module.css'

const AddBox = ({ addTodo }) => {
  const [text, setText] = useState('')
  const [showTodoWarning, setShowTodoWarning] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text.trim()) {
      setShowTodoWarning(true)
      return
    }

    addTodo(text)
    setText('')
  }

  const handleChange = (e) => {
    setText(e.target.value)
    if (e.target.value.trim()) {
      setShowTodoWarning(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      handleSubmit(e)
    }
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <textarea
          className={`${classes.textBox} ${
            showTodoWarning ? classes.warningText : ''
          }`}
          id='textBox'
          cols='30'
          rows='5'
          placeholder={
            showTodoWarning ? 'Please enter a valid Todo' : 'Add a Todo'
          }
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          minLength={1}
          maxLength={75}
        ></textarea>
        <button className={classes.subButton} type='submit'>
          Add
        </button>
      </form>
    </div>
  )
}

export default AddBox
