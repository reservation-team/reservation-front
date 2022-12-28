import { addDays, setHours, setMinutes, setSeconds } from 'date-fns'

export const getWorkHours = (workingHoursFrom: string, workingHoursUntil: string) => {
  const day = setMinutes(setSeconds(new Date(), 0), 0)

  const sinceHour = Number(workingHoursFrom.split(':')[0])
  const tillHour = Number(workingHoursUntil.split(':')[0])

  const since = setHours(day, sinceHour)
  if (sinceHour > tillHour) {
    const till = setHours(addDays(day, 1), tillHour)
    return { since, till }
  }
  const till = setHours(day, tillHour)
  return { since, till }
}
