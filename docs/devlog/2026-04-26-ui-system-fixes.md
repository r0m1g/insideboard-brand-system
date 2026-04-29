# 2026-04-26 · UI system fixes & status/priority system

## What changed

### Backlog — grouping & filters
- Restructured flat backlog into 5 `.backlog-group` containers (Bug, Todo, Idea, Question, Workflow) with colored group labels.
- Added spacing between groups and a label header for each.
- Fixed a JS bug: the roadmap `.rf-btn` handler was intercepting backlog buttons too, causing double-toggle of `.active` and effectively disabling all filters. Fix: restricted roadmap selector to `.rf-btn[data-filter]`.
- Filter buttons now toggle groups (`[data-group]`) rather than individual rows.

### Status & priority color system
Formalized a four-state semantic color mapping, consistent with the functional palette:

| State | Token | Hex | Meaning |
|-------|-------|-----|---------|
| Done | fn-moss | #6B8F5A | Completed, validated, success |
| High | ember | #EE2E20 | Urgent, blocking |
| Med | fn-amber | #C8882A | Moderate priority |
| Low | fn-ochre | #B8963E | Low urgency, informational |

Status chips now render as colored pills (style matching `phase-tag--done`) instead of plain text. Done rows in the backlog take an ivory background, matching the roadmap "complete" card style.

### Active roadmap → Steel
Changed `.phase-card--active`, `.phase-tag--active`, and the `◔ Active` filter button from Ember (brand signal color) to Steel (#4A7FBF). Rationale: the Brand OS reserves Ember for brand-level signal moments and negative/error states. Steel is the appropriate marker for in-progress/active states in the product register context.

### Bug fix: `var(--steel)` → `var(--fn-steel)`
The CSS token for Steel blue is `--fn-steel`. Two backlog rules used the undefined `--steel`, causing the TODO label and filter button to fall back to inherited color. Fixed.

### Mobile sys-nav responsive
Added `@media(max-width:720px)` rule: `.sys-nav` wraps to two lines, `.sys-links` takes full width with horizontal scroll (`overflow-x: auto`). All 5 nav links are now accessible on mobile.

### Brand OS 3·02 — UI state & priority
Added new subsection `#### UI state & priority system` to `brandOS-content.md` (section 3·02) and the corresponding HTML block in `index.html`. The status color system is now documented as part of the official brand system alongside the functional palette.
