import { useEffect, useState, type FormEvent } from 'react'
import { Plus, Trash2, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Category, Course } from '../../types'
import { useAuth } from '../../context/AuthContext'
import AdminLayout from './AdminLayout'

const emptyForm = {
  title: '',
  description: '',
  category: 'mathematiques' as Category,
  level: 'debutant' as Course['level'],
  duration_hours: 10,
  lectures_count: 20,
  price: 0,
  is_free: false,
  instructor_name: '',
}

export default function AdminCourses() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false })
    setCourses((data as Course[]) ?? [])
  }

  useEffect(() => { load() }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const { error } = await supabase.from('courses').insert({ ...form, created_by: user?.id })
    setSaving(false)
    if (error) {
      setError(error.message)
    } else {
      setForm(emptyForm)
      setShowForm(false)
      load()
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce cours ?')) return
    await supabase.from('courses').delete().eq('id', id)
    load()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Cours</h1>
          <p className="text-(--color-muted) text-sm">Ajoutez et gérez les cours de mathématiques, programmation et robotique.</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 font-semibold px-4 py-2.5 rounded-lg bg-(--color-blue) text-(--color-ink) hover:bg-(--color-blue-light) transition-colors"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />} {showForm ? 'Fermer' : 'Nouveau cours'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-(--color-line) bg-(--color-surface) p-6 mb-8 grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Titre</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-(--color-line) bg-(--color-ink) px-3.5 py-2.5 text-sm focus:border-(--color-blue) outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Formateur</label>
              <input
                required
                value={form.instructor_name}
                onChange={(e) => setForm({ ...form, instructor_name: e.target.value })}
                className="w-full rounded-lg border border-(--color-line) bg-(--color-ink) px-3.5 py-2.5 text-sm focus:border-(--color-blue) outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border border-(--color-line) bg-(--color-ink) px-3.5 py-2.5 text-sm focus:border-(--color-blue) outline-none resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                className="w-full rounded-lg border border-(--color-line) bg-(--color-ink) px-3.5 py-2.5 text-sm focus:border-(--color-blue) outline-none"
              >
                <option value="mathematiques">Mathématiques</option>
                <option value="programmation">Programmation</option>
                <option value="robotique">Robotique</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Niveau</label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value as Course['level'] })}
                className="w-full rounded-lg border border-(--color-line) bg-(--color-ink) px-3.5 py-2.5 text-sm focus:border-(--color-blue) outline-none"
              >
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Durée (h)</label>
              <input
                type="number"
                min={0}
                value={form.duration_hours}
                onChange={(e) => setForm({ ...form, duration_hours: Number(e.target.value) })}
                className="w-full rounded-lg border border-(--color-line) bg-(--color-ink) px-3.5 py-2.5 text-sm focus:border-(--color-blue) outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Leçons</label>
              <input
                type="number"
                min={0}
                value={form.lectures_count}
                onChange={(e) => setForm({ ...form, lectures_count: Number(e.target.value) })}
                className="w-full rounded-lg border border-(--color-line) bg-(--color-ink) px-3.5 py-2.5 text-sm focus:border-(--color-blue) outline-none"
              />
            </div>
          </div>

          <div className="flex items-end gap-4 flex-wrap">
            <div>
              <label className="block text-sm font-medium mb-1.5">Prix (DT)</label>
              <input
                type="number"
                min={0}
                disabled={form.is_free}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-40 rounded-lg border border-(--color-line) bg-(--color-ink) px-3.5 py-2.5 text-sm focus:border-(--color-blue) outline-none disabled:opacity-50"
              />
            </div>
            <label className="flex items-center gap-2 text-sm mb-2.5">
              <input
                type="checkbox"
                checked={form.is_free}
                onChange={(e) => setForm({ ...form, is_free: e.target.checked, price: e.target.checked ? 0 : form.price })}
              />
              Cours gratuit
            </label>
          </div>

          {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="justify-self-start font-semibold px-5 py-3 rounded-lg bg-(--color-blue) text-(--color-ink) hover:bg-(--color-blue-light) transition-colors disabled:opacity-60"
          >
            {saving ? 'Enregistrement...' : 'Publier le cours'}
          </button>
        </form>
      )}

      <div className="rounded-xl border border-(--color-line) bg-(--color-surface) overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-(--color-muted) border-b border-(--color-line)">
            <tr>
              <th className="px-5 py-3 font-medium">Titre</th>
              <th className="px-5 py-3 font-medium hidden sm:table-cell">Catégorie</th>
              <th className="px-5 py-3 font-medium hidden md:table-cell">Formateur</th>
              <th className="px-5 py-3 font-medium">Prix</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-b border-(--color-line) last:border-0">
                <td className="px-5 py-3.5 font-medium max-w-xs truncate">{c.title}</td>
                <td className="px-5 py-3.5 hidden sm:table-cell text-(--color-muted) capitalize">{c.category}</td>
                <td className="px-5 py-3.5 hidden md:table-cell text-(--color-muted)">{c.instructor_name}</td>
                <td className="px-5 py-3.5">{c.is_free ? 'Gratuit' : `${c.price} DT`}</td>
                <td className="px-5 py-3.5 text-right">
                  <button onClick={() => handleDelete(c.id)} className="text-(--color-muted) hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-(--color-muted)">Aucun cours pour le moment.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
