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
  } = useTodo()

  return (
    <div className='app'>
      <h1>Todo App</h1>
      <Search />
      <AddBox addTodo={addTodo} />
      <div>
        {todo.map((todo) => (
          <Todo
            deleteTodo={deleteTodo}
            startEditing={startEditing}
            saveEdit={saveEdit}
            stopEditing={stopEditing}
            editingTodo={editingTodo}
            key={todo.id}
            id={todo.id}
            text={todo.text}
            timestamp={todo.timestamp}
            isEdited={todo.isEdited}
          />
        ))}
      </div>
    </div>
  )
}

export default App
