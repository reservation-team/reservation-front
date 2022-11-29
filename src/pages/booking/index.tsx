import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Step1 } from './step-1'
import { Step2 } from './step-2'
import { Step3 } from './step-3'

export const BookingForm = () => {
  const [selectStep, setSelectStep] = useState(1)
  const [selectInformation, setSelectInformation] = useState({ selectTime: '', selectGuests: '', activeTme: '' })
  const [renderTime, setRenderTime] = useState<null | number>(null)
  const { register, handleSubmit } = useForm()

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

  return (
    <div>
      {selectStep === 1 && (
        <Step1
          selectInformation={selectInformation}
          setSelectInformation={setSelectInformation}
          setSelectStep={setSelectStep}
          renderTime={renderTime}
          setRenderTime={setRenderTime}
        />
      )}

      {selectStep === 2 && (
        <Step2
          register={register}
          handleSubmit={handleSubmit}
          setSelectStep={setSelectStep}
          reservationData={reservationData}
          selectInformation={selectInformation}
        />
      )}
      {selectStep === 3 && <Step3 selectInformation={selectInformation} reservationData={reservationData} />}
    </div>
  )
}
