import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '../../shared/ui/button'
import { InputText } from '../../shared/ui/input-text'

export const RegistrationPage = () => {
  const { register, handleSubmit } = useForm()

  const onSubmitRegistration = (data: any) => {
    data.password === data.сonfirmPassword ? console.log(data) : alert('Пароли не совпадают!')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmitRegistration)}
        className="space-y-5 px-10 py-3 max-w-[100%] w-[448px] bg-white-400 shadow-xl rounded-xl"
      >
        <h1 className="text-3xl font-extrabold mr-auto mb-5 text-gray-900	">Регистрация</h1>

        <InputText
          label="Электронная почта"
          {...register('email')}
          placeholder="Email"
          className="block w-full mb-[24px] rounded border border-gray-300 pt-[9px] pb-[9px] pl-[13px]"
        ></InputText>

        <InputText
          label="Пароль"
          type="password"
          placeholder="Password"
          {...register('password')}
          className="block w-full mb-[24px] rounded border border-gray-300 pt-[9px] pb-[9px] pl-[13px]"
        ></InputText>

        <InputText
          label="Подтвердите пароль"
          type="password"
          placeholder="Confirm Password"
          {...register('сonfirmPassword')}
        ></InputText>
        <div className="w-full my-[24px]">
          <Button type="submit">Зарегистрироваться</Button>
        </div>
        <div className="flex items-center  mb-[24px]">
          <label className="text-sm font-medium leading-5 text-gray-500">Есть учетная запись?</label>
          <Link to="/login" className="text-indigo-600 text-sm leading-5 font-medium pl-[10px]">
            Войти
          </Link>
        </div>
      </form>
    </div>
  )
}
