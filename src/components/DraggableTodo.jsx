import React from 'react'
import { useDrag } from 'react-dnd'

const DraggableTodo = ({ id, text, index, moveTodo }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'todo',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {text}
    </div>
  )
}

export default DraggableTodo
