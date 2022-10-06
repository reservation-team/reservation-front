import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DashboardPage } from './pages/dashboard'
import { ErrorPage } from './pages/error/indext'
import { LoginPage } from './pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
])

export const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}
