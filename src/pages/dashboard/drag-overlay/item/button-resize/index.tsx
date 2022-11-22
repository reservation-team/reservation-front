import { useDraggable } from '@dnd-kit/core'
import { useEffect, useState } from 'react'

interface ButtonReiszeProps {
  direction: 'left' | 'right'
  id: any
  handleLength: any
  item: any
}

export const ButtonReisze = ({ direction, id, handleLength, item }: ButtonReiszeProps) => {
  const [dx, setDx] = useState(0)
  const { attributes, isDragging, listeners, transform } = useDraggable({
    id: 'resizeButton-' + id + '' + direction,
  })
  useEffect(() => {
    if (isDragging) {
      setDx(transform?.x ?? 0)
      handleLength(item, (transform?.x ?? 0) - dx, direction)
    }
    if (!isDragging) {
      setDx(0)
    }
  }, [isDragging, id, transform?.x, direction])

  return (
    <div
      {...listeners}
      {...attributes}
      className={`h-100 w-4 bg-blue-400 cursor-ew-resize ${
        direction === 'left' ? 'rounded-tl rounded-bl' : 'rounded-tr rounded-br'
      }`}
    ></div>
  )
}
