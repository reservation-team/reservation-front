import { useForm } from 'react-hook-form'
import { Button } from '../../../shared/ui/button'
import { InputText } from '../../../shared/ui/input-text'
import { TextArea } from '../../../shared/ui/textarea'

export const Step2 = ({ selectStep, setSelectStep }: any) => {
  const { register, handleSubmit } = useForm()
  const onSubmitRegistration = (data: any) => {
    console.log(data)
  }

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

  const time = '10:00'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmitRegistration)}
        className="space-y-5 px-10 py-3 max-w-[100%] w-[448px] bg-white-400 shadow-xl rounded-xl"
      >
        <div className="flex flex-wrap flex-col items-center border-b-2 border-gray-300 max-w-[100%] w-[448px] mb-[20px]">
          <h1 className="text-3xl font-extrabold mr-auto ml-auto mb-5 text-gray-900	">{reservationData.name}</h1>
          <label className="text-base mr-auto ml-auto mb-1 text-gray-700 font-medium leading-5">
            Время работы: {reservationData.workingHours.since} - {reservationData.workingHours.till}
          </label>
          <label className="text-base mr-auto ml-auto mb-7 text-gray-700 font-medium leading-5">
            {reservationData.adress}
          </label>
          <div className="flex gap-1 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>

            <label className="text-base mr-auto ml-auto mb-1 text-gray-700 font-medium leading-5">
              : Среда, 5 октбря, время: 12:30, гостей: 2
            </label>
          </div>
        </div>

        <InputText label="Имя" {...register('name')} placeholder="Имя"></InputText>

        <InputText label="Фамилия" {...register('lastName')} placeholder="Фамилия"></InputText>

        <InputText label="Телефон" {...register('tell')} placeholder="Телефон"></InputText>
        <InputText label="Электронная почта" {...register('email')} placeholder="Почта"></InputText>

        <TextArea label="Комментарий" {...register('textContent')} placeholder="Комментарий"></TextArea>

        <div className="flex flex-wrap justify-between mt-3 mb-[20px]">
          <Button type="submit" onClick={() => setSelectStep(1)}>
            Назад
          </Button>
          <Button type="submit">Войти</Button>
        </div>
      </form>
    </div>
  )
}
