import { createClient } from '@supabase/supabase-js'
import type { Course } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)
export const isLocalMode = !hasSupabaseConfig

const localCourses: Course[] = [
  { id: 'local-python', title: 'Programmer en Python', description: 'Apprenez les bases de Python en construisant vos premiers projets.', category: 'programmation', level: 'debutant', duration_hours: 12, lectures_count: 24, price: 0, is_free: true, image_url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=80', instructor_name: 'Ilyes Academy', rating: 4.8, students_count: 128, created_at: '2026-01-01' },
  { id: 'local-maths', title: 'Mathematiques essentielles', description: 'Renforcez vos bases avec des exercices guides et progressifs.', category: 'mathematiques', level: 'intermediaire', duration_hours: 10, lectures_count: 20, price: 0, is_free: true, image_url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=700&q=80', instructor_name: 'Ilyes Academy', rating: 4.9, students_count: 96, created_at: '2026-01-02' },
]
const localEnrollments: Array<Record<string, unknown>> = []

function createLocalQuery(table: string) {
  let rows: unknown[] = table === 'courses' ? [...localCourses] : table === 'enrollments' ? [...localEnrollments] : []
  const query = {
    select: () => query,
    order: (_column: string, options?: { ascending?: boolean }) => { if (options?.ascending === false) rows.reverse(); return query },
    limit: (count: number) => { rows = rows.slice(0, count); return query },
    eq: (column: string, value: unknown) => { rows = rows.filter((row) => (row as Record<string, unknown>)[column] === value); return query },
    in: (column: string, values: unknown[]) => { rows = rows.filter((row) => values.includes((row as Record<string, unknown>)[column])); return query },
    single: () => Promise.resolve({ data: rows[0] ?? null, error: null }),
    maybeSingle: () => Promise.resolve({ data: rows[0] ?? null, error: null }),
    insert: (value: Record<string, unknown> | Record<string, unknown>[]) => { const values = Array.isArray(value) ? value : [value]; if (table === 'courses') localCourses.push(...values as unknown as Course[]); if (table === 'enrollments') localEnrollments.push(...values); return Promise.resolve({ data: value, error: null }) },
    delete: () => query,
    then: (resolve: (result: { data: unknown[]; error: null; count?: number }) => unknown) => Promise.resolve(resolve({ data: rows, error: null, count: rows.length })),
  }
  return query
}

function createLocalClient() {
  return {
    from: (table: string) => createLocalQuery(table),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Mode local: connexion indisponible.' } }),
      signUp: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Mode local: inscription indisponible.' } }),
      signOut: () => Promise.resolve({ error: null }),
    },
  }
}

export const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : createLocalClient() as unknown as ReturnType<typeof createClient>