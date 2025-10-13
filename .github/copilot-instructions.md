## Project snapshot for AI coding agents

This file gives focused, actionable guidance for automated coding agents working on the FitChrono React + Vite + TypeScript app.

Basics
- Repo: Vite + React + TypeScript app using Tailwind and shadcn/ui components.
- Entry: `src/main.tsx` (registers PWA, configures AWS Amplify via VITE_* env vars).
- Routes: `src/routes/index.tsx` (React Router v7 style, protected routes are gated by local `isAuthenticated` state).
- State: global state uses `zustand` in `src/store/useStore.ts`.

Build & dev
- Use the project npm scripts from `package.json`:
  - `npm install`
  - `npm run dev` (Vite dev server, default port overridden to 3001 in `vite.config.ts`)
  - `npm run build` (runs `tsc -b` then `vite build`)
  - `npm run preview` (preview built output)
- Environment: Amplify/GraphQL and Cognito variables are expected as Vite env vars: `VITE_COGNITO_USER_POOL_ID`, `VITE_COGNITO_CLIENT_ID`, `VITE_REALTIME_API_ENDPOINT`.

Patterns & conventions (project-specific)
- Feature-first layout: features live under `src/features/<feature>/pages` and `components`.
  - Example pages: `src/features/dashboard/pages/CronometroPage.tsx`, `src/features/imc/pages/IMCPage.tsx`.
- UI primitives: `src/components/ui/*` contains shadcn-like primitives (Button, Input, Modal, Card).
- Layout: `src/components/layouts/Layout.tsx` composes `Header` and `Footer` and wraps pages.
- React Query: App is wrapped with a single `QueryClient` in `src/routes/index.tsx` — reuse this client for server-state.
- Routing guard: `isAuthenticated` boolean in `AppContent` gates protected routes. Agents should follow the same pattern when adding pages (follow Navigate to `/login`).
- IndexedDB helper: `src/lib/db.ts` provides `openDB`, `saveSong`, `getAllSongs` used by the music/playlist features — prefer these helpers for local audio storage.
- PWA: `src/lib/pwa.ts` registers a service worker (`/sw.js`) and exposes `installPWA()` and `registerSW()` — keep these calls in `src/main.tsx`.

Testing & lint
- No test runner present. Linting uses ESLint: `npm run lint`.
- Type checking runs as part of `npm run build` via `tsc -b` — maintain type correctness.

Integration & external services
- AWS Amplify is configured directly in `src/main.tsx`. For changes to auth/API wiring, update env vars and `Amplify.configure` patterns.
- Vercel deployment: README lists Vercel; build steps use the default Vite build. Ensure environment variables are set in Vercel.

Developer notes for agents
- Keep edits small and local: follow feature-first layout and put new components under the matching `src/features/<feature>/` folder.
- When adding routes, update `src/routes/index.tsx` and follow the `isAuthenticated` guard pattern.
- For UI consistency, reuse components from `src/components/ui/` and `src/components/layouts/` instead of creating new ones unless necessary.
- For audio/file storage features, prefer `src/lib/db.ts` to manage IndexedDB.
- Avoid changing build scripts or major dependency versions without explicit instruction.

Examples to cite in PR descriptions
- "Added X page under `src/features/<feature>/pages` and wired route in `src/routes/index.tsx`"
- "Used `useStore` (Zustand) in `src/store/useStore.ts` for small local state"
- "Persisted songs using `saveSong` from `src/lib/db.ts`"

If anything here is unclear or you'd like more depth on a specific area (auth, PWA, playlists, or state), tell me which piece and I will expand these instructions.
