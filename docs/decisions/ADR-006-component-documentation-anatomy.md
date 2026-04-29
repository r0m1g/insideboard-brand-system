# ADR-006 — Component Documentation Anatomy

**Status:** Accepted  
**Date:** 2026-04-26  
**Author:** Romain (Art Director)

---

## Context

The `system/` playground has five pages: Foundations, Components, Patterns, Assets, Docs. Each page contains `sys-section` entries showing live demos of design tokens, components, and layout patterns.

The current entry structure is informal. Some sections have a `spec-card` with a one-line label, some have nothing. There is no contract about what an entry should contain. As the system grows — more components, more patterns, more foundations — entries will remain inconsistent and the playground will not function as genuine reference documentation.

Three specific problems:

1. **No purpose.** A reader can see the component rendered but cannot read what it is for, when to use it, or when not to.
2. **No anatomy.** Multi-part components (`.chapter`, `.layer-intro`) expose no labelled breakdown of their sub-elements.
3. **No scalability.** Adding a new component requires guessing what to include. There is no template to follow.

---

## Options considered

**Option A — Enrich labels only**  
Replace minimal `sys-section-title` text with richer names and add a better one-liner to each `spec-card`.  
*Rejected:* Cosmetic fix. Doesn't solve the structural problem. Still no anatomy, still no usage rules, still no template.

**Option B — Free-form per section**  
Write richer content for each section, each formatted differently based on what the component needs.  
*Rejected:* Does not scale. Produces inconsistency over time. Maintenance cost grows with every new entry.

**Option C — Defined spec-block anatomy**  
Define a consistent HTML structure with named slots that every component entry follows. Slots are optional where genuinely not applicable. A new CSS class set (`spec-*`) powers the layout.  
*Accepted.*

---

## Decision

Adopt a **spec-block anatomy** as the standard structure for all entries in `components.html`, `patterns.html`, and `foundations.html`. Each entry uses the following slots:

```
spec-header     — identity: name, class(es), status badge, one-sentence purpose
spec-anatomy    — labelled breakdown of sub-elements (skip for atomic components)
spec-variants   — live demo for each variant, each labelled
spec-usage      — do / don't / note rules using existing .rules pattern
spec-related    — links to related components or patterns (skip when none)
```

**Required slots:** `spec-header` always. All others are optional.

**Anatomy slot** — used when a component has named sub-elements (`.ch`, `.cb`, `.cn` for `.chapter`; `.li-label`, `.li-name`, `.li-desc` for `.layer-intro`). Atomic components (`.cap-tag`, `.callout`) skip it.

**Variants slot** — used when a component has more than one meaningful visual state or modifier (`.callout` vs `.callout.warn`; `.do` / `.dont` / `.note` for rules). Single-state components may use this slot for a single labelled demo.

**Status badge** — three values: `Stable` (used in production Brand OS), `Experimental` (in system/ only, not yet in index.html), `Deprecated` (do not use in new work).

**Foundations anatomy** — different slot set for color, type, and spacing:
- Color: swatch + name + value + usage contexts + accessibility note (contrast on Ink, on Ivory)
- Typography: specimen + scale + weight + usage
- Spacing: visual scale + token name + pixel value

**Patterns anatomy** — composition-first:
- Required components + optional components
- Diagram or annotated demo showing how parts connect
- Usage rules (do / don't)

**CSS implementation:** new `spec-*` classes added to `brandOS-components.css`. No inline styles in the spec-block HTML. Existing `sys-section-title`, `spec-card`, and `spec-label` classes are deprecated in favour of the new system — existing entries migrate incrementally.

**Pilot:** `.chapter` is the reference implementation. All subsequent entries follow its structure.

---

## Consequences

**Positive:**
- Every new component entry has a template — no guessing, consistent output
- The playground functions as genuine reference documentation, not just a visual demo
- Anatomy slot makes sub-element naming explicit and discoverable
- Usage slot reuses the existing `.rules` pattern — no new reading convention

**Negative / trade-offs:**
- Existing entries in `components.html`, `patterns.html`, `foundations.html` need migration — incremental, not big-bang
- `spec-*` CSS adds ~40–60 lines to `brandOS-components.css`
- Foundations entries (color, type, spacing) need a distinct anatomy — more work to define than components

---

## Related decisions

- ADR-001 — Design system architecture (system/ playground this lives in)
- ADR-003 — System/ workbench skin (visual context for spec-block styling)
- ADR-005 — 3-tier token architecture (foundations entries document this)
