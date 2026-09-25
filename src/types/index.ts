export type Category = 'mathematiques' | 'programmation' | 'robotique'

export interface Course {
  id: string
  title: string
  description: string
  category: Category
  level: 'debutant' | 'intermediaire' | 'avance'
  duration_hours: number
  lectures_count: number
  price: number
  is_free: boolean
  image_url: string | null
  instructor_name: string
  rating: number
  students_count: number
  created_at: string
}

export interface Profile {
  id: string
  full_name: string
  role: 'admin' | 'student'
  avatar_url: string | null
  created_at: string
}

export interface Enrollment {
  id: string
  student_id: string
  course_id: string
  progress: number
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  image_url: string | null
  author_name: string
  created_at: string
}
