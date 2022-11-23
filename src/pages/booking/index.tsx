import { useState } from 'react'
import { Step1 } from './step-1'
import { Step2 } from './step-2'

export const BookingForm = () => {
  const [selectStep, setSelectStep] = useState(1)
  const [selectTime, setSelectTime] = useState('')
  const [selectGuests, setSelectGuests] = useState('')
  const [activeTime, setActiveTime] = useState('')
  const [renderTime, setRenderTime] = useState<null | number>(null)

  return (
    <div>
      {selectStep === 1 && (
        <Step1
          setSelectStep={setSelectStep}
          selectTime={selectTime}
          setSelectTime={setSelectTime}
          selectGuests={selectGuests}
          setSelectGuests={setSelectGuests}
          activeTime={activeTime}
          setActiveTime={setActiveTime}
          renderTime={renderTime}
          setRenderTime={setRenderTime}
        />
      )}

      {selectStep === 2 && <Step2 setSelectStep={setSelectStep} />}
    </div>
  )
}
