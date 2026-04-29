# 2026-04-27 — Iconography system — protocol, registry, and logo migration

**Phase:** 3 · Steps 3.1, 3.2, 3.3 complete  
**Type:** Protocol + Implementation

---

Built the full iconography system from the ground up: protocol, registry, governance integration, and logo migration. The `/svg` command is the single execution path for all icon work going forward.

## What was built

**`.claude/commands/svg.md` — the `/svg` command (Phase 3.1)**

A 7-step protocol for optimizing and registering SVG icons:
1. System identification (Brand vs Platform)
2. Audit — outline detection with confidence score, viewBox check, overlap detection, primitive substitution, grid/optical-bounding-box check, mixed-technique detection
3. Naming — anatomical name (shape, not function), semantic aliases, category, functional mapping, duplicate detection (name, alias, visual similarity)
4. Standardization — strip Figma junk, normalize root SVG attributes, currentColor, round caps, accessibility nodes
5. Active state — container fill 15% (type a) or global background 15% (type b), separate `-active.svg` file
6. Output — SVG code + registry entry displayed
7. Validation — three separate write confirmations before any disk write

Key doctrine: **filenames are anatomical** (`arrows-left-right`, not `resize`). Functions live in the registry as semantic aliases. The same icon can serve multiple functions without duplication.

**`assets/icons/icons.md` — the registry (Phase 3.2)**

Structured by `## Brand iconography` / `## Platform iconography` × 7 categories (navigation, layout, actions, objects, states, communication, controls) + 2 brand-only (agents, modes). Each entry documents: Anatomy, Semantic Aliases, Functional Mapping, Active State, Code (default + active).

The **Functional Mapping field** is the bridge to content generation: when asked to illustrate a feature (e.g. "Knowledge mode"), the AI scans `icons.md` to retrieve the matching icon by function. A **Functional Mapping index** at the bottom provides the reverse lookup.

**Governance updates**

- `CLAUDE.md` — new *Iconography* section: file table, key rules, Functional Mapping doctrine
- `PROCESS.md` — *Update type 8 — Icon addition / optimization* (`/svg`)
- `docs/ROADMAP.md` — *Phase 3 · Iconography system* (7 steps, 3.1–3.3 ✓)
- `docs/backlog/ideas.md` — *Iconography display* entry enriched and linked to Phase 3.6

## Protocol design decisions

**Homothetic scaling.** Icons scale proportionally when resized — geometry and stroke-width scale together. `vector-effect="non-scaling-stroke"` is explicitly NOT used. Token pairing: 16px→1.5, 24px→2, 32px→2.5, 48px→3.

**Accessibility model.** Icons are visual primitives. The SVG carries `role="img"` + `<title>` + `<desc>` for standalone/catalog use. When embedded in a UI component, the wrapper (`<button aria-label="...">`) carries the functional label; the SVG receives `aria-hidden="true"` from the consuming component.

**Optical bounding box.** The 24×24 viewBox intentionally has 1–2px visual breathing room — coordinates do not need to touch all four edges. Standard practice (Material, Lucide, Phosphor).

**Mixed technique detection.** Step 1.6 detects icons that combine a closed outline shape with a symbolic element (plus, arrow, badge). Valid for functional clarity; flagged and documented in the registry Anatomy field.

**Question format.** All decision gates in the protocol use checkbox format with an `Autre` option.

## Logo migration (Phase 3.3)

Moved 7 logo SVGs from `assets/svg/` to `assets/logos/` (git mv), updated all references in `index.html` (5 occurrences) and `system/lab/*.html` (2 occurrences, path corrected to `../../assets/logos/`). Empty `assets/svg/` directory removed.

## First icon processed

`camera-plus` (Platform / objects) — an export from Figma. Clean audit (no outlines, no overlaps, correct viewBox). Junk removed: Figma `<g id>` wrapper, 3 child `id` attributes, `stroke="#1B1712"` normalized to `currentColor`. Mixed technique flagged (camera body + `+` symbol) and confirmed intentional. Active state type (a) — container fill with closed camera body path `M3 7L6 7L6.5 5H12.5L13 7H19V19H3Z` at 15% opacity.

Files written: `assets/icons/platform/objects/camera-plus.svg`, `camera-plus-active.svg`. Registry entry added with Functional Mapping `Media upload, Add photo`.
