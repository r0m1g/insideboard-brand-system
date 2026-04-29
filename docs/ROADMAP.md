# Roadmap — InsideBoard AI Brand OS

> Single-page status of where we are and where we're going.
> Updated whenever a phase changes state. Authoritative source for "what's next."

**Last updated:** 2026-04-29 (Phase 5 activated — G.5 ✓ + G.6 ✓, branch consolidation done, Phase 5 moved to Active)

---

## Status legend

- `✓` Done — shipped, validated
- `◔` In progress — actively being worked on
- `○` Planned — committed, not started
- `…` Future — on the radar, not committed
- `✗` Cancelled / Superseded

---

## Active phase

### Phase 2 · Figma sync

Bidirectional sync between Figma Variables and `tokens.json` via Tokens Studio plugin.

| Step | Status | Description |
|---|---|---|
| 2.1 | `○` | Install and configure Tokens Studio in Figma |
| 2.2 | `○` | Connect to GitHub (this repo) |
| 2.3 | `○` | Validate sync workflow (Figma → repo, repo → Figma) |

**Prerequisite (manual):** GitHub personal access token with repo read/write scope.

---

### Phase 3 · Iconography system

Build, optimize, register, and consume the InsideBoard icon library — bridging design assets (Figma exports) and content generation (AI retrieval by function).

| Step | Status | Description |
|---|---|---|
| 3.1 | `✓` | `/svg` command — protocol for outline detection, anatomical naming, standardization, active states, duplicate detection |
| 3.2 | `✓` | `assets/icons/icons.md` — registry with anatomy, semantic aliases, functional mapping, inline SVG code |
| 3.3 | `✓` | Migrate `assets/svg/*.svg` (logos) → `assets/logos/`, update `index.html` references |
| 3.4 | `○` | Optimize and register the first batch of brand icons (existing Figma exports) |
| 3.5 | `○` | Optimize and register the first batch of platform icons (existing Figma exports) |
| 3.6 | `✓` | `system/icons.html` — searchable visual gallery (browse by category, search by name/alias, switch color, download as SVG/PNG) — interim, will be absorbed by Phase 4 médiathèque |
| 3.7 | `✗` | ~~Functional Mapping reverse index~~ — superseded by Phase 4 (cross-asset reverse index, not icon-only) |

**Reads:** SVG sources from Figma/Illustrator exports, `assets/icons/icons.md` for duplicate detection.
**Writes:** `assets/icons/`, `assets/icons/icons.md`, eventually `assets/logos/`, `system/icons.html`.

**Decisions:** ADR-007 (closes 3.7, opens Phase 4)

---

### Phase 4 · Asset library (médiathèque)

Generalize the iconography pattern (anatomical naming + registry + functional mapping + gallery + reverse index) to **all non-token brand assets** — logos, illustrations, photos, motion, patterns, templates, sonic identity. One mental model, one shared functional vocabulary, one médiathèque, one cross-asset reverse index. **Uncommitted — starts after Phase 3 closes.**

| Step | Status | Description |
|---|---|---|
| 4.1 | `…` | Lock unified registry format (per-type files, shared functional vocabulary schema) — opens its own ADR if needed |
| 4.2 | `…` | Define authoring-protocol skeleton — what every `/asset-type` command must validate (naming, registration, write gates) |
| 4.3 | `…` | Médiathèque page — `system/library.html` with type filter, category filter, functional search, download/copy |
| 4.4 | `…` | Cross-asset functional reverse index — generated artefact (`functional-map.json` or equiv.) that AI consults to retrieve assets by feature |
| 4.5 | `…` | Migrate iconography into the unified system — `icons.md` becomes the first canonical registry, `icons.html` retires or becomes a preset of the médiathèque |
| 4.6 | `…` | Onboard the next asset family (logos, then illustrations, then motion — one at a time, each with its own command if needed) |

**Reads:** `assets/icons/icons.md` (template), future per-type registries.
**Writes:** `assets/<type>/<type>.md` per family, `assets/functional-map.json`, `system/library.html`.

