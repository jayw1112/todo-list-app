import { useState, useEffect, useRef } from 'react'

export const useTodo = () => {
  const savedTodo = localStorage.getItem('todo')
  const initialTodo = savedTodo ? JSON.parse(savedTodo) : []

  const [todo, setTodo] = useState(initialTodo)
  const [editingTodo, setEditingTodo] = useState(null)

  const [draggingIndex, setDraggingIndex] = useState(null)

  const [touchStartItem, setTouchStartItem] = useState(null)
  const [touchEndItem, setTouchEndItem] = useState(null)

  const dragItem = useRef()
  const dragOverItem = useRef()

  const addTodo = (text) => {
    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Updated id generation
      text: text,
      timestamp: Date.now(),
      isCompleted: false,
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
    if (e.type === 'touchstart') {
      setTouchStartItem(position)
      setDraggingIndex(position)
    } else {
      dragItem.current = position
      setDraggingIndex(position)
    }
  }
  const dragEnter = (e, position) => {
    if (e.type === 'touchmove') {
      if (touchStartItem !== null) {
        // e.preventDefault()
        setTouchEndItem(position)
      }
    } else {
      dragOverItem.current = position
    }
  }

  const drop = (e) => {
    if (e.type === 'touchend') {
      if (touchStartItem === null || touchEndItem === null) {
        return
      }

      // Calculate index based on touch position
      const touch = e.changedTouches[0]
      const element = document.elementFromPoint(touch.clientX, touch.clientY)
      const todoElements = document.querySelectorAll('[data-todo-item]')
      const index = Array.from(todoElements).findIndex((el) => el === element)

      if (index === -1) {
        setTouchStartItem(null)
        setTouchEndItem(null)
        setDraggingIndex(null)
        return
      }

      const copyListItem = [...todo]
      const dragItemContent = copyListItem[touchStartItem]
      copyListItem.splice(touchStartItem, 1)
      copyListItem.splice(index, 0, dragItemContent)
      setTouchStartItem(null)
      setTouchEndItem(null)
      setTodo(copyListItem)
    } else {
      if (dragItem.current === null) {
        return
      }

      const copyListItem = [...todo]
      const dragItemContent = copyListItem[dragItem.current]
      copyListItem.splice(dragItem.current, 1)
      copyListItem.splice(dragOverItem.current, 0, dragItemContent)
      dragItem.current = null
      dragOverItem.current = null
      setDraggingIndex(null)
      setTodo(copyListItem)
    }
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
    draggingIndex,
  }
}
