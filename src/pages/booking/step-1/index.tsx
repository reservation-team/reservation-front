import { useEffect } from 'react'
import { FormChoiceTime } from './form-choice-time'

export const Step1 = ({
  selectStep,
  setSelectStep,
  selectGuests,
  setSelectGuests,
  selectTime,
  setSelectTime,
  activeTime,
  setActiveTime,
  renderTime,
  setRenderTime,
}: any) => {
  const reservationData = {
    id: 1,
    name: 'Матрёшка',
    phone: '8 (495) 025-25-65',
    email: '',
    url: '',
    adress: 'ул. Пушкина, д.25',
    description: '',
    workingHours: { since: '10:00', till: '22:00' },
    defaultReservationData: '',
  }

  const arr = [
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
  ]

  const BookedTime = ['19:30', '20:00', '20:30', '21:00']

  const arrGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const showFormChoiceTime = selectGuests && selectTime
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap flex-col items-center px-10 py-3 max-w-[100%] w-[448px] bg-white-400 shadow-xl rounded-xl">
        <h1 className="text-3xl font-extrabold mb-[8px] mt-[32px] mr-auto ml-auto text-gray-900	">
          {reservationData.name}
        </h1>

        <div className="flex flex-wrap flex-col items-center border-b-2 border-gray-300 max-w-[100%] w-[448px] mb-[20px]">
          <label className="text-sm mr-auto ml-auto text-gray-700 font-medium leading-5">
            Время работы: {reservationData.workingHours.since} - {reservationData.workingHours.till}
          </label>

          <label className="text-sm mr-auto ml-auto mb-2 text-gray-700 font-medium leading-5">
            Адрес: {reservationData.adress}
          </label>
        </div>

        <div className="flex flex-wrap justify-around items-center pb-[25px] max-w-[100%] w-[448px]">
          <div className="flex flex-wrap flex-col items-center">
            <label className="text-sm text-gray-700 font-medium leading-5 mr-auto mb-[5px]">Гостей</label>
            <select
              className="h-[42px] w-[90px] rounded-lg shadow-xl text-gray-700 border border-gray-400 text-center"
              value={selectGuests}
              onChange={(e) => setSelectGuests(e.target.value)}
            >
              <option disabled value="">
                {''}
              </option>
              {arrGuests.map((element, index) => (
                <option key={index}>{element}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap flex-col items-center">
            <label className="text-sm text-gray-700 font-medium leading-5 mr-auto mb-[5px]">Дата</label>
            <select className="h-[42px] w-[90px] rounded-lg shadow-xl text-gray-700 border border-gray-400 text-center"></select>
          </div>
          <div className="flex flex-wrap flex-col items-center">
            <label className="text-sm text-gray-700 font-medium leading-5 mr-auto mb-[5px]">Время</label>
            <select
              className="h-[42px] w-[90px] rounded-lg shadow-xl text-gray-700 border border-gray-400 text-center"
              value={selectTime}
              onChange={(e) => setSelectTime(e.target.value)}
            >
              <option disabled value="">
                {''}
              </option>
              {arr.map((element, index) => (
                <option key={index}>{element}</option>
              ))}
            </select>
          </div>
        </div>
        {showFormChoiceTime && (
          <FormChoiceTime
            arr={arr}
            selectTime={selectTime}
            BookedTime={BookedTime}
            selectStep={selectStep}
            setSelectStep={setSelectStep}
            activeTime={activeTime}
            setActiveTime={setActiveTime}
            renderTime={renderTime}
            setRenderTime={setRenderTime}
          />
        )}
      </div>
    </div>
  )
}
