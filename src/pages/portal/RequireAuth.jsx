import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSchool } from '../../context/SchoolContext'

function Loading() {
  return (
    <div className="min-h-svh grid place-items-center bg-cream">
      <p className="text-sm uppercase tracking-widest text-muted">Loading portal…</p>
    </div>
  )
}

export default function RequireAuth({ role }) {
  const { user, loading } = useAuth()
  const { ready } = useSchool()
  const location = useLocation()
  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  if (role && user.role !== role) return <Navigate to={`/portal/${user.role}`} replace />
  if (!ready) return <Loading />
  return <Outlet />
}
