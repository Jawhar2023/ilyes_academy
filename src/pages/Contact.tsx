import { useState, type FormEvent } from 'react'
import { 
  Mail, Phone, MapPin, Send, Clock, ChevronDown,
  GraduationCap, MessageSquare, Rocket, ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const contactInfo = [
  { icon: MapPin, title: 'Adresse', value: 'Tunis, Tunisie', color: 'from-blue-500 to-blue-600' },
  { icon: Phone, title: 'Téléphone', value: '+216 00 000 000', color: 'from-green-500 to-green-600' },
  { icon: Mail, title: 'Email', value: 'contact@ilyes-academy.tn', color: 'from-purple-500 to-purple-600' },
  { icon: Clock, title: 'Horaires', value: 'Lun - Sam: 9h - 18h', color: 'from-orange-500 to-orange-600' },
]

const topics = [
  'Mathématiques',
  'Programmation',
  'Robotique',
  'Question Générale',
  'Support Technique',
]

const features = [
  { 
    icon: GraduationCap, 
    title: 'Accompagnement Académique', 
    desc: 'Conseils personnalisés pour choisir le parcours adapté à vos objectifs.',
    gradient: 'from-blue-500 to-blue-600'
  },
  { 
    icon: MessageSquare, 
    title: 'Support Rapide', 
    desc: 'Réponse garantie en moins de 24h pour toutes vos questions.',
    gradient: 'from-green-500 to-green-600'
  },
  { 
    icon: Rocket, 
    title: 'Conseil Carrière', 
    desc: 'Orientation professionnelle pour transformer vos compétences en opportunités.',
    gradient: 'from-purple-500 to-purple-600'
  },
]

const faqs = [
  { q: 'Comment puis-je m\'inscrire à un cours?', a: 'Choisissez votre cours, cliquez sur "S\'inscrire" et suivez les étapes. Vous aurez un accès immédiat au contenu.' },
  { q: 'Puis-je commencer en tant que débutant complet?', a: 'Absolument! Nos cours sont conçus pour tous les niveaux, avec des parcours spécialement adaptés aux débutants.' },
  { q: 'Est-ce que je reçois un certificat?', a: 'Oui, vous recevez un certificat de réussite après avoir complété 100% du cours et validé les exercices.' },
  { q: 'Quelle est la durée des cours?', a: 'Cela varie selon les cours (8h à 40h en moyenne). Vous apprenez à votre rythme avec un accès à vie.' },
  { q: 'Puis-je contacter mon instructeur?', a: 'Oui, vous avez accès à une communauté d\'entraide et pouvez poser vos questions directement.' },
]

const socialLinks = [
  { name: 'Facebook', url: '#', color: 'hover:bg-blue-600', icon: '📘' },
  { name: 'Instagram', url: '#', color: 'hover:bg-pink-600', icon: '📷' },
  { name: 'LinkedIn', url: '#', color: 'hover:bg-blue-700', icon: '💼' },
  { name: 'YouTube', url: '#', color: 'hover:bg-red-600', icon: '▶️' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-[500px]" style={{ background: 'linear-gradient(135deg, #F7FFF9 0%, #ECFBF3 100%)' }}>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-0 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-60 left-1/4 w-3 h-3 bg-green-400/40 rounded-full"></div>
          <div className="absolute top-96 right-1/3 w-2 h-2 bg-yellow-400/60 rounded-full"></div>
          <div className="absolute bottom-40 left-1/3 w-4 h-4 bg-green-300/30 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-green-200/50 shadow-sm">
                <MessageSquare className="text-green-600" size={16} />
                <span className="text-sm font-semibold text-gray-700">Contactez-Nous</span>
              </div>

              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
                Construisons Votre <span className="text-green-500">Avenir</span> Ensemble
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Nous sommes là pour répondre à vos questions et vous aider à démarrer 
                votre parcours d'apprentissage.
              </p>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-green-200/50 to-green-300/30 rounded-[3rem] blur-2xl"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/10 border-8 border-white/50 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" 
                  alt="Student learning"
                  className="w-full h-[350px] object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/60 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-400/40 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION CARDS */}
      <section className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <div 
                key={i}
                className="group relative bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="absolute top-6 right-6 w-8 h-8 bg-green-100/50 rounded-full"></div>
                
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <info.icon size={28} />
                </div>
                
                <p className="text-sm text-gray-500 mb-2">{info.title}</p>
                <p className="font-bold text-gray-900">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM & MAP */}
      <section className="relative py-16 md:py-24" style={{ background: 'linear-gradient(135deg, #F7FFF9 0%, #ECFBF3 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-green-200/40 rounded-full blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-200/50">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>

                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <Send className="text-green-600" size={40} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">Message envoyé!</p>
                    <p className="text-gray-600">Merci, nous revenons vers vous très vite.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                        <input 
                          required 
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all" 
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                        <input 
                          required 
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all" 
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input 
                          type="email" 
                          required 
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all" 
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                        <input 
                          type="tel" 
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all" 
                          placeholder="+216 00 000 000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sujet</label>
                      <input 
                        required 
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all" 
                        placeholder="En quoi pouvons-nous vous aider?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                      <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all">
                        {topics.map((topic) => (
                          <option key={topic}>{topic}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                      <textarea 
                        required 
                        rows={5} 
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none resize-none transition-all" 
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
                    >
                      <Send size={20} /> Envoyer le message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Google Map */}
            <div className="relative">
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-200/40 rounded-full blur-2xl"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102876.14837315726!2d10.099570499999999!3d36.8064948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Academy Location"
                ></iframe>
              </div>
              <div className="absolute top-8 right-8 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                <MapPin size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CONTACT US */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi nous contacter?
            </h2>
            <p className="text-xl text-gray-600">
              Notre équipe est à votre écoute pour vous accompagner dans votre réussite
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>

                <div className="absolute top-8 right-8 w-20 h-20 bg-green-100/30 rounded-full blur-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative py-16 md:py-24" style={{ background: 'linear-gradient(135deg, #F7FFF9 0%, #ECFBF3 100%)' }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p className="text-xl text-gray-600">Trouvez rapidement des réponses à vos questions</p>
          </div>

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
                  <span className="font-semibold text-lg text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown 
                    className={`text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} 
                    size={24} 
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
        </div>
      </section>

      {/* SOCIAL MEDIA */}
      <section className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Suivez-nous sur les réseaux sociaux</h2>
            <p className="text-gray-600">Rejoignez notre communauté et restez connectés</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                className={`group w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl ${social.color} hover:text-white shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300`}
                aria-label={social.name}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' }}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/40 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400/60 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Prêt à Commencer Votre Parcours d'Apprentissage?
              </h2>
              
              <p className="text-xl text-green-50 leading-relaxed">
                Rejoignez plus de 5,000 étudiants qui transforment leur avenir grâce à nos cours 
                en mathématiques, programmation et robotique.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/courses"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-green-600 font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300"
                >
                  Explorer les cours <ArrowRight size={22} />
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 rounded-[3rem] blur-2xl"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/20 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                  alt="Students learning online"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400/60 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
