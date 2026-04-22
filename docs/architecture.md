# MAC Architecture

## Overview
This repository is scaffolded as a monorepo for the MAC product foundation. The goal of the current implementation is not feature completeness, but a stable architectural baseline that matches the product spec and roadmap.

The scaffold prioritizes:

- shared package boundaries before feature depth
- one consistent design system across landing, dashboard, upload, and editor
- placeholder-first routes that preserve the final information architecture
- domain-owned types and defaults instead of page-local duplication

## Confirmed Product Defaults

- Auth: email magic link
- MVP chart types: `bar`, `line`, `area`, `scatter`, `donut`, `table`
- Save model: manual save only
- Visualization exposure: one primary visualization per project in the MVP UI
- Privacy: all projects private by default
- Sharing and publish: excluded from MVP
- Editor support: desktop-first

These defaults are reflected in both the code scaffold and the product spec so the repo has one active source of truth.

## How to Run

From the repository root in Windows PowerShell:

```powershell
npm.cmd install
npm.cmd run dev:web
```

Then open:

- `http://localhost:3000/`

Additional verification commands:

```powershell
npm.cmd run typecheck:web
npm.cmd run build:web
```

Note: `next build` may require elevated execution in restricted sandbox environments because Next.js can spawn worker processes during production builds.

## Monorepo Structure

```text
apps/
  web/        Next.js app router application shell and route placeholders
packages/
  ui/         shared primitives, shells, layout components, design tokens
  domain/     entity types, product defaults, basic validation helpers
  charts/     chart type catalog and placeholder visualization defaults
  data/       file intake constants and dataset preview placeholders
docs/
  product-spec.md
  roadmap.md
  architecture.md
```

## Package Responsibilities

### `apps/web`
- Owns the Next.js app router structure
- Wires route placeholders to shared UI and domain packages
- Holds app-local mock data used only to demonstrate layout and flow
- Owns Tailwind configuration and global CSS variables for the design system

### `packages/ui`
- Owns reusable product primitives and layout shells
- Exposes the shared visual language used by public and authenticated routes
- Defines token objects that mirror the CSS custom properties used by the web app

### `packages/domain`
- Owns product-level types, entity definitions, and resolved product defaults
- Keeps validation and shared contracts separate from framework code
- Serves as the canonical location for business-facing model definitions

### `packages/charts`
- Owns the supported chart type catalog for MVP
- Provides placeholder chart config factories so the editor scaffold has realistic structure
- Reserves the boundary where real rendering and config schemas will later live

### `packages/data`
- Owns upload-related constants and dataset preview contracts
- Reserves the boundary where CSV/XLSX parsing and normalization will later live

## Current Route Skeleton

The following routes exist as placeholders:

- `/`
- `/login`
- `/app/projects`
- `/app/projects/new`
- `/app/projects/[projectId]/upload`
- `/app/projects/[projectId]/editor`

Route intent:

- `/` uses `PublicShell` and acts as the marketing landing
- `/login` establishes the magic-link entry experience
- `/app/*` routes share `AppShell` for the authenticated product frame
- `/app/projects/[projectId]/editor` composes `EditorShell` inside the app frame

## Current Demo Scope

This is an executable product demo shell, not a feature-complete app. The current implementation includes:

- live Next.js route scaffolding
- shared layout shells
- shared design token baseline
- active navigation state
- refined placeholders for landing, login, projects, upload, and editor
- mock data for project cards and editor hydration shape

The following are still mocked:

- auth and session state
- project creation mutations
- upload handling
- dataset parsing
- chart rendering
- save persistence
- database-backed re-entry

## Shared UI Baseline

The scaffold currently includes:

- `PublicShell`
- `AppShell`
- `EditorShell`
- `TopBar`
- `Sidebar`
- `RightInspectorShell`
- `PageHeader`
- `EmptyState`
- `StatusBadge`
- `Button`
- `Input`
- `Card`

These components are intentionally lightweight and placeholder-friendly. They exist to stabilize page composition, spacing rhythm, and product language before real business logic is added.

## Design System Direction in Code

The active token families are:

- colors
- surfaces
- borders
- radius
- spacing
- typography
- shadow
- motion
- chart palette

Implementation notes:

- Tailwind is configured in `apps/web`
- semantic token values are exposed through CSS custom properties in `apps/web/src/app/globals.css`
- `packages/ui/src/tokens.ts` mirrors the same system for future package-level reuse
- the visual tone uses low-saturation neutrals, a warm editorial accent, thin borders, and restrained shadows

## Intentional Non-Goals in This Scaffold

The following are deliberately not implemented yet:

- real authentication integration
- real database or persistence
- real upload parsing
- real chart rendering
- real save behavior
- autosave
- sharing or publish flow

## Recommended Next Implementation Order

1. Wire a real auth/session layer using the magic-link contract.
2. Replace upload placeholders with a real CSV/XLSX intake boundary in `packages/data`.
3. Introduce chart schema and rendering contracts in `packages/charts`.
4. Add persistence and editor hydration using the domain contracts already defined.
5. Replace mock project data with API-backed project summaries.
