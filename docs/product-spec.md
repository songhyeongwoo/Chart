# MAC Product Spec

## 1. Product Overview

### 1.1 Vision
MAC is a no-code data visualization web app for users who want to turn uploaded datasets into polished, presentation-ready charts without writing code. The product should feel creative and premium, but remain operationally clear and fast to use.

### 1.2 Problem Statement
Existing chart tools often split into two extremes:

- spreadsheet-like tools that are functional but visually generic
- design-heavy tools that look good but are harder to use repeatedly in production workflows

MAC should solve for both:

- low-friction upload and setup
- visually strong defaults
- direct manipulation through structured controls
- reliable save and re-entry for ongoing project work

### 1.3 Target Users

#### Primary
- solo creators
- marketers
- startup operators
- analysts who need polished visual output without engineering help

#### Secondary
- small teams that need shared project organization later
- agencies or studios building recurring visual stories for clients

### 1.4 Core Value Proposition

- Upload data quickly
- Produce a good-looking chart by default
- Refine the result through no-code controls
- Re-open work later without losing context

## 2. Product Principles

### 2.1 No-Code First
The product should never require scripting or config authoring for standard chart creation and styling.

### 2.2 Fast First Chart Time
The path from upload to first rendered chart should be short and obvious. The editor should initialize with a sensible default configuration rather than a blank state whenever possible.

### 2.3 One Consistent Workspace Language
Landing, auth, project hub, upload flow, and editor should feel like one system, not separate products. Typography, spacing, surfaces, borders, motion, and color logic should be shared.

### 2.4 Save-State Reliability
Users must be able to leave and re-enter a project with predictable restoration of dataset context, chart type, and visualization settings.

### 2.5 Elegant Defaults Over Feature Volume
For MVP, depth on a small number of chart types is more important than a broad but shallow chart catalog.

## 3. Core User Flows

### 3.1 Primary MVP Flow
1. User lands on the marketing page.
2. User signs in with email-based auth.
3. User creates a new project or opens an existing one.
4. User uploads a CSV or XLSX file.
5. User sees parsed data preview and confirms the dataset.
6. User enters the editor with a default chart preset.
7. User changes chart type, data mapping, and style options in the inspector.
8. User saves changes.
9. User later returns to the project and resumes from the last saved state.

### 3.2 Success Criteria Per Flow

| Flow | Success condition |
| --- | --- |
| Landing -> Auth | User understands the product and reaches sign-in without confusion |
| Auth -> Projects | User lands in a clear "work hub" after authentication |
| Project -> Upload | User can start a project in one obvious primary action |
| Upload -> Editor | User sees validation, preview, and a successful first chart render |
| Editor -> Save | User knows whether changes are saved, unsaved, or invalid |
| Re-entry | User returns to the latest saved visualization state with minimal delay |

## 4. Information Architecture

### 4.1 Route Structure

| Route | Purpose |
| --- | --- |
| `/` | Marketing landing and primary CTA |
| `/login` | Email-based authentication |
| `/app/projects` | Project hub and recent work |
| `/app/projects/new` | New project creation entry |
| `/app/projects/:projectId/upload` | Dataset upload and preview |
| `/app/projects/:projectId/editor` | Main chart editing workspace |
| `/app/projects/:projectId/settings` | Project metadata and dataset management later |

### 4.2 Navigation Model

- Public shell: minimal top navigation with product identity and CTA
- App shell: slim persistent navigation, current workspace context, main content area
- Editor shell: top command bar, main preview canvas, right inspector panel

### 4.3 Repository and Module Baseline
The repo should be organized around clear product boundaries rather than page-only code.

- `apps/web`: product UI, routes, server actions or API handlers
- `packages/ui`: shared design system primitives and composed product components
- `packages/domain`: entity models, validation, business rules, shared types
- `packages/charts`: chart renderers, chart defaults, chart config schemas
- `packages/data`: file parsing adapters, dataset normalization, field inference
- `docs`: product and engineering source-of-truth documents

### 4.4 Authentication Entry Rules

