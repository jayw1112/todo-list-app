import { useState, useEffect } from 'react'

export const useTodo = () => {
  const savedTodo = localStorage.getItem('todo')
  const initialTodo = savedTodo ? JSON.parse(savedTodo) : []

  const [todo, setTodo] = useState(initialTodo)

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      timestamp: Date.now(),
    }

    const updatedTodos = [...todo, newTodo]
    setTodo(updatedTodos)
  }

  const deleteTodo = (id) => {
    const newTodo = todo.filter((todo) => todo.id !== id)
    setTodo(newTodo)
  }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo))
  }, [todo])

  return { todo, addTodo, deleteTodo }
}
