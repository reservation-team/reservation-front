import { addDays, eachHourOfInterval, setHours } from 'date-fns'
import { setMinutes, setSeconds } from 'date-fns/esm'
import { useState } from 'react'
import { Reservation, Table } from '../../../shared/types'

const day = setMinutes(setSeconds(new Date(), 0), 0)
const getWorkHours = (workHours: { since: string; till: string }) => {
  const sinceHour = Number(workHours.since.split(':')[0])
  const tillHour = Number(workHours.till.split(':')[0])

  const since = setHours(day, sinceHour)
  if (sinceHour > tillHour) {
    const till = setHours(addDays(day, 1), tillHour)
    return { since, till }
  }
  const till = setHours(day, tillHour)
  return { since, till }
}

export const UseTables = (workHoursRaw: { since: string; till: string }, tablesRaw: Table[]) => {
  const [tables, setTables] = useState(tablesRaw)
  const workHours = getWorkHours(workHoursRaw)
  const hours = eachHourOfInterval({
    start: workHours.since,
    end: workHours.till,
  }).slice(0, -1)

  const addReservation = (tableId: any, reservation: Reservation) => {
    setTables((tables: any) =>
      tables.map((table: any) =>
        table.id === tableId
          ? {
              ...table,
              reservations: [...table.reservations, reservation],
            }
          : table
      )
    )
  }

  const removeReservation = (tableId: any, reservationId: any) => {
    setTables((tables: any) =>
      tables.map((table: any) =>
        table.id === tableId
          ? {
              ...table,
              reservations: table.reservations.filter((reservation: any) => reservation.id !== reservationId),
            }
          : table
      )
    )
  }

  const updateReservation = (oldTableId: any, newTableId: any, reservation: Reservation) => {
    removeReservation(oldTableId, reservation.id)
    addReservation(newTableId, reservation)
  }

  const updateReservationData = (reservation: Reservation) => {
    setTables((tables: any) =>
      tables.map((table: any) =>
        table.id === reservation.tableId
          ? {
              ...table,
              reservations: table.reservations.map((oldReservation: any) =>
                oldReservation.id === reservation.id ? { ...reservation } : oldReservation
              ),
            }
          : table
      )
    )
  }

  const controller = {
    addReservation,
    removeReservation,
    updateReservation,
    updateReservationData,
  }

  return [tables, hours, workHours, controller] as const
}