- Unauthenticated users can access landing and login only.
- Authenticated users default into `/app/projects`.
- Deep links into upload or editor should redirect to login when unauthenticated and resume afterward if feasible.

## 5. MVP Scope

### 5.1 Included

- Email-based authentication
- Project creation and listing
- Recent project re-entry
- CSV/XLSX upload
- Dataset preview and basic validation
- Field type inference
- 4-6 core chart types
- Editor with live preview
- Right-side inspector for data and style controls
- Manual save
- Saved-state restoration

### 5.2 Excluded

- Real-time collaboration
- public publishing
- embedded chart delivery
- external data connectors
- comments and annotations
- advanced animation system
- organization-level permission management

### 5.3 Proposed MVP Chart Set

- Bar
- Line
- Area
- Scatter
- Donut
- Table

This set covers comparison, trend, proportion, correlation, and fallback tabular inspection without overextending editor complexity.

## 6. Screen Specifications

### 6.1 Landing

#### Goal
Communicate premium visual output and move users into the product quickly.

#### Structure
- Minimal top bar
- Hero with strong headline and chart composition preview
- Short product rationale
- Feature strip around upload, edit, save/re-entry
- Primary CTA to sign in or get started

#### Required UI Characteristics
- Shared typography and surface tokens with the app
- One clear accent color
- High whitespace ratio
- Avoid marketing-style clutter or noisy gradients

### 6.2 Login

#### Goal
Remove friction and get users into the app quickly.

#### Structure
- Focused auth card or split-screen layout
- Email input and send-link or verify step
- Minimal secondary text

#### Required States
- default
- sending
- success
- invalid email
- expired or invalid token

### 6.3 Project Hub

#### Goal
Act as the control center for entry, re-entry, and lightweight project management.

#### Structure
- slim left navigation
- page header with workspace context and primary action
- recent project list or card grid
- empty state that leads directly into project creation

#### Project List Fields
- project name
- chart type summary
- last edited timestamp
- last saved status
- dataset name

### 6.4 Upload Flow

#### Goal
Get users from raw file to validated chart-ready data.

#### Structure
- dropzone
- accepted file guidance
- parsing status
- data preview table
- sheet selection for XLSX
- confirm-and-continue action

#### Validation Behavior
- reject unsupported file types
- reject empty files
- detect missing headers and allow explicit handling later
- infer column types as `string`, `number`, `date`, `boolean`, or `unknown`

### 6.5 Editor Workspace

#### Goal
Provide a stable, premium editing environment where preview and controls feel tightly connected.

#### Layout
- top command bar
- center preview canvas
- optional left rail for chart switching or dataset quick access
- fixed right inspector panel

#### Top Bar Responsibilities
- project name
- chart title or visualization title
- save status
- primary save action
- possible future export/share slot

#### Preview Area Responsibilities
- render chart
- show empty/loading/error states
- show chart frame and presentation context

#### Right Inspector Responsibilities
- data binding
- style tokens
- axes
- legend
- labels
- layout spacing

### 6.6 Save and Re-entry

#### MVP Rule
Manual save is the primary persistence model. Unsaved local changes should be visually indicated, but the source of truth remains the last saved version.

#### Re-entry Rule
Opening a project should restore:

- latest saved dataset reference
- latest saved chart type
- latest saved visualization config
- last updated metadata

## 7. Workspace Behavior Spec

### 7.1 Chart Creation Model

- Every new project starts with one default visualization draft.
- After dataset confirmation, the product creates a default chart suggestion based on available inferred fields.
- If suggestion fails, the editor falls back to a safe table or empty chart scaffold rather than blocking the user.

### 7.2 Data Binding Model

- Inspector exposes semantic mapping slots rather than raw config JSON.
- Common slots:
  - category or x-axis
  - value or y-axis
  - series
  - label
  - color grouping

### 7.3 Inspector Tab Model

| Tab | Purpose |
| --- | --- |
| `Data` | field mapping, aggregation, sort, missing-value handling later |
| `Style` | palette, typography, stroke/fill, surface presentation |
| `Axes` | scale, labels, ticks, grid, formatting |
| `Legend` | show/hide, placement, label behavior |
| `Labels` | show/hide, formatting, density rules |
| `Layout` | padding, container, alignment, aspect ratio |

