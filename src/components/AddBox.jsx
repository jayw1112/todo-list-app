import React, { useState } from 'react'
import classes from './AddBox.module.css'

const AddBox = ({ addTodo }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text.trim()) {
      return
    }

    addTodo(text)
    setText('')
  }

  const handleChange = (e) => {
    setText(e.target.value)
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
          className={classes.textBox}
          id='textBox'
          cols='30'
          rows='5'
          placeholder='Add Todo Here'
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button className={classes.subButton} type='submit'>
          Add
        </button>
      </form>
    </div>
  )
}

export default AddBox
