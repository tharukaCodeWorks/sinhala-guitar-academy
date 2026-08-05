# `src/` structure

This app is a **static, content-driven SPA** — there is no backend, no
database, and no auth/accounts planned for v1. All content (chords, chord
families, songs, tabs, etc.) is expected to live as static data/assets
bundled with the app.

- `components/` — reusable, presentational UI building blocks shared across
  pages (buttons, cards, layout shell, etc.). Should not know about routing
  or page-specific state.
- `pages/` — one component per route, wired up in `App.tsx` via
  `react-router-dom`. Pages compose `components/` and read from `data/`.
- `data/` — static content (e.g. chord definitions, song lists, chord
  families) as plain TS/JSON modules. No network calls — this is the "content
  layer" for the app.
- `lib/` — framework-agnostic helper/utility functions (e.g. music theory
  helpers, formatting, transposition logic) that don't belong to a specific
  component or page.

Keep this structure flat and conventional so future features (chord library,
capo tool, fingering practice, tab display, strumming practice, etc.) can
slot in without restructuring.
