import { useRouteError } from 'react-router-dom'

export const ErrorPage = () => {
  const error = useRouteError() as any
  console.error(error)

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-5">
        <h1 className="text-7xl">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i className="text-gray-300">{error?.statusText || error?.message}</i>
        </p>
      </div>
    </div>
  )
}
