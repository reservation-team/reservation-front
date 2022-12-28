export interface Reservation {
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

export interface Table {
  id: number
  name: string
  seats: number
  reservations: Reservation[]
}

export interface Restaraunt {
  id: number
  name: string
  phone: string
  email: string
  url: string
  address: string
  description: string
  workingHoursFrom: string
  workingHoursUntil: string
  defaultReservationTime: string
}

export interface Controller {
  addReservation: (tableId: any, reservation: Reservation) => void
  removeReservation: (tableId: any, reservationId: any) => void
  updateReservation: (oldTableId: any, newTableId: any, reservation: Reservation) => void
  updateReservationData: (reservation: Reservation) => void
  removeTable: (id: any) => void
  updateTable: (table: Table) => void
  addTable: (table: Table) => void
}
