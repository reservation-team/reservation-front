import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo } from 'react'
import { eachMinuteOfInterval, format, setHours, setMinutes, setSeconds } from 'date-fns'
import { InputText } from '../../../../../shared/ui/input-text'
import { TextArea } from '../../../../../shared/ui/textarea'
import { Button } from '../../../../../shared/ui/button'
import { Select } from '../../../../../shared/ui/select'
import { Controller, Reservation, Table } from '../../../../../shared/types'

const day = setMinutes(setSeconds(new Date(), 0), 0)

interface FormReservationProps {
  tables: Table[]
  workHours: {
    since: Date
    till: Date
  }
  item?: Reservation | null
  isOpen: boolean
  handleFormReservation: (item?: any) => void
  controller: Controller
}

export const FormReservation = ({
  tables,
  workHours,
  item,
  isOpen,
  handleFormReservation,
  controller,
}: FormReservationProps) => {
  if (!isOpen) return null

  const hours = useMemo(
    () =>
      eachMinuteOfInterval(
        {
          start: workHours.since,
          end: workHours.till,
        },
        { step: 15 }
      ).map((date) => ({ value: format(date, 'HH:mm'), label: format(date, 'HH:mm') })),
    [workHours, item]
  )
  hours.unshift({ value: '', label: '' })
  const getTimeDate = (time: string) => {
    const [hours, minutes] = time.split(':')
    return setHours(setMinutes(day, Number(minutes)), Number(hours))
  }

  const tableOptions = tables.map(({ id, name }: any) => ({
    value: id,
    label: name,
  }))

  const { register, handleSubmit } = useForm({
    defaultValues: useMemo(
      () => ({
        seats: item?.seats ?? 1,
        tableId: item?.tableId ?? tableOptions[0].value,
        since: item?.time ? format(item?.time.since, 'HH:mm') : hours[0],
        till: item?.time ? format(item?.time.till, 'HH:mm') : hours[0],
        firstName: item?.person?.firstName ?? '',
        lastName: item?.person?.lastName ?? '',
        email: item?.person?.email ?? '',
        phone: item?.person?.phone ?? '',
        comment: item?.comment ?? '',
      }),
      [item]
    ),
  })

  const handleClose = () => {
    handleFormReservation()
  }
  const onSubmit = (data: any) => {
    const reservation = {
      id: item?.id ?? Math.floor(Math.random() * 100),
      tableId: Number(data.tableId),
      seats: data.seats,
      time: { since: getTimeDate(data.since), till: getTimeDate(data.till) },
      comment: data.comment,
      person: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      },
    }
    if (item) {
      controller.updateReservation(item?.tableId, reservation.tableId, reservation)
      handleClose()
      return
    }
    controller.addReservation(reservation.tableId, reservation)
    handleClose()
  }

  const handleRemove = () => {
    controller.removeReservation(item?.tableId, item?.id)
    handleClose()
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between">
                    Бронирование
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="cursor-pointer w-6 h-6"
                      onClick={handleClose}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 mt-2">
                    <div>
                      <p className="block text-sm font-medium text-gray-700">Время</p>
                      <div className="flex space-x-4">
                        <div className="w-2/4">
                          <Select options={hours} {...register('since', { required: true })} />
                        </div>
                        <div className="w-2/4">
                          <Select className="w-2/4" options={hours} {...register('till', { required: true })} />
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-2/4">
                        <InputText
                          label="Количетсво мест"
                          type="number"
                          min="1"
                          max="10"
                          {...register('seats', { required: true })}
                        />
                      </div>
                      <div className="w-2/4">
                        <Select label="Стол" options={tableOptions} {...register('tableId', { required: true })} />
                      </div>
                    </div>
                    <InputText label="Имя" {...register('firstName', { required: true })} />
                    <InputText label="Фамилия" {...register('lastName')} />
                    <InputText label="Почта" type="email" {...register('email')} />
                    <InputText label="Телефон" type="tel" {...register('phone')} />
                    <TextArea label="Комментарий" {...register('comment')} />
                    <div className="flex justify-between !mt-4">
                      <Button>{item ? 'Сохранить' : 'Добавить'}</Button>
                      {item && (
                        <Button type="button" variant="secondary" onClick={handleRemove}>
                          Удалить
                        </Button>
                      )}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
