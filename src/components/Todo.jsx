import React from 'react'
import classes from './Todo.module.css'

const Todo = ({ id, text, timestamp, deleteTodo }) => {
  const deleteHandler = () => {
    deleteTodo(id)
  }

  return (
    <div className={classes.todo}>
      <button onClick={deleteHandler} className={classes.delete}>
        X
      </button>
      <p>{text}</p>
      <p className={classes.stamp}>
        Created at: {new Date(timestamp).toLocaleString()}
      </p>
    </div>
  )
}

export default Todo