### 7.4 Save Behavior

- Local edits update the preview immediately.
- A dirty state indicator appears after unsaved changes.
- Save writes a normalized visualization config to persistent storage.
- Save failures must preserve local state and clearly communicate retry.

### 7.5 Undo/Redo
Undo/redo is not required in MVP. The UI should reserve conceptual space for it but not block implementation on it.

### 7.6 Visualization Count Per Project
MVP defaults to one primary visualization per project. The data model should still avoid making multiple visualizations impossible later.

## 8. Data Model

### 8.1 Entity Definitions

#### `User`
- `id`
- `email`
- `displayName`
- `createdAt`
- `lastLoginAt`

#### `Workspace`
- `id`
- `ownerUserId`
- `name`
- `slug`
- `type` (`personal` for MVP)
- `createdAt`

#### `Project`
- `id`
- `workspaceId`
- `name`
- `status` (`draft`, `active`, `archived`)
- `latestVisualizationId`
- `latestDatasetId`
- `lastOpenedAt`
- `updatedAt`
- `createdAt`

#### `Dataset`
- `id`
- `projectId`
- `sourceFileName`
- `sourceFileType`
- `sheetName`
- `rowCount`
- `columnCount`
- `schemaVersion`
- `createdAt`

#### `DatasetField`
- `id`
- `datasetId`
- `name`
- `key`
- `inferredType`
- `nullable`
- `position`

#### `Visualization`
- `id`
- `projectId`
- `datasetId`
- `chartType`
- `title`
- `configVersion`
- `savedConfig`
- `updatedAt`
- `createdAt`

#### `SavedVersion`
- `id`
- `visualizationId`
- `versionNumber`
- `savedConfig`
- `createdAt`
- `createdBy`

#### `UploadJob`
- `id`
- `projectId`
- `status`
- `errorCode`
- `errorMessage`
- `startedAt`
- `completedAt`

### 8.2 Recommended Shared Interfaces

```ts
type ChartType = "bar" | "line" | "area" | "scatter" | "donut" | "table";

type FieldType = "string" | "number" | "date" | "boolean" | "unknown";

interface DatasetPreview {
  datasetId: string;
  fileName: string;
  sheetName?: string;
  columns: Array<{
    key: string;
    name: string;
    type: FieldType;
  }>;
  sampleRows: Array<Record<string, string | number | boolean | null>>;
}

interface VisualizationConfig {
  chartType: ChartType;
  bindings: {
    x?: string;
    y?: string;
    series?: string;
    label?: string;
    color?: string;
  };
  style: Record<string, unknown>;
  axes?: Record<string, unknown>;
  legend?: Record<string, unknown>;
  labels?: Record<string, unknown>;
  layout?: Record<string, unknown>;
}
```

### 8.3 Persistence Rules

- Original uploaded file metadata is stored separately from normalized dataset schema.
- `savedConfig` is the source of truth for re-entry.
- `SavedVersion` is created on explicit save when versioning is enabled; MVP can defer full history but should keep the table boundary in mind.

## 9. State and Data Flow

### 9.1 High-Level Flow
1. Auth establishes the current user session.
2. Project hub loads the user's current workspace and project summaries.
3. Upload flow writes source metadata and builds a normalized dataset preview.
4. Editor loads `project + dataset + visualization config`.
5. Local editor state mutates independently for responsive UI.
6. Save serializes editor state into normalized `VisualizationConfig`.
7. Re-entry hydrates the editor from the latest saved state.

### 9.2 Client State Boundaries

- session state
- project selection state
- upload form and parsing state
- editor local draft state
- save request state
- recoverable error state

### 9.3 Server State Boundaries

- authenticated session
- project summaries
- dataset schema and metadata
- visualization saved config
- upload job status