**Decisions:** ADR-007 (foundation). Sub-ADRs may follow per architectural sub-decision.

---

### Phase 5 · GitLab process

Migrate the project from the personal GitHub repo to InsideBoard's GitLab space. Consolidate the branch strategy. Establish the long-term exploration workflow.

| Step | Status | Description |
|---|---|---|
| G.1 | `○` | Create repo on InsideBoard GitLab (Romain's space) |
| G.2 | `○` | Configure Google Workspace SSO — employees access Brand OS via company Google mail |
| G.3 | `○` | Push full history to GitLab (both branches) |
| G.4 | `○` | Update Figma Tokens Studio connection — swap GitHub PAT for GitLab access token (Phase 2 prerequisite) |
| G.5 | `✓` | Consolidate branches — merge `feat/ui-exploration` into `main`. `main` becomes the single source of truth (all files: source + display + governance). Delete `feat/ui-exploration`. |
| G.6 | `✓` | Update `CLAUDE.md` + `PROCESS.md` — new branch strategy: work directly on `main`, create `experiment/*` branches for risky explorations |
| G.7 | `○` | Deprecate sync tooling — delete `scripts/syncmain.sh` and `.claude/commands/syncmain.md` (no longer needed) |
| G.8 | `○` | Verify GitLab Pages — confirm `index.html` is served correctly, update any hardcoded URL references |

**Branch strategy after G.5:**

| Branch | Role | Lifetime |
|---|---|---|
| `main` | Single source of truth — stable, all files | Permanent |
| `experiment/<name>` | Risky exploration with its own full source — typography overhaul, layout refactor, animation system | Temporary — merge or close |

An `experiment/*` branch is created from `main` when you want to break things without risk. It carries its own copy of all source files. When the exploration is conclusive: merge what works, close the branch. When it fails: close without trace on `main`.

**Deprecates:** `scripts/syncmain.sh`, `.claude/commands/syncmain.md`, `feat/ui-exploration` branch pattern.

**Prerequisite:** G.2 (SSO) must be confirmed before G.3 (push) — no content on GitLab before access control is in place.

**Decisions:** ADR-009

---

## Completed

### Phase 1A · Design system foundation

| Step | Status | Description |
|---|---|---|
| 1A.0 | `✓` | Port redesigned nav, layer-intro, animations, scroll reveals from `ui-test.html` to the Brand OS |
| 1A.1 | `✓` | Build `system/` scaffold (foundations · components · patterns · assets) consuming existing CSS |
| 1A.2 | `✓` | Archive `ui-test.html` and `animation-test.html` into `system/lab/` |
| 1A.3 | `✓` | Extend `PROCESS.md` with "Update type 6 — System (playground)" protocol |

**Decisions:** ADR-001, ADR-003, ADR-004

### Phase 1B · Tokens W3C migration

| Step | Status | Description |
|---|---|---|
| 1B.1 | `✓` | Author `tokens.json` mirroring current CSS variables |
| 1B.2 | `✓` | Build minimal Node generator (`tokens.json` → `brandOS-tokens.css`) |
| 1B.3 | `✓` | Document tokens in `system/foundations.html` |

**Decisions:** ADR-002

### Phase 1C · 3-tier token architecture

| Step | Status | Description |
|---|---|---|
| 1C.1 | `✓` | Define primitive layer (raw values) |
| 1C.2 | `✓` | Define semantic layer (intent-based, references primitives) |
| 1C.3 | `✓` | Define component-scoped tokens for major components |

**Decisions:** ADR-005

### Phase 1D · Component documentation anatomy

| Step | Status | Description |
|---|---|---|
| 1D.1 | `✓` | ADR-006 — Define spec-block anatomy (5 slots: header, anatomy, variants, usage, related) |
| 1D.2 | `✓` | CSS — Add spec-block classes to `brandOS-components.css` |
| 1D.3 | `✓` | Pilot — Migrate `.chapter` in `components.html` with full spec-block |
| 1D.4 | `✓` | Full migration — All components, patterns, and foundations migrated |

**Decisions:** ADR-006

---

## Future (uncommitted)

- `…` Layer 6–9 content (Do/Don't, Design Language, Component System, Automation Layer) — currently shown as "in progress" in the Brand OS but not authored
- `…` AI generation pipeline — automate creation of brand assets that respect tokens and components
- `…` Public component library extracted from brandOS-components.css for reuse in InsideBoard Platform
- `…` Visual regression testing (Percy / Chromatic) once `system/` pages are stable

---

## Recent changes

- **2026-04-29** — Phase 5 activated (G.5 ✓, G.6 ✓). Branch consolidation complete: `feat/ui-exploration` merged into `main`. `CLAUDE.md` + `PROCESS.md` updated with single-branch strategy (`experiment/*` for risky explorations). ADR-009. G.1–G.4, G.7, G.8 remain planned (GitLab migration pending).
- **2026-04-27** — ADR-007 · asset library generalization. The pattern proven by Phase 3 (anatomical naming + registry + functional mapping + gallery + reverse index) is generalized to all non-token brand assets. Phase 3 closes on iconography (steps 3.4, 3.5 still to ship). Step 3.7 superseded by new Phase 4. Phase 4 (médiathèque, cross-asset reverse index, unified authoring protocol) added as uncommitted — starts after Phase 3 closes. Current `system/icons.html` reframed as interim; will be absorbed by `system/library.html`.
- **2026-04-27** — Phase 3.6 ✓ — `system/icons.html` created: searchable icon gallery with system/category filters, search by name/alias/function, light/grey/dark context switcher, active state toggle, click-to-select detail panel, Download SVG + Copy SVG. Nav updated in all 5 system pages.
- **2026-04-27** — Phase 3 · Iconography system initiated. `/svg` command built (`.claude/commands/svg.md`) — 7-step protocol: audit, anatomical naming, standardization, active states, duplicate detection, write validation. `assets/icons/icons.md` registry created with Brand/Platform × 7-category structure and Functional Mapping field. CLAUDE.md + PROCESS.md updated (Update type 8). Logo migration: `assets/svg/` → `assets/logos/` (7 files, all HTML references updated). First icon processed and registered: `camera-plus` (platform/objects). Steps 3.1 ✓, 3.2 ✓, 3.3 ✓.
- **2026-04-26** — `system/docs.html` added — visual roadmap by phase, ADR table, devlog and backlog. "System →" link added to `index.html` nav (above title, with separator). "Docs" tab added to nav on all `system/` pages.
- **2026-04-26** — Phase 1C complete. tokens.json restructured to 3-tier (primitive/semantic/component). Generator updated. 65 tokens (43 primitive, 10 semantic, 12 component). 12 new component CSS vars emitted (--nav-*, --hero-*, --chapter-*, --callout-*, --formula-*). All existing vars unchanged — no visual regression. Next: Phase 2 (Figma sync).
- **2026-04-26** — Phase 1B complete. `system/foundations.html` documenting semantic tokens (alias rows) + density section + W3C source note in header. New CSS: `.alias-list / .alias-row / .alias-chip / .alias-name / .alias-ref / .alias-val`.
- **2026-04-26** — Phase 1B.2 complete. `scripts/build-tokens.js` generates `brandOS-tokens.css` from `tokens.json`. Diff vs hand-written original: banner replaced + cosmetic font quoting; all 51 CSS variables resolve to identical values, density variants verified, no visual change. `brandOS-tokens.css` is now generated — edit `tokens.json` and re-run. Next: 1B.3 documentation.
- **2026-04-26** — Phase 1B.1 complete. `tokens.json` authored at root (W3C Design Tokens format), 51/51 CSS variables mirrored.
- **2026-04-26** — Phase 1A complete. `system/` scaffold live. Lab files archived. Update type 6 added to `PROCESS.md`.
- **2026-04-25** — Phase 1A.0 completed (nav/layer-intro/animations port). ADR-001 to ADR-004 backfilled. Documentation structure (`docs/`) established.
