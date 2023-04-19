import './App.css'
import AddBox from './components/AddBox'
import Search from './components/Search'
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

  return (
    <div className='app'>
      <h1>Todo App</h1>
      <Search />
      <AddBox addTodo={addTodo} />
      <div>
        {todo.map((todo, index) => (
          <Todo
            deleteTodo={deleteTodo}
            startEditing={startEditing}
            saveEdit={saveEdit}
            stopEditing={stopEditing}
            editingTodo={editingTodo}
            key={index}
            id={todo.id}
            text={todo.text}
            timestamp={todo.timestamp}
            isEdited={todo.isEdited}
            dragStart={(e) => dragStart(e, index)}
            dragEnter={(e) => dragEnter(e, index)}
            drop={drop}
          />
        ))}
      </div>
    </div>
  )
}

export default App
