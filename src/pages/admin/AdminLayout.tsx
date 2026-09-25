import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutGrid, BookOpen, Users, LogOut } from 'lucide-react'
import Logo from '../../components/Logo'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/admin', label: 'Aperçu', icon: LayoutGrid, end: true },
  { to: '/admin/courses', label: 'Cours', icon: BookOpen, end: false },
  { to: '/admin/students', label: 'Élèves', icon: Users, end: false },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex bg-(--color-ink)">
      <aside className="w-64 shrink-0 border-r border-(--color-line) flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-5 border-b border-(--color-line)">
          <Logo />
        </div>
        <nav className="flex-1 p-4 grid gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-(--color-blue)/15 text-(--color-blue-light)' : 'text-(--color-muted) hover:bg-(--color-surface) hover:text-(--color-text)'
                }`
              }
            >
              <item.icon size={17} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-(--color-line)">
          <p className="text-xs text-(--color-muted) mb-2 truncate">{profile?.full_name || 'Administrateur'}</p>
          <button
            onClick={async () => { await signOut(); navigate('/') }}
            className="flex items-center gap-2 text-sm text-(--color-muted) hover:text-(--color-text)"
          >
            <LogOut size={15} /> Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden h-16 flex items-center justify-between px-5 border-b border-(--color-line)">
          <Logo to="/admin" />
        </header>
        <main className="p-5 md:p-8 max-w-6xl">{children}</main>
      </div>
    </div>
  )
}
