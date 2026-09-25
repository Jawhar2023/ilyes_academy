# Ilyes Academy

Plateforme d'apprentissage — Mathématiques, Programmation, Robotique.
React + TypeScript + Tailwind CSS v4 + Supabase (auth + base de données).

## Ce qui est déjà fait

- Site public : Accueil, Cours (avec filtre par matière), Détail d'un cours, À propos, Blog, Contact
- Authentification élève : inscription / connexion (Supabase Auth)
- Espace élève (`/dashboard`) : liste des cours suivis
- Tableau de bord admin (`/admin`, protégé) :
  - Aperçu (nombre d'élèves, de cours, d'inscriptions, revenu estimé)
  - Gestion des cours : ajouter / supprimer un cours (mathématiques, programmation, robotique)
  - Liste des élèves inscrits ("clients")
- Design distinctif (voir `src/index.css`) : fond encre foncé, accent bleu électrique + ambre,
  grille type "circuit/maths" en fond — pas un thème générique.

## Démarrage

```bash
npm install
cp .env.example .env      # puis renseigner vos clés Supabase
npm run dev
```

## Configurer Supabase (obligatoire pour que l'app fonctionne)

1. Créez un projet sur supabase.com.
2. Dans Project Settings -> API, copiez `Project URL` et la clé `anon public`
   dans votre fichier `.env` :
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxxxxxx
   ```
3. Ouvrez SQL Editor dans Supabase, collez tout le contenu de
   `supabase/schema.sql` et exécutez-le. Cela crée :
   - `profiles` (avec un rôle `admin` ou `student`, créé automatiquement à l'inscription)
   - `courses`, `enrollments`, `blog_posts`
   - les règles de sécurité (Row Level Security)
   - quelques cours d'exemple en maths / programmation / robotique
4. Créer votre compte admin :
   - Allez sur le site, cliquez "S'inscrire" et créez un compte avec votre e-mail.
   - Retournez dans Supabase -> SQL Editor et lancez :
     ```sql
     update public.profiles set role = 'admin'
     where id = (select id from auth.users where email = 'votre-email@exemple.com');
     ```
   - Reconnectez-vous : vous arrivez automatiquement sur `/admin` au lieu de `/dashboard`.
5. Par défaut, Supabase demande une confirmation par e-mail à l'inscription.
   Pour les tests, vous pouvez désactiver ça dans Authentication -> Providers -> Email -> Confirm email.

## Le logo

Le logo actuel ("IA" dans un carré bleu) est un placeholder texte, en attendant votre vrai logo.
Une fois que vous l'avez, remplacez-le dans `src/components/Logo.tsx` par une balise `<img src="/logo.png" ... />`,
et déposez le fichier dans `public/logo.png`.

## Structure du projet

```
src/
  components/      Navbar, Footer, CourseCard, ProtectedRoute, Logo...
  context/          AuthContext (connexion / inscription / rôle)
  lib/supabase.ts   client Supabase
  pages/            Home, Login, Register, About, Contact, Courses, CourseDetails, Blog
  pages/admin/      AdminOverview, AdminCourses, AdminStudents (protégé, rôle = admin)
  pages/student/    StudentDashboard (protégé, rôle = student)
supabase/schema.sql  schéma complet + policies + données d'exemple
```

## Déploiement

`npm run build` génère un dossier `dist/` prêt à déployer (Vercel, Netlify, ou tout hébergeur statique).
Pensez à définir les variables d'environnement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
sur la plateforme d'hébergement.
