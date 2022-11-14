import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DashboardPage } from './pages/dashboard'
import { ErrorPage } from './pages/error'
import { LoginPage } from './pages/login'
import { RegistrationPage } from './pages/registration/registration'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
])

export const App = () => {
  return (
    <div className="App w-full min-h-screen bg-gray-50 overflow-auto">
      <RouterProvider router={router} />
    </div>
  )
}
