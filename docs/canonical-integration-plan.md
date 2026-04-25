# Canonical UI Integration Plan

## 1. Current Status Summary

The Chart repo is currently on `exact/canonical-ui-only-port`.

The Macfigmamakecanonical UI has been ported into Chart as a UI-only canonical surface. The current canonical routes render from `apps/web/src/components/canonical/*`, preserve the source component structure, class names, SVG chart primitives, palette model, and local mock React state, and intentionally do not connect to existing Chart editor logic yet.

Known current status:

- Canonical UI port and visual parity pass are complete.
- The 9 target routes have been verified as responding successfully.
- `npm.cmd run typecheck:web` and `npm.cmd run build:web` passed after the UI-only port.
- Existing Chart functionality remains available in the legacy editor implementation, but is not wired into the canonical UI.
- Backend, auth, DB persistence, and real export behavior are not implemented in the canonical UI.
- The canonical UI is now the visual source of truth for future feature integration.

The integration goal is to connect existing Chart behavior into the canonical UI without changing the canonical visual layout, route structure, or interaction impression.

## 2. Features Not Connected Yet

The following behavior is intentionally not connected to the canonical UI yet:

- Existing `EditorWorkspaceClient` draft state.
- Chart type, title, subtitle, and caption editing from the old editor.
- Field mapping state and recommendation copy.
- Data QA state and derived preview datasets.
- Sort mode and top-N controls.
- Axis, grid, legend, label, density, and aspect ratio controls.
- Data table state and field binding interactions.
- CSV/XLSX upload parsing.
- Save, reset, saved snapshot, dirty state, and re-entry behavior.
- Data-driven chart preview rendering.
- Real export behavior.
- Workspace project persistence or backend project loading.
- Auth, database, or server-side project APIs.

## 3. Existing Chart Feature Inventory

### `apps/web/src/components/editor-workspace-client.tsx`

This is the current feature-rich local editor implementation. It owns the main editor state and behavior:

- `EditorDraftState`
  - `chartType`
  - `text.title`, `text.subtitle`, `text.caption`
  - `bindings`
  - `data.sortMode`, `data.topN`
  - `style.theme`
  - `axes.showAxis`, `axes.showGrid`
  - `legend.show`, `legend.position`
  - `labels.mode`, `labels.density`, `labels.numberFormat`, `labels.size`, `labels.weight`, `labels.prefix`, `labels.suffix`
  - `layout.aspectRatio`, `layout.density`
  - `chartOptions.line`, `chartOptions.bar`, `chartOptions.donut`, `chartOptions.racingBar`
- Local editor session state
  - `draft`
  - `savedSnapshot`
  - `savedLabel`
  - `activeInspectorTab`
  - `qaState`
- Derived behavior
  - `deriveChartData(...)`
  - `buildRecommendationCopy(...)`
  - `getBindingsForChartType(...)`
  - `getRecommendedBindings(...)`
  - preview diagnostics and fallback states
- Main handlers
  - `handleChartChange`
  - `handleQaStateChange`
  - `handleBindingChange`
  - `handleSave`
  - `handleReset`
- Renderer behavior
  - local `PreviewChart`
  - local `LineChart`
  - local `BarChart`
  - local `DonutChart`
  - local `RacingBarChart`
  - local legend and preview-state notices

This file should be treated as the functional source to extract from, not as a visual component to mount inside the canonical editor.

### `packages/ui/src/components/shells/editor-shell.tsx`

This provides the old editor layout shell with its own top bar, rail, canvas, and inspector grid. It uses old Chart product spacing and visual language. It should not replace the canonical dark studio shell.

Useful information:

- Old shell column assumptions.
- Inspector width assumptions.
- Rail/canvas/inspector composition pattern.

Do not directly use it in canonical integration unless a later internal adapter needs non-visual layout constants.

### `packages/ui/src/components/shells/right-inspector-shell.tsx`

This provides the old right inspector layout and tab system. It is useful for understanding old inspector grouping, but it should not visually replace the canonical inspector accordions.

Feature mapping should move old inspector state and handlers into the canonical `Inspector` sections instead.

### `packages/ui/src/components/navigation/top-bar.tsx`

This is the old beige product top bar. It is not visually compatible with the canonical editor toolbar. Any save/reset/status behavior should be mapped into the canonical toolbar controls instead of mounting this component.

### `packages/ui/src/components/compositions/placeholder-chart.tsx`

This contains old static chart previews. It is not the target renderer for the canonical editor. The canonical SVG primitives in `apps/web/src/components/canonical/Charts.tsx` are the visual source of truth.

Useful information:

