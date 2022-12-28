import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo } from 'react'
import { InputText } from '../../../../../../shared/ui/input-text'
import { Button } from '../../../../../../shared/ui/button'
import { Select } from '../../../../../../shared/ui/select'
import { Controller, Table } from '../../../../../../shared/types'

interface FormTableProps {
  item?: Table | null
  isOpen: boolean
  controller: Controller
  handleFormTable: any
}

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
]

export const FormTable = ({ item, isOpen, controller, handleFormTable }: FormTableProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: useMemo(
      () => ({
        id: item?.id ?? Math.floor(Math.random() * 100),
        name: item?.name ?? '',
        seats: item?.seats ?? 1,
        reservations: item?.reservations ?? [],
      }),
      [item]
    ),
  })

  const onSubmit = (data: any) => {
    const table = {
      id: data.id,
      name: data.name,
      seats: data.seats,
      reservations: data.reservations,
    }
    if (item) {
      controller.updateTable(table)
      handleFormTable()
      return
    }
    controller.addTable(table)
    handleFormTable()
  }

  const handleRemove = () => {
    controller.removeTable(item?.id)
    handleFormTable()
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleFormTable}>
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
                    Стол
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="cursor-pointer w-6 h-6"
                      onClick={handleFormTable}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 mt-2">
                    <InputText label="Название" {...register('name', { required: true })} />
                    <div>
                      <p className="block text-sm font-medium text-gray-700">Количество мест</p>
                      <Select options={options} {...register('seats', { required: true })} />
                    </div>
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
