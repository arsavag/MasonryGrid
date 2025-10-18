# MasonryGrid

A small React + Vite project that displays photos in a masonry-style grid with infinite scroll.

## Features
- Masonry-style photo grid
- Infinite scroll
- Debounced search
- Route-level ErrorBoundary to isolate route render errors
- Simple, testable layout

## Quick start (macOS / Linux)
1. Install dependencies
```bash
npm install
```

2. Run development server
```bash
npm run dev
# open http://localhost:5173 (port shown by Vite)
```

3. Build & preview
```bash
npm run build
npm run preview
```

## Scripts
- `npm run dev` — start dev server with HMR
- `npm run build` — produce production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint

(If your repo contains a `deploy` script, use it to publish. Otherwise configure your CI/CD or hosting service.)

## Project structure
- src/
  - pages/ — route pages (GridPage, PhotoPage, etc.)
  - hooks/ — custom hooks (loading, infinite scroll)
  - components/ — reusable components (masonry items)
  - ErrorBoundary.tsx — typed error boundary used across app
  - RouteBoundary.tsx — single boundary that wraps all routes (remounts on navigation)
  - main.tsx / App.tsx — app entry and router setup
