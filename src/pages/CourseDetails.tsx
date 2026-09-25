import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { 
  Clock, PlayCircle, Star, CheckCircle2, Heart,
  Award, Globe, Video, FileText, Download,
  ChevronDown, Lock, TrendingUp, Target
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Course } from '../types'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

const categoryLabel: Record<string, string> = {
  mathematiques: 'Mathématiques',
  programmation: 'Programmation',
  robotique: 'Robotique',
}

const levelLabel: Record<string, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
}

export default function CourseDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [enrolled, setEnrolled] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [openChapter, setOpenChapter] = useState<number | null>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [wishlist, setWishlist] = useState(false)

  useEffect(() => {
    if (!id) return
    supabase.from('courses').select('*').eq('id', id).single().then(({ data }) => setCourse(data as Course))
  }, [id])

  useEffect(() => {
    if (!id || !user) return
    supabase
      .from('enrollments')
      .select('id')
      .eq('course_id', id)
      .eq('student_id', user.id)
      .maybeSingle()
      .then(({ data }) => setEnrolled(!!data))
  }, [id, user])

  async function handleEnroll() {
    if (!user || !id) return
    const { error } = await supabase.from('enrollments').insert({ student_id: user.id, course_id: id })
    if (!error) {
      setEnrolled(true)
      setStatus('Inscription confirmée — retrouvez ce cours dans votre espace.')
    } else {
      setStatus(error.message)
    }
  }

  if (!course) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-5 py-24 text-center text-gray-500">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
          <p className="mt-4">Chargement du cours...</p>
        </div>
      </Layout>
    )
  }

  const chapters = [
    { title: 'Introduction et fondamentaux', lessons: 5, duration: '1h 15min', locked: false },
    { title: 'Concepts avancés', lessons: 8, duration: '2h 30min', locked: false },
    { title: 'Pratique et exercices', lessons: 12, duration: '3h 45min', locked: !enrolled },
    { title: 'Projet final', lessons: 4, duration: '2h 20min', locked: !enrolled },
  ]

  const faqs = [
    { q: 'Quel est le niveau requis pour suivre ce cours?', a: 'Ce cours est accessible à tous, aucun prérequis nécessaire. Nous partons des bases et progressons étape par étape.' },
    { q: 'Combien de temps ai-je accès au cours?', a: 'Vous avez un accès illimité à vie au contenu du cours, y compris toutes les mises à jour futures.' },
    { q: 'Y a-t-il un certificat à la fin?', a: 'Oui, vous recevrez un certificat de réussite après avoir complété 100% du cours et validé les exercices.' },
    { q: 'Puis-je poser des questions?', a: 'Absolument! Vous avez accès à une communauté d\'entraide et à un support dédié pour toutes vos questions.' },
  ]

  const reviews = [
    { name: 'Sarah Ben Ali', avatar: '👩‍🎓', rating: 5, comment: 'Excellent cours, très bien structuré! J\'ai appris énormément et le projet final était vraiment enrichissant.', date: 'Il y a 2 jours' },
    { name: 'Mohamed Trabelsi', avatar: '👨‍💻', rating: 5, comment: 'Les explications sont claires et les exercices progressifs. Je recommande vivement!', date: 'Il y a 1 semaine' },
    { name: 'Amira Gharbi', avatar: '👩‍🔬', rating: 5, comment: 'Parfait pour débuter. L\'instructeur prend le temps d\'expliquer chaque concept en détail.', date: 'Il y a 2 semaines' },
  ]

  return (
    <Layout>
      {/* Premium Background */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F7FFF9 0%, #ECFBF3 100%)' }}>
        
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large organic blob top-left */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
          
          {/* Organic blob top-right */}
          <div className="absolute top-20 right-0 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
          
          {/* Floating circles */}
          <div className="absolute top-40 left-1/4 w-3 h-3 bg-green-400/40 rounded-full"></div>
          <div className="absolute top-96 right-1/3 w-2 h-2 bg-yellow-400/60 rounded-full"></div>
          <div className="absolute bottom-96 left-1/3 w-4 h-4 bg-green-300/30 rounded-full"></div>
          
          {/* Soft gradient circles */}
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-green-200/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-green-100/30 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* HERO SECTION */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-green-200/50 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium text-gray-700">{categoryLabel[course.category]}</span>
              </div>

              {/* Title */}
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
                {course.title}
              </h1>

              {/* Rating & Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-1 font-semibold text-gray-900">{course.rating}</span>
                  <span className="text-gray-500">({course.students_count} étudiants)</span>
                </div>
                
                <div className="px-3 py-1 rounded-full bg-green-100/80 text-green-700 font-medium text-xs">
                  {levelLabel[course.level]}
                </div>
              </div>

              {/* Quick Info Pills */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50">
                  <Clock size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-700">{course.duration_hours}h de contenu</span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50">
                  <Video size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-700">{course.lectures_count} leçons</span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50">
                  <Globe size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Français</span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50">
                  <Award size={16} className="text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Certificat</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                {course.description} Rejoignez des centaines d'étudiants qui ont déjà transformé leur apprentissage avec ce cours premium.
              </p>

              {/* Instructor Mini Profile */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 max-w-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                  {course.instructor_name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Instructeur</p>
                  <p className="font-semibold text-gray-900">{course.instructor_name}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {!user ? (
                  <Link
                    to="/login"
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
                  >
                    S'inscrire maintenant
                  </Link>
                ) : enrolled ? (
                  <div className="px-8 py-4 rounded-2xl bg-white border-2 border-green-500 text-green-600 font-semibold flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    Déjà inscrit
                  </div>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
                  >
                    S'inscrire maintenant • {course.is_free ? 'Gratuit' : `${course.price} DT`}
                  </button>
                )}
                
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    wishlist 
                      ? 'bg-red-50 border-red-200 text-red-500' 
                      : 'bg-white border-gray-200 text-gray-400 hover:text-red-400 hover:border-red-200'
                  }`}
                >
                  <Heart size={24} fill={wishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              {status && (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
                  {status}
                </div>
              )}
            </div>

            {/* Right Side - Hero Image */}
            <div className="relative">
              {/* Decorative blob behind image */}
              <div className="absolute -inset-4 bg-gradient-to-br from-green-200/50 to-green-300/30 rounded-[3rem] blur-2xl"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/10 border-8 border-white/50 backdrop-blur-sm">
                <img 
                  src={course.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'} 
                  alt={course.title}
                  className="w-full h-full object-cover aspect-[4/3]"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
              </div>

              {/* Floating decorative circles */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/60 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-400/40 rounded-full blur-2xl"></div>
            </div>
          </div>
        </section>

        {/* COURSE INFORMATION CARDS */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { icon: Clock, label: 'Durée', value: `${course.duration_hours}h`, color: 'text-blue-500' },
              { icon: Video, label: 'Leçons', value: course.lectures_count.toString(), color: 'text-purple-500' },
              { icon: Target, label: 'Projets', value: '3', color: 'text-green-500' },
              { icon: FileText, label: 'Exercices', value: '25+', color: 'text-orange-500' },
              { icon: Award, label: 'Certificat', value: 'Inclus', color: 'text-yellow-500' },
              { icon: TrendingUp, label: 'Niveau', value: levelLabel[course.level], color: 'text-red-500' },
              { icon: Globe, label: 'Langue', value: 'FR', color: 'text-indigo-500' },
              { icon: Download, label: 'Ressources', value: '50+', color: 'text-pink-500' },
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-5 border border-gray-200/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <item.icon className={`${item.color} mb-3 group-hover:scale-110 transition-transform`} size={24} />
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="font-bold text-gray-900 text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT YOU WILL LEARN */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-200/50 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Ce que vous allez apprendre</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Maîtriser tous les concepts fondamentaux',
                'Construire 3 projets réels et concrets',
                'Résoudre plus de 25 exercices pratiques',
                'Obtenir un certificat reconnu',
                'Accéder à une communauté d\'entraide',
                'Télécharger toutes les ressources',
                'Bénéficier d\'un suivi personnalisé',
                'Accès illimité à vie aux mises à jour',
              ].map((item, i) => (
                <div 
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-green-50 to-transparent border border-green-100 hover:border-green-200 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COURSE CONTENT */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Contenu du cours</h2>
          
          <div className="space-y-4">
            {chapters.map((chapter, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => setOpenChapter(openChapter === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/30">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{chapter.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {chapter.lessons} leçons • {chapter.duration}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {chapter.locked && (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm">
                        <Lock size={14} />
                        Verrouillé
                      </div>
                    )}
                    <ChevronDown 
                      className={`text-gray-400 transition-transform ${openChapter === i ? 'rotate-180' : ''}`} 
                      size={24} 
                    />
                  </div>
                </button>
                
                {openChapter === i && (
                  <div className="px-6 pb-6 space-y-2 border-t border-gray-100">
                    {[...Array(chapter.lessons)].map((_, j) => (
                      <div 
                        key={j}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          {chapter.locked ? (
                            <Lock size={16} className="text-gray-400" />
                          ) : (
                            <PlayCircle size={16} className="text-green-500 group-hover:text-green-600" />
                          )}
                          <span className="text-gray-700 group-hover:text-gray-900">
                            Leçon {j + 1}: Introduction au module
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{Math.floor(Math.random() * 20 + 5)} min</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* INSTRUCTOR SECTION */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16">
          <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-200/50 shadow-xl overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100/50 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative grid md:grid-cols-3 gap-8 items-center">
              {/* Instructor Photo */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-green-200 to-green-300 rounded-full blur-2xl opacity-40"></div>
                <div className="relative w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl border-8 border-white">
                  {course.instructor_name.charAt(0)}
                </div>
              </div>

              {/* Instructor Info */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Votre instructeur</p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{course.instructor_name}</h3>
                  <p className="text-green-600 font-medium">Expert en {categoryLabel[course.category]}</p>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  Passionné par l'enseignement et l'innovation pédagogique, avec plus de 10 ans d'expérience 
                  dans la formation. Diplômé en ingénierie et spécialisé dans les méthodes d'apprentissage actif.
                </p>

                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">15+</p>
                    <p className="text-sm text-gray-500">Cours créés</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">3,500+</p>
                    <p className="text-sm text-gray-500">Étudiants formés</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                    <p className="text-sm text-gray-500">Note moyenne</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STUDENT REVIEWS */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Ce que disent nos étudiants</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div 
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} size={12} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4">{review.comment}</p>
                <p className="text-xs text-gray-400">{review.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Questions fréquentes</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <ChevronDown 
                    className={`text-gray-400 shrink-0 ml-4 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </button>
                
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* RELATED COURSES */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Cours similaires</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${['1509228468518-180dd4864904', '1515879218367-8466d910aaa4', '1485827404703-89b55fcc595e'][i-1]}?auto=format&fit=crop&w=600&q=80`}
                    alt="Course"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700">
                    {['Mathématiques', 'Programmation', 'Robotique'][i-1]}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">4.9</span>
                    </div>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-500">150+ étudiants</span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    Cours avancé en {['Mathématiques', 'Programmation', 'Robotique'][i-1]}
                  </h3>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <p className="font-bold text-xl text-gray-900">{[299, 399, 349][i-1]} DT</p>
                    <button className="px-4 py-2 rounded-xl bg-green-500 text-white font-medium text-sm hover:bg-green-600 transition-colors">
                      Voir le cours
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
