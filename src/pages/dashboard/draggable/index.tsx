import { DndContext, useSensor, MouseSensor, TouchSensor, KeyboardSensor, useSensors } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { addMinutes, differenceInMinutes, isBefore, roundToNearestMinutes, subMinutes } from 'date-fns'
import { useState } from 'react'
import { Item } from './item'
export enum Axis {
  All,
  Vertical,
  Horizontal,
}

const snapToGrid = (args: any) => {
  const { transform } = args
  return {
    ...transform,
    x: Math.round(transform.x / 44) * 44,
    y: Math.round(transform.y / 80) * 80,
  }
}

interface Reservation {
  id: number
  tableId: number
  seats: number
  time: {
    since: Date
    till: Date
  }
  comment: string
  person: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

interface DraggableProps {
  tables: {
    id: number
    name: string
    seats: {
      min: number
      max: number
    }
    reservations: Reservation[]
  }[]
  workHours: {
    since: Date
    till: Date
  }
}

const getData = (
  tables: DraggableProps['tables']
): [tableCoordiantes: Record<string, number>, reservations: Reservation[]] => {
  let tableCoordinates = {} as Record<string, number>
  let reservations = []
  for (const [index, table] of tables.entries()) {
    tableCoordinates[String(table.id)] = index * 80
    reservations.push(table.reservations)
  }
  return [tableCoordinates, reservations.flat()]
}

export const Draggable = ({ tables, workHours }: DraggableProps) => {
  const [tableCoordinates, reservations] = getData(tables)
  const [items, setitems] = useState(reservations)
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
      y: tableCoordinates[item.tableId],
      x: (differenceInMinutes(item.time.since, workHours.since) / 60) * 176,
    }
  }
  const preparedItems = items.map((item) => ({ ...item, ...getCoordinates(item), length: getLength(item) }))

  const handleLength = (id: any, dx: number, direction: 'left' | 'right') => {
    setitems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              time: {
                since:
                  direction === 'left' &&
                  isBefore(
                    subMinutes(workHours.since, 1),
                    roundToNearestMinutes(addMinutes(item.time.since, 15 * (dx / 44)), { nearestTo: 15 })
                  ) &&
                  differenceInMinutes(
                    item.time.till,
                    roundToNearestMinutes(addMinutes(item.time.since, 15 * (dx / 44)), { nearestTo: 15 })
                  ) > 60
                    ? roundToNearestMinutes(addMinutes(item.time.since, 15 * (dx / 44)), { nearestTo: 15 })
                    : item.time.since,
                till:
                  direction === 'right' &&
                  isBefore(
                    roundToNearestMinutes(addMinutes(item.time.till, 15 * (dx / 44)), { nearestTo: 15 }),
                    workHours.till
                  ) &&
                  differenceInMinutes(
                    roundToNearestMinutes(addMinutes(item.time.till, 15 * (dx / 44)), { nearestTo: 15 }),
                    item.time.since
                  ) > 60
                    ? roundToNearestMinutes(addMinutes(item.time.till, 15 * (dx / 44)), { nearestTo: 15 })
                    : item.time.till,
              },
            }
          : item
      )
    )
  }

  const handleDragStart = (event: any) => setActiveId(event.active.id)

  const handleDragEnd = (event: any) => {
    setitems((items) =>
      items.map((item) =>
        item.id === event.active.id
          ? {
              ...item,
              tableId: Number(
                Object.keys(tableCoordinates).find(
                  (key) => tableCoordinates[key] === tableCoordinates[item.tableId] + event.delta.y
                )
              ),
              time: {
                since: roundToNearestMinutes(addMinutes(item.time.since, 15 * (event.delta.x / 44)), {
                  nearestTo: 15,
                }),
                till: roundToNearestMinutes(addMinutes(item.time.till, 15 * (event.delta.x / 44)), {
                  nearestTo: 15,
                }),
              },
            }
          : item
      )
    )

    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement, snapToGrid]}
      onDragStart={handleDragStart}
    >
      {preparedItems.map((item) => (
        <Item key={item.id} item={item} handleLength={handleLength} />
      ))}
    </DndContext>
  )
}
