import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Controller, Table } from '../../../shared/types'
import { Button } from '../../../shared/ui/button'
import { FormTable } from './form-table'

interface ListTablesProps {
  tables: Table[]
  isOpen: boolean
  onClose: () => void
  controller: Controller
}

export const ListTables = ({ tables, isOpen, onClose, controller }: ListTablesProps) => {
  const [formTableItem, setFormTableItem] = useState(null)
  const [showFormTable, setShowFormTable] = useState(false)

  const handleFormTable = (item?: any) => {
    setFormTableItem(item ?? null)
    setShowFormTable((show) => !show)
  }

  return (
    <>
      {showFormTable && (
        <FormTable
          item={formTableItem}
          isOpen={showFormTable}
          handleFormTable={handleFormTable}
          controller={controller}
        />
      )}
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
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between mb-4"
                  >
                    Столы
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="cursor-pointer w-6 h-6"
                      onClick={onClose}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Dialog.Title>
                  <div className="overflow-x-auto relative sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-gray-50">
                        <tr>
                          <th className="py-3 px-6">Название стола</th>
                          <th className="py-3 px-6">Количество мест</th>
                          <th className="py-3 px-6 sr-only">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tables.map((table: any) => (
                          <tr key={table.id} className="bg-white border-b">
                            <th className="py-4 px-6 font-normal">{table.name}</th>
                            <td className="py-4 px-6">
                              {table.seats.min} - {table.seats.max}
                            </td>
                            <td className="py-4 px-6">
                              <p
                                onClick={() => handleFormTable(table)}
                                className="cursor-pointer text-indigo-600 hover:underline"
                              >
                                Изменить
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-center mt-6 mb-1">
                      <Button onClick={() => handleFormTable()}>Добавить</Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
