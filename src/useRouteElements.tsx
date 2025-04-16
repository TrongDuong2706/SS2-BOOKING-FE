import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Authenticate from './components/Authenticate'

import { useContext } from 'react'
import { AppContext } from './contexts/app.context'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    }
  ])
  return routeElements
}
