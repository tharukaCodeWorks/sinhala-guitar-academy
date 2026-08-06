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

Live at [guitar-master.heytharuka.online](https://guitar-master.heytharuka.online).

Deployment is release-triggered via GitHub Actions
(`.github/workflows/deploy.yml`). Publishing a new GitHub Release builds the
app and rsyncs `dist/` to `/var/www/sinhala-guitar-academy/dist/` on the
server, served by an nginx block dedicated to this site (SPA fallback to
`index.html` for client-side routing, `/assets/` cached 30d immutable).

To ship a new version:

```bash
gh release create v1.2.3 --generate-notes
```

`vercel.json` is also still present as a static-hosting config in case this
ever needs to move to Vercel instead — it isn't used by the current deploy
path.
