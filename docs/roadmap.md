# MAC Roadmap

## 1. Product Roadmap Overview

### Objective
Ship MAC as a premium no-code data visualization product with a reliable end-to-end flow from upload to saved editor re-entry.

### Delivery Philosophy

- build the shell and system first
- ship one complete flow before adding breadth
- favor chart quality and editing clarity over feature count
- keep product and design system aligned from the first implementation phase

## 2. Phase 0: Foundation

### Goal
Establish the repository, product definitions, module boundaries, and shared design language so feature work does not fragment.

### Deliverables

- product spec approved
- roadmap approved
- repository structure defined
- design token strategy defined
- shared app shell concept defined
- domain entities and API surface documented

### Exit Criteria

- product scope is stable enough to start implementation
- screen hierarchy is locked for landing, projects, upload, and editor
- unresolved decisions are reduced to a short tracked list

## 3. Phase 1: Core MVP

### Goal
Ship the first usable product loop for individual users.

### Deliverables

- email authentication
- project creation and project hub
- CSV/XLSX upload with preview
- field type inference
- 4-6 core chart types
- editor shell with live preview
- right-side inspector
- manual save
- saved-state re-entry

### Execution Order
1. App shell and route scaffolding
2. Auth and session guard
3. Project hub and create-project flow
4. Upload pipeline and dataset preview
5. Base chart renderer and chart defaults
6. Editor state model
7. Inspector controls
8. Save and re-entry

### Exit Criteria

- a new user can complete the primary flow without admin intervention
- upload-to-first-chart is reliable for normal CSV/XLSX files
- a saved project reopens with the same dataset and config

## 4. Phase 2: Workflow Quality

### Goal
Reduce friction, improve trust, and smooth the editing experience.

### Deliverables

- background autosave assist or improved save signaling
- undo/redo
- stronger upload validation and error recovery
- chart presets and better empty states
- polished loading, error, and success feedback
- editor performance tuning for larger datasets

### Exit Criteria

- users trust persistence behavior
- editor feels stable during repeated changes
- common upload edge cases are handled without dead ends

## 5. Phase 3: Sharing and Growth

### Goal
Make created visualizations distributable and easier to reuse.

### Deliverables

- read-only share link
- export image or SVG
- publish flow
- template gallery

### Exit Criteria

- users can send or export chart results without internal tooling
- templates accelerate repeated chart creation

## 6. Phase 4: Team and Connected Data

### Goal
Expand from individual use into collaborative and connected workflows.

### Deliverables

- multi-member workspaces
- roles and permissions
- Google Sheets or URL import
- refresh and resync model for connected data

### Exit Criteria

- a project can belong to a shared workspace safely
- connected data refresh is understandable and recoverable

## 7. Engineering Milestones

### Milestone A: Architecture Baseline

- repo structure exists for `web`, `ui`, `domain`, `charts`, and `data`
- core types are shared, not duplicated per feature
- route boundaries and server/client responsibilities are documented

### Milestone B: Schema Freeze for MVP

- project, dataset, visualization, and save contracts are stable
- chart config schema versioning strategy exists

### Milestone C: UI System Stabilization

- core tokens implemented
- primary layouts implemented
- reusable primitives exist for inputs, panels, lists, empty states, and status indicators

### Milestone D: Beta Readiness

- primary flow works end-to-end
- analytics events exist for key activation steps
- obvious UX blockers are resolved

### Milestone E: Launch Readiness

- onboarding and recovery flows are polished
- operational errors are observable
- basic support and feedback loops are prepared

## 8. Risk Register

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Chart rendering complexity | Visual quality and config flexibility can explode scope | Start with a small chart set and a normalized config contract |
| Config schema drift | Editor, preview, and persistence can diverge | Define a shared `VisualizationConfig` schema early |
| File parsing edge cases | CSV/XLSX input quality varies widely | Build explicit validation and preview steps before the editor |
| Workspace complexity creep | Team features can distort MVP | Keep MVP on personal workspaces and design extension points only |
| Inconsistent design language | Landing and app can feel like separate products | Build shared tokens and shells before page-by-page feature styling |
| Save-state confusion | Users lose trust quickly if save is unclear | Make manual save explicit and visibly separate dirty vs saved states |

## 9. Exit Criteria by Phase

### Phase 0
- Product source-of-truth docs exist
- repo/module structure is clear
- key open decisions are tracked

### Phase 1
- end-to-end user flow works
- users can save and reopen projects
- chart output is visually acceptable without custom theming

### Phase 2
- persistence behavior feels trustworthy
- edge-case handling is materially better
- editor usability improves for repeated work

### Phase 3
- charts can be shared or exported cleanly
- reusable output flows exist

### Phase 4
- team access works safely
- connected data is manageable without manual file upload each time

## 10. Suggested Work Breakdown for Implementation

### Workstream 1: Shell and System

- repo scaffolding
- routing baseline
- app shell and navigation
- design tokens
- shared UI primitives

### Workstream 2: Domain and Persistence

- entity models
- schema validation
- project and visualization persistence contracts
- upload job lifecycle

### Workstream 3: Upload and Data Prep

- CSV/XLSX intake
- parser abstraction
- preview generation
- field inference

### Workstream 4: Editor and Charts

- chart renderer abstraction
- chart defaults
- live preview
- inspector control mapping
- save serialization

### Workstream 5: Product Quality

- loading and empty states
- recovery states
- analytics
- performance tuning

## 11. Immediate Next Actions

1. Lock the remaining product decisions that affect architecture.
2. Scaffold the repo around shared packages before building feature pages.
3. Implement the design token layer and app shell before editor-specific UI.
4. Deliver the full project -> upload -> editor -> save -> re-entry loop before adding sharing or collaboration.
