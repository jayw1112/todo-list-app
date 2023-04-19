import { useState, useEffect, useRef } from 'react'

export const useTodo = () => {
  const savedTodo = localStorage.getItem('todo')
  const initialTodo = savedTodo ? JSON.parse(savedTodo) : []

  const [todo, setTodo] = useState(initialTodo)
  const [editingTodo, setEditingTodo] = useState(null)

  const dragItem = useRef()
  const dragOverItem = useRef()

  const addTodo = (text) => {
    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Updated id generation
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

  const dragStart = (e, position) => {
    dragItem.current = position
  }

  const dragEnter = (e, position) => {
    dragOverItem.current = position
  }

  const drop = (e) => {
    const copyListItem = [...todo]
    const dragItemContent = copyListItem[dragItem.current]
    copyListItem.splice(dragItem.current, 1)
    copyListItem.splice(dragOverItem.current, 0, dragItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setTodo(copyListItem)
  }

  return {
    todo,
    addTodo,
    deleteTodo,
    startEditing,
    stopEditing,
    saveEdit,
    editingTodo,
    dragStart,
    dragEnter,
    drop,
  }
}
