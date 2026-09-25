import { useEffect, useState } from 'react'
import { Users, BookOpen, TrendingUp, Wallet } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from './AdminLayout'

interface Stats {
  totalStudents: number
  totalCourses: number
  totalEnrollments: number
  estimatedRevenue: number
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    async function load() {
      const [{ count: studentsCount }, { data: courses }, { data: enrollments }] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
        supabase.from('courses').select('id, price, is_free'),
        supabase.from('enrollments').select('id, course_id'),
      ])

      const priceByCourse = new Map((courses ?? []).map((c) => [c.id, c.is_free ? 0 : c.price]))
      const revenue = (enrollments ?? []).reduce((sum, e) => sum + (priceByCourse.get(e.course_id) ?? 0), 0)

      setStats({
        totalStudents: studentsCount ?? 0,
        totalCourses: (courses ?? []).length,
        totalEnrollments: (enrollments ?? []).length,
        estimatedRevenue: revenue,
      })
    }
    load()
  }, [])

  const cards = stats
    ? [
        { label: 'Élèves inscrits', value: stats.totalStudents, icon: Users, color: 'text-(--color-blue-light)' },
        { label: 'Cours publiés', value: stats.totalCourses, icon: BookOpen, color: 'text-(--color-mint)' },
        { label: 'Inscriptions aux cours', value: stats.totalEnrollments, icon: TrendingUp, color: 'text-(--color-amber)' },
        { label: 'Revenu estimé', value: `${stats.estimatedRevenue} DT`, icon: Wallet, color: 'text-(--color-blue-light)' },
      ]
    : []

  return (
    <AdminLayout>
      <h1 className="font-display font-bold text-2xl mb-1">Tableau de bord</h1>
      <p className="text-(--color-muted) text-sm mb-8">Vue d'ensemble de l'activité d'Ilyes Academy.</p>

      {!stats ? (
        <p className="text-sm text-(--color-muted)">Chargement des statistiques...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => (
            <div key={c.label} className="rounded-xl border border-(--color-line) bg-(--color-surface) p-5">
              <c.icon size={20} className={`${c.color} mb-4`} />
              <p className="font-display font-bold text-2xl">{c.value}</p>
              <p className="text-sm text-(--color-muted) mt-1">{c.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-xl border border-(--color-line) bg-(--color-surface) p-6">
        <h2 className="font-display font-semibold mb-2">Prochaines étapes</h2>
        <ul className="text-sm text-(--color-muted) space-y-2 list-disc list-inside">
          <li>Ajoutez vos vrais cours depuis l'onglet « Cours ».</li>
          <li>Le nombre de clients correspond aux profils avec le rôle « student ».</li>
          <li>Les inscriptions aux cours alimentent le revenu estimé ci-dessus.</li>
        </ul>
      </div>
    </AdminLayout>
  )
}
