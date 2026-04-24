# MAC Design System

## Intent
The MAC interface should feel like a premium creative SaaS product, not a startup template and not a decorative concept piece. The visual system is designed to feel:

- refined
- editorial
- restrained
- product-grade
- calm under repeated use

## Core Principles

### One Product, Not Two
Landing, login, hub, upload, and editor must look like the same product viewed at different depths. Public pages should not switch to a louder visual language than the app.

### Surface Hierarchy Over Decoration
Structure comes from surface tone, spacing, and borders before it comes from shadow, radius, or gradients.

### Quiet Status Language
Save indicators, private-state badges, empty states, and placeholders should feel dependable and understated.

### Placeholder Quality Matters
Even mocked surfaces should look like believable product states. Placeholder blocks are part of the UX, not throwaway scaffolding.

## Token Families

### Color
- `canvas`: overall page ground
- `canvas-elevated`: subtle backdrop differentiation
- `surface-1` to `surface-4`: stacked UI surfaces
- `ink-1` to `ink-3`: primary, secondary, and tertiary text
- `line-subtle`, `line-strong`, `line-accent`: border hierarchy
- `accent`, `accent-soft`, `accent-strong`: restrained brand emphasis
- `success`, `warning`, `danger`, `info`: state colors

### Typography
- `display`: editorial serif used for high-emphasis product moments
- `sans`: all operational UI, dense surfaces, forms, and editor chrome
- named sizes:
  - `hero`
  - `display`
  - `title-1`
  - `title-2`
  - `body`
  - `caption`

### Radius
- keep radii restrained
- default product surfaces use `sm` or `md`
- `lg` and `xl` are reserved for major shells, never sprayed across every component

### Shadow
- shadows should support separation, not advertise themselves
- `soft`: common cards and controls
- `panel`: major shells only
- `inset`: restrained inner polish for secondary surfaces

### Chart Palette
The default chart palette should harmonize with the UI and avoid loud dashboard colors. It should support muted editorial compositions before custom theming exists.

## Component Rules

### Buttons
- `primary`: decisive product actions
- `secondary`: strong but lower-emphasis actions
- `tertiary`: structured utility actions
- `ghost`: low-emphasis navigation or contextual actions

### Cards
- `default`: standard product container
- `subtle`: quieter secondary surface
- `canvas`: major presentation surface
- `ghost`: content grouping without visible container emphasis

### Inputs
- labels and hint text are part of the component contract
- focus state should rely on border and ring restraint, not glow-heavy treatments

### Badges and Status
- badges should communicate state, never dominate layout
- use dots only when live or save state needs quicker scanning

### Page Headers
- page headers establish scene and hierarchy
- the title should carry editorial confidence while actions remain operational

## Layout Rules

### Public Shell
- generous horizontal breathing room
- sticky top frame
- large type, minimal clutter

### App Shell
- stable sidebar
- clearly separated top bar
- content area uses subtle wash, not flat white

### Editor Shell
- left: stable project and chart context
- center: dominant preview canvas
- right: inspector and system controls
- desktop-first hierarchy is explicit

## State Design Rules

### Empty States
- should explain the next meaningful action
- must feel intentionally designed, not like debug placeholders

### Loading States
- use structured skeleton rhythm, not random gray bars
- preserve the final layout shape while content is missing

### Save and Draft States
- use understated status indicators
- emphasize trust and clarity over alert-like urgency

## UI Package Structure

```text
packages/ui/src/
  components/
    primitives/
    compositions/
    feedback/
    navigation/
    shells/
  tokens.ts
```

### Layering Guidance
- `primitives`: low-level reusable controls and containers
- `compositions`: reusable assembled patterns such as section headers, chart placeholders, and preview tables
- `feedback`: states and status treatments
- `navigation`: app framing pieces
- `shells`: top-level layout scaffolds

## Current Limits
The current system is still a demo shell. It does not yet include:

- production loading choreography
- full form field family
- dropdowns, menus, modal patterns, or tables beyond preview scope
- final editor control widgets
