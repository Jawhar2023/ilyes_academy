import { Sigma, Code2, Bot, Target, Users, Sparkles } from 'lucide-react'
import Layout from '../components/Layout'

const values = [
  { icon: Target, title: 'Exigence', text: 'Des parcours structurés, avec des objectifs clairs à chaque étape.' },
  { icon: Users, title: 'Proximité', text: 'Des professeurs disponibles qui suivent la progression de chaque élève.' },
  { icon: Sparkles, title: 'Pratique', text: 'Toujours apprendre en construisant : exercices, projets, robots réels.' },
]

export default function About() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-20 text-center">
        <p className="text-sm font-medium text-(--color-blue-light) mb-3">À propos de nous</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6">
          Nous formons la génération qui construira demain.
        </h1>
        <p className="text-(--color-muted) text-lg leading-relaxed max-w-2xl mx-auto">
          Ilyes Academy est né d'une conviction simple : les mathématiques, la programmation et la robotique
          ne sont pas des matières réservées à quelques-uns. Avec les bonnes bases et les bons projets,
          chaque élève peut progresser à son rythme et prendre confiance.
        </p>
      </section>

      <section className="border-y border-(--color-line) bg-(--color-surface)">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-3 gap-8">
          {[
            { icon: Sigma, label: 'Mathématiques', text: 'Du collège au bac, une progression pensée pour construire une intuition durable des concepts.' },
            { icon: Code2, label: 'Programmation', text: 'Python, web, algorithmique : apprendre en écrivant du vrai code, dès les premières séances.' },
            { icon: Bot, label: 'Robotique', text: 'De l\u2019électronique de base jusqu\u2019à l\u2019IA embarquée, en assemblant des robots qui fonctionnent vraiment.' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-(--color-line) bg-(--color-ink) p-6">
              <s.icon size={24} className="text-(--color-blue-light) mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">{s.label}</h3>
              <p className="text-sm text-(--color-muted) leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <h2 className="font-display font-bold text-3xl mb-10 text-center">Ce qui nous guide</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="text-center">
              <div className="w-12 h-12 rounded-lg bg-(--color-surface) border border-(--color-line) flex items-center justify-center mx-auto mb-4 text-(--color-amber)">
                <v.icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-(--color-muted) leading-relaxed max-w-xs mx-auto">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
