# La Peli 🎬

Descubre películas en cartelera, próximos estrenos y búsqueda por género o título. Datos en vivo de [TMDB](https://www.themoviedb.org/).

**Demo:** https://niconova53.github.io/la-peli/  
**Autor:** [Nicolas Novacovich](https://www.linkedin.com/in/nicolas-novacovich-002211173/)

---

## Tecnologías

| Capa | Stack |
|------|-------|
| UI | React 17 + TypeScript (strict) |
| Bundler | Parcel 1 (build/release, public-url ./ ) |
| Estilos | Tailwind CSS 2 (postcss7-compat), Plus Jakarta Sans (global), Material Symbols Outlined |
| Datos | Axios + TMDB API v3 (`language=es-ES`), `translate` (Google gtx) |
| Forms | Formik + Yup |
| Routing | React Router DOM 5 |
| Deploy | gh-pages → GitHub Pages |

---

## Buenas prácticas aplicadas

**Código**
- TypeScript `strict`, `noEmit` limpio, path alias `~/*`
- ESLint (airbnb + prettier) — 0 errores
- Componentes funcionales + hooks (`useState`, `useEffect`, `useCallback`, `useParams`)
- Separación `constants / services / components / routes / layout`
- `aspectRatio: 2/3` inline (Tailwind v1 no genera `aspect-[2/3]`/`pt-[72px]` arbitrarios → fallback `style`)

**Performance**
- `transform-gpu` + `transition-transform duration-300 ease-out` + `will-change: transform` solo en `transform` (zoom póster dentro de `overflow-hidden`, sin React state)
- Hero `minHeight: 560px` + `flex items-center` (no colapsa con overview corto)
- `scrollbar-gutter: stable` + `overflow-y: scroll` (header no salta entre pestañas)
- Tailwind `purge: []` + `scale: ["group-hover"]` para hover sin JS

**Traducción (reseñas)**
- `translate` (Google) solo para reseñas (overview viene traducido por TMDB `es-ES`)
- `localStorage` cache `la-peli-translate-cache-v2` — misma reseña no se retraduce
- Batching: traduce automáticamente solo las 5 visibles (`BATCH_SIZE=5`, 400ms delay), resto con *Ver más reseñas*
- Fallback silencioso en 429/quota (muestra original, sin spam en consola), slice 900 chars

**UX / A11y**
- Header `bg-background #0f172a` sólido + `paddingTop: 72px` offset, nav/lupa `text-white hover:text-primary`
- Badge *Estreno de la Semana* `bg-surface-card #1e293b` + `border rgba(255,255,255,0.10)` + `Plus Jakarta 11px`
- Fallback póster genérico (gradiente + ícono `movie` + título) con misma altura `aspectRatio`
- Footer `md:items-end` + `items-baseline`, link a LinkedIn
- Botón *Subir* circular `backdrop-blur` `rgba(139,92,246,0.22)` a `114px`
- `role="button"`, `tabIndex`, `onKeyDown` Enter/Espacio, `aria-label`

**Seguridad**
- `API_TOKEN` / `API_URL` / `API_IMG_URL` vía `process.env` — `.env` en `.gitignore`, sin secretos hardcodeados
- `target="_blank" rel="noopener noreferrer"` en links externos
- `localStorage` try/catch (quota/storage bloqueado)
- `axios` con `Bearer` solo si existe token, `language=es-ES` por defecto

**Deploy / Calidad**
- `npm run lint` + `npx tsc --noEmit` + `npm run build` verificados antes de cada push
- `gh-pages -d build/release` — demo siempre en `master`
- Sin tests unitarios (pendiente) — validado con lint + TSC + build + smoke manual

---

## Scripts

```bash
npm install
npm run dev      # parcel src/index.html --out-dir build/debug
npm run build    # parcel build src/index.html --out-dir build/release --public-url ./
npm run lint     # eslint src --ext .ts,.tsx,.js,.jsx --fix
npm run deploy   # gh-pages -d build/release
```

Variables `.env`:

```
API_TOKEN=eyJ...
API_URL=https://api.themoviedb.org/
API_IMG_URL=https://image.tmdb.org/t/p/
```

---

## Estructura

```
src/
  components/Card, layout/Header|Body|Footer, forms/
  routes/CurrentMovies, MovieSelected, Genres, GenreSelected, ComingSoon, SearchMovie
  services/moviesAPI, instance, translate
  constants/index.ts  # GENRE_MAP + GENRE_ICON_MAP
  tailwindcss.css     # Plus Jakarta global + scrollbar-gutter
```

## Licencia

MIT — Nicolas Novacovich · [LinkedIn](https://www.linkedin.com/in/nicolas-novacovich-002211173/)
