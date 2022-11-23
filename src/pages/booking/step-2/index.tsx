import { useForm } from 'react-hook-form'

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
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmitRegistration)}
        className="flex flex-wrap flex-col items-center px-10 py-3 max-w-[100%] w-[448px] bg-white-400 shadow-xl rounded-xl"
      >
        <div className="flex flex-wrap flex-col items-center border-b-2 border-gray-300 max-w-[100%] w-[448px] mb-[20px]">
          <h1 className="text-3xl font-extrabold mr-auto ml-auto mb-5 text-gray-900	">{reservationData.name}</h1>
          <label className="text-base mr-auto ml-auto mb-1 text-gray-700 font-medium leading-5">
            Время работы: {reservationData.workingHours.since} - {reservationData.workingHours.till}
          </label>
          <label className="text-base mr-auto ml-auto mb-7 text-gray-700 font-medium leading-5">
            {reservationData.adress}
          </label>
          <label className="text-base mr-auto ml-auto mb-1 text-gray-700 font-medium leading-5">
            iconдата: Среда, 5 октбря, время: 12:30, гостей: 2
          </label>
          <label className="text-base mr-auto ml-auto mb-1 text-gray-700 font-medium leading-5">
            Мы заняли столик для вас на: {time}
          </label>
        </div>

        <label className="text-sm mr-auto mb-1 text-gray-700 font-medium leading-5">Имя</label>
        <input
          {...register('name')}
          placeholder="Имя"
          className="block w-full mb-[24px] rounded border border-gray-300 pt-[9px] pb-[9px] pl-[13px]"
        ></input>

        <label className="text-sm mr-auto mb-1 text-gray-700 font-medium leading-5">Фамилия</label>
        <input
          {...register('lastName')}
          placeholder="Фамилия"
          className="block w-full mb-[24px] rounded border border-gray-300 pt-[9px] pb-[9px] pl-[13px]"
        ></input>

        <label className="text-sm mr-auto mb-1 text-gray-700 font-medium leading-5">Номер телефона</label>
        <input
          {...register('tell')}
          placeholder="Телефон"
          className="block w-full mb-[24px] rounded border border-gray-300 pt-[9px] pb-[9px] pl-[13px]"
        ></input>

        <label className="text-sm mr-auto mb-1 text-gray-700 font-medium leading-5">Электронная почта</label>
        <input
          {...register('email')}
          placeholder="Почта"
          className="block w-full mb-[24px] rounded border border-gray-300 pt-[9px] pb-[9px] pl-[13px]"
        ></input>

        <label className="text-sm mr-auto mb-1 text-gray-700 font-medium leading-5">Комментарий</label>
        <textarea
          {...register('textContent')}
          placeholder="Комментарий"
          className="block w-full h-[105px] mb-[24px] rounded border border-gray-300 pt-[9px] pb-[9px] pl-[13px]"
        ></textarea>

        <div className="flex items-center flex-wrap justify-center w-full ">
          <button
            type="submit"
            className="hover:bg-indigo-800 active:bg-violet-700 bg-indigo-600 h-10 rounded text-white mb-5 mr-auto"
            onClick={() => setSelectStep(1)}
          >
            Назад
          </button>
          <button
            type="submit"
            className="hover:bg-indigo-800 active:bg-violet-700 bg-indigo-600 h-10 rounded text-white mb-5 ml-auto"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  )
}
