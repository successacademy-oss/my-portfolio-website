# Success Academy Tech — Portfolio & Services Platform

Next.js (App Router) + Firebase scaffold for the Success Academy Tech brief.
This is a real, working starting point — not a mockup — but it's a scaffold:
the core architecture, security pattern, homepage, projects, services,
contact flow, and admin login + project CRUD are fully built. A few admin
screens (services, inquiries) are stubbed with step-by-step instructions
that copy the exact pattern already proven in the projects admin page.

## What's fully working
- Public pages: Home, Projects (with category filter), Project detail
  (with live-preview iframe + fallback), Services, Contact (4-step
  WhatsApp/email inquiry flow), About
- Light/dark mode toggle, responsive layout, premium navy/gold/teal theme
- Firebase Auth admin login
- Admin dashboard: full Projects CRUD (add/edit-via-PATCH/delete/feature),
  calling server routes that independently re-verify the admin's identity
- Firestore + Storage security rules that block all client-side writes —
  every write goes through server API routes using the Firebase Admin SDK
- Public inquiry submission (`/api/inquiries`) that only allows `create`,
  never read/update/delete, enforced in `firestore.rules`

## What you still need to wire up (same pattern, different collection)
- `/api/admin/services` + `/api/admin/inquiries` routes — copy
  `src/app/api/admin/projects/route.js` and `[id]/route.js`
- Admin Services and Inquiries management UI — copy
  `src/app/admin/dashboard/projects/page.js`
- Image upload to Firebase Storage from the admin form (currently takes a
  pasted URL; swap in `uploadBytes` from `firebase/storage` plus an
  Admin-SDK-backed `/api/admin/upload` route if you want direct uploads)
- `settings/site` document + admin form for homepage stats, bio, business
  hours, and social links (read helper already exists in `src/lib/data.js`)
- SEO extras: `sitemap.js`, `robots.js`, custom 404 (`not-found.js`),
  privacy policy / terms pages — standard Next.js App Router files

## Why it's secure
The admin "login" in the browser only decides what the UI shows. The real
boundary is: (1) `firestore.rules` / `storage.rules` reject every direct
client write, and (2) every `/api/admin/*` route calls
`verifyAdminRequest()`, which re-verifies the Firebase ID token on the
server and checks it against `ADMIN_UID` — a value that only lives in a
server-side environment variable, never in client code.

## Setup

1. **Create a Firebase project** at https://console.firebase.google.com
   - Enable **Authentication → Email/Password**, then add yourself as a user
   - Enable **Firestore Database** (production mode)
   - Enable **Storage**
   - Copy your Web app config (Project Settings → General → Your apps)
   - Generate an Admin SDK key (Project Settings → Service accounts →
     Generate new private key)
   - Copy your new user's UID (Authentication → Users)

2. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in all values from step 1, including `ADMIN_UID`.

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Deploy security rules** (requires the Firebase CLI)
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init firestore storage   # point at this project, keep existing rules files
   firebase deploy --only firestore:rules,storage:rules
   ```

5. **Run locally**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000. Go to `/admin/login` and sign in with the
   user you created in step 1.

6. **Seed initial content**
   Use the admin dashboard's "Add Project" form once logged in. For
   services, either build the admin Services UI (see above) or add
   documents directly in the Firestore console under a `services`
   collection with fields: `name`, `group`, `summary`, `startingPrice`,
   `hasFixedPrice`, `order`.

7. **Deploy**
   Recommended: [Vercel](https://vercel.com) (built by the Next.js team —
   `vercel` CLI or connect the GitHub repo). Add the same environment
   variables from `.env.local` in the Vercel project settings. Any
   Node-compatible host works too (Netlify, Firebase App Hosting, a VPS).

## Project structure
```
src/
  lib/firebase.js         client SDK init (public config)
  lib/firebaseAdmin.js    server-only Admin SDK + verifyAdminRequest()
  lib/data.js             public Firestore read helpers
  context/AuthContext.js  client auth state + authedFetch()
  components/             Navbar, Footer, ThemeToggle, ProjectCard, ServiceCard, AdminGate
  app/                    App Router pages (public + /admin + /api)
firestore.rules           Firestore security rules
storage.rules             Storage security rules
.env.example              required environment variables, documented
```
