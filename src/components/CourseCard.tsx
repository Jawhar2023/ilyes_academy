import { Link } from 'react-router-dom'
import { Clock, PlayCircle, Star } from 'lucide-react'
import type { Course } from '../types'

const categoryLabel: Record<string, string> = {
  mathematiques: 'Mathématiques',
  programmation: 'Programmation',
  robotique: 'Robotique',
}

const categoryColor: Record<string, string> = {
  mathematiques: 'text-(--color-blue-light) border-(--color-blue)/40 bg-(--color-blue)/10',
  programmation: 'text-(--color-mint) border-(--color-mint)/40 bg-(--color-mint)/10',
  robotique: 'text-(--color-amber) border-(--color-amber)/40 bg-(--color-amber)/10',
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className={`group flex flex-col rounded-xl border border-(--color-line) border-t-4 ${course.category === 'programmation' ? 'border-t-[#4778e8]' : course.category === 'robotique' ? 'border-t-[#8156d8]' : 'border-t-(--color-blue)'} bg-white overflow-hidden hover:border-(--color-blue-light) hover:shadow-blue transition-all`}
    >
      <div className="h-52 relative soft-grid bg-(--color-surface-2) flex items-center justify-center overflow-hidden">
        {course.image_url ? (
          <img src={course.image_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <span className="font-display text-4xl font-bold text-(--color-line) group-hover:text-(--color-blue)/50 transition-colors">
            {categoryLabel[course.category]?.slice(0, 2).toUpperCase()}
          </span>
        )}
        <span className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-md border ${categoryColor[course.category]}`}>
          {categoryLabel[course.category] ?? course.category}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 text-xs text-(--color-muted)"><span className="w-7 h-7 rounded-full bg-(--color-surface-2) flex items-center justify-center font-bold text-(--color-blue)">{course.instructor_name.slice(0, 1)}</span>{course.instructor_name}<span className="ml-auto text-(--color-amber)"><Star size={13} fill="currentColor" /> {course.rating}</span></div>
        <h3 className="font-display font-semibold text-base leading-snug line-clamp-2 group-hover:text-(--color-blue-light) transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-(--color-muted) line-clamp-2">{course.description}</p>

        <div className="flex items-center gap-4 text-xs text-(--color-muted) mt-1">
          <span className="flex items-center gap-1"><Clock size={13} /> {course.duration_hours}h</span>
          <span className="flex items-center gap-1"><PlayCircle size={13} /> {course.lectures_count} leçons</span>
          <span className="flex items-center gap-1 text-(--color-amber)"><Star size={13} fill="currentColor" /> {course.rating}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-(--color-line)">
          <span className="text-xs text-(--color-muted)">{course.instructor_name}</span>
          <span className="font-display font-semibold text-(--color-text)">
            {course.is_free ? 'Gratuit' : `${course.price} DT`}
          </span>
        </div>
      </div>
    </Link>
  )
}
