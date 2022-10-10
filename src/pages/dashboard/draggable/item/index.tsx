import { useDraggable } from '@dnd-kit/core'

interface DraggableItemProps {
  top?: number
  left?: number
}

export function Item({ top, left }: DraggableItemProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  })
  return (
    <button
      className="w-44 h-20 flex justify-center items-center relative pointer-events-auto"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        top,
        left,
      }}
    >
      <div className="w-40 h-16 bg-white flex justify-between rounded-md">
        <div className="h-100 w-4 bg-blue-400 rounded-tl rounded-bl"></div>
        <div className="h-100 w-4 bg-blue-400 rounded-tr rounded-br"></div>
      </div>
    </button>
  )
}
