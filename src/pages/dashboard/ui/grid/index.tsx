import { eachHourOfInterval, format } from 'date-fns'
import { Fragment } from 'react'
import { Table } from '../../../../shared/types'

interface GridProps {
  workHours: {
    since: Date
    till: Date
  }
  tables: Table[]
}

export const Grid = ({ workHours, tables }: GridProps) => {
  const gridHours = eachHourOfInterval({
    start: workHours.since,
    end: workHours.till,
  }).slice(0, -1)

  return (
    <div
      className="grid pr-4"
      style={{
        gridTemplateColumns: `112px repeat(${gridHours.length},11rem)`,
      }}
    >
      <div className="sticky left-0 top-56 z-30">
        <div className="flex pl-4 bg-white">
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
      </div>
      {gridHours.map((hour) => (
        <div
          key={hour.getTime()}
          className="flex items-center justify-center border border-l-0 border-b-0 sticky top-56 z-10 bg-white"
        >
          {format(hour, 'HH:mm')}
        </div>
      ))}
      {tables.map(({ id, name, seats }) => (
        <Fragment key={id}>
          <div key={id} className="flex h-20 sticky left-0 z-20">
            <div className="flex pl-4 bg-white">
              <div className="flex border-t">
                <div className="text-gray-700 border-r border-l w-12 flex items-center justify-center">{name}</div>
                <div className="text-gray-700 border-r w-12 flex items-center justify-center">{seats}</div>
              </div>
            </div>
          </div>
          {gridHours.map((hour) => (
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
  )
}
