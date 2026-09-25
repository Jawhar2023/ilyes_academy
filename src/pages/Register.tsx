import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'

const levels = [
  'École Primaire',
  'Collège',
  'Lycée',
  'Université',
  'Professionnel',
]

const courses = [
  'Mathématiques',
  'Programmation',
  'Robotique',
  'Intelligence Artificielle',
  'Développement Web',
  'Python',
]

const benefits = [
  { icon: CheckCircle2, text: 'Accès illimité' },
  { icon: CheckCircle2, text: 'Certificats' },
  { icon: CheckCircle2, text: 'Professeurs experts' },
  { icon: CheckCircle2, text: 'Projets pratiques' },
  { icon: CheckCircle2, text: 'Exercices interactifs' },
]

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [level, setLevel] = useState('')
  const [interestedCourse, setInterestedCourse] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (!acceptTerms) {
      setError('Vous devez accepter les conditions d\'utilisation')
      return
    }

    setLoading(true)
    const fullName = `${firstName} ${lastName}`
    const { error } = await signUp(email, password, fullName)
    setLoading(false)
    
    if (error) {
      setError(error)
    } else {
      setDone(true)
      setTimeout(() => navigate('/login'), 3000)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F7FFF9 0%, #ECFBF3 100%)' }}>
        <div className="max-w-md w-full mx-5">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-10 shadow-2xl border border-white/50 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compte créé avec succès!</h2>
            <p className="text-gray-600 mb-2">
              Bienvenue chez Ilyes Academy, {firstName}!
            </p>
            <p className="text-sm text-gray-500">
              Vérifiez votre email puis connectez-vous. Redirection...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F7FFF9 0%, #ECFBF3 100%)' }}>
      {/* NAVBAR - Using the same navbar component as index */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="flex min-h-[calc(100vh-200px)]">
        {/* LEFT SIDE - Illustration (40%) */}
        <div className="hidden lg:flex lg:w-[40%] relative overflow-hidden items-center justify-center p-12">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-400/40 rounded-full animate-pulse"></div>
            <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10 max-w-lg">
            <div className="absolute -inset-6 bg-gradient-to-br from-green-200/50 to-green-300/30 rounded-[3rem] blur-2xl"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/10 border-8 border-white/50 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                alt="Students learning"
                className="w-full h-[500px] object-cover"
              />
            </div>

            <div className="absolute -top-8 -right-8 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl animate-float">📐</div>
            <div className="absolute top-1/3 -left-8 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl animate-float" style={{ animationDelay: '1s' }}>💻</div>
            <div className="absolute -bottom-8 right-1/4 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl animate-float" style={{ animationDelay: '2s' }}>🤖</div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/60 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-400/40 rounded-full blur-2xl"></div>
          </div>

          {/* Benefits Cards */}
          <div className="absolute bottom-8 left-8 right-8 space-y-3">
            {benefits.slice(0, 3).map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <benefit.icon className="text-green-600" size={18} />
                </div>
                <span className="text-sm font-semibold text-gray-700">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Register Form (60%) */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-0 w-80 h-80 bg-green-100/30 rounded-full blur-3xl"></div>
          </div>

          <div className="relative w-full max-w-2xl">
            <div className="absolute -inset-4 bg-gradient-to-br from-green-200/30 to-green-300/20 rounded-[2.5rem] blur-2xl"></div>
            
            <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-2xl border border-white/50 max-h-[calc(100vh-150px)] overflow-y-auto">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <Logo />
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Créer un compte</h1>
                <p className="text-gray-600">Commencez votre parcours d'apprentissage dès aujourd'hui.</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name & Last Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        placeholder="vous@exemple.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        placeholder="+216 00 000 000"
                      />
                    </div>
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="text-gray-400" size={18} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmer</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="text-gray-400" size={18} />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Level & Course Interest */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Niveau</label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                    >
                      <option value="">Sélectionnez votre niveau</option>
                      {levels.map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cours d'intérêt</label>
                    <select
                      value={interestedCourse}
                      onChange={(e) => setInterestedCourse(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                    >
                      <option value="">Sélectionnez un cours</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                    J'accepte les <Link to="/terms" className="text-green-600 hover:text-green-700 font-semibold">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-green-600 hover:text-green-700 font-semibold">politique de confidentialité</Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Création...
                    </>
                  ) : (
                    <>
                      <UserPlus size={22} />
                      Créer mon compte
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-gray-500 font-medium">ou continuer avec</span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center px-4 py-3 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center px-4 py-3 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00A4EF">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center px-4 py-3 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center text-gray-600 mt-6">
                Vous avez déjà un compte?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-bold">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
