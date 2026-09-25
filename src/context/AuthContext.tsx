import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { isLocalMode, supabase } from '../lib/supabase'
import type { Profile } from '../types'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  function localIdentity(email: string, fullName?: string) {
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'student'
    const localUser = { id: `local-${email.toLowerCase()}`, email, user_metadata: { full_name: fullName ?? email.split('@')[0] } } as unknown as User
    const localProfile: Profile = { id: localUser.id, full_name: fullName ?? email.split('@')[0], role, avatar_url: null, created_at: new Date().toISOString() }
    return { localUser, localProfile }
  }

  async function loadProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data as Profile | null)
  }

  useEffect(() => {
    if (isLocalMode) {
      const savedEmail = localStorage.getItem('ilyes-demo-email')
      if (savedEmail) {
        const { localUser, localProfile } = localIdentity(savedEmail, localStorage.getItem('ilyes-demo-name') ?? undefined)
        setUser(localUser)
        setProfile(localProfile)
        setSession({ user: localUser } as Session)
      }
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      if (data.session?.user) loadProfile(data.session.user.id)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      if (newSession?.user) {
        loadProfile(newSession.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function signIn(email: string, password: string) {
    if (isLocalMode) {
      if (!email || !password) return { error: 'Veuillez renseigner votre e-mail et votre mot de passe.' }
      const { localUser, localProfile } = localIdentity(email)
      localStorage.setItem('ilyes-demo-email', email)
      setUser(localUser)
      setProfile(localProfile)
      setSession({ user: localUser } as Session)
      return { error: null }
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  async function signUp(email: string, password: string, fullName: string) {
    if (isLocalMode) {
      if (!email || password.length < 6 || !fullName) return { error: 'Completez les champs avec un mot de passe de 6 caracteres minimum.' }
      localStorage.setItem('ilyes-demo-email', email)
      localStorage.setItem('ilyes-demo-name', fullName)
      return { error: null }
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    return { error: error?.message ?? null }
  }

  async function signOut() {
    if (isLocalMode) {
      localStorage.removeItem('ilyes-demo-email')
      localStorage.removeItem('ilyes-demo-name')
      setUser(null)
      setSession(null)
      setProfile(null)
      return
    }
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
