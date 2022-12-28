import { forwardRef, useState } from 'react'
import { setHours } from 'date-fns'
import { format, setMinutes, setSeconds } from 'date-fns/esm'
import { DragOverlay } from './ui/drag-overlay'
import { Button } from '../../shared/ui/button'
import { UseTables } from './model'
import { Menu } from './ui/menu'
import { useQuery } from 'react-query'
import { getRestaraunts, getTables } from '../../shared/api'
import { Grid } from './ui/grid'
import { getWorkHours } from './lib'
import { DatePicker } from './ui/date-picker'

const day = setMinutes(setSeconds(new Date(), 0), 0)

const TABLES = [
  {
    id: 1,
    name: '1',
    seats: 2,
    reservations: [
      {
        id: 1,
        tableId: 1,
        seats: 1,
        time: { since: setMinutes(setHours(day, 11), 0), till: setMinutes(setHours(day, 12), 30) },
        comment: 'test11',
        person: {
          firstName: 'Иван',
          lastName: 'Иванов',
          email: '',
          phone: '',
        },
      },
      {
        id: 2,
        tableId: 1,
        seats: 1,
        time: { since: setMinutes(setHours(day, 13), 0), till: setMinutes(setHours(day, 15), 0) },
        comment: 'test21',
        person: {
          firstName: 'Семен',
          lastName: 'Иванов',
          email: '',
          phone: '',
        },
      },
    ],
  },
  {
    id: 2,
    name: '2',
    seats: 2,
    reservations: [],
  },
  {
    id: 3,
    name: '3',
    seats: 4,
    reservations: [
      {
        id: 3,
        tableId: 3,
        seats: 3,
        time: { since: setMinutes(setHours(day, 11), 0), till: setMinutes(setHours(day, 12), 0) },
        comment: 'test33',
        person: {
          firstName: 'Игорь',
          lastName: 'Иванов',
          email: '',
          phone: '',
        },
      },
      {
        id: 4,
        tableId: 3,
        seats: 4,
        time: { since: setMinutes(setHours(day, 13), 0), till: setMinutes(setHours(day, 15), 0) },
        comment: 'test43',
        person: {
          firstName: 'Максим',
          lastName: 'Иванов',
          email: '',
          phone: '',
        },
      },
    ],
  },
  {
    id: 4,
    name: '4',
    seats: 4,
    reservations: [
      {
        id: 5,
        tableId: 4,
        seats: 4,
        time: { since: setMinutes(setHours(day, 12), 0), till: setMinutes(setHours(day, 13), 0) },
        comment: 'test54',
        person: {
          firstName: 'Влад',
          lastName: 'Иванов',
          email: '',
          phone: '',
        },
      },
      {
        id: 6,
        tableId: 4,
        seats: 3,
        time: { since: setMinutes(setHours(day, 14), 15), till: setMinutes(setHours(day, 15), 30) },
        comment: 'test63',
        person: {
          firstName: 'Денис',
          lastName: 'Иванов',
          email: '',
          phone: '',
        },
      },
    ],
  },
]

const RESTARAUNT = {
  id: 1,
  name: 'Zerochka',
  phone: '880055553535',
  email: 'zeeohka@gmail.com',
  url: 'site.com',
  address: 'Gde-to tam',
  description: 'Just a regular rest',
  workingHoursFrom: '09:00:00',
  workingHoursUntil: '23:00:00',
  defaultReservationTime: '03:00:00',
}

export const DashboardPage = () => {
  const { isLoading, isError, data: restarauntData, error } = useQuery('restaraunts', getRestaraunts)
  const restaraunt1 = restarauntData ? restarauntData[0] : {}
  const tablesdata1 = useQuery('tables', () => getTables(format(day, 'yyyy-MM-dd')))

  const [restaraunt, setRestaraunt] = useState(RESTARAUNT)
  const [tables, controller] = UseTables(TABLES)
  const [formReservationItem, setFormReservationItem] = useState(null)
  const [showFormReservation, setShowFormReservation] = useState(false)

  const handleFormReservation = (item?: any) => {
    setFormReservationItem(item ?? null)
    setShowFormReservation((show) => !show)
  }
  const handleRestarauntUpdate = (data: any) => {
    setRestaraunt((restaraunt) => ({ ...restaraunt, ...data }))
  }
  const workHours = getWorkHours(restaraunt.workingHoursFrom, restaraunt.workingHoursUntil)
  const [startDate, setStartDate] = useState<Date | null>(day)
  console.log(workHours)

  return (
    <div className="relative inline-flex flex-col">
      <div className="h-56 sticky top-0 z-30 bg-gray-500">
        <div className="sticky left-0 top-0 z-30 bg-gray-50 w-screen">
          <div className="flex flex-col justify-between w-full h-56 px-4">
            <Menu
              workHours={workHours}
              restaraunt={restaraunt}
              handleRestarauntUpdate={handleRestarauntUpdate}
              handleFormReservation={handleFormReservation}
              formReservationItem={formReservationItem}
              showFormReservation={showFormReservation}
              tables={tables}
              controller={controller}
            />
            <div className="w-full flex justify-between pb-4 items-center">
              <p className="text-2xl font-medium">{restaraunt.name}</p>
              <DatePicker startDate={startDate} onChange={(date: Date | null) => setStartDate(date)} />
              <Button onClick={() => handleFormReservation()}>Новое бронирование</Button>
            </div>
          </div>
        </div>
      </div>
      <DragOverlay
        tables={tables}
        workHours={workHours}
        controller={controller}
        handleFormReservation={handleFormReservation}
      />
      <Grid workHours={workHours} tables={tables} />
    </div>
  )
}
