# Inventory — InsideBoard AI Brand OS

A complete map of every file produced for the project, with role, value, and place in the process. Excludes `journal/` and `system/journal.html` (out-of-scope side project per `CLAUDE.md`).

**Legend:**
- **Brand OS** — defines, expresses, or exposes the brand identity (sources of truth, brand artifacts, public rendering)
- **Operational** — project tooling, governance, automation, documentation about the work
- **Mix** — genuinely both (e.g. a tool whose output is brand-defining, or a showcase that displays brand content inside operational UI)

---

## 1 · Root — sources of truth & rendered output

| File | Role | Value & why it exists | Place in process | Tag |
|---|---|---|---|---|
| `tokens.json` | Source of truth for design tokens (W3C Design Tokens format, 3-tier: primitive → semantic → component). | Single canonical record of every color, spacing, type, and motion decision. Decoupled from CSS so it can feed Figma, the product, or any future consumer. | Edited directly. Triggers `build-tokens.js` to regenerate `brandOS-tokens.css`. | Brand OS |
| `brandOS-tokens.css` | Generated CSS variables consumed by every page. | Deterministic artifact — never hand-edited. Guarantees that what `index.html` and `system/` render matches the source of truth. | Output of `scripts/build-tokens.js`. Read-only. | Brand OS |
| `brandOS-components.css` | All component styles, layout, navigation, responsive breakpoints. ~87 KB, the visual expression layer. | Translates tokens into the actual look of every component. Houses the ~40 component classes (`.chapter`, `.pc`, `.refc`, `.layer-intro`…) and all `@media` rules. | Edited for component/layout/responsive changes (Update type 3 in `PROCESS.md`). | Brand OS |
| `brandOS-content.md` | Content source of truth — maps 1:1 to `index.html` sections. | Enforces the "no visible text in HTML that isn't here first" rule. Lets content evolve independently of markup, and gives the AI a place to derive HTML from. | Always edited *before* any content change in `index.html` (Update type 1). | Brand OS |
| `index.html` | The Brand OS itself — a single living document rendering every layer and section. Public artifact served on GitHub Pages. | The deliverable. What colleagues, stakeholders, and the AI see. ~123 KB of pure structural HTML, no inline styles. | Edited only via `str_replace` against `<!-- SECTION: id -->` markers. Never rewritten in full. | Brand OS |
| `CLAUDE.md` | Behavioral contract for Claude Code: file architecture, editing rules, content derivation, naming conventions, branch workflow. | Loaded automatically at session start. Without it, the AI drifts (rewrites files, hand-edits generated artifacts, breaks structural sync). It is the kernel of the AI-collaborator setup. | Read every session, updated when a new architectural rule emerges. | Operational |
| `PROCESS.md` | Update protocols — one per operation type (content, token, component, new section, regeneration, system/, syncmain, ADR, ROADMAP). | Decouples *what to change* from *how to change it safely*. Prevents rewrite drift, partial migrations, and out-of-sync states. | Consulted before any non-trivial edit. The numbered "Update type N" references in commands and `CLAUDE.md` point here. | Operational |
| `.gitignore` | Excludes `.DS_Store`, local Claude settings, ephemeral worktrees. | Keeps personal/machine-specific artifacts out of the repo. | Static, edited only when a new ignored pattern emerges. | Operational |

---

## 2 · `docs/` — project documentation

| File / family | Role | Value & why it exists | Place in process | Tag |
|---|---|---|---|---|
| `docs/ROADMAP.md` | Authoritative status of every phase and step (planned / in progress / done). | Single source of truth for project state. Pairs with `system/docs.html` for visual rendering. | Updated whenever a step changes state (Update type 9). Must stay in sync with `system/docs.html`. | Operational |
| `docs/decisions/ADR-*.md` *(6 entries)* | Architecture Decision Records — one file per durable architectural choice. Currently covers: design system architecture, W3C tokens, system skin, ui-test port, 3-tier token architecture, component documentation anatomy. | Captures *why* a structural decision was made, so future-you (or another AI) can revisit context instead of reverse-engineering it. | Created when an architectural decision is made. Never edited after acceptance (a superseding ADR replaces it). | Operational |
| `docs/devlog/YYYY-MM-DD-*.md` *(14 entries)* | Narrative session logs — one file per working session. | The project's memory: what was attempted, what worked, what was discarded, and pending questions. Complements ADRs (which capture decisions) with the lived process. | Appended at the end of any session that produced meaningful changes. Triggered by `/session-end` or `/day-end`. | Operational |
| `docs/backlog/BACKLOG.md` | Master backlog index pointing to the five files below. | Entry point. | Updated when a new backlog file is added. | Operational |
| `docs/backlog/ideas.md` | Speculative ideas not yet committed. | Captures forward thinking without polluting the roadmap. | Append-only. Items graduate to `ROADMAP.md` when committed. | Operational |
| `docs/backlog/bugs.md` | Known bugs and regressions. | Living defect list, separate from ideas. | Append on discovery, strike-through on fix. | Operational |
| `docs/backlog/feedback.md` | Stakeholder or self-review feedback. | Keeps qualitative inputs distinct from bugs and ideas. | Append on receipt. | Operational |
| `docs/backlog/questions.md` | Open questions awaiting external answer. | Per the "log pending questions" rule — every blocker has a written trace. | Append immediately when a question surfaces; resolve when answered. | Operational |
| `docs/backlog/todo.md` | Pending tactical actions not big enough for the roadmap. | Quick capture for short-horizon work. | Append/strike. | Operational |
| `docs/backlog/workflow.md` | Process improvements and tooling ideas. | Separates meta-work (improving the system) from project work. | Append/strike. | Operational |

