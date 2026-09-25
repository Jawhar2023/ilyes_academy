import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Course, Enrollment } from '../../types'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/AuthContext'
import CourseCard from '../../components/CourseCard'

export default function StudentDashboard() {
  const { user, profile } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    async function load() {
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('*')
        .eq('student_id', user!.id) as { data: Enrollment[] | null }

      const courseIds = (enrollments ?? []).map((e) => e.course_id)
      if (courseIds.length === 0) {
        setCourses([])
        setLoading(false)
        return
      }
      const { data: coursesData } = await supabase.from('courses').select('*').in('id', courseIds)
      setCourses((coursesData as Course[]) ?? [])
      setLoading(false)
    }
    load()
  }, [user])

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <p className="text-sm font-medium text-(--color-blue-light) mb-2">Mon espace</p>
        <h1 className="font-display font-bold text-3xl mb-1">
          Bonjour {profile?.full_name || 'à vous'} 👋
        </h1>
        <p className="text-(--color-muted) mb-10">Retrouvez ici les cours auxquels vous êtes inscrit.</p>

        {loading ? (
          <p className="text-sm text-(--color-muted)">Chargement...</p>
        ) : courses.length === 0 ? (
          <div className="rounded-xl border border-(--color-line) bg-(--color-surface) p-10 text-center">
            <BookOpen size={28} className="mx-auto text-(--color-muted) mb-4" />
            <p className="font-display font-semibold text-lg mb-2">Aucun cours pour l'instant</p>
            <p className="text-sm text-(--color-muted) mb-6 max-w-sm mx-auto">
              Parcourez le catalogue et inscrivez-vous à votre premier cours de mathématiques,
              programmation ou robotique.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 font-semibold px-5 py-3 rounded-lg bg-(--color-blue) text-(--color-ink) hover:bg-(--color-blue-light) transition-colors"
            >
              Explorer les cours <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        )}
      </section>
    </Layout>
  )
}