- Chart type coverage.
- Simple preview composition patterns.

### `packages/ui/src/components/compositions/preview-table.tsx`

This renders a static preview table from `DatasetPreview`. It can inform data preview structure, but should not replace the canonical spreadsheet-style data editor. Data parsing and field mapping should feed canonical data UI slots.

## 4. Canonical UI Mock Interaction Inventory

### `apps/web/src/components/canonical/Editor.tsx`

The canonical editor currently owns mock local UI state:

- `chart`: `bar | line | donut | race`
- `tab`: controlled by route wrapper as `edit | data | recommend`
- `exportOpen`
- `recOpen`
- `uploadOpen`
- `galleryOpen`
- `colorMode`: `single | category | sequential | highlight | custom`
- `palette`
- `singleColor`
- `highlight`
- `opacity`
- `darkCanvas`
- `showKPI`
- `raceYear`
- `racePlaying`

Internal child state:

- `Inspector` accordion open/closed state.
- `DataEditor` selected column.
- `DataEditor` selected cell.
- `DataEditor` encoding state.

Canonical interactions currently include:

- Switching chart previews.
- Opening recommendation drawer.
- Picking a recommendation.
- Opening chart gallery modal.
- Picking an enabled gallery chart.
- Opening upload modal.
- Opening export modal.
- Switching palette and color mode.
- Toggling canvas mode and KPI overlay.
- Selecting mock spreadsheet cells and columns.
- Switching editor route tab through `CanonicalRoutes`.

### `apps/web/src/components/canonical/Workspace.tsx`

The canonical workspace is static and visual-first:

- Static project cards.
- Static activity cards.
- Static status, format, and owner metadata.
- Navigation into `/editor/demo-project`.

It should remain the workspace visual shell. Project persistence should later hydrate this shape rather than replacing it with the old Chart workspace UI.

### `apps/web/src/components/canonical/Charts.tsx`

This file owns canonical chart visual grammar:

- `PALETTES`
- `BarChart`
- `LineChart`
- `DonutChart`
- `RacingBar`
- `MiniSpark`
- `MapChartMini`
- `MetricCardMini`

These SVG primitives should be preserved. Data-driven rendering should adapt them or add canonical-compatible variants instead of importing the old preview visuals wholesale.

### `apps/web/src/components/canonical/Landing.tsx`

The landing page is static marketing UI with canonical navigation and visual chart previews. It should not be connected to editor state in early phases.

### `apps/web/src/components/canonical/pages/Gallery.tsx`

The gallery page has canonical category chips, chart cards, status labels, and ready-state routing into `/editor/demo-project?tab=edit`. It can later pass selected chart type through a query parameter or shared editor initialization path, but should stay static until editor integration is stable.

### `apps/web/src/components/canonical/CanonicalRoutes.tsx`

This is the canonical route bridge:

- `/`
- `/gallery`
- `/templates`
- `/pricing`
- `/use-cases`
- `/workspace`
- `/editor/[projectId]`

It maps `tab` query values into canonical editor tab state:

- `edit`
- `data`
- `recommend`

The route structure should remain stable during feature integration.

## 5. State Mapping Plan

| Canonical state | Existing Chart state | Integration plan |
| --- | --- | --- |
| `chart: "bar" | "line" | "donut" | "race"` | `draft.chartType: "bar" | "line" | "donut" | "racing-bar"` | Add a small adapter that maps `race` to `racing-bar` and back. `chart` should become derived from `draft.chartType` after Phase 2. |
| `tab: "edit" | "data" | "recommend"` | `activeInspectorTab` is old inspector-only state | Keep canonical route tab separate. Do not map canonical page tabs directly to old inspector tabs. Inspector tabs should become canonical accordion sections. |
| `palette`, `colorMode`, `singleColor`, `highlight`, `opacity` | `draft.style.theme` | Start with a compatibility layer. Preserve canonical palette state in Phase 1, then either map old themes to canonical palettes or extend editor draft style in a later phase. |
| `darkCanvas` | No exact old equivalent | Treat as canonical view preference. Keep local until renderer/export needs it. |
| `showKPI` | No exact old equivalent | Treat as canonical view preference. Do not force it into old draft state early. |
| `raceYear`, `racePlaying` | `draft.chartOptions.racingBar.playSpeed` plus renderer behavior | Keep playback state local. Connect speed/options only after chart renderer integration. |
| Inspector accordion state | `activeInspectorTab` | Keep canonical accordion state local. Use old inspector grouping only as behavior mapping input. |
| Data selected column/cell | No exact old equivalent | Keep selection local. Connect field binding and table content separately. |
| Data `encoding` | `draft.bindings` | Convert canonical encoding controls into `handleBindingChange` calls after data table state is connected. |
| Mock rows/columns | `previewQaDatasetMap`, parsed datasets, `DatasetPreview` | Replace mock rows with active dataset rows only after parser/data state is ready. |
| Save label/dirty state visual slots | `savedSnapshot`, `savedLabel`, `hasUnsavedChanges` | Feed canonical toolbar/status slots from existing save/reset state in Phase 7. |

