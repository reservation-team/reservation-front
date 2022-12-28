import { useState } from 'react'
import { Reservation, Table } from '../../../shared/types'

export const UseTables = (tablesRaw: Table[]) => {
  const [tables, setTables] = useState(tablesRaw)

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

  const removeTable = (id: any) => {
    setTables((tables: any) => tables.filter((table: Table) => table.id !== id))
  }

  const updateTable = (table: Table) => {
    setTables((tables: any) =>
      tables.map((oldTable: Table) => (table.id === oldTable.id ? { ...oldTable, ...table } : oldTable))
    )
  }

  const addTable = (table: Table) => {
    setTables((tables: any) => [...tables, table])
  }

  const controller = {
    addReservation,
    removeReservation,
    updateReservation,
    updateReservationData,
    removeTable,
    updateTable,
    addTable,
  }

  return [tables, controller] as const
}
