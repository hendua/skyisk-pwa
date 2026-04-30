# Skyisk MVP Agent Guide

Skyisk is an Angular PWA for aviation readiness practice.

## Product Scope

- Keep the MVP flow focused: Landing -> Topics -> Quiz -> Result.
- Do not add auth, dashboards, instructor tools, admin panels, payments, or backend features unless explicitly requested.
- Build mobile-first screens that feel simple, fast, and focused for aviation interview and readiness practice.
- Use Angular Material for UI controls and surfaces.

## Angular Guidance

- Follow current Angular best practices and syntax for this project version.
- Use standalone components and lazy-loaded routes.
- Keep small page components inline when that keeps the code easier to read.
- Prefer signals and `computed()` for local component state and derived state.
- Prefer `inject()` for dependency injection in new code.
- Use native Angular control flow (`@if`, `@for`, `@switch`) in new templates.
- Use strict TypeScript types; avoid `any`.
- Keep services minimal and focused. Do not create a service until it has a clear responsibility.
- Use `ChangeDetectionStrategy.OnPush` for new components when practical.

## UI Guidelines

- Design mobile-first with a centered content width around 430px for page flows.
- Use Angular Material cards, buttons, progress indicators, and form controls where appropriate.
- Keep styling clean and scoped to components.
- Use camelCase CSS class names.
- Keep spacing generous but compact enough for mobile quiz flows.
- Maintain a soft, aviation-readiness visual tone rather than a dashboard or enterprise layout.

## Code Quality

- Keep changes tightly scoped to the requested feature.
- Do not introduce unnecessary abstractions or broad refactors.
- Preserve the existing app structure unless there is a clear reason to change it.
- Run `npm run build` before committing feature work.
- Use clear commit messages, preferably in this style:
  `[skyisk-mvp] type: summary`