## 6. Handler Mapping Plan

| Canonical action | Existing handler or target behavior | Integration plan |
| --- | --- | --- |
| Pick chart type in toolbar/gallery/recommend drawer | `handleChartChange(chartType)` | Route all chart-type changes through the old handler after adding chart type adapter. |
| Pick recommendation | `handleChartChange(...)` plus recommendation copy | Keep canonical drawer visuals. Use existing recommendation metadata to choose chart type and bindings later. |
| Change route tab | `onTabChange(nextTab)` in `CanonicalRoutes` | Keep current route behavior. Do not mix with old inspector tab routing. |
| Edit title/subtitle/caption | `updateDraft` text mutation | Add controlled values to canonical inspector title fields without changing layout. |
| Change field binding | `handleBindingChange(field, value)` | Wire canonical encoding/data controls to old binding logic after dataset state is active. |
| Change sort/top-N | `updateDraft` data mutation | Add only where canonical UI already has matching controls or approved future slots. |
| Toggle axis/grid | `updateDraft` axes mutation | Wire into canonical axis accordion controls. |
| Toggle legend/position | `updateDraft` legend mutation | Wire into canonical legend accordion controls. |
| Change label options | `updateDraft` labels mutation | Wire into canonical labels accordion controls. |
| Change layout density/aspect | `updateDraft` layout mutation | Wire into canonical layout accordion controls while preserving canonical canvas dimensions. |
| Save | `handleSave()` | Connect to canonical save/status affordance in Phase 7. |
| Reset | `handleReset()` | Connect to canonical reset affordance in Phase 7. |
| Upload file | New parser adapter, then existing binding recommendation helpers | Keep canonical upload modal. Add parser behind the modal later. |
| Export | New export adapter | Do not connect until renderer and layout state are stable. |

## 7. Chart Renderer Connection Plan

The renderer should be connected only after basic editor state and data mapping are stable.

Rules:

- Do not mount the old `PreviewChart` directly if it changes the canonical canvas look.
- Do not use `PlaceholderChart` as the real editor renderer.
- Preserve canonical chart framing, spacing, palette use, dark canvas behavior, and toolbar density.
- Prefer data-driven variants in `apps/web/src/components/canonical/Charts.tsx` or a sibling canonical-only renderer file.
- Use `deriveChartData(...)` from the existing field-mapping path as the data source.
- Keep canonical static chart primitives as fallback states while integration is incomplete.

Recommended implementation shape:

1. Extract or isolate existing chart derivation logic from `EditorWorkspaceClient`.
2. Build a `CanonicalPreviewChart` adapter that accepts:
   - `chartType`
   - `derivedData`
   - `palette`
   - `labels`
   - `axes`
   - `legend`
   - `layout`
   - `chartOptions`
   - `darkCanvas`
3. Render through canonical-compatible SVG geometry.
4. Compare `/editor/demo-project`, `/editor/demo-project?tab=data`, and `/editor/demo-project?tab=recommend` after each renderer change.

## 8. Upload and Data Parsing Connection Plan

Upload integration should happen after field mapping and table state are connected.

Plan:

1. Keep canonical `UploadModal` visual structure.
2. Add a file input handler behind the existing modal controls.
3. Parse CSV first into a `DatasetPreview`-compatible shape.
4. Add XLSX parsing after CSV is stable.
5. Normalize columns, rows, inferred types, and empty values.
6. Feed parsed dataset into the editor draft/session adapter.
7. Run `getRecommendedBindings(...)` for the active chart type.
8. Update canonical data table rows and encoding controls.
9. Preserve upload error and unsupported-file states inside existing canonical modal surfaces.

Do not add backend upload storage in this phase. Uploaded data should remain local until save/re-entry requirements are defined.

## 9. Save, Reset, and Local State Connection Plan

Save/reset should be connected after core draft editing works.

Recommended shape:

- Extract a hook from existing editor behavior, for example `useEditorDraftState(projectId)`.
- Keep `editor-workspace-client.tsx` intact during extraction.
- The hook owns:
  - `draft`
  - `savedSnapshot`
  - `savedLabel`
  - `hasUnsavedChanges`
  - chart/data/style update handlers
  - `handleSave`
  - `handleReset`
