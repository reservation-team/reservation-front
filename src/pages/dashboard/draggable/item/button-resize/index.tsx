import { useDraggable } from '@dnd-kit/core'
import { useEffect, useState } from 'react'

interface ButtonReiszeProps {
  direction: 'left' | 'right'
  id: any
  handleLength: (id: any, dx: number, direction: 'left' | 'right') => void
}

export const ButtonReisze = ({ direction, id, handleLength }: ButtonReiszeProps) => {
  const [dx, setDx] = useState(0)
  const { attributes, isDragging, listeners, transform } = useDraggable({
    id: 'resizeButton-' + id + '' + direction,
  })
  useEffect(() => {
    if (isDragging) {
      setDx(transform?.x ?? 0)
      handleLength(id, (transform?.x ?? 0) - dx, direction)
    }
    if (!isDragging) {
      setDx(0)
    }
  }, [isDragging, id, transform?.x, direction])

  return (
    <div
      {...listeners}
      {...attributes}
      className={`h-100 w-4 bg-blue-400 ${direction === 'left' ? 'rounded-tl rounded-bl' : 'rounded-tr rounded-br'}`}
    ></div>
  )
}
