import { useEffect, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { BlogPost } from '../types'
import Layout from '../components/Layout'

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    supabase.from('blog_posts').select('*').order('created_at', { ascending: false }).then(({ data }) => setPosts((data as BlogPost[]) ?? []))
  }, [])

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <p className="text-sm font-medium text-(--color-blue-light) mb-3">Blog</p>
        <h1 className="font-display font-bold text-4xl mb-10">Conseils & actualités</h1>

        {posts.length === 0 ? (
          <p className="text-sm text-(--color-muted)">
            Aucun article pour le moment — ajoutez-en depuis la table <code className="font-mono text-(--color-blue-light)">blog_posts</code> dans Supabase.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article key={p.id} className="rounded-xl border border-(--color-line) bg-(--color-surface) overflow-hidden">
                <div className="h-40 bg-(--color-surface-2) grid-lines" />
                <div className="p-5">
                  <span className="text-xs font-medium text-(--color-blue-light)">{p.category}</span>
                  <h3 className="font-display font-semibold text-lg mt-2 mb-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-(--color-muted) line-clamp-3 mb-4">{p.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-(--color-muted)">
                    <CalendarDays size={13} /> {new Date(p.created_at).toLocaleDateString('fr-FR')} · {p.author_name}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}
