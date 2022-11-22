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
  seats: {
    min: number
    max: number
  }
  reservations: Reservation[]
}
