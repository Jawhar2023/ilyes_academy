import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError(error)
    } else {
      navigate('/')
    }
  }

  return (
    <Layout>
      <section className="max-w-md mx-auto px-5 py-20">
        <h1 className="font-display font-bold text-3xl mb-2">Content de vous revoir</h1>
        <p className="text-(--color-muted) mb-8">Connectez-vous à votre compte Ilyes Academy.</p>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Adresse e-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-(--color-line) bg-(--color-surface) px-4 py-3 text-sm focus:border-(--color-blue) outline-none"
              placeholder="vous@exemple.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-(--color-line) bg-(--color-surface) px-4 py-3 text-sm focus:border-(--color-blue) outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-lg bg-(--color-blue) text-(--color-ink) hover:bg-(--color-blue-light) transition-colors disabled:opacity-60"
          >
            <LogIn size={18} /> {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-sm text-(--color-muted) mt-6 text-center">
          Pas encore de compte ? <Link to="/register" className="text-(--color-blue-light) font-medium">Créer un compte</Link>
        </p>
      </section>
    </Layout>
  )
}
