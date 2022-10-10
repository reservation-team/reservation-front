import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DashboardPage } from './pages/dashboard'
import { ErrorPage } from './pages/error/indext'
import { LoginPage } from './pages/login'

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
])

export const App = () => {
  return (
    <div className="App w-full min-h-screen bg-gray-50">
      <RouterProvider router={router} />
    </div>
  )
}
