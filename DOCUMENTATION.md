# Portfolio Project Documentation

## Overview

This repository is a single-page React portfolio built with Vite and Tailwind. It includes an admin-only edit mode gated by serverless authentication (Vercel Functions). The live site: https://portfolio-steel-mu-92.vercel.app/

---

## Purpose

- Showcase portfolio content (projects, about, contact) in a fast SPA.
- Provide a lightweight admin flow so the owner can toggle edit mode locally.
- Deploy to Vercel for free hosting with serverless endpoints for simple authentication.

---

## Key Files

- `index.html` — root HTML and Vite entry script reference.
- `src/index.jsx` — React entry point (renders `<App />`).
- `src/App.jsx` — main application file: UI, admin login modal, edit mode, and local persistence.
- `src/index.css` — Tailwind and project styles.
- `vite.config.js` — Vite config using `@vitejs/plugin-react`.
- `package.json` — scripts and dependencies.
- `api/login.js` — Vercel serverless function: verifies admin credentials (env vars) and returns HMAC-signed token.
- `api/verify.js` — verifies token HMAC and returns validity.
- `README.md` — project README (public link, notes).

---

## Technologies and Roles

- React: UI library powering components and state.
- Vite: Development server and build tool (fast HMR, bundling).
- Tailwind CSS: Utility-first styling.
- Vercel Serverless Functions: Small backend endpoints (`/api/login`, `/api/verify`) for authentication.
- HMAC tokens: Lightweight stateless token signing using `AUTH_SECRET`.
- Git/GitHub: Source control and optional CI (Vercel auto-deploys on push if linked).

---

## High-level Flow

1. Developer runs locally:

   ```bash
   npm install
   npm run dev
   # open http://localhost:5173
   ```

   Vite serves the app with HMR. Fix any local errors reported by Vite before pushing.

2. Client usage (public visitor):
   - Views portfolio content rendered by `src/App.jsx`.
   - Admin button is visible; clicking it opens the login modal (no automatic blocking for viewers).

3. Admin login and edit flow:
   - Admin enters username/password in the modal.
   - Client POSTs to `/api/login` with credentials.
   - `api/login.js` checks credentials against environment variables `ADMIN_USER` and `ADMIN_PASSWORD` and uses `AUTH_SECRET` to sign a token (HMAC).
   - On success, client stores token in `localStorage` (`admin_token`) and calls `/api/verify?token=...` to validate.
   - When verified, the UI sets `isAuthed=true` and allows toggling edit mode. Edits are currently stored in `localStorage` (client-side only).

4. Deployment and hosting (Vercel):
   - Option A: Link GitHub repo to Vercel. Push to `main` → Vercel builds automatically.
   - Option B: From local machine run `npx vercel --prod --yes` to create a production deployment.
   - Ensure required env vars are set in Vercel Project Settings: `ADMIN_USER`, `ADMIN_PASSWORD`, `AUTH_SECRET`.

---

## `src/App.jsx` — What it contains

- Top-level React state for portfolio data and UI modes (`isAuthed`, `isEdit`, `showLogin`).
- Admin UI: fixed `Admin` button; login modal with username/password fields.
- Login handling: sends credentials to `/api/login`, handles response token, saves to `localStorage`.
- Verification: requests `/api/verify?token=...` to confirm token validity.
- Edit mode: toggled only if authenticated; changes saved to `localStorage` so they persist in the browser.
- Sections: renders portfolio sections such as About, Projects, Contact. Each section uses React controlled inputs when in edit mode.

---

## Serverless functions

### `api/login.js`

- Reads `ADMIN_USER`, `ADMIN_PASSWORD`, `AUTH_SECRET` from environment.
- Verifies provided credentials match the env values.
- Creates a token payload (e.g., username + expiry) and signs it with HMAC using `AUTH_SECRET`.
- Returns `{ ok: true, token }` on success or an error code on failure.

### `api/verify.js`

- Accepts `token` (query param or body).
- Verifies HMAC signature matches recomputed HMAC using `AUTH_SECRET`.
- Returns `{ ok: true }` on valid tokens.

Security note: Both functions rely entirely on the secrecy of `AUTH_SECRET`.

---

## Build & Deployment Steps (detailed)

1. Install dependencies locally:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
# Open http://localhost:5173 (or shown URL)
```

3. Build for production:

```bash
npm run build
# Optional: preview build locally
npm run preview
```

4. Configure Vercel project:
   - In Vercel Dashboard, add the project (import from GitHub or use `npx vercel` to create).
   - Under Project Settings -> Environment Variables add:
     - `ADMIN_USER` — your admin username
     - `ADMIN_PASSWORD` — your admin password
     - `AUTH_SECRET` — strong random secret (used for HMAC)

5. Deploy via Vercel CLI (or push to GitHub if linked):

```bash
npx vercel --prod --yes
```

6. Verify deployment by visiting the aliased URL (e.g., `https://portfolio-steel-mu-92.vercel.app`).

---

## Troubleshooting

- Build error: `Failed to parse source for import analysis` — usually caused by JSX in `.js` files. Solution: rename files to `.jsx` or ensure Vite has `@vitejs/plugin-react` enabled.
- 500 on `/api/login` or `/api/verify` — ensure `ADMIN_USER`, `ADMIN_PASSWORD`, `AUTH_SECRET` are set in Vercel.
- Token failing verify — ensure the `AUTH_SECRET` used during login and verify are identical (both read env vars).
- Not seeing latest deploy — check Vercel Dashboard for build logs and aliasing; clear browser cache.

---

## Security & Best Practices

- Never commit secrets to repo. Use Vercel environment variables.
- Revoke any leaked PATs immediately.
- For production edit/save, implement server-side persistence (database or commit to a protected branch via GitHub API with proper auth), not `localStorage`.
- Consider stronger auth flows (OAuth, Vercel-protected routes) for multi-user or public editing.

---

## Suggested Improvements

- Persist edits server-side (DB or GitHub commits via an authenticated server function).
- Replace custom HMAC token flow with a standard session or OAuth provider for better security and auditability.
- Add unit tests and ESLint/Prettier checks in CI (Vercel or GitHub Actions).
- Add a small docs site or README summary inside `DOCUMENTATION.md` (this file).

---

## How to explain this to someone new

1. Start with `npm install` and `npm run dev` — show the app and HMR.
2. Open `src/App.jsx` and point out main states and how the login modal triggers API calls.
3. Show `api/login.js` and `api/verify.js` to explain stateless authentication with HMAC.
4. Demonstrate one deploy to Vercel using `npx vercel --prod` and show environment variables in the Vercel Project Settings.
5. Explain security risks with committing secrets and why env vars and Vercel functions are used.

---

## Contact / Next steps

If you want, I can:
- Commit this `DOCUMENTATION.md` into the repository and push it.
- Generate a short slide or one-page cheat-sheet for interviews.
- Convert this to `README.md` or `docs/ONBOARDING.md` and add references to specific lines in `src/App.jsx` and serverless functions.

---

*File generated: `DOCUMENTATION.md` in project root.*
