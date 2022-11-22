import { DndContext, useSensor, MouseSensor, TouchSensor, KeyboardSensor, useSensors } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { addMinutes, differenceInMinutes, isBefore, roundToNearestMinutes, subMinutes } from 'date-fns'
import { Item } from './item'
import { Reservation, Table } from '../../../shared/types'
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

interface DraggableProps {
  tables: Table[]
  workHours: {
    since: Date
    till: Date
  }
  controller: {
    addReservation: (tableId: any, reservation: Reservation) => void
    removeReservation: (tableId: any, reservationId: any) => void
    updateReservation: (oldTableId: any, newTableId: any, reservation: Reservation) => void
    updateReservationData: (reservation: Reservation) => void
  }
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

export const Draggable = ({ tables, workHours, controller, handleFormReservation }: DraggableProps) => {
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

  const getLength = (item: any) => differenceInMinutes(item.time.till, item.time.since) / 60

  const getCoordinates = (item: any) => {
    return {
      y: tableCoordinates[item.tableId],
      x: (differenceInMinutes(item.time.since, workHours.since) / 60) * 176,
    }
  }
  const preparedItems = reservations.map((item) => ({ ...item, ...getCoordinates(item), length: getLength(item) }))

  const handleLength = (item: any, dx: number, direction: 'left' | 'right') => {
    const newReservation = {
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
    controller.updateReservationData(newReservation)
  }

  const handleDragEnd = (event: any) => {
    if (String(event.active.id).includes('resizeButton')) return
    const reseravtion = event.active.data.current
    const newTableId = Number(
      Object.keys(tableCoordinates).find(
        (key) => tableCoordinates[key] === tableCoordinates[reseravtion.tableId] + event.delta.y
      )
    )
    controller.updateReservation(reseravtion.tableId, newTableId, {
      ...reseravtion,
      tableId: newTableId,
      time: {
        since: roundToNearestMinutes(addMinutes(reseravtion.time.since, 15 * (event.delta.x / 44)), {
          nearestTo: 15,
        }),
        till: roundToNearestMinutes(addMinutes(reseravtion.time.till, 15 * (event.delta.x / 44)), {
          nearestTo: 15,
        }),
      },
    })
  }
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement, snapToGrid]}>
      {preparedItems.map((item) => (
        <Item key={item.id} item={item} handleLength={handleLength} onClick={() => handleFormReservation(item)} />
      ))}
    </DndContext>
  )
}
