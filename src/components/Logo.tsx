import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'

export default function Logo({ to = '/' }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2 shrink-0 group">
      <span className="relative w-12 h-12 flex items-center justify-center text-(--color-blue)">
        <BookOpen size={46} strokeWidth={1.8} />
      </span>
      <span className="font-display font-extrabold text-3xl tracking-tight text-(--color-text)">
        Ilyes <span className="text-(--color-blue-light)">Academy</span>
      </span>
    </Link>
  )
}
