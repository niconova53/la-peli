# La Peli — Project guidance for AI agents

## Project overview
"La Peli" is a movies front-end web app (React + TypeScript + Parcel v1 + Tailwind v1) that
fetches data from The Movie Database (TMDB) v3 API and is served as a static site on GitHub Pages.

## Commands (run from repo root)
- `npm install --legacy-peer-deps` — install dependencies (legacy peer-dep resolution is required;
  the current tree has an eslint 5.x / eslint-config-prettier 8.x peer conflict).
- `npm run dev` — local dev server via Parcel.
- `npm run build` — production build to `build/release` (public-url `./`).
- `npm run lint` — ESLint (note: script includes `--fix`).
- `npx tsc --noEmit` — TypeScript typecheck.
- `npm run deploy` — publish `build/release` to GitHub Pages (gh-pages branch).

## Environment / secrets
- Secrets live in `.env` (gitignored). Do NOT commit `.env`.
- Required variables:
  - `API_TOKEN` — TMDB v4 access token (JWT), sent as `Authorization: Bearer <token>`.
  - `API_URL` — `https://api.themoviedb.org/`.
  - `API_IMG_URL` — `https://image.tmdb.org/t/p/` (base; consumers append e.g. `w300`, `original`).
- Parcel v1 inlines `process.env.*` references at build time; it only replaces vars present in `.env`.
  A missing var therefore becomes `undefined` in the bundle — never hardcode the token in source.

## Codebase notes
- `src/constants/index.ts` — exposes `API_TOKEN`, `API_URL`, `API_IMG_URL`.
- `src/services/instance.ts` — shared axios instance; sets `baseURL` and the `Authorization` header.
- `src/services/moviesAPI.ts` — TMDB endpoint wrappers (now_playing, upcoming, movie by id,
  reviews, genres, discover by genre, search). Endpoints use the `/3/...` paths with NO query-string
  api_key (auth is via Bearer header).
- `tailwind.config.js` — Tailwind v1 (postcss7-compat); Stitch/Stripe design tokens in `theme.extend`.

## Workflow rules
- Always run lint, TypeScript typecheck, and build after any change.
- Never commit secrets or `.env`.
- Keep TMDB auth via the Bearer header; do not reintroduce `api_key=` query params.