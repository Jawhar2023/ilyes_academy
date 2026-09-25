import { useEffect, useMemo, useState } from 'react'
import { BookOpen, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Category, Course } from '../types'
import { demoCourses } from '../lib/courseData'
import CourseCard from '../components/CourseCard'
import Layout from '../components/Layout'

const filters: { key: Category | 'all'; label: string }[] = [
  { key: 'all', label: 'All Courses' },
  { key: 'mathematiques', label: 'Mathematiques' },
  { key: 'programmation', label: 'Programmation' },
  { key: 'robotique', label: 'Robotique' },
]

export default function Courses() {
  const [params, setParams] = useSearchParams()
  const [serverCourses, setServerCourses] = useState<Course[]>([])
  const [search, setSearch] = useState('')
  const active = (params.get('category') as Category | null) ?? 'all'

  useEffect(() => {
    supabase.from('courses').select('*').order('created_at', { ascending: false }).then(({ data }) => setServerCourses((data as Course[]) ?? []))
  }, [])

  const courses = useMemo(() => {
    const allCourses = [...serverCourses, ...demoCourses].filter((course, index, all) => all.findIndex((item) => item.id === course.id) === index)
    return allCourses.filter((course) => active === 'all' || course.category === active).filter((course) => `${course.title} ${course.description}`.toLowerCase().includes(search.toLowerCase()))
  }, [active, search, serverCourses])

  return (
    <Layout>
      <section className="relative overflow-hidden bg-[#eefaf2] border-b border-(--color-line)">
        <div className="absolute -left-20 -bottom-28 w-72 h-72 rounded-full border border-(--color-blue)/30" /><div className="absolute right-[-3rem] top-[-5rem] w-72 h-72 rounded-full border border-(--color-blue)/30" />
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-24 grid md:grid-cols-2 items-center gap-10">
          <div><div className="flex items-center gap-2 text-sm text-(--color-muted)"><span>Home</span><span>//</span><span className="text-(--color-blue)">Courses</span></div><h1 className="font-display font-medium text-5xl md:text-6xl text-[#102b46] mt-6">My <span className="text-(--color-blue)">Courses</span></h1><p className="text-(--color-muted) leading-relaxed max-w-md mt-5">Build a bright future with practical courses designed for curious minds.</p></div>
          <div className="relative hidden md:flex min-h-[340px] items-end justify-center"><div className="absolute right-5 top-4 w-72 h-72 rounded-full bg-[#d4efdd]" /><div className="absolute right-20 top-14 w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-blue bg-[#f2e9dd]"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85" alt="Ilyes Academy instructor" className="w-full h-full object-cover object-top" /></div><div className="absolute left-6 bottom-5 w-36 h-36 rounded-full bg-(--color-blue) text-white flex flex-col items-center justify-center shadow-blue"><BookOpen size={30} /><span className="font-display font-bold text-2xl mt-2">38</span><span className="text-xs">courses</span></div></div>
        </div>
      </section>
      <main className="relative overflow-hidden border-t border-[#d7f0df]" style={{ background: 'radial-gradient(circle at 6% 18%, rgba(184,239,207,.46), transparent 25%), radial-gradient(circle at 94% 72%, rgba(184,239,207,.4), transparent 28%), radial-gradient(circle at 50% 48%, rgba(255,255,255,.9), transparent 52%), linear-gradient(135deg, #f5fff8 0%, #eafbf3 100%)' }}>
        <div className="absolute -left-28 top-24 w-80 h-80 rounded-[48%] bg-[#ddf7e7]/70 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-6rem] top-12 w-96 h-96 rounded-full border border-(--color-blue)/15" aria-hidden="true" />
        <div className="absolute right-24 bottom-24 w-52 h-52 rounded-full bg-white/35 blur-2xl" aria-hidden="true" />
        <div className="absolute left-8 bottom-20 w-40 h-40 rounded-[45%] border border-(--color-blue)/20 rotate-12" aria-hidden="true" />
        <div className="absolute right-10 top-32 flex gap-2 rotate-[24deg]" aria-hidden="true"><span className="w-2 h-7 rounded-full bg-[#f6b000]" /><span className="w-2 h-5 rounded-full bg-[#f6b000] mt-3" /><span className="w-2 h-7 rounded-full bg-[#f6b000]" /></div>
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8"><div><p className="text-sm font-semibold text-(--color-blue) mb-2">Explore Ilyes Academy</p><h2 className="font-display font-medium text-3xl text-[#102b46]">Find the right course for you</h2></div><div className="flex items-center gap-3"><label className="flex items-center gap-2 rounded-lg border border-(--color-line) bg-white px-4 py-3 text-sm text-(--color-muted) shadow-sm"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your course" className="w-48 outline-none" /></label><button className="hidden sm:flex items-center gap-2 rounded-lg border border-(--color-line) px-4 py-3 text-sm font-medium"><SlidersHorizontal size={16} /> Filter</button></div></div>
        <div className="flex flex-wrap items-center gap-3 rounded-xl bg-[#eefaf2] p-4 mb-10">{filters.map((filter) => <button key={filter.key} onClick={() => setParams(filter.key === 'all' ? {} : { category: filter.key })} className={`rounded-md px-5 py-3 text-sm font-medium border ${active === filter.key ? 'bg-(--color-blue) border-(--color-blue) text-white shadow-sm' : 'bg-white border-white text-(--color-text) hover:border-(--color-blue)'}`}>{filter.label}</button>)}<span className="ml-auto text-sm text-(--color-muted)">{courses.length} courses found</span></div>
        {courses.length > 0 ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{courses.map((course) => <CourseCard key={course.id} course={course} />)}</div> : <div className="py-24 text-center border border-dashed border-(--color-line) rounded-xl"><Search size={28} className="mx-auto text-(--color-muted)" /><p className="font-display font-semibold mt-4">No courses found</p><p className="text-sm text-(--color-muted) mt-2">Try another subject or search term.</p></div>}
        <div className="flex justify-center mt-12"><button className="inline-flex items-center gap-2 rounded-lg border border-(--color-blue) px-6 py-3 text-sm font-semibold text-(--color-blue)">Load more courses <ChevronRight size={16} /></button></div>
        </div>
      </main>
    </Layout>
  )
}