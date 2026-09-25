import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { Profile } from '../../types'
import AdminLayout from './AdminLayout'

interface StudentRow extends Profile {
  enrollments_count: number
}

export default function AdminStudents() {
  const [students, setStudents] = useState<StudentRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: profiles } = await supabase.from('profiles').select('*').eq('role', 'student').order('created_at', { ascending: false })
      const { data: enrollments } = await supabase.from('enrollments').select('student_id')

      const counts = new Map<string, number>()
      for (const e of enrollments ?? []) {
        counts.set(e.student_id, (counts.get(e.student_id) ?? 0) + 1)
      }

      setStudents(
        (profiles ?? []).map((p) => ({ ...p, enrollments_count: counts.get(p.id) ?? 0 } as StudentRow))
      )
      setLoading(false)
    }
    load()
  }, [])

  return (
    <AdminLayout>
      <h1 className="font-display font-bold text-2xl mb-1">Élèves</h1>
      <p className="text-(--color-muted) text-sm mb-8">
        {loading ? 'Chargement...' : `${students.length} élève${students.length > 1 ? 's' : ''} inscrit${students.length > 1 ? 's' : ''} au total.`}
      </p>

      <div className="rounded-xl border border-(--color-line) bg-(--color-surface) overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-(--color-muted) border-b border-(--color-line)">
            <tr>
              <th className="px-5 py-3 font-medium">Nom</th>
              <th className="px-5 py-3 font-medium">Cours suivis</th>
              <th className="px-5 py-3 font-medium hidden sm:table-cell">Inscrit le</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-(--color-line) last:border-0">
                <td className="px-5 py-3.5 font-medium">{s.full_name || 'Sans nom'}</td>
                <td className="px-5 py-3.5">{s.enrollments_count}</td>
                <td className="px-5 py-3.5 hidden sm:table-cell text-(--color-muted)">{new Date(s.created_at).toLocaleDateString('fr-FR')}</td>
              </tr>
            ))}
            {!loading && students.length === 0 && (
              <tr><td colSpan={3} className="px-5 py-8 text-center text-(--color-muted)">Aucun élève inscrit pour le moment.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
