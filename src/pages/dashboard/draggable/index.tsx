import { DndContext, useSensor, MouseSensor, TouchSensor, KeyboardSensor, useSensors, DragOverlay } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import type { Coordinates } from '@dnd-kit/utilities'
import { useState } from 'react'
import { Item } from './item'
export enum Axis {
  All,
  Vertical,
  Horizontal,
}

function snapToGrid(args: any) {
  const { transform } = args
  console.log('x', Math.ceil(transform.x / 44) * 44, 'y', Math.ceil(transform.y / 44) * 44)
  return {
    ...transform,
    x: Math.ceil(transform.x / 44) * 44,
    y: Math.ceil(transform.y / 80) * 80,
  }
}

export function Draggable() {
  const defaultCoordinates = { x: 0, y: 0 }
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates)
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 60,
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 60,
    },
  })
  const keyboardSensor = useSensor(KeyboardSensor, {})
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)
  const [activeId, setActiveId] = useState(null)
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: Math.floor((x + delta.x) / 44) * 44,
            y: Math.floor((y + delta.y) / 80) * 80,
          }
        })
        handleDragEnd()
      }}
      modifiers={[restrictToParentElement, snapToGrid]}
      onDragStart={handleDragStart}
    >
      <Item top={y} left={x} />
      <DragOverlay dropAnimation={null} modifiers={[restrictToParentElement, snapToGrid]}>
        {activeId ? (
          <button className="w-44 h-20 flex justify-center items-center relative pointer-events-auto">
            <div className="w-40 h-16 bg-white flex justify-between rounded-md">
              <div className="h-100 w-4 bg-blue-400 rounded-tl rounded-bl"></div>
              <div className="h-100 w-4 bg-blue-400 rounded-tr rounded-br"></div>
            </div>
          </button>
        ) : null}
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
