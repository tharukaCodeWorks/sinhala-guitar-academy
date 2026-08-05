# Sinhala Guitar Academy

A guitar learning app built around Sinhala songs — chords, chord families, capo usage,
fingering practice, tabbing, and strumming patterns.

This is a **static, content-driven single-page app**. There is no backend,
no database, and no auth/accounts planned for v1 — all content ships as
static data bundled with the frontend. See [`src/README.md`](./src/README.md)
for the folder structure conventions.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (v4, via `@tailwindcss/vite`) for styling
- [react-router-dom](https://reactrouter.com/) for client-side routing
- ESLint + Prettier for linting/formatting

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build locally
npm run lint      # run ESLint
npm run format    # format with Prettier
npm run format:check
```

## Deployment

This project deploys as a static site to **Vercel**, configured via
[`vercel.json`](./vercel.json):

- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`
- A catch-all rewrite (`/(.*) -> /index.html`) so client-side routes (via
  `react-router-dom`'s `BrowserRouter`) resolve correctly on refresh/direct
  navigation instead of 404ing.

To deploy, import this repository into Vercel (or run `vercel --prod` with
the Vercel CLI) — no additional configuration is required beyond what's in
`vercel.json`.
