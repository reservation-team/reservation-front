import { useDraggable } from '@dnd-kit/core'
import { format } from 'date-fns'
import { ButtonReisze } from './button-resize'

interface DraggableItemProps {
  item: any
  handleLength: any
  onClick: () => void
}

export function Item({ item, handleLength, onClick }: DraggableItemProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
  })
  return (
    <button
      className="absolute w-44 h-20 flex justify-center items-center pointer-events-auto px-2"
      onClick={onClick}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        top: item.y,
        left: item.x,
        width: 176 * item.length + 'px',
        transform: `translateX(${transform?.x ?? 0}px) translateY(${transform?.y ?? 0}px)`,
      }}
    >
      <div className="h-16 bg-white flex justify-between rounded-md border w-full">
        <ButtonReisze direction="left" id={item.id} handleLength={handleLength} item={item} />
        <div className="self-center flex flex-col">
          <p className="text-sm font-semibold">{item.person.firstName}</p>
          <p className="text-sm">
            {format(item.time.since, 'HH:mm')}-{format(item.time.till, 'HH:mm')}
          </p>
        </div>
        <ButtonReisze direction="right" id={item.id} handleLength={handleLength} item={item} />
      </div>
    </button>
  )
}
