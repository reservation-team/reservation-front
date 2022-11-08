import { addDays, eachHourOfInterval, setHours } from 'date-fns'
import { format, setMinutes, setSeconds } from 'date-fns/esm'
import { Fragment } from 'react'
import { Draggable } from './draggable'

const WORK_HOURS = { since: '11:00', till: '2:00' }
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

const tables = [
  {
    id: 1,
    name: '1',
    seats: { min: 1, max: 2 },
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
    seats: { min: 1, max: 2 },
    reservations: [],
  },
  {
    id: 3,
    name: '3',
    seats: { min: 3, max: 4 },
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
    seats: { min: 3, max: 4 },
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

export const DashboardPage = () => {
  const workHours = getWorkHours(WORK_HOURS)
  const hours = eachHourOfInterval({
    start: workHours.since,
    end: workHours.till,
  }).slice(0, -1)

  return (
    <div className="relative inline-flex flex-col">
      <div className="h-56 sticky top-0 z-30 bg-gray-500">
        <div className="flex sticky left-0 top-0 z-30 bg-white w-screen">
          <div className="w-full h-56 px-4">asd</div>
        </div>
      </div>
      <div
        className="absolute top-[19rem] left-28 pointer-events-none inline-flex"
        style={{ width: 'calc(100% - 8rem)', height: `${tables.length * 5}rem` }}
      >
        <div className="relative w-full h-full left-0 top-0">
          <Draggable tables={tables} workHours={workHours} />
        </div>
      </div>
      <div
        className="grid border-r border-b"
        style={{
          gridTemplateColumns: `112px repeat(${hours.length},11rem)`,
        }}
      >
        <div className="flex sticky left-0 top-56 z-30 bg-white">
          <button className="text-gray-700 border border-b-0 w-14 h-20 flex items-center justify-center ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="text-gray-700 border-r border-t w-14 h-20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
          </button>
        </div>
        {hours.map((hour) => (
          <div
            key={hour.getTime()}
            className="flex items-center justify-center border border-l-0 sticky top-56 z-10 bg-white"
          >
            {format(hour, 'HH:mm')}
          </div>
        ))}
        {tables.map(({ id, name, seats }) => (
          <Fragment key={id}>
            <div key={id} className="flex h-20 sticky left-0 z-20 bg-white">
              <div className="flex border-t">
                <div className="text-gray-700 border-r border-l w-14 flex items-center justify-center">{name}</div>
                <div className="text-gray-700 border-r w-14 flex items-center justify-center">
                  {seats.min} - {seats.max}
                </div>
              </div>
            </div>
            {hours.map((hour) => (
              <div
                key={hour.getTime()}
                className="flex items-center justify-center  bg-white"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient( 0deg, transparent, transparent calc(80px - 1px), #ddd calc(80px - 1px), #ddd 80px ), repeating-linear-gradient( -90deg, transparent, transparent calc(44px - 1px), #ddd calc(44px - 1px), #ddd 44px )',
                  backgroundSize: '44px 80px',
                }}
              ></div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
