import { useDraggable } from '@dnd-kit/core'
import { format } from 'date-fns'

interface DraggableItemProps {
  item: any
  copy?: boolean
}

export function Item({ item, copy = false }: DraggableItemProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  })
  return (
    <button
      className="absolute w-44 h-20 flex justify-center items-center pointer-events-auto"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        top: copy ? 0 : item.y,
        left: copy ? 0 : item.x,
        width: 176 * item.length + 'px',
      }}
    >
      <div
        className="h-16 bg-white flex justify-between rounded-md"
        style={{
          width: 160 * item.length + 'px',
        }}
      >
        <div className="h-100 w-4 bg-blue-400 rounded-tl rounded-bl"></div>
        <div className="self-center flex flex-col">
          <p>
            {format(item.time.since, 'HH:mm')}-{format(item.time.till, 'HH:mm')}
          </p>
          <p>tableIndex:{item.tableIndex}</p>
          <p>id:{item.id}</p>
        </div>
        <div className="h-100 w-4 bg-blue-400 rounded-tr rounded-br"></div>
      </div>
    </button>
  )
}
