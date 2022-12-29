import { DndContext, useSensor, MouseSensor, TouchSensor, KeyboardSensor, useSensors } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { addMinutes, differenceInMinutes, isBefore, parseISO, roundToNearestMinutes, subMinutes } from 'date-fns'
import { Item } from './item'
import { Reservation, Table } from '../../../../shared/types'
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

interface DragOverlayProps {
  tables: Table[]
  workHours: {
    since: Date
    till: Date
  }
  controller: any
  handleFormReservation: (item?: any) => void
}

const getData = (tables: Table[]): [tableCoordiantes: Record<string, number>, reservations: Reservation[]] => {
  let tableCoordinates = {} as Record<string, number>
  let reservations = []
  for (const [index, table] of tables.entries()) {
    tableCoordinates[String(table.id)] = index * 80
    reservations.push(table.reservations)
  }
  return [tableCoordinates, reservations.flat()]
}

export const DragOverlay = ({ tables, workHours, controller, handleFormReservation }: DragOverlayProps) => {
  const [tableCoordinates, reservations] = getData(tables)
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

  const getLength = (item: Reservation) => differenceInMinutes(parseISO(item.timeUntil), parseISO(item.timeFrom)) / 60

  const getCoordinates = (item: Reservation) => {
    return {
      y: tableCoordinates[item.table_ID],
      x: (differenceInMinutes(parseISO(item.timeFrom), workHours.since) / 60) * 176,
    }
  }
  const preparedItems = reservations.map((item) => ({ ...item, ...getCoordinates(item), length: getLength(item) }))

  const handleLength = (item: any, dx: number, direction: 'left' | 'right') => {
    const newReservation = {
      ...item,
      timeFrom:
        direction === 'left' &&
        isBefore(
          subMinutes(workHours.since, 1),
          roundToNearestMinutes(addMinutes(parseISO(item.timeFrom), 15 * (dx / 44)), { nearestTo: 15 })
        ) &&
        differenceInMinutes(
          parseISO(item.timeUntil),
          roundToNearestMinutes(addMinutes(parseISO(item.timeFrom), 15 * (dx / 44)), { nearestTo: 15 })
        ) > 60
          ? roundToNearestMinutes(addMinutes(parseISO(item.timeFrom), 15 * (dx / 44)), { nearestTo: 15 })
          : parseISO(item.timeFrom),
      timeUntil:
        direction === 'right' &&
        isBefore(
          roundToNearestMinutes(addMinutes(parseISO(item.timeUntil), 15 * (dx / 44)), { nearestTo: 15 }),
          workHours.till
        ) &&
        differenceInMinutes(
          roundToNearestMinutes(addMinutes(parseISO(item.timeUntil), 15 * (dx / 44)), { nearestTo: 15 }),
          parseISO(item.timeFrom)
        ) > 60
          ? roundToNearestMinutes(addMinutes(parseISO(item.timeUntil), 15 * (dx / 44)), { nearestTo: 15 })
          : parseISO(item.timeUntil),
    }
    controller.updateReservationMutation.mutate({ id: item.id, data: newReservation })
  }

  const handleDragEnd = (event: any) => {
    if (String(event.active.id).includes('resizeButton')) return
    const reseravtion = event.active.data.current
    const newTableId = Number(
      Object.keys(tableCoordinates).find(
        (key) => tableCoordinates[key] === tableCoordinates[reseravtion.table_ID] + event.delta.y
      )
    )
    controller.updateReservationMutation.mutate({
      id: reseravtion.id,
      data: {
        ...reseravtion,
        table_ID: newTableId,
        timeFrom: roundToNearestMinutes(addMinutes(parseISO(reseravtion.timeFrom), 15 * (event.delta.x / 44)), {
          nearestTo: 15,
        }),
        timeUntil: roundToNearestMinutes(addMinutes(parseISO(reseravtion.timeUntil), 15 * (event.delta.x / 44)), {
          nearestTo: 15,
        }),
      },
    })
  }
  return (
    <div
      className="absolute top-[19rem] left-28 pointer-events-none inline-flex"
      style={{ width: 'calc(100% - 8rem)', height: `${tables.length * 5}rem` }}
    >
      <div className="relative w-full h-full left-0 top-0 border-r border-b">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement, snapToGrid]}>
          {preparedItems.map((item) => (
            <Item key={item.id} item={item} handleLength={handleLength} onClick={() => handleFormReservation(item)} />
          ))}
        </DndContext>
      </div>
    </div>
  )
}
