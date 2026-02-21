# Number Ninja

Number Ninja is a small, fast-paced browser game built with Next.js and Tailwind CSS. Players answer arithmetic questions under time pressure; the app saves streaks and best scores to localStorage.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
npm start
```

## Project layout (key files)

- `app/` — Next.js App Router routes. `app/layout.tsx` imports global CSS.
- `components/` — UI and interactive components: `GameContainer.tsx`, `TimerBar.tsx`, `EquationDisplay.tsx`, `OptionCard.tsx`.
- `lib/generateQuestion.ts` — question generator; returns the Question shape used by the game.
- `app/globals.css` and `styles/globals.css` — global styles containing Tailwind directives.
- `tailwind.config.js` and `postcss.config.mjs` — Tailwind and PostCSS configuration.

## Big-picture architecture

- Next.js App Router powers routing and SSR/static rendering. Interactive game UI is implemented as client components (they include "use client").
- `GameContainer.tsx` holds the game state and loop: streak, best, question, timerMs, expiryRef, and tick loop. It calls `generateQuestion()` to get each question object (expression, options, answer).
- Timer is implemented using an expiry timestamp plus a 50ms tick updating `now`. Percentage left is computed and passed to `TimerBar`.

## Styling & Tailwind notes

- Tailwind is used throughout. Global CSS files contain:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- PostCSS must use the PostCSS plugin package. If you see the error about using `tailwindcss` directly as a PostCSS plugin, ensure `@tailwindcss/postcss` is installed and `postcss.config.mjs` contains:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
}
```

## Project-specific conventions

- Client components: add `"use client"` at the top.
- Timer pattern: use `expiryRef` + `now` tick, and compute percent left with:

```ts
const pct = Math.max(0, Math.min(100, Math.round(((expiryRef.current - now) / timerMs) * 100)))
```

- Persistence keys in localStorage: `bestScore`, `lastScore`.
- When adding features, keep game state in `GameContainer` and presentational UI in component files.

## Developer workflows

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

- Note: there is a `test/number_ninja_v3` experimental subproject. If you work there, cd into that folder and run `npm install` before `npm run dev` — it maintains its own dependencies.

## Troubleshooting

- Missing component import errors: verify relative import paths from nested routes (use `../../components/...` when appropriate).
- Tailwind not building: verify `@tailwindcss/postcss` is present and `postcss.config.mjs` uses it.

## Notes for AI coding agents

- Inspect these files first: `app/layout.tsx`, `components/GameContainer.tsx`, `lib/generateQuestion.ts`, `tailwind.config.js`, `postcss.config.mjs`.
- Follow patterns already in the code: small focused components, game loop in `GameContainer`, timer via expiryRef/now.
- Be cautious editing timer/difficulty behavior — it lives in `GameContainer.tsx` (initial `timerMs` and optional difficulty reduction logic).

---

If you want, I can also add a `CONTRIBUTING.md` with a development checklist (how to reproduce build issues, run tests, and Tailwind troubleshooting steps).