---

## 3 · `system/` — design system playground

A consumer of the root CSS. Every page links `../brandOS-tokens.css` and `../brandOS-components.css`, uses `<body class="sys">` to activate the product skin, and never duplicates CSS.

| File | Role | Value & why it exists | Place in process | Tag |
|---|---|---|---|---|
| `system/index.html` | Entry hub of the design system showcase. | Navigation surface to every facet of the system (foundations, components, patterns, assets, icons, docs, audit, logbook). | Edited when a new system page is added. | Mix |
| `system/foundations.html` | Showcase of token foundations — color, type, spacing, motion. | Visual proof that tokens render correctly. Acts as a regression test surface for token changes. | Updated when tokens evolve. | Mix |
| `system/components.html` | Live gallery of every component class with anatomy and usage notes. | The reference designers and AI consult before reusing or extending a component. Per ADR-006, every component is documented with its anatomy. | Updated when a component is added or its anatomy changes. | Mix |
| `system/patterns.html` | Higher-level compositions and recurring layout patterns. | Bridges the gap between atomic components and full pages. | Append when a pattern stabilizes. | Mix |
| `system/assets.html` | Inventory of brand assets — logos, fonts, illustrations. | One-stop view of every brand-owned visual asset. | Updated when an asset is added or replaced. | Mix |
| `system/icons.html` | Icon library renderer, derived from `assets/icons/icons.md`. | Visual surface for the iconography system. Consults the registry to render every icon with its anatomical name and aliases. | Regenerated when the registry changes (after `/svg`). | Mix |
| `system/docs.html` | Visual rendering of `docs/ROADMAP.md` (`phasesData` JS object + `.roadmap-track`). | Makes the roadmap legible at a glance. Source/derived pair with `ROADMAP.md`. | Synced immediately after every `ROADMAP.md` change (Update type 9). | Operational |
| `system/audit.html` | Rendered output of `/audit` — alignment status of the project. | Visual dashboard of structural drift, content/HTML sync, registry integrity. | Regenerated by `/audit`. | Operational |
| `system/logbook.html` | Append-only log of session summaries. | Continuous record of what shipped, written by `/session-end` and `/day-end`. | Append-only. | Operational |
| `system/nav.js` | Shared navigation script for `system/` pages. | DRY navigation: one script, every page. | Edited when navigation structure changes. | Operational |

---

## 4 · `scripts/` — automation

| File | Role | Value & why it exists | Place in process | Tag |
|---|---|---|---|---|
| `scripts/build-tokens.js` | Generator: walks `tokens.json` (W3C format) and emits `brandOS-tokens.css` as flat CSS variables. | The deterministic bridge from canonical tokens to runtime styles. Without it, `tokens.json` would be a dead file. Pure Node, zero dependencies — runs anywhere. | Run after every `tokens.json` edit (Update type 2). | Mix — operational tool, brand-defining output |
| `scripts/check-icons.js` | Integrity checker for the icon system. Verifies every SVG in `assets/icons/` has a registry entry in `icons.md`, and vice versa. Exit 1 on drift. | Prevents silent drift between disk and registry. The icon system relies on the registry being authoritative; this script enforces it. | Run by `/svg` and during audits. | Operational |
| `scripts/syncmain.sh` | Sync display files from `feat/ui-exploration` to `main` via `git checkout`. Governance files (`CLAUDE.md`, `PROCESS.md`, `docs/`, `brandOS-content.md`) stay off `main`. | Makes the public/private branch split safe and repeatable. Encodes the "never cherry-pick" rule mechanically. | Invoked by `/syncmain` (Update type 7). | Operational |

---

## 5 · `.claude/commands/` — execution protocols

