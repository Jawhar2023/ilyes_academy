import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/courses', label: 'Cours' },
  { to: '/about', label: 'À propos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  const dashboardPath = profile?.role === 'admin' ? '/admin' : '/dashboard'

  return (
    <header className="relative z-50 bg-[#eefaf2] pt-7 px-5">
      <div className="max-w-7xl mx-auto px-8 h-[112px] rounded-3xl border border-[#c7e7d2] bg-white/90 shadow-sm flex items-center justify-between gap-8">
        <Logo />

        <nav className="hidden lg:flex items-center gap-12">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                  `text-base font-semibold transition-colors ${
                  isActive ? 'text-(--color-blue)' : 'text-(--color-text) hover:text-(--color-blue)'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          {user ? (
            <>
              <Link
                to={dashboardPath}
                className="flex items-center gap-2 text-base font-semibold text-(--color-text) hover:text-(--color-blue) transition-colors"
              >
                <LayoutDashboard size={16} />
                {profile?.role === 'admin' ? 'Tableau Admin' : 'Mon Espace'}
              </Link>
              <button
                onClick={async () => { await signOut(); navigate('/') }}
                className="flex items-center gap-2 text-base font-semibold px-4 py-3 rounded-xl border border-(--color-line) hover:border-(--color-blue) transition-colors"
              >
                <LogOut size={15} /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-base font-semibold text-(--color-text) hover:text-(--color-blue) transition-colors">
                Connexion
              </Link>
              <Link
                to="/register"
                className="btn-primary text-base font-semibold px-8 py-4 rounded-xl border border-(--color-blue) text-(--color-text) hover:bg-(--color-blue) hover:text-white"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden w-12 h-12 rounded-xl border border-(--color-line) flex items-center justify-center" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-(--color-line) px-5 py-4 flex flex-col gap-4 bg-(--color-ink)">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm font-medium text-(--color-text)">
              {l.label}
            </Link>
          ))}
          <div className="h-px bg-(--color-line)" />
          {user ? (
            <>
              <Link to={dashboardPath} onClick={() => setOpen(false)} className="text-sm font-medium text-(--color-blue-light)">
                {profile?.role === 'admin' ? 'Tableau Admin' : 'Mon Espace'}
              </Link>
              <button
                onClick={async () => { await signOut(); setOpen(false); navigate('/') }}
                className="text-sm font-medium text-left text-(--color-muted)"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium">Connexion</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="text-sm font-semibold text-(--color-blue-light)">S'inscrire</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
