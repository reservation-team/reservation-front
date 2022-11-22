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

export interface Restaraunt {
  id: number
  name: string
  phone: string
  email: string
  url: string
  adress: string
  description: string
  workHours: {
    since: string
    till: string
  }
  defaultReservationTime: number
}
