import { format } from 'date-fns'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  addReservation,
  addTable,
  getTables,
  removeReservation,
  removeTable,
  updateReservation,
  updateTable,
} from '../../../shared/api'

export const UseTables = (startDate: Date) => {
  const queryClient = useQueryClient()

  const { data: tables } = useQuery(['tables', startDate], () => getTables(format(startDate, 'yyyy-MM-dd')))

  const addReservationMutation = useMutation(addReservation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tables', startDate])
    },
  })

  const removeReservationMutation = useMutation(removeReservation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tables', startDate])
    },
  })

  const updateReservationMutation = useMutation(updateReservation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tables', startDate])
    },
  })

  const addTableMutation = useMutation(addTable, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tables', startDate])
    },
  })

  const removeTableMutation = useMutation(removeTable, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tables', startDate])
    },
  })

  const updateTableMutation = useMutation(updateTable, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tables', startDate])
    },
  })

  // const addReservation = (tableId: any, reservation: Reservation) => {
  //   setTables((tables: any) =>
  //     tables.map((table: any) =>
  //       table.id === tableId
  //         ? {
  //             ...table,
  //             reservations: [...table.reservations, reservation],
  //           }
  //         : table
  //     )
  //   )
  // }

  // const removeReservation = (tableId: any, reservationId: any) => {
  //   setTables((tables: any) =>
  //     tables.map((table: any) =>
  //       table.id === tableId
  //         ? {
  //             ...table,
  //             reservations: table.reservations.filter((reservation: any) => reservation.id !== reservationId),
  //           }
  //         : table
  //     )
  //   )
  // }

  // const updateReservation = (oldTableId: any, newTableId: any, reservation: Reservation) => {
  //   removeReservation(oldTableId, reservation.id)
  //   addReservation(newTableId, reservation)
  // }

  // const updateReservationData = (reservation: Reservation) => {
  //   setTables((tables: any) =>
  //     tables.map((table: any) =>
  //       table.id === reservation.tableId
  //         ? {
  //             ...table,
  //             reservations: table.reservations.map((oldReservation: any) =>
  //               oldReservation.id === reservation.id ? { ...reservation } : oldReservation
  //             ),
  //           }
  //         : table
  //     )
  //   )
  // }

  // const removeTable = (id: any) => {
  //   setTables((tables: any) => tables.filter((table: Table) => table.id !== id))
  // }

  // const updateTable = (table: Table) => {
  //   setTables((tables: any) =>
  //     tables.map((oldTable: Table) => (table.id === oldTable.id ? { ...oldTable, ...table } : oldTable))
  //   )
  // }

  // const addTable = (table: Table) => {
  //   setTables((tables: any) => [...tables, table])
  // }

  const controller = {
    addReservationMutation,
    removeReservationMutation,
    updateReservationMutation,
    removeTableMutation,
    updateTableMutation,
    addTableMutation,
  }

  return [tables, controller] as const
}
