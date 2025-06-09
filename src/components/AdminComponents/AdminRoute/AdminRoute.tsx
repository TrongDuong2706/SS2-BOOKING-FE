import { Navigate, Outlet } from 'react-router-dom'
import { isAdmin } from 'src/utils/utils'

const AdminRoute = () => {
  return isAdmin() ? <Outlet /> : <Navigate to='/admin' replace />
}

export default AdminRoute
