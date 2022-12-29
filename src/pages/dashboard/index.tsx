import { useState } from 'react'
import { DragOverlay } from './ui/drag-overlay'
import { Button } from '../../shared/ui/button'
import { UseTables } from './model'
import { Menu } from './ui/menu'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getRestaraunts, updateRestaraunt } from '../../shared/api'
import { Grid } from './ui/grid'
import { getWorkHours } from './lib'
import { DatePicker } from './ui/date-picker'

const today = new Date()

export const DashboardPage = () => {
  const queryClient = useQueryClient()
  const [selectedDate, setSelectedDate] = useState(today)
  const { data: restarauntData } = useQuery('restaraunts', getRestaraunts)
  const restaraunt = restarauntData ? restarauntData[0] : {}
  const [tables, controller] = UseTables(selectedDate)
  const [formReservationItem, setFormReservationItem] = useState(null)
  const [showFormReservation, setShowFormReservation] = useState(false)

  const handleFormReservation = (item?: any) => {
    setFormReservationItem(item ?? null)
    setShowFormReservation((show) => !show)
  }

  const updateRestarauntMutation = useMutation(updateRestaraunt, {
    onSuccess: () => {
      queryClient.invalidateQueries(['restaraunts'])
    },
  })

  const workHours = getWorkHours(selectedDate, restaraunt.workingHoursFrom, restaraunt.workingHoursUntil)

  if (!restaraunt || !tables || !workHours) return null
  return (
    <div className="relative inline-flex flex-col">
      <div className="h-56 sticky top-0 z-30 bg-gray-500">
        <div className="sticky left-0 top-0 z-30 bg-gray-50 w-screen">
          <div className="flex flex-col justify-between w-full h-56 px-4">
            <Menu
              selectedDate={selectedDate}
              workHours={workHours}
              restaraunt={restaraunt}
              updateRestarauntMutation={updateRestarauntMutation}
              handleFormReservation={handleFormReservation}
              formReservationItem={formReservationItem}
              showFormReservation={showFormReservation}
              tables={tables}
              controller={controller}
            />
            <div className="w-full flex justify-between pb-4 items-center">
              <p className="text-2xl font-medium">{restaraunt.name}</p>
              <DatePicker startDate={selectedDate} onChange={(date) => setSelectedDate(date)} />
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
