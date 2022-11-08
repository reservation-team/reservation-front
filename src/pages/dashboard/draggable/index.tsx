import { DndContext, useSensor, MouseSensor, TouchSensor, KeyboardSensor, useSensors, DragOverlay } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { addMinutes, differenceInMinutes, roundToNearestMinutes } from 'date-fns'
import { useState } from 'react'
import { Item } from './item'
export enum Axis {
  All,
  Vertical,
  Horizontal,
}

function snapToGrid(args: any) {
  const { transform } = args
  return {
    ...transform,
    x: Math.round(transform.x / 44) * 44,
    y: Math.round(transform.y / 80) * 80,
  }
}

interface DraggableProps {
  data: any[]
  workHours: any
}

export const Draggable = ({ data, workHours }: DraggableProps) => {
  const [items, setitems] = useState(data)
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 40,
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 40,
    },
  })
  const keyboardSensor = useSensor(KeyboardSensor, {})
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)
  const [activeId, setActiveId] = useState(null)

  const getLength = (item: any) => differenceInMinutes(item.time.till, item.time.since) / 60

  const getCoordinates = (item: any) => {
    return {
      y: item.tableIndex * 80,
      x: (differenceInMinutes(item.time.since, workHours.since) / 60) * 176,
    }
  }
  const preparedItems = items.map((item) => ({ ...item, ...getCoordinates(item), length: getLength(item) }))
  const activeItem = preparedItems.find((item) => item.id === activeId)
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ delta }) => {
        setitems((items) =>
          items.map((item) =>
            item.id === activeId
              ? {
                  ...item,
                  tableIndex: item.tableIndex + Math.floor(delta.y / 80),
                  time: {
                    since: roundToNearestMinutes(addMinutes(item.time.since, 15 * (delta.x / 44)), { nearestTo: 15 }),
                    till: roundToNearestMinutes(addMinutes(item.time.till, 15 * (delta.x / 44)), { nearestTo: 15 }),
                  },
                }
              : item
          )
        )

        handleDragEnd()
      }}
      modifiers={[restrictToParentElement, snapToGrid]}
      onDragStart={handleDragStart}
    >
      {preparedItems.map((item) => (
        <Item key={item.id} item={item} />
      ))}
      <DragOverlay dropAnimation={null} modifiers={[restrictToParentElement, snapToGrid]}>
        {activeId ? <Item key={activeItem.id} item={activeItem} copy /> : null}
      </DragOverlay>
    </DndContext>
  )
  function handleDragStart(event: any) {
    setActiveId(event.active.id)
  }

  function handleDragEnd() {
    setActiveId(null)
  }
}
