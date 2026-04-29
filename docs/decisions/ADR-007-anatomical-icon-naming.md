# ADR-007 — Anatomical naming for SVG icon files

**Status:** Implemented
**Date:** 2026-04-27
**Author:** Romain (Art Director)

---

## Context

The icon library serves a dual audience: designers who think in shapes,
and AI agents that look up icons by function to illustrate UI features.
A single icon can legitimately serve multiple functions — `arrows-left-right`
can mean resize, swap, drag-horizontal, or expand depending on context.

Without a naming rule, the natural instinct is to name icons by their
most obvious use ("resize.svg", "swap.svg"). This creates two problems:
1. Duplication — the same shape gets filed under multiple names for
   each function it serves.
2. Brittleness — renaming an icon when its primary use changes breaks
   all references to the file.

---

## Options considered

**Option A — Functional naming**
Name each file after its primary intended function: `resize.svg`,
`swap.svg`, `add-photo.svg`.
*Rejected: one shape → many functions forces either duplication or
arbitrary winner-picking. File references break when use cases evolve.*

**Option B — Anatomical naming**
Name each file after the shape it describes, independent of any function:
`arrows-left-right.svg`, `camera-plus.svg`.
*Accepted.*

---

## Decision

All SVG icon filenames are anatomical — they describe the shape, never
the function. Format: `[primitive(s)]-[qualifier(s)].svg`.

Functions are captured separately in `assets/icons/icons.md` as
**Semantic Aliases** and a **Functional Mapping** field per entry.
The registry is the bridge between shape and function; the filename
is not.

Active state variants append `-active`: `arrows-left-right-active.svg`.

This rule is enforced by the `/svg` command (Step 3 — Naming), which
runs duplicate detection against both names and aliases before writing
any file.

---

## Consequences

**Positive:**
- One file per shape, regardless of how many functions it serves.
- Renaming a use case never touches the SVG file.
- The Functional Mapping index in `icons.md` enables AI content
  generation: given a feature name, scan the index to retrieve the
  matching icon by function.

**Negative / trade-offs:**
- Anatomical names are less immediately readable to newcomers
  ("what does `arrows-left-right` do?"). The registry must be
  consulted to find icons by function — the filename alone is
  not self-explanatory.

---

## Related decisions

- ADR-004 — Port UI test to Brand OS (icon display in system/)
