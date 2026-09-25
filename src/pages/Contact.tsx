import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Layout from '../components/Layout'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Wire this up to a Supabase table (e.g. "messages") or an email service once ready.
    setSent(true)
  }

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-16">
        <div>
          <p className="text-sm font-medium text-(--color-blue-light) mb-3">Contact</p>
          <h1 className="font-display font-bold text-4xl mb-6">Une question ? Parlons-en.</h1>
          <p className="text-(--color-muted) leading-relaxed mb-10 max-w-md">
            Que ce soit pour choisir le bon cours, organiser une session pour un groupe ou devenir formateur,
            notre équipe vous répond rapidement.
          </p>

          <div className="grid gap-5">
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-lg bg-(--color-surface) border border-(--color-line) flex items-center justify-center text-(--color-blue-light)"><Mail size={18} /></span>
              <div>
                <p className="text-sm text-(--color-muted)">Email</p>
                <p className="font-medium">contact@ilyes-academy.tn</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-lg bg-(--color-surface) border border-(--color-line) flex items-center justify-center text-(--color-blue-light)"><Phone size={18} /></span>
              <div>
                <p className="text-sm text-(--color-muted)">Téléphone</p>
                <p className="font-medium">+216 00 000 000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-lg bg-(--color-surface) border border-(--color-line) flex items-center justify-center text-(--color-blue-light)"><MapPin size={18} /></span>
              <div>
                <p className="text-sm text-(--color-muted)">Adresse</p>
                <p className="font-medium">Tunisie</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-(--color-line) bg-(--color-surface) p-8">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <p className="font-display font-semibold text-xl mb-2">Message envoyé</p>
              <p className="text-sm text-(--color-muted)">Merci, nous revenons vers vous très vite.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Nom</label>
                  <input required className="w-full rounded-lg border border-(--color-line) bg-(--color-ink) px-4 py-3 text-sm focus:border-(--color-blue) outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input type="email" required className="w-full rounded-lg border border-(--color-line) bg-(--color-ink) px-4 py-3 text-sm focus:border-(--color-blue) outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Sujet</label>
                <input required className="w-full rounded-lg border border-(--color-line) bg-(--color-ink) px-4 py-3 text-sm focus:border-(--color-blue) outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea required rows={5} className="w-full rounded-lg border border-(--color-line) bg-(--color-ink) px-4 py-3 text-sm focus:border-(--color-blue) outline-none resize-none" />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-lg bg-(--color-blue) text-(--color-ink) hover:bg-(--color-blue-light) transition-colors"
              >
                <Send size={17} /> Envoyer le message
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  )
}
