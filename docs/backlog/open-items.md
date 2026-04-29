# Open items

Deferred warn chips from `/session-end` and `/day-end`. Each entry was flagged during a session review and explicitly deferred for a future session.

Format: `[date] [warn label] — why it occurred — Resolution: path to fix`

When resolved: strike through the entire line and append `✓ resolved YYYY-MM-DD`. Do not delete — the history stays visible. The session log for the resolving session is the trace; no separate devlog entry needed.

---

- [2026-04-28] open items — sidebar fidelity — Visual verification of `system/nav.js` sidebar against Brand OS reference never completed (no preview server available in shell). Multiple correction rounds on nav typography (16px/34px brand sizes, border-bottom, `ngl-link` hover/active states) — code in place but render fidelity unconfirmed. — Resolution: start a local server (`python3 -m http.server`), open the workbench sidebar side-by-side with Brand OS nav, verify typography, spacing, active states, and hover behavior match exactly.

- [2026-04-27] 1 risk — governance files off main — `CLAUDE.md`, `PROCESS.md`, `brandOS-content.md`, and `assets/svg/` removed from `main` as part of Update type 7 (display-only branch). Any tool or contributor reading `main` sees no source context or governance files. Still the case today. — Resolution: decide whether governance files should live on a separate `source` branch (GitLab migration Phase 5) or be restored to `main` with a display-only toggle. Document the decision as an ADR.
