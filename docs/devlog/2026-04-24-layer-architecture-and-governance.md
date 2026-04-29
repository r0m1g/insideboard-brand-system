# 2026-04-24 — Layer Architecture, Nav Refactor, and Governance

> *Retrospective entry — written 2026-04-28 from git history.*

**Session duration:** ~6h  
**Phase:** Pre-1A (structural and editorial polish)  
**Commits:** 13 (`4c810c8` → `50a2534`)  
**Status at close:** Document structurally complete. Layer intros in place. Governance rules backfilled into CLAUDE.md. CSS consolidated. Assets migrated to structured folders.

---

## What happened

April 24 was a deep polish session — not adding content, but making the existing structure coherent, navigable, and maintainable. The work fell into four distinct tracks that ran across the day.

### Track 1 — Layer-level architecture (morning)

The document had sections but no visual separation between layers. Reading from Section 01 to Section 17 was a flat experience with no sense of moving between conceptual zones. The fix was the `.layer-intro` component.

Each layer now opens with a structured divider:
- `.li-label` — layer number (e.g., `Layer 01`)
- `.li-name` — layer name in large display type
- `.li-desc` — one-sentence descriptor
- `.li-ghost` — oversized decorative echo of the layer name, `aria-hidden="true"`

The ghost element was carried over from the `ui-test.html` exploration. It creates depth without adding semantic content — the `aria-hidden` attribute ensures it's invisible to screen readers.

This was followed immediately by a **nav refactor** (`d9aaca1`) to match the new layer hierarchy. The navigation now groups sections under their parent layer, with group labels that correspond to the `.li-name` identifiers. Three bugs surfaced during integration:

- **Nav active state broken** — the IntersectionObserver was tracking sections but not updating the correct nav item. Fixed by aligning the observer thresholds with the actual section heights.
- **Layer scroll offset wrong** — the fixed nav was obscuring the layer intro when navigating directly to a section. Fixed by adjusting the scroll margin.
- **Section numbering inconsistency** — a couple of section numbers in the nav didn't match the `.cn` values in the document. Fixed by audit.

### Track 2 — Editorial polish (afternoon)

Three targeted content passes:

**Italic removed from tagline.** "Always by your side" had been set in italic. The italic treatment was adding emphasis that the content didn't need — the line is a fil conducteur, not a quote or foreign phrase. Removed.

**Type system principle shortened.** The principle in Section 1·3 was running too long. Condensed to its essential statement.

**Highlight system alignment.** The inline `<em>` usage was inconsistent — some highlights were semantic, some were decorative. Aligned to a single rule: `<em>` marks the conceptually pivotal term in a sentence, not stylistic variation.

### Track 3 — Governance rules backfill (`4d0b90b`)

The `str_replace`-only protocol and multi-file architecture had been established on April 23. But the rules for what goes *where* — which file to read, which file to touch, what to never do — hadn't been written down in a form Claude Code would auto-read.

`CLAUDE.md` was updated with explicit governance rules:
- **Single source of truth**: `brandOS-content.md` is authoritative for all visible text. If text doesn't exist there, it doesn't exist in `index.html`.
- **Structural coherence**: every `### N·N Title` in content.md must have a matching `<!-- SECTION: id -->` in `index.html`. Every `## Layer` heading must have a matching `.layer-intro` and nav group.
- **Reading rules by operation type**: what to read (and what not to read) before each class of edit.

These rules were not invented — they were crystallized from decisions already made in practice. The formalization was the work.

### Track 4 — CSS consolidation and assets migration (evening)

**`.bcap` + `.capt2` unified.** Two classes existed for caption/pill labels. They had been created independently at different points in the document's evolution and had drifted visually and semantically. An audit (commit `dbb050c`) confirmed they were identical in intent. Three commits to converge:
1. `dbb050c` — unify the base selector
2. `c2b579b` — apply capt2 pill style to `.bcap`, remove redundant dark override
3. `c83aaf8` — rename both to `.cap-tag` as the single canonical class

The renaming was the right call: neither `.bcap` nor `.capt2` communicated what the element was. `.cap-tag` is self-describing.

**Layer divider `margin-top` harmonized** (`b10fde1`). Individual layer intros had inline `margin-top` overrides. These were moved to a CSS rule on `.layer-intro`, and the inline overrides were removed. No visual change — cleaner HTML.

**Font size reduction** (`083a33c`). `.ldn` (the decorative layer name in the ghost element) was at 48px, which was competing with the `.li-name` at the intended display scale. Reduced to 28px.

**Assets migrated to structured folders** (`50a2534`):
```
assets/
├── fonts/          ← self-hosted (previously CDN-only)
├── icons/          ← (empty, Phase 3 target)
└── logos/
    ├── color/
    └── white/      ← white SVG variants added this session
```

Self-hosting fonts was both a performance decision (no CDN dependency for GitHub Pages) and a reliability decision (CDN URLs can break or change). White SVG logo variants were needed for dark background contexts that had started appearing in the Layer 01 sections.

---

## Decisions made

| # | Decision |
|---|---|
| — | `.layer-intro` as the layer divider component — label, name, description, ghost |
| — | `.li-ghost` always `aria-hidden="true"` — decorative, not semantic |
| — | Nav groups correspond to layers, not to individual sections |
| — | `<em>` marks conceptually pivotal terms only — no decorative italic |
| — | `brandOS-content.md` as single source of truth for all visible text (formalized in CLAUDE.md) |
| — | Structural coherence check mandatory before closing any session with structural changes |
| — | `.bcap` + `.capt2` → `.cap-tag` — one canonical class for caption/pill labels |
| — | Fonts self-hosted in `assets/fonts/` — no CDN dependency |
| — | Assets organized under `assets/fonts/`, `assets/icons/`, `assets/logos/` |

---

## What's next

- `docs/` infrastructure: decisions log, roadmap, devlog — the project needs a memory
- `system/` playground: Phase 1A architecture, separate scratchpad from document
- W3C Design Tokens migration: `tokens.json` as source, generator script, `brandOS-tokens.css` as output
