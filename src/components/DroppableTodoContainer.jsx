import React from 'react'
import { useDrop } from 'react-dnd'

const DroppableTodo = ({ id, index, moveTodo, children }) => {
  const [, drop] = useDrop(() => ({
    accept: 'todo',
    hover(item, monitor) {
      if (item.index === index) {
        return
      }
      moveTodo(item.index, index)
      item.index = index
    },
  }))

  return <div ref={drop}>{children}</div>
}

export default DroppableTodo
