import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '../../shared/ui/button'
import { InputText } from '../../shared/ui/input-text'

export const LoginPage = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => console.log(data)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 px-10 py-3 max-w-[100%] w-[448px] bg-white-400 shadow-xl rounded-xl"
      >
        <h1 className="text-3xl font-extrabold mr-auto mb-5 text-gray-900	">Вход</h1>
        <InputText label="Электронная почта" {...register('email')} placeholder="Email"></InputText>
        <InputText label="Пароль" placeholder="Password" {...register('password')}></InputText>
        <div className="flex justify-between items-center mb-5">
          <div>
            <input
              type="checkbox"
              value="otherComputer"
              placeholder="check"
              {...register('check')}
              className=""
            ></input>
            <label className="text-sm font-medium leading-5 pl-[5px]">Чужой компьютер</label>
          </div>
          <a href="/rec" className="text-indigo-600 text-sm leading-5 font-medium">
            Забыли пароль?
          </a>
        </div>
        <Button type="submit">Войти</Button>
        <div className="flex mt-[24px] ">
          <label className="text-sm font-medium leading-5 text-gray-500">Нет учетной записи?</label>
          <Link to="/registration" className="text-indigo-600 text-sm leading-5 font-medium pl-[10px]">
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </div>
  )
}
