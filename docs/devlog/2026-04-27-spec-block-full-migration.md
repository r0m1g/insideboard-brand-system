# 2026-04-27 — Spec-block full migration

**Phase:** 1D · Step 1D.4 complete  
**Type:** Implementation

---

Migrated all remaining entries in the system/ playground to the spec-block anatomy defined in ADR-006. Every section in components.html, patterns.html, and foundations.html now follows the consistent spec-header → anatomy → live demo → usage → related structure.

**components.html** — 6 components migrated: Layer intro, Callout, Rules list, Cap tag, Formula dark, Posture card.

**patterns.html** — 3 patterns migrated: Layer → Section structure, Register contrast, Section body pattern.

**foundations.html** — 9 sections enriched with spec-headers: Primary palette, Warm gray scale, Functional palette, IRON Agents, Semantic tokens, Typography, Spacing, Density, Component tokens.

**Other fixes in this session:**
- `.ref` CSS class introduced — replaces all inline `font-family:var(--mono)` code styles with a consistent steel-colored token reference style
- `ul.rules li` grid fix — all items now use `<b>Label</b><span>text</span>` structure to prevent inline elements from breaking the two-column layout. Applied across components.html, patterns.html, and index.html (3 cases with `<strong>IRON</strong>`)
- Badge legend added to components.html header explaining Stable / Experimental / Deprecated

Phase 1D is complete. All four steps done.