Each command is a single-purpose, AI-invokable protocol. Together they cover every recurring operation, so the AI never has to improvise governance.

| File | Role | Value & why it exists | Place in process | Tag |
|---|---|---|---|---|
| `.claude/commands/audit.md` | `/audit` — full alignment check between `brandOS-content.md` ↔ `index.html`, registry ↔ disk, ROADMAP ↔ `system/docs.html`. | The structural-drift detector. The single command that proves the system is internally consistent. | Run at session start when files have been modified. | Operational |
| `.claude/commands/svg.md` | `/svg` — single execution path for icon optimization, anatomical naming, registration in `icons.md`, active-state generation. | Encodes the iconography doctrine (outline detection, anatomical names, semantic aliases, functional mapping). One icon per call, always validated. | Used to add or update any icon. | Operational |
| `.claude/commands/syncmain.md` | `/syncmain` — wraps `scripts/syncmain.sh` with checks, message conventions, post-sync verification. | Makes the branch sync a one-step, mistake-proof operation. | End of any session where display files changed. | Operational |
| `.claude/commands/session-end.md` | `/session-end` — generates a structured session summary and appends it to `system/logbook.html`. | Closes a working session with a written trace, no manual write-up. | End of an in-day session. | Operational |
| `.claude/commands/day-end.md` | `/day-end` — full day closure: daily-review devlog entry, structural alignment check, commit, optional sync. | The end-of-day ritual that guarantees nothing is left unrecorded or out of sync. | Once per working day. | Operational |
| `.claude/commands/journal-chapter.md` | `/journal-chapter` — single execution path for the personal journal (out-of-scope side project). Listed for completeness; it does not touch Brand OS files. | Isolates journal operations from Brand OS workflow. | Journal work only. | Operational |

---

## 6 · `assets/` — brand media

| Directory | Contents | Role & value | Tag |
|---|---|---|---|
| `assets/fonts/` | `outfit-latin.woff2`, `outfit-latin-ext.woff2`, `jetbrains-mono-latin.woff2`, `jetbrains-mono-latin-ext.woff2` | Self-hosted brand typography — Outfit (display/body) and JetBrains Mono (code/labels). Latin + extended subsets. Self-hosting guarantees rendering parity offline and avoids third-party CDN dependency. | Brand OS |
| `assets/logos/` | 7 SVGs: full lockup `logo-insideboard-brandos.svg`, color variants `logo-insideboard-{ink,ivory,white}.svg`, marks `mark-insideboard-{ink,ivory,white}.svg` | The official brand marks. Three-color system (Ink / Ivory / White) covers every background. Lockup and standalone mark cover every scale. | Brand OS |
| `assets/icons/` | `icons.md` (registry — anatomy, semantic aliases, functional mapping, inline SVG) + `platform/` subdirectory for product icons. Brand icons folder will be added when first needed. | The icon system. Filenames are anatomical (`arrows-left-right.svg`, never `resize.svg`); functions live as aliases in the registry. The registry is the bridge between the icon library and AI-driven content illustration. | Brand OS |
| `assets/images/` | `logo-brandos.png`, `logo-brandos-v2.png` | Raster artifacts for contexts where SVG isn't viable (favicons, social previews). | Brand OS |

---

## 7 · Snapshot — counts at a glance

| Area | Count |
|---|---|
| Root sources of truth | 4 (`tokens.json`, `brandOS-content.md`, `brandOS-components.css`, `index.html`) + 1 generated (`brandOS-tokens.css`) |
| Governance files | 2 (`CLAUDE.md`, `PROCESS.md`) |
| ADRs | 6 |
| Devlog entries | 14 |
| Backlog files | 6 + index |
| `system/` pages (excl. journal) | 10 + 1 shared script |
| Scripts | 3 |
| Slash commands | 6 |
| Brand fonts | 4 (2 families × 2 subsets) |
| Brand logos | 7 SVGs |
| Brand images | 2 PNGs |

---

## 8 · How the pieces flow

```
tokens.json ──build-tokens.js──▶ brandOS-tokens.css ─┐
                                                     ├──▶ index.html (rendered)
brandOS-content.md ────────derives────▶ index.html ──┤    system/*.html (consumes)
                                                     │
brandOS-components.css ──────────────────────────────┘

assets/icons/*.svg + icons.md ◀──check-icons.js──▶ /svg command
                                                       │
                                                       ▼
                                                 system/icons.html

docs/ROADMAP.md ◀──Update type 9──▶ system/docs.html

feat/ui-exploration ──syncmain.sh──▶ main (display files only)
```

Sources of truth are at the top of every chain. Generated artifacts and consumers sit downstream. Every protocol in `PROCESS.md` is a named edge in this graph.
