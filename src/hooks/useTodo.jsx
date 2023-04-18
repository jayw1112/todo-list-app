import { useState, useEffect } from 'react'

export const useTodo = () => {
  const savedTodo = localStorage.getItem('todo')
  const initialTodo = savedTodo ? JSON.parse(savedTodo) : []

  const [todo, setTodo] = useState(initialTodo)
  const [editingTodo, setEditingTodo] = useState(null)

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

  const startEditing = (id) => {
    const todoToEdit = todo.find((todo) => todo.id === id)
    setEditingTodo(todoToEdit)
  }

  const stopEditing = () => {
    setEditingTodo(null)
  }

  const saveEdit = (id, newText, updatedTimestamp) => {
    const updatedTodos = todo.map((t) =>
      t.id === id
        ? { ...t, text: newText, timestamp: updatedTimestamp, isEdited: true }
        : t
    )
    setTodo(updatedTodos)
    setEditingTodo(null)
  }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo))
  }, [todo])

  return {
    todo,
    addTodo,
    deleteTodo,
    startEditing,
    stopEditing,
    saveEdit,
    editingTodo,
  }
}
