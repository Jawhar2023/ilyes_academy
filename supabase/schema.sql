-- Ilyes Academy — Supabase schema
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query)

-- 1. Profiles (extends auth.users with a role)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'student' check (role in ('admin', 'student')),
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), 'student');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Courses
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text not null check (category in ('mathematiques', 'programmation', 'robotique')),
  level text not null default 'debutant' check (level in ('debutant', 'intermediaire', 'avance')),
  duration_hours numeric not null default 0,
  lectures_count int not null default 0,
  price numeric not null default 0,
  is_free boolean not null default false,
  image_url text,
  instructor_name text not null default 'Ilyes Academy',
  rating numeric not null default 4.8,
  students_count int not null default 0,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

-- 3. Enrollments (which student is registered in which course)
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  progress numeric not null default 0,
  created_at timestamptz not null default now(),
  unique (student_id, course_id)
);

-- 4. Blog posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null default '',
  category text not null default '',
  image_url text,
  author_name text not null default 'Ilyes Academy',
  created_at timestamptz not null default now()
);

-- ── Row Level Security ─────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.blog_posts enable row level security;

-- Profiles: everyone can read their own profile; admins can read all
create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles: admins read all" on public.profiles
  for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);

-- Courses: public read, admin write
create policy "courses: public read" on public.courses
  for select using (true);
create policy "courses: admin insert" on public.courses
  for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "courses: admin update" on public.courses
  for update using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "courses: admin delete" on public.courses
  for delete using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Enrollments: a student manages their own; admin reads all (for the client counter)
create policy "enrollments: own read" on public.enrollments
  for select using (auth.uid() = student_id);
create policy "enrollments: admin read all" on public.enrollments
  for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "enrollments: own insert" on public.enrollments
  for insert with check (auth.uid() = student_id);
create policy "enrollments: own update" on public.enrollments
  for update using (auth.uid() = student_id);

-- Blog: public read, admin write
create policy "blog: public read" on public.blog_posts
  for select using (true);
create policy "blog: admin write" on public.blog_posts
  for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ── Make yourself an admin ─────────────────────────────────────
-- After you sign up once through the app's /register page, run this
-- (replace the email) to promote that account to admin:
--
-- update public.profiles set role = 'admin'
-- where id = (select id from auth.users where email = 'ilyes@example.com');

-- ── Seed a few sample courses (optional) ───────────────────────
insert into public.courses (title, description, category, level, duration_hours, lectures_count, price, is_free, instructor_name, rating, students_count)
values
  ('Algèbre & Fonctions — Niveau Lycée', 'Maîtriser les fonctions, équations et systèmes avec des exercices corrigés pas à pas.', 'mathematiques', 'intermediaire', 12, 24, 89, false, 'Prof. Ilyes Bouzid', 4.9, 132),
  ('Géométrie Dans l''Espace', 'Vecteurs, plans et solides : construire une intuition spatiale solide pour le bac.', 'mathematiques', 'avance', 9, 18, 0, true, 'Prof. Ilyes Bouzid', 4.7, 88),
  ('Python pour Débutants', 'Les bases de la programmation avec des mini-projets concrets, sans prérequis.', 'programmation', 'debutant', 15, 30, 99, false, 'Prof. Sami Trabelsi', 4.9, 241),
  ('Développement Web — React & TypeScript', 'Construire de vraies applications web modernes, composant par composant.', 'programmation', 'intermediaire', 20, 36, 149, false, 'Prof. Sami Trabelsi', 4.8, 176),
  ('Robotique — Premiers Pas avec Arduino', 'Capteurs, moteurs et code : assembler et programmer son premier robot.', 'robotique', 'debutant', 14, 22, 129, false, 'Prof. Mounir Haddad', 4.9, 154),
  ('Robotique Avancée — Vision & IA Embarquée', 'Intégrer caméra et intelligence artificielle sur un robot autonome.', 'robotique', 'avance', 18, 28, 189, false, 'Prof. Mounir Haddad', 4.8, 62)
on conflict do nothing;
