import { 
  Sigma, Code2, Bot, Target, Users, Sparkles, Award, 
  BookOpen, Heart, Lightbulb, Zap, ArrowRight,
  CheckCircle2, TrendingUp, Clock, Star
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import founderImage from '../assetss/ilyes.jpg'

export default function About() {
  return (
    <Layout>
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden min-h-[600px]" style={{ background: 'linear-gradient(135deg, #F7FFF9 0%, #ECFBF3 100%)' }}>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-0 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-60 left-1/4 w-3 h-3 bg-green-400/40 rounded-full"></div>
          <div className="absolute top-96 right-1/3 w-2 h-2 bg-yellow-400/60 rounded-full"></div>
          <div className="absolute bottom-40 left-1/3 w-4 h-4 bg-green-300/30 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-green-200/20 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-green-200/50 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-700">About Our Academy</span>
            </div>

            {/* Title */}
            <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight">
              Building The <span className="text-green-500">Future</span> Generation
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Nous formons la prochaine génération de créateurs, penseurs et innovateurs 
              à travers des cours interactifs en mathématiques, programmation et robotique.
            </p>

            {/* Hero Image */}
            <div className="relative max-w-4xl mx-auto mt-16">
              <div className="absolute -inset-6 bg-gradient-to-br from-green-200/50 to-green-300/30 rounded-[3rem] blur-2xl"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/10 border-8 border-white/50 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
                  alt="Students learning together"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/60 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-400/40 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FOUNDER */}
      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F7FFF9 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Founder Photo */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 bg-gradient-to-br from-green-200/60 to-green-300/40 rounded-[3rem] blur-3xl"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src={founderImage}
                  alt="Ilyes Chahed - Founder"
                  className="w-full h-[600px] object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-400/50 rounded-full blur-2xl"></div>
              <div className="absolute top-10 -left-10 w-24 h-24 bg-green-400/40 rounded-full blur-xl"></div>
            </div>

            {/* Founder Bio */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <Award className="text-green-600" size={16} />
                <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">Le Fondateur</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Ilyes Chahed
              </h2>

              <p className="text-lg text-green-600 font-semibold">
                Expert en Éducation & Technologies
              </p>

              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  Passionné par l'enseignement et l'innovation pédagogique depuis plus de 10 ans, 
                  j'ai créé Ilyes Academy avec une vision claire : rendre l'apprentissage des 
                  mathématiques, de la programmation et de la robotique accessible à tous.
                </p>
                <p>
                  Diplômé en ingénierie informatique et fort d'une expérience internationale, 
                  je crois fermement que chaque étudiant possède un potentiel unique qui ne demande 
                  qu'à être révélé par les bonnes méthodes et le bon accompagnement.
                </p>
                <p>
                  Notre académie ne se contente pas de transmettre des connaissances : 
                  nous formons des esprits créatifs, critiques et prêts à relever les défis de demain.
                </p>
              </div>

              {/* Signature */}
              <div className="pt-8">
                <p className="text-3xl font-bold text-green-600 italic" style={{ fontFamily: 'cursive' }}>
                  Ilyes Chahed
                </p>
                <p className="text-sm text-gray-500 mt-2">Fondateur & Directeur Pédagogique</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4: MISSION & VISION */}
      <section className="relative overflow-hidden py-20" style={{ background: 'linear-gradient(135deg, #F7FFF9 0%, #ECFBF3 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-0 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-green-400 to-green-600 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-[2.5rem] p-10 md:p-12 shadow-xl border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-green-500/30">
                  <Target size={32} />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Notre Mission</h3>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Démocratiser l'accès à une éducation de qualité en mathématiques, programmation et robotique. 
                  Nous croyons que chaque étudiant mérite les meilleures ressources pour développer ses compétences 
                  et réaliser son plein potentiel, peu importe son point de départ.
                </p>

                {/* Decorative circles */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-green-100/50 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-[2.5rem] p-10 md:p-12 shadow-xl border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-yellow-500/30">
                  <Lightbulb size={32} />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Notre Vision</h3>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Devenir la référence de l'enseignement moderne en combinant pédagogie innovante et technologies. 
                  Nous imaginons un futur où chaque apprenant devient créateur, capable de transformer ses idées 
                  en projets concrets et de contribuer positivement au monde qui l'entoure.
                </p>

                {/* Decorative circles */}
                <div className="absolute bottom-10 left-10 w-20 h-20 bg-yellow-100/50 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE US */}
      <section className="relative py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-6">
              <Sparkles className="text-green-600" size={16} />
              <span className="text-sm font-semibold text-green-700">Pourquoi Nous Choisir</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ce qui nous rend <span className="text-green-500">unique</span>
            </h2>
            <p className="text-xl text-gray-600">
              Des avantages concrets pour une expérience d'apprentissage exceptionnelle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Instructeurs Experts', desc: 'Formateurs qualifiés et passionnés avec des années d\'expérience', color: 'from-blue-500 to-blue-600' },
              { icon: Zap, title: 'Leçons Interactives', desc: 'Cours dynamiques avec exercices pratiques et feedback en temps réel', color: 'from-purple-500 to-purple-600' },
              { icon: BookOpen, title: 'Projets Pratiques', desc: 'Construisez de vrais projets pour consolider vos compétences', color: 'from-green-500 to-green-600' },
              { icon: TrendingUp, title: 'Curriculum Moderne', desc: 'Contenu actualisé régulièrement selon les dernières tendances', color: 'from-orange-500 to-orange-600' },
              { icon: Clock, title: 'Accès À Vie', desc: 'Apprenez à votre rythme avec un accès illimité aux contenus', color: 'from-pink-500 to-pink-600' },
              { icon: Heart, title: 'Support Communauté', desc: 'Rejoignez une communauté active prête à vous aider', color: 'from-red-500 to-red-600' },
            ].map((feature, i) => (
              <div 
                key={i}
                className="group bg-white rounded-2xl p-8 border border-gray-200/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} />
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={20} />
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR NUMBERS */}
      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #F7FFF9 0%, #ECFBF3 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos chiffres parlent d'eux-mêmes
            </h2>
            <p className="text-xl text-gray-600">
              Des résultats concrets qui témoignent de notre impact
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '5,000+', label: 'Étudiants Formés', icon: Users, color: 'from-green-500 to-green-600' },
              { number: '150+', label: 'Cours Disponibles', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
              { number: '98%', label: 'Taux de Réussite', icon: Award, color: 'from-purple-500 to-purple-600' },
              { number: '20+', label: 'Experts Mentors', icon: Users, color: 'from-orange-500 to-orange-600' },
            ].map((stat, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={32} />
                </div>
                <p className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">{stat.number}</p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: LEARNING PROCESS */}
      <section className="relative py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Notre processus d'apprentissage
            </h2>
            <p className="text-xl text-gray-600">
              Un parcours structuré en 4 étapes pour garantir votre succès
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500"></div>

            {[
              { step: '01', title: 'Apprendre', icon: BookOpen, desc: 'Cours structurés avec théorie claire et exemples concrets' },
              { step: '02', title: 'Pratiquer', icon: Target, desc: 'Exercices guidés pour renforcer vos connaissances' },
              { step: '03', title: 'Construire', icon: Code2, desc: 'Projets réels pour mettre en pratique vos compétences' },
              { step: '04', title: 'Exceller', icon: Award, desc: 'Devenir expert avec certificat et portfolio' },
            ].map((process, i) => (
              <div key={i} className="relative">
                {/* Step Circle */}
                <div className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-2xl shadow-green-500/30 border-8 border-white">
                  <process.icon size={36} />
                </div>
                
                {/* Step Number */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-green-600 font-bold text-sm shadow-lg z-20">
                  {process.step}
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{process.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{process.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: SUBJECTS */}
      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #F7FFF9 0%, #ECFBF3 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos domaines d'expertise
            </h2>
            <p className="text-xl text-gray-600">
              Trois piliers pour construire votre avenir
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Mathématiques', 
                icon: Sigma, 
                desc: 'Du collège au bac, une progression pensée pour construire une intuition durable des concepts.',
                gradient: 'from-blue-500 to-blue-600',
                bg: 'bg-blue-50',
                image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80'
              },
              { 
                title: 'Programmation', 
                icon: Code2, 
                desc: 'Python, web, algorithmique : apprendre en écrivant du vrai code, dès les premières séances.',
                gradient: 'from-green-500 to-green-600',
                bg: 'bg-green-50',
                image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80'
              },
              { 
                title: 'Robotique', 
                icon: Bot, 
                desc: 'De l\'électronique de base jusqu\'à l\'IA embarquée, en assemblant des robots réels.',
                gradient: 'from-purple-500 to-purple-600',
                bg: 'bg-purple-50',
                image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80'
              },
            ].map((subject, i) => (
              <div 
                key={i}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={subject.image} 
                    alt={subject.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className={`absolute top-6 left-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center text-white shadow-2xl`}>
                    <subject.icon size={32} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{subject.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{subject.desc}</p>
                  
                  <Link 
                    to={`/courses?category=${subject.title.toLowerCase()}`}
                    className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-4 transition-all"
                  >
                    Explorer les cours <ArrowRight size={18} />
                  </Link>
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-200/30 rounded-full blur-2xl group-hover:bg-green-300/40 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: TESTIMONIALS */}
      <section className="relative py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-6">
              <Star className="text-green-600 fill-green-600" size={16} />
              <span className="text-sm font-semibold text-green-700">Témoignages</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ce que disent nos étudiants
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sara Ben Ali', role: 'Étudiante en Programmation', avatar: '👩‍💻', comment: 'Les cours sont incroyables! J\'ai appris Python en seulement 3 mois et j\'ai créé mon premier projet. Les instructeurs sont toujours là pour aider.', rating: 5 },
              { name: 'Mohamed Trabelsi', role: 'Passionné de Robotique', avatar: '🤖', comment: 'Une expérience transformatrice. J\'ai construit mon propre robot et participé à une compétition. Merci Ilyes Academy!', rating: 5 },
              { name: 'Amira Gharbi', role: 'Étudiante en Maths', avatar: '📐', comment: 'Les mathématiques sont devenues ma matière préférée grâce aux méthodes innovantes d\'enseignement. Je recommande à 100%!', rating: 5 },
            ].map((testimonial, i) => (
              <div 
                key={i}
                className="bg-gradient-to-br from-green-50 to-white backdrop-blur-sm rounded-2xl p-8 border border-green-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.comment}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-3xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: CALL TO ACTION */}
      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' }}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/40 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400/60 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-white/30 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Prêt à transformer votre avenir?
              </h2>
              
              <p className="text-xl text-green-50 leading-relaxed max-w-xl">
                Rejoignez plus de 5,000 étudiants qui ont déjà commencé leur parcours vers l'excellence. 
                Commencez votre apprentissage dès aujourd'hui!
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/courses"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-green-600 font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300"
                >
                  Explorer les cours <ArrowRight size={22} />
                </Link>
                
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300"
                >
                  Nous contacter
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 rounded-[3rem] blur-2xl"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/20 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
                  alt="Students celebrating success"
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
