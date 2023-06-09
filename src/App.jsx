import React, { useState } from 'react'
import './App.css'
import AddBox from './components/AddBox'
import RadioInput from './components/RadioInput'
// import Search from './components/Search'
import Todo from './components/Todo'
import { useTodo } from './hooks/useTodo'

function App() {
  const {
    todo,
    addTodo,
    deleteTodo,
    startEditing,
    saveEdit,
    stopEditing,
    editingTodo,
    dragStart,
    dragEnter,
    drop,
  } = useTodo()

  const [selectedRadio, setSelectedRadio] = useState('all')

  return (
    <div className='app'>
      <h1>Todo App</h1>
      {/* <Search /> */}
      <RadioInput setSelectedRadio={setSelectedRadio} />
      <AddBox addTodo={addTodo} />
      <div
        onTouchEnd={(e) => {
          e.persist()
          drop(e)
        }}
      >
        {todo.map((todo, index) => (
          <Todo
            deleteTodo={deleteTodo}
            startEditing={startEditing}
            saveEdit={saveEdit}
            stopEditing={stopEditing}
            editingTodo={editingTodo}
            key={`${todo.id}-${todo.index}`}
            id={todo.id}
            text={todo.text}
            timestamp={todo.timestamp}
            isEdited={todo.isEdited}
            dragStart={(e) => dragStart(e, index)}
            dragEnter={(e) => dragEnter(e, index)}
            drop={drop}
            selectedRadio={selectedRadio}
            isCompleted={todo.isCompleted}
            index={index}
            draggingIndex={editingTodo && editingTodo.draggingIndex}
          />
        ))}
      </div>
    </div>
  )
}

export default App
