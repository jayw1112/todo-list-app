import React, { useState } from 'react'
import './App.css'
import AddBox from './components/AddBox'
import Search from './components/Search'
import Todo from './components/Todo'

function App() {
  const [todo, setTodo] = useState([])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      timestamp: Date.now(),
    }

    setTodo([...todo, newTodo])
  }

  const deleteTodo = (id) => {
    const newTodo = todo.filter((todo) => todo.id !== id)
    setTodo(newTodo)
  }

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
