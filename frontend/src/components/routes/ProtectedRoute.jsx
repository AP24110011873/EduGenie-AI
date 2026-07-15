import { Navigate, useLocation } from 'react-router-dom'
import { Loader } from '../ui/Loader'
import { useAuth } from '../../hooks/useAuth'

export function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth()
  const location = useLocation()

  if (loading) {
    return <Loader fullScreen label="Checking your workspace" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}