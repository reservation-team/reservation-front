export interface Reservation {
  id: number
  status: string | null
  table_ID: number
  seats: number
  timeFrom: string
  timeUntil: string
  comment: string
  person: {
    firstname: string
    lastname: string
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
