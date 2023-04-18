import React, { useState, useEffect } from 'react'
import './App.css'
import AddBox from './components/AddBox'
import Search from './components/Search'
import Todo from './components/Todo'

function App() {
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

  return (
    <div className='app'>
      <h1>Todo App</h1>
      <Search />
      <AddBox addTodo={addTodo} />
      <div>
        {todo.map((todo) => (
          <Todo
            deleteTodo={deleteTodo}
            key={todo.id}
            id={todo.id}
            text={todo.text}
            timestamp={todo.timestamp}
          />
        ))}
      </div>
    </div>
  )
}

export default App
