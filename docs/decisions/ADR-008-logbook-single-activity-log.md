# ADR-008 — Logbook as the single activity log

**Status:** Implemented
**Date:** 2026-04-29
**Author:** Romain (Art Director)

---

## Context

Three types of session activity needed a home: session logs, daily
reviews, and quality audits. Session logs and daily reviews were already
in `system/logbook.html`. Audits lived in a separate `system/audit.html`.

`audit.html` had no navigation path — it was not linked from `system/nav.js`
or `system/index.html`. Finding an audit entry required knowing the URL
directly. The page was effectively a dead end.

---

## Options considered

**Option A — Keep audit.html as a separate dedicated page**
Audits have a distinct structure (layer/check/status table) that
differs from session narrative logs. A dedicated page keeps concerns
separate.
*Rejected: the separation created an unreachable page with no nav entry.
The distinct structure is handled by data-type filtering, not by
file separation.*

**Option B — Merge audit entries into logbook.html with type filter**
Add a `data-type` attribute to every logbook entry. A filter bar
(All / Session / Daily review / Audit) lets users isolate by type.
Audit entries use the same chronological position as all other entries.
*Accepted.*

---

## Decision

`system/logbook.html` is the single file for all session activity:
session logs (`data-type="session"`), daily reviews
(`data-type="daily"`), and quality audits (`data-type="audit"`).

`system/audit.html` is deleted. All references — `system/nav.js`,
`system/index.html`, `.claude/commands/audit.md`, `docs/inventory.md`
— were updated to point to the logbook's audit filter.

The `/audit` command writes new audit entries into `logbook.html`
as `data-type="audit"` entries, not into a separate file.

---

## Consequences

**Positive:**
- All activity is findable in one place, in chronological order.
- The filter bar provides type isolation without file fragmentation.
- No dead-end pages with missing nav entries.

**Negative / trade-offs:**
- A single file accumulates all entry types over time — larger file
  as the project matures.
- Audit-specific CSS (`.audit-badge`, `.audit-col-value`) lives in
  `brandOS-components.css` alongside logbook styles, not scoped to
  a dedicated page.

---

## Related decisions

- ADR-006 — Component Documentation Anatomy (spec-block structure
  used in system/ pages)
