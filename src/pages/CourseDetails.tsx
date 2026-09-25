import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Clock, PlayCircle, Star, CheckCircle2, User } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Course } from '../types'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

const categoryLabel: Record<string, string> = {
  mathematiques: 'Mathématiques',
  programmation: 'Programmation',
  robotique: 'Robotique',
}

export default function CourseDetails() {
  const { id } = useParams()
  const { user, profile } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [enrolled, setEnrolled] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

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
        <div className="max-w-3xl mx-auto px-5 py-24 text-center text-(--color-muted)">Chargement du cours...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="border-b border-(--color-line) grid-lines">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-16">
          <span className="text-xs font-medium px-2.5 py-1 rounded-md border border-(--color-blue)/40 bg-(--color-blue)/10 text-(--color-blue-light)">
            {categoryLabel[course.category] ?? course.category}
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl mt-5 mb-4 max-w-2xl">{course.title}</h1>
          <p className="text-(--color-muted) max-w-2xl leading-relaxed mb-6">{course.description}</p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-(--color-muted)">
            <span className="flex items-center gap-1.5"><User size={15} /> {course.instructor_name}</span>
            <span className="flex items-center gap-1.5"><Clock size={15} /> {course.duration_hours}h</span>
            <span className="flex items-center gap-1.5"><PlayCircle size={15} /> {course.lectures_count} leçons</span>
            <span className="flex items-center gap-1.5 text-(--color-amber)"><Star size={15} fill="currentColor" /> {course.rating} ({course.students_count} élèves)</span>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 md:px-8 py-14 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="font-display font-semibold text-xl mb-4">Ce que vous allez apprendre</h2>
          <ul className="grid gap-3">
            {['Fondamentaux clairement expliqués', 'Exercices corrigés à chaque étape', 'Un projet concret à réaliser', 'Suivi personnalisé de la progression'].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-(--color-muted)">
                <CheckCircle2 size={17} className="text-(--color-mint) shrink-0 mt-0.5" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-2xl border border-(--color-line) bg-(--color-surface) p-6 h-fit sticky top-24">
          <p className="font-display font-bold text-3xl mb-4">
            {course.is_free ? 'Gratuit' : `${course.price} DT`}
          </p>

          {!user ? (
            <Link
              to="/login"
              className="block text-center font-semibold px-5 py-3 rounded-lg bg-(--color-blue) text-(--color-ink) hover:bg-(--color-blue-light) transition-colors"
            >
              Se connecter pour s'inscrire
            </Link>
          ) : profile?.role === 'admin' ? (
            <p className="text-sm text-(--color-muted)">Connecté en tant qu'administrateur.</p>
          ) : enrolled ? (
            <p className="text-center font-semibold px-5 py-3 rounded-lg border border-(--color-mint)/40 bg-(--color-mint)/10 text-(--color-mint)">
              Déjà inscrit ✓
            </p>
          ) : (
            <button
              onClick={handleEnroll}
              className="w-full font-semibold px-5 py-3 rounded-lg bg-(--color-blue) text-(--color-ink) hover:bg-(--color-blue-light) transition-colors"
            >
              S'inscrire à ce cours
            </button>
          )}
          {status && <p className="text-xs text-(--color-muted) mt-3">{status}</p>}
        </aside>
      </section>
    </Layout>
  )
}
