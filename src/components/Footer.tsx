import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#cfe9d7] bg-[#eaf9f0]">
      <div className="absolute left-12 top-10 w-20 h-28 opacity-80" aria-hidden="true"><span className="block w-2 h-6 bg-(--color-amber) rotate-[28deg] rounded-full ml-3" /><span className="block w-2 h-6 bg-(--color-amber) rotate-[28deg] rounded-full ml-10 -mt-3" /><span className="block w-2 h-6 bg-(--color-amber) rotate-[28deg] rounded-full ml-1 mt-2" /><span className="block w-2 h-6 bg-(--color-amber) rotate-[28deg] rounded-full ml-12 -mt-4" /></div>
      <div className="absolute right-12 bottom-16 w-24 h-16 rounded-[45%] bg-[#bfe2ca] rotate-[-12deg]" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-16 grid gap-12 md:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
        <div>
          <Logo />
          <h3 className="font-display font-semibold text-xl mt-7">Learn. Practice. Build.</h3>
          <p className="mt-3 text-sm text-(--color-muted) max-w-xs leading-relaxed">Des parcours pratiques pour apprendre les mathematiques, la programmation et la robotique avec confiance.</p>
          <div className="space-y-2 mt-6 text-sm text-(--color-muted)"><p className="flex items-center gap-2"><MapPin size={15} className="text-(--color-blue)" /> Tunis, Tunisie</p><p className="flex items-center gap-2"><Mail size={15} className="text-(--color-blue)" /> contact@ilyes-academy.tn</p><p className="flex items-center gap-2"><Phone size={15} className="text-(--color-blue)" /> +216 00 000 000</p></div>
          <div className="flex gap-4 mt-6 text-sm font-bold text-(--color-blue)"><span>f</span><span>tw</span><span>ig</span></div>
        </div>
        <div><h4 className="font-display font-bold text-lg mb-6">Category</h4><ul className="space-y-3 text-sm text-(--color-muted)"><li><Link to="/courses?category=mathematiques" className="hover:text-(--color-blue)">Mathematiques</Link></li><li><Link to="/courses?category=programmation" className="hover:text-(--color-blue)">Programmation</Link></li><li><Link to="/courses?category=robotique" className="hover:text-(--color-blue)">Robotique</Link></li><li><Link to="/courses" className="hover:text-(--color-blue)">Tous les cours</Link></li></ul></div>
        <div><h4 className="font-display font-bold text-lg mb-6">Quick Links</h4><ul className="space-y-3 text-sm text-(--color-muted)"><li><Link to="/about" className="hover:text-(--color-blue)">A propos</Link></li><li><Link to="/blog" className="hover:text-(--color-blue)">Blog</Link></li><li><Link to="/contact" className="hover:text-(--color-blue)">Contact</Link></li><li><Link to="/login" className="hover:text-(--color-blue)">Connexion</Link></li><li><Link to="/register" className="hover:text-(--color-blue)">Inscription</Link></li></ul></div>
        <div><h4 className="font-display font-bold text-lg mb-6">Subscribe</h4><p className="text-sm text-(--color-muted) leading-relaxed max-w-xs">Recevez les nouveaux cours, conseils et projets d’Ilyes Academy.</p><input type="email" placeholder="Email here" className="w-full bg-white border border-[#cfe9d7] rounded-lg px-4 py-3 text-sm mt-5 outline-none focus:border-(--color-blue)" /><button type="button" className="mt-3 rounded-lg bg-(--color-blue) text-white px-6 py-3 text-sm font-semibold hover:bg-(--color-blue-light)">Subscribe Now</button></div>
      </div>
      <div className="relative border-t border-[#cfe9d7] py-5"><p className="text-center text-xs text-(--color-muted)">© {new Date().getFullYear()} Ilyes Academy. Terms of Service · Privacy Policy · Sitemap</p></div>
    </footer>
  )
}