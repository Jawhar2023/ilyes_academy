import { useState } from 'react'
import { 
  CalendarDays, Clock, Eye, Heart, ArrowRight, TrendingUp,
  Sparkles, Mail
} from 'lucide-react'
import Layout from '../components/Layout'

// Demo blog articles
const demoArticles = [
  // Mathematics
  { id: 1, category: 'Mathématiques', title: 'Maîtriser l\'Algèbre en 30 Jours', excerpt: 'Un guide complet pour comprendre les bases de l\'algèbre avec des méthodes simples et efficaces.', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-15', readTime: 8, views: 1250, likes: 89, featured: true },
  { id: 2, category: 'Mathématiques', title: 'Comprendre les Fonctions Facilement', excerpt: 'Les fonctions mathématiques expliquées avec des exemples concrets et visuels.', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-12', readTime: 6, views: 980, likes: 67 },
  { id: 3, category: 'Mathématiques', title: 'Astuces de Géométrie pour Étudiants', excerpt: 'Découvrez les techniques qui vous feront gagner du temps en géométrie.', image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-10', readTime: 7, views: 1100, likes: 75 },
  { id: 4, category: 'Mathématiques', title: 'Calcul pour Débutants', excerpt: 'Apprenez les fondamentaux du calcul différentiel et intégral.', image: 'https://images.unsplash.com/photo-1611318782875-347ecb3e544e?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-08', readTime: 10, views: 1450, likes: 102 },
  
  // Programming
  { id: 5, category: 'Programmation', title: 'Python pour Débutants Complets', excerpt: 'Commencez votre voyage en programmation avec Python, le langage le plus accessible.', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-14', readTime: 12, views: 2100, likes: 145, trending: true },
  { id: 6, category: 'Programmation', title: 'Créer Votre Premier Site Web', excerpt: 'Guide étape par étape pour construire un site web professionnel avec HTML, CSS et JavaScript.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-11', readTime: 15, views: 1850, likes: 128 },
  { id: 7, category: 'Programmation', title: 'JavaScript Étape par Étape', excerpt: 'Maîtrisez JavaScript moderne avec des exemples pratiques et des projets réels.', image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-09', readTime: 11, views: 1650, likes: 112 },
  { id: 8, category: 'Programmation', title: 'React - Meilleures Pratiques', excerpt: 'Les patterns et techniques que chaque développeur React devrait connaître.', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-07', readTime: 9, views: 1320, likes: 95 },
  
  // Robotics
  { id: 9, category: 'Robotique', title: 'Construire Votre Premier Robot Arduino', excerpt: 'Apprenez à assembler et programmer un robot fonctionnel avec Arduino.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-13', readTime: 14, views: 1750, likes: 118, trending: true },
  { id: 10, category: 'Robotique', title: 'Introduction à la Robotique', excerpt: 'Les concepts fondamentaux de la robotique moderne expliqués simplement.', image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-06', readTime: 8, views: 1420, likes: 98 },
  { id: 11, category: 'Robotique', title: 'Capteurs Essentiels pour Débutants', excerpt: 'Découvrez les capteurs les plus utilisés en robotique et comment les programmer.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-05', readTime: 10, views: 1280, likes: 87 },
  { id: 12, category: 'Robotique', title: 'Robotique avec Intelligence Artificielle', excerpt: 'Intégrez l\'IA dans vos projets robotiques pour des comportements intelligents.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80', author: 'Ilyes Chahed', date: '2025-03-04', readTime: 13, views: 1560, likes: 105 },
]

const categories = ['Tous', 'Mathématiques', 'Programmation', 'Robotique']
const tags = ['Python', 'JavaScript', 'React', 'Arduino', 'Robotique', 'IA', 'Calcul', 'Algèbre', 'Géométrie', 'Algorithmes', 'HTML', 'CSS', 'Électronique', 'Programmation', 'Mathématiques']

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const featuredArticle = demoArticles.find(a => a.featured) || demoArticles[0]
  const trendingArticles = demoArticles.filter(a => a.trending)
  const filteredArticles = selectedCategory === 'Tous' 
    ? demoArticles.filter(a => !a.featured)
    : demoArticles.filter(a => a.category === selectedCategory)

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
                <Sparkles className="text-green-600" size={16} />
                <span className="text-sm font-semibold text-gray-700">Blog & Ressources</span>
              </div>

              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
                Découvrez des Articles qui Vous Aident à <span className="text-green-500">Apprendre Plus Vite</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Explorez nos guides pratiques en mathématiques, programmation et robotique. 
                Des conseils d'experts pour accélérer votre apprentissage.
              </p>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-green-200/50 to-green-300/30 rounded-[3rem] blur-2xl"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/10 border-8 border-white/50 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80" 
                  alt="Student reading articles"
                  className="w-full h-[350px] object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/60 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-400/40 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-green-500" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Article en vedette</h2>
          </div>

          <article className="group relative bg-gradient-to-br from-green-50 to-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image */}
              <div className="relative h-[400px] lg:h-auto overflow-hidden">
                <img 
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-green-600 font-semibold text-sm shadow-lg">
                  ⭐ Featured
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm w-fit mb-4">
                  {featuredArticle.category}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredArticle.title}
                </h3>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>{new Date(featuredArticle.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{featuredArticle.readTime} min de lecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>{featuredArticle.views.toLocaleString()} vues</span>
                  </div>
                </div>

                <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 w-fit">
                  Lire l'article <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="relative py-12" style={{ background: 'linear-gradient(135deg, #F7FFF9 0%, #ECFBF3 100%)' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:shadow-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'Tous' ? 'Tous les articles' : `Articles ${selectedCategory}`}
            </h2>
            <span className="text-gray-500">{filteredArticles.length} articles</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article 
                key={article.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 font-medium text-xs">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={14} />
                      <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{article.readTime} min</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-green-600 transition-colors">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Author & Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                        {article.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-medium text-gray-700">{article.author}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={14} />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING ARTICLES */}
      {trendingArticles.length > 0 && (
        <section className="relative py-16 md:py-24" style={{ background: 'linear-gradient(135deg, #ECFBF3 0%, #F7FFF9 100%)' }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="text-green-500" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">Articles tendance</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {trendingArticles.map((article) => (
                <article 
                  key={article.id}
                  className="group relative rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-80">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
                    
                    {/* Trending Badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-yellow-400 text-gray-900 font-bold text-sm shadow-lg flex items-center gap-2">
                      <TrendingUp size={16} />
                      Tendance
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium text-sm mb-4">
                        {article.category}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                        {article.title}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-white/80">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          <span>{article.readTime} min</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Eye size={14} />
                          <span>{article.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* POPULAR TAGS */}
      <section className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tags populaires</h2>
          
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                className="px-5 py-2.5 rounded-full bg-gradient-to-br from-green-50 to-green-100/50 text-green-700 font-medium text-sm border border-green-200/50 hover:border-green-400 hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' }}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Mail className="text-white" size={18} />
                <span className="text-sm font-semibold">Newsletter</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Recevez nos derniers articles directement par email
              </h2>
              
              <p className="text-xl text-green-50 leading-relaxed">
                Restez informé des nouveaux articles, conseils d'apprentissage et ressources exclusives.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <input 
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors whitespace-nowrap">
                  S'abonner
                </button>
              </div>

              <p className="text-sm text-green-100">
                ✓ Pas de spam • Désabonnement facile • Articles de qualité
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 rounded-[3rem] blur-2xl"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/20 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                  alt="Newsletter illustration"
                  className="w-full h-[350px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
