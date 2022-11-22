import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo } from 'react'
import { InputText } from '../../../shared/ui/input-text'
import { TextArea } from '../../../shared/ui/textarea'
import { Button } from '../../../shared/ui/button'
import { Select } from '../../../shared/ui/select'
import { Restaraunt } from '../../../shared/types'

interface FormSettingsProps {
  restaraunt: Restaraunt
  isOpen: boolean
  onClose: () => void

  handleRestarauntUpdate: any
}

const defaultReservationTimeOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
]

const timeOptions = [
  { value: '', label: '' },
  { value: '00:00', label: '00:00' },
  { value: '01:00', label: '01:00' },
  { value: '02:00', label: '02:00' },
  { value: '03:00', label: '03:00' },
  { value: '04:00', label: '04:00' },
  { value: '05:00', label: '05:00' },
  { value: '06:00', label: '06:00' },
  { value: '07:00', label: '07:00' },
  { value: '08:00', label: '08:00' },
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
  { value: '17:00', label: '17:00' },
  { value: '18:00', label: '18:00' },
  { value: '19:00', label: '19:00' },
  { value: '20:00', label: '20:00' },
  { value: '21:00', label: '21:00' },
  { value: '22:00', label: '22:00' },
  { value: '23:00', label: '23:00' },
]

export const FormSettings = ({ restaraunt, isOpen, onClose, handleRestarauntUpdate }: FormSettingsProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: useMemo(
      () => ({
        id: restaraunt.id,
        name: restaraunt.name,
        phone: restaraunt.phone,
        email: restaraunt.email,
        url: restaraunt.url,
        adress: restaraunt.adress,
        description: restaraunt.description,
        workHours: restaraunt.workHours,
        defaultReservationTime: restaraunt.defaultReservationTime,
      }),
      [restaraunt]
    ),
  })

  const onSubmit = (data: any) => {
    handleRestarauntUpdate(data)
    onClose()
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Настройки
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 mt-2">
                    <div>
                      <p className="block text-sm font-medium text-gray-700">Время работы</p>
                      <div className="flex space-x-4">
                        <div className="w-2/4">
                          <Select options={timeOptions} {...register('workHours.since', { required: true })} />
                        </div>
                        <div className="w-2/4">
                          <Select
                            className="w-2/4"
                            options={timeOptions}
                            {...register('workHours.till', { required: true })}
                          />
                        </div>
                      </div>
                    </div>
                    <InputText label="Название" {...register('name', { required: true })} />
                    <InputText label="Почта" type="email" {...register('email')} />
                    <InputText label="Телефон" type="tel" {...register('phone')} />
                    <InputText label="Сайт" {...register('url')} />
                    <InputText label="Адрес" {...register('adress')} />
                    <Select
                      options={defaultReservationTimeOptions}
                      label="defaultReservationTime"
                      {...register('defaultReservationTime')}
                    />
                    <TextArea label="Описание" {...register('description')} />
                    <div className="flex justify-between !mt-4">
                      <Button>Сохранить</Button>
                      <Button type="button" variant="secondary" onClick={onClose}>
                        Отменить
                      </Button>
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
