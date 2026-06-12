import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface PrivateRouteProps {
  children: React.ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div className="page-shell"><div className="panel">Cargando sesion...</div></div>
  }

  if (!isAuthenticated && !localStorage.getItem("accessToken")) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export const ProtectedRoute = PrivateRoute
