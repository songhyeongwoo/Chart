# MAC(Make a Chart)

MAC is the product foundation repository for a no-code data visualization web app inspired by the editing flow and output quality of tools like Flourish.

The repository now includes an executable monorepo scaffold for a refined, placeholder-first product demo shell built with Next.js, TypeScript, and Tailwind CSS.

## Current Foundation Docs

- [Product Spec](/C:/Users/A/Documents/Playground/docs/product-spec.md)
- [Roadmap](/C:/Users/A/Documents/Playground/docs/roadmap.md)
- [Architecture](/C:/Users/A/Documents/Playground/docs/architecture.md)
- [Design System](/C:/Users/A/Documents/Playground/docs/design-system.md)

## Run Locally

Use Windows PowerShell with `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev:web
```

Open [http://localhost:3000](http://localhost:3000).

Helpful verification commands:

```powershell
npm.cmd run typecheck:web
npm.cmd run build:web
```

## Product Direction

- Creative SaaS tone with a refined, minimal UI
- Consistent system across landing, dashboard, and editor
- Fast path from upload to first chart
- Project-based workflow with save and re-entry
- CSV/XLSX-first MVP with 4-6 core chart types

## Monorepo Layout

- `apps/web`: Next.js app shell and route placeholders
- `packages/ui`: shared design system primitives and shells
- `packages/domain`: source-of-truth types, defaults, and validation helpers
- `packages/charts`: chart catalog and placeholder config factories
- `packages/data`: upload constants and dataset preview scaffolds

## Current Demo Scope

- shared public/app/editor shells
- active navigation inside the app shell
- landing, login, projects, upload, and editor demo pages
- mock project data and editor session data
- design-token-based creative SaaS UI baseline
- reusable `primitives -> compositions -> shells` UI structure

Not implemented yet:

- real auth
- real DB/persistence
- real upload processing
- real chart rendering
- real save behavior

## UI System

- `primitives`: button, card, input
- `compositions`: section headers, metric strips, preview tables, chart placeholders
- `feedback`: badges, empty states, loading states
- `shells`: public, app, editor, inspector

The goal is not to make pages merely decorative. The goal is to make every mocked surface already feel like a credible product state.

## Suggested Next Build Order

1. Install dependencies and boot the web app locally.
2. Replace placeholder auth with a real magic-link session flow.
3. Add dataset upload and parsing contracts in `packages/data`.
4. Implement chart config and renderer boundaries in `packages/charts`.
5. Wire save and editor hydration using `packages/domain` contracts.
