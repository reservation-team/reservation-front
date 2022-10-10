import { Draggable } from './draggable'

const workHours = { since: '11:00', till: '2:00' }

const formatHour = (hour: number) => (hour > 10 ? hour + ':00' : '0' + hour + ':00')

const getHours = (hours: { since: string; till: string }) => {
  const since = Number(hours.since.split(':')[0])
  const till = Number(hours.till.split(':')[0])
  let workHours = []
  if (till < since) {
    for (let i = since; i <= 23; i++) {
      workHours.push(i)
    }
    for (let i = 0; i <= till; i++) {
      workHours.push(i)
    }
    return workHours
  }
  for (let i = since; i <= till; i++) {
    workHours.push(i)
  }
  return workHours
}

const tables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

export const DashboardPage = () => {
  const hours = getHours(workHours)
  return (
    <div className="relative inline-flex flex-col">
      <div className="h-56 sticky top-0 z-30 bg-gray-500">
        <div className="flex sticky left-0 top-0 z-30 bg-white w-screen" style={{ width: 'calc(100vw - 15px)' }}>
          <div className="w-full h-56 px-4">asd</div>
        </div>
      </div>
      <div
        className="w-100 h-100 absolute top-[19rem] left-28 pointer-events-none inline-flex bg-red-500/20"
        style={{ width: 'calc(100% - 7rem)', height: `${tables.length * 5}rem` }}
      >
        <Draggable />
        <Draggable />
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `112px repeat(${hours.length},11rem)`,
        }}
      >
        <div className="flex sticky left-0 top-56 z-30 bg-white">
          <button className="text-gray-700 border-r w-14 h-20 flex items-center justify-center ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="text-gray-700 border-r w-14 h-20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
          </button>
        </div>
        {hours.map((hour) => (
          <div key={hour} className="flex items-center justify-center border sticky top-56 z-10 bg-white">
            {formatHour(hour)}
          </div>
        ))}
        {tables.map((table) => (
          <>
            <div key={table} className="flex h-20 sticky left-0 z-20 bg-white">
              <div className="flex border-t">
                <div className="text-gray-700 border-r w-14 flex items-center justify-center">1</div>
                <div className="text-gray-700 border-r w-14 flex items-center justify-center">1-2</div>
              </div>
            </div>
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex items-center justify-center  bg-white"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient( 0deg, transparent, transparent calc(80px - 1px), #ddd calc(80px - 1px), #ddd 80px ), repeating-linear-gradient( -90deg, transparent, transparent calc(44px - 1px), #ddd calc(44px - 1px), #ddd 44px )',
                  backgroundSize: '44px 80px',
                }}
              ></div>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}
