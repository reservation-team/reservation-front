import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Restaraunt, Table } from '../../../../shared/types'
import { FormReservation } from './form-reservation'
import { FormSettings } from './form-settings'
import { ListTables } from './list-tables'

interface MenuProps {
  workHours: {
    since: Date
    till: Date
  }
  restaraunt: Restaraunt
  updateRestarauntMutation: any
  handleFormReservation: any
  formReservationItem: any
  showFormReservation: any
  tables: Table[]
  controller: any
  selectedDate: Date
}

export const Menu = ({
  workHours,
  restaraunt,
  updateRestarauntMutation,
  handleFormReservation,
  showFormReservation,
  formReservationItem,
  tables,
  controller,
  selectedDate,
}: MenuProps) => {
  const [showSettings, setShowSettings] = useState(false)
  const [showTablesSettings, setShowTablesSettings] = useState(false)

  return (
    <>
      <div className="py-5 ">
        <HeadlessMenu as="div" className="relative">
          <div className="ml-auto w-fit">
            <HeadlessMenu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-ring-white">
              <span className="sr-only">Открыть меню</span>
              <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{restaraunt.name.slice(0, 2)}</span>
              </div>
            </HeadlessMenu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <HeadlessMenu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <HeadlessMenu.Item>
                {({ active }) => (
                  <p
                    onClick={() => setShowTablesSettings(true)}
                    className={`${active ? 'bg-gray-100' : ''} cursor-pointer block px-4 py-2 text-sm text-gray-700`}
                  >
                    Столы
                  </p>
                )}
              </HeadlessMenu.Item>
              <HeadlessMenu.Item>
                {({ active }) => (
                  <p
                    onClick={() => setShowSettings(true)}
                    className={`${active ? 'bg-gray-100' : ''} cursor-pointer block px-4 py-2 text-sm text-gray-700`}
                  >
                    Настройки
                  </p>
                )}
              </HeadlessMenu.Item>
              {/* <HeadlessMenu.Item>
                {({ active }) => (
                  <a href="#" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                    Выйти
                  </a>
                )}
              </HeadlessMenu.Item> */}
            </HeadlessMenu.Items>
          </Transition>
        </HeadlessMenu>
      </div>
      <FormReservation
        selectedDate={selectedDate}
        tables={tables}
        workHours={workHours}
        item={formReservationItem}
        isOpen={showFormReservation}
        handleFormReservation={handleFormReservation}
        controller={controller}
      />
      <FormSettings
        restaraunt={restaraunt}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        updateRestarauntMutation={updateRestarauntMutation}
      />
      <ListTables
        tables={tables}
        isOpen={showTablesSettings}
        onClose={() => setShowTablesSettings(false)}
        controller={controller}
      />
    </>
  )
}