- Canonical `Editor.tsx` receives state and handlers through a container or adapter.
- The canonical component remains responsible for visual layout and UI-only view preferences.

Re-entry behavior should stay local at first. Backend persistence should not be introduced until the canonical editor can faithfully reproduce the local saved snapshot flow.

## 10. Export Connection Preconditions

Real export should be one of the final integrations. It depends on:

- Data-driven canonical chart renderer.
- Stable chart canvas dimensions.
- Connected palette/theme state.
- Connected label, axis, legend, and layout state.
- A known export target:
  - SVG only
  - PNG via browser canvas/rasterization
  - PDF
  - server-side export
- Defined behavior for dark canvas, KPI overlay, legends, and captions.
- Defined error/loading states inside the canonical export modal.

Until these prerequisites are met, export controls should remain visual-only.

## 11. Feature Connection Order

### Phase 1: Canonical local mock state cleanup

Goal:

- Separate canonical view state from future functional editor state.
- Add small adapters for chart type naming and tab naming.
- Keep all visuals unchanged.

Exit criteria:

- Canonical editor still looks the same.
- All current mock interactions still work.
- No existing Chart feature is connected yet.

Completion note:

- Added canonical adapter helpers for chart type naming and route tab normalization.
- Added `useCanonicalEditorViewState` for editor-only view/mock state such as chart type, modals, palette, canvas mode, KPI display, and racing playback state.
- Added `useCanonicalDataEditorState` for spreadsheet-only selection state and encoding state.
- `Editor.tsx` still renders the same canonical JSX/className/layout structure, but its local state is now ready to be replaced or hydrated by a Phase 2 functional adapter.
- Existing Chart editor state, handlers, renderer, upload parsing, save/reset, backend, and export behavior are still not connected.
- Phase 2 can now start by mapping canonical `chart` through the chart type adapter and wiring title/subtitle/caption state into the existing canonical controls.

### Phase 2: Chart type and text local state

Goal:

- Connect canonical chart type selection to `draft.chartType`.
- Connect title, subtitle, and caption controls to `draft.text`.
- Preserve canonical inspector layout.

Exit criteria:

- Chart type changes pass through a draft adapter that can later call existing Chart handler logic.
- Text changes update draft state.
- Static canonical chart fallback remains available.

Completion note:

- Added a canonical-only draft hook for the Phase 2 surface: chart type, title, subtitle, and caption.
- Chart type changes now flow through the canonical draft hook and the chart type adapter, while still rendering the same canonical chart primitives and mock data.
- The draft hook keeps a future-compatible chart type shape so canonical `race` can later map to existing Chart `racing-bar` without changing the visual component.
- Canvas title/subtitle/caption display and inspector title/source display now read from canonical draft state.
- Existing Chart renderer, `editor-workspace-client.tsx` handlers, field mapping, upload parsing, save/reset, backend, and export behavior are still not connected.
- Phase 3 can now move into field mapping and data table state while reusing this adapter boundary.

### Phase 3: Field mapping and data table state

Goal:

- Connect canonical data editor columns and encoding controls to `draft.bindings`.
- Feed data table from existing preview dataset shape.
- Preserve selected cell/column as canonical UI-only state.

Exit criteria:

- Field binding state is adapter-ready for existing conflict/default logic.
- Data tab remains visually canonical.

Completion note:

- Added canonical field/data adapters for mock columns, rows, inferred column type, missing/issue counts, and minimal field mapping state.
- Added a canonical field mapping hook that exposes x, y, comparison, color, label, selected column, selected cell, encoding, and future-compatible binding names.
- DataEditor now reads table rows, column metadata, selected cell/column, encoding, and chart connection labels from the canonical adapter state.
- The editor inspector's existing data connection display now reads from the same canonical field mapping state.
- Existing Chart `handleBindingChange`, field recommendation helpers, renderer, upload parsing, save/reset, backend, and export behavior are still not connected.
- Phase 4 can now move into label, axis, legend, and layout controls while keeping this field mapping adapter boundary.

### Phase 4: Label, axis, legend, and layout controls

Goal:

- Connect canonical inspector sections to old draft controls.
- Map only controls that already exist visually in canonical UI.

Exit criteria:

- Axis/grid/legend/label/layout state changes are represented in canonical adapter-ready state.
- No old inspector shell is mounted.

Completion note:

- Added canonical chart controls state for labels, axes/grid, legend, layout, and lightweight data controls.
- Existing canonical inspector positions now read and update that local adapter state without adding new sections or changing visual layout.
- The controls expose future-compatible draft names for labels, axes, legend, layout, and data, but existing Chart `updateDraft` and renderer code are still not connected.
- Existing renderer, upload parsing, save/reset, backend, and export behavior are still untouched.
- Visual parity rules remain in force; Phase 5 can now move into the chart preview renderer adapter.

### Phase 5: Chart preview renderer

Goal:

- Replace static canonical chart preview data with derived editor data.
- Preserve canonical SVG style, spacing, and canvas proportions.

Exit criteria:

- Renderer responds to chart type, bindings, text, style, labels, axes, legend, and layout.
- Visual difference from canonical mock is intentional and data-driven only.

Completion note:

- Added a canonical preview renderer adapter that receives canonical chart, field mapping, chart controls, palette/color, canvas, KPI, and racing playback view state.
- Extended the canonical `Charts.tsx` SVG primitives with optional data props while preserving the same static mock fallback values and visual grammar.
- `Editor.tsx` now renders the chart canvas through the canonical adapter instead of an inline chart switch, but the canvas shell, spacing, title, caption, and chart framing remain unchanged.
- The adapter prepares a future `CanonicalPreviewDataset` shape for later `deriveChartData` input, but existing Chart renderer code, old `PreviewChart`, old `PlaceholderChart`, upload parsing, save/reset, backend, and export are still not connected.
- Static canonical mock fallback remains the default. Renderer drift should be prevented by keeping `Charts.tsx` as the visual source of truth and by adapting future derived data into the canonical dataset shape rather than mounting old chart components.
- Phase 6 can now move into CSV/XLSX upload parsing while keeping the renderer adapter boundary stable.

### Phase 6: CSV/XLSX upload parsing

Goal:

- Wire canonical upload modal to local file parsing.
- Update dataset state and recommended bindings.

Exit criteria:

- CSV works first.
- XLSX works after CSV.
- Errors remain inside canonical UI.

### Phase 7: Save, reset, and re-entry

Goal:

- Connect old `handleSave` and `handleReset`.
- Restore saved local editor state when re-entering the same project in the same client session.

Exit criteria:

- Dirty/saved state is visible through canonical UI.
- Reset restores the last saved snapshot.
- No backend persistence is introduced.

### Phase 8: Export UI and real export

Goal:

- Connect canonical export modal to real export behavior.

Exit criteria:

- Export respects final renderer, dimensions, palette, labels, legend, and canvas mode.
- Export failures and loading states are shown in canonical modal styling.

## 12. Visual Parity Rules for Every Phase

- Do not replace canonical `Editor.tsx` layout with `EditorShell`.
- Do not replace canonical inspector accordions with `RightInspectorShell`.
- Do not replace canonical toolbar with `TopBar`.
- Do not import old beige/paper product visual language into canonical routes.
- Do not change route structure while wiring behavior.
- Do not add new sections to canonical pages as part of feature wiring.
- Only connect handlers to existing canonical controls unless a separate design pass approves new controls.
- Keep canonical class names and spacing stable unless fixing a documented parity bug.
- Preserve static mock fallback paths until the connected feature is fully verified.
- After every phase, compare at least:
  - `/`
  - `/workspace`
  - `/editor/demo-project`
  - `/editor/demo-project?tab=data`
  - `/editor/demo-project?tab=recommend`
- If a functional connection causes visual drift, rollback the adapter layer rather than altering canonical UI to fit old logic.

## 13. Risks and Rollback Strategy

### Risks

- Chart type mismatch: canonical uses `race`; existing Chart uses `racing-bar`.
- Renderer drift: old `PreviewChart` visuals may conflict with canonical SVG proportions.
- State extraction risk: `editor-workspace-client.tsx` combines state, derivation, handlers, and rendering in one large file.
- Inspector mismatch: old tabbed inspector does not map one-to-one to canonical accordions.
- Data table mismatch: old data preview is dataset-oriented; canonical data UI is spreadsheet/encoding-oriented.
- Palette mismatch: old `ThemeKey` is smaller than canonical palette/color-mode state.
- Upload parsing can create column inference edge cases that affect field binding.
- Export depends on renderer stability and may expose layout differences.

### Rollback Strategy

- Keep integration behind adapter boundaries.
- Preserve canonical mock state fallback while each feature is being connected.
- Extract behavior into hooks without deleting the legacy editor component.
- Make one phase per commit when implementation begins.
- Prefer additive files such as canonical integration hooks/adapters over invasive rewrites.
- If a phase breaks parity, revert that phase's adapter and keep the UI-only canonical component intact.
- Do not connect backend persistence until local save/reset behavior is stable.
