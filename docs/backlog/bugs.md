# Bugs

Known issues and regressions. Remove when fixed; add a note to the DEVLOG.

Format: `- [date] [severity: low/med/high] Description — repro steps if non-obvious`

---

- [2026-04-26] [low] Register switcher content (`rc` object, index.html L1522-1528) not in `brandOS-content.md` — violates content-first rule. `.textContent` rendering also prevents `<strong>IRON</strong>` bold in the Product card. Fix: migrate `rc` strings to static HTML, keep only switch logic in JS.
- [2026-04-26] [med] Verbal Rules — IRON label/body alignment broken. Body text should follow "IRON" inline on the right with a "never" label, but bold or italic inside list items pushes part of the body into the label column. Affects readability of the rule.
- [2026-04-26] [fixed] Backlog filters had no effect — JS handler on `.rf-btn` intercepted backlog buttons too, double-toggling `.active` and cancelling the filter. Fixed by restricting roadmap selector to `.rf-btn[data-filter]`.
- [2026-04-26] [fixed] `var(--steel)` used in backlog CSS but token is named `--fn-steel` — undefined variable caused TODO filter button and cat label to inherit color instead of rendering Steel blue. Fixed by replacing all instances with `var(--fn-steel)`.
