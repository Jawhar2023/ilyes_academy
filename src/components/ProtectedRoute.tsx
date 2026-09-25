import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({
  children,
  role,
}: {
  children: ReactNode
  role: 'admin' | 'student'
}) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-(--color-muted)">
        Chargement...
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  if (role === 'admin' && profile?.role !== 'admin') return <Navigate to="/dashboard" replace />
  if (role === 'student' && profile?.role === 'admin') return <Navigate to="/admin" replace />

  return <>{children}</>
}
