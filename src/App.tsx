import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DashboardPage } from './pages/dashboard'
import { ErrorPage } from './pages/error'
import { LoginPage } from './pages/login'
import { RegistrationPage } from './pages/registration/registration'
import { ReactQueryDevtools } from 'react-query/devtools'

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

const queryClient = new QueryClient()

export const App = () => {
  return (
    <div className="App w-full min-h-screen bg-gray-50 overflow-auto">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  )
}