### 9.4 Recommended API Surface

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/email` | start email auth flow |
| `GET` | `/api/projects` | list projects in current workspace |
| `POST` | `/api/projects` | create project |
| `GET` | `/api/projects/:projectId` | fetch project summary |
| `POST` | `/api/projects/:projectId/uploads` | upload CSV/XLSX |
| `GET` | `/api/projects/:projectId/dataset-preview` | fetch parsed preview |
| `GET` | `/api/projects/:projectId/editor-session` | fetch editor hydration payload |
| `PUT` | `/api/projects/:projectId/visualization` | save visualization config |

### 9.5 Editor Hydration Payload

```ts
interface EditorSessionPayload {
  project: {
    id: string;
    name: string;
    updatedAt: string;
  };
  dataset: DatasetPreview | null;
  visualization: {
    id: string;
    chartType: ChartType;
    title: string;
    config: VisualizationConfig;
    updatedAt: string;
  } | null;
}
```

### 9.6 Error and Recovery Rules

- Upload errors should keep the user on the upload step with actionable guidance.
- Invalid visualization configs should not destroy the previous saved state.
- Editor fetch failures should differentiate between missing project, missing dataset, and temporary server failure.

## 10. Non-Functional Requirements

### 10.1 Performance

- Project hub should feel usable within one screen load.
- Initial editor hydration should prioritize config and sample data, not full dataset payloads.
- Preview updates for normal-size datasets should feel immediate after inspector changes.

### 10.2 File Constraints
Recommended MVP defaults:

- max file size: 20 MB
- max rows for interactive preview: 50,000
- max sheets processed per XLSX upload: 1 active sheet at a time

### 10.3 Accessibility

- keyboard navigable primary actions
- visible focus states
- minimum contrast compliance for interface controls
- clear error messaging with text, not color alone

### 10.4 Responsive Rules

- landing supports mobile and desktop
- auth supports mobile and desktop
- project hub supports tablet and desktop well
- editor is desktop-first; mobile editor can be view-only or limited in MVP if necessary

### 10.5 Security and Permissions

- all project data is private by default
- users can only access projects in their workspace
- upload validation must reject unsupported or malformed files safely

## 11. Analytics and Success Metrics

### 11.1 Activation Metrics

- account created
- first project created
- first dataset uploaded
- first chart rendered
- first successful save

### 11.2 Retention Metrics

- project re-entry within 7 days
- repeated saves per project
- multiple projects created per user

### 11.3 UX Quality Metrics

- upload success rate
- upload-to-first-chart time
- editor save success rate
- re-entry recovery success rate

## 12. Future Extensions

- external data sources such as Google Sheets or URL import
- multiple visualizations per project
- publishing and embed flow
- reusable templates and themes
- workspace collaboration and roles
- export to PNG, SVG, or presentation-ready assets

## 13. Design System Direction

### 13.1 Visual Keywords

- refined
- minimal
- editorial
- quiet confidence
- creative SaaS

### 13.2 Color Direction

- low-saturation neutral foundation
- slightly tinted page backgrounds instead of pure white
- one deliberate accent color used sparingly
- chart palettes that harmonize with the interface rather than feeling stock

### 13.3 Typography Direction

- sans-serif for all core UI controls and data-dense surfaces
- optional serif accent for landing headlines or editorial callouts
- consistent type scale between public site and app shell

### 13.4 Surface and Component Direction

- thin borders over heavy shadows
- restrained radius values
- strong spacing rhythm
- premium empty states and loading states
- motion limited to purposeful panel and state transitions

### 13.5 Core Token Families

- colors
- surfaces
- borders
- radius
- spacing
- typography scale
- shadow
- motion
- chart palette

## 14. Open Decisions

### 14.1 Confirmed Defaults

- email magic link is the active auth direction
- the MVP chart set is `bar`, `line`, `area`, `scatter`, `donut`, `table`
- manual save is the only implemented save contract for MVP
- the MVP UI exposes one primary visualization per project
- all projects are private by default
- share and publish stay out of MVP
- the editor is desktop-first

### 14.2 Remaining Decisions

- chart rendering engine strategy
- whether explicit version history belongs in MVP or a later phase
- final dataset limits after parser and preview benchmarking
