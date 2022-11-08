import { useForm } from "react-hook-form";

export const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data:any) => console.log(data);

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap flex-col items-center px-10 py-3 max-w-[100%] w-[448px] bg-white-400 shadow-xl rounded-xl">
        <h1 className="text-3xl font-extrabold mr-auto mb-5 text-gray-900	">Вход</h1>
        <label className="text-sm mr-auto mb-1 text-gray-700 font-medium leading-5">Электронная почта</label>
        <input
          {...register("email")}
          placeholder="Email"
          className="block w-full mb-10 rounded border border-gray-300 h-[42px]">
          </input>
        <label className="text-sm mr-auto mb-1 text-gray-700 font-medium leading-5">Пароль</label>
        <input
          placeholder="Password"
          {...register("password")}
          className="block w-full mb-5 rounded border border-gray-300 h-[42px]">
          </input>
        <div className="flex max-w-[100%] w-[448px] justify-between items-center mb-5">
          <div>
            <input
              type="checkbox"
              value="otherComputer"
              placeholder="check"
              {...register("check")}
              className="">
            </input>
            <label className="text-sm font-medium leading-5 pl-[5px]">Чужой компьютер</label>
          </div>
          <a href="/rec" className="text-indigo-600 text-sm leading-5 font-medium">Забыли пароль?</a>
        </div>
        <button
          type="submit"
          className="hover:bg-indigo-800 active:bg-violet-700 bg-indigo-600 w-full h-10 rounded text-white mb-5">
          Войти
        </button>
        <div className="flex max-w-[100%] w-[448px] justify-between items-center">
          <label className="text-sm font-medium leading-5 text-gray-500">Нет учетной записи?</label>
          <a href="/reg" className="text-indigo-600 text-sm leading-5 font-medium">Зарегистрироваться</a>
        </div>
      </form>
    </div>
  );
}
