# 2026-04-29 — Governance, ADRs, logbook, roadmap, and system tooling

**Phase:** 5 · Governance + tooling sprint  
**Type:** Protocol + Implementation

---

The most infrastructure-heavy day since project genesis. Three parallel threads: governance formalization (conventional commits, `/adr` command, three ADRs), logbook UI overhaul (day cards, type filters, audit consolidation, SVG sprite), and system tooling (renderHub() auto-nav, process page, roadmap drawer). The day ended with the feat/ui-exploration branch fully merged into main and the workflow locked down to single-branch.

## Branch consolidation

`feat/ui-exploration` → `main` via `chore(branches): consolidate`. The exploration branch had diverged significantly and was carrying public-facing changes (CSS, HTML, system pages) that should live on `main`. After consolidation, the single-branch doctrine was formalized in governance.

Immediately after: hero badge links were wired to `.layer-intro` anchors (not nav items), layer status display was reverted after a visual regression, and SVG icon files that had been lost from git history were restored.

## Conventional Commits

Adopted Conventional Commits (`type(scope): description`) as the commit convention. Types: `feat`, `fix`, `style`, `refactor`, `docs`, `chore`, `log`. Special types: `log(session)` for session-end entries, `log(daily)` for day-end. Scopes aligned to section IDs and system areas. Formalized in `CLAUDE.md` and enforced going forward.

## `/adr` command + three ADRs authored

**`.claude/commands/adr.md`** — 9-step protocol for Architecture Decision Records: context, criteria, options, analysis, decision, and auto-registration in `system/docs.html`. ADRs authored:

- **ADR-007 · Conventional Commits** — Adopted as the commit convention. Rationale: machine-readable log, clear scope, standard tooling compatibility.
- **ADR-008 · Logbook as single activity log** — `system/audit.html` deleted; all audit entries consolidated into `system/logbook.html` with `data-type="audit"` filter. One source of activity truth.
- **ADR-009 · Single-branch workflow** — `main` is the only long-lived branch. GitHub Pages serves from it directly. Experiment branches are temporary and deleted after merge.

Step 9 added to the `/adr` command after the first run revealed the auto-registration step was missing: new ADRs now register themselves in `system/docs.html` phasesData.

## `/roadmap` command + Phase 5 activated

**`.claude/commands/roadmap.md`** — command for phase status updates (planned → active → complete), new phase addition, and step updates. **Phase 5 · Governance formalization** activated as the current phase.

Roadmap visual: status labels renamed for clarity, completed phases collapsed into a drawer to reduce visual noise in `system/docs.html`.

## Logbook overhaul

**Day card system.** Entries grouped by date under collapsible day headers. Each day card shows commit count + session count badge.

**Type filter system.** Color-coded filters: session / audit / daily / milestone. Each type has a distinct accent color. Filter state is persisted in the URL hash.

**Audit consolidation.** `system/audit.html` deleted (per ADR-008). The single audit entry it contained was migrated into `system/logbook.html` as `data-type="audit"`. All references to `audit.html` cleaned from nav, `system/docs.html`, and all other system pages.

**SVG sprite system.** Navigation icons moved from inline SVGs to a `<symbol>`-based sprite block at the top of each system page, referenced via `<use href="#...">`. Reduces per-page markup; single source for each icon shape.

**Audit layer 10.5 added** to `audit.md` — checks that every activity date (commit + devlog + ADR) has a matching `data-type="session"` entry in the logbook.

## System tooling

**`renderHub()` in `system/nav.js`** — auto-generates the workbench hub navigation links from a data array. Nav items no longer need to be manually kept in sync across 11 system pages; `nav.js` renders them from the single source.

**Process page** (`system/process.html`) — new system page documenting the update protocols from `PROCESS.md` in a rendered, navigable format.

**Dependency map** — cascade rules added to `CLAUDE.md`: for every source file modified, the derived artifacts that must be updated in the same operation are now explicit.

**Pre-commit hook** — `scripts/pre-commit.sh` scaffolded to run cascade checks at `git commit` time.

## Notable decisions

**`audit.html` deleted, not archived.** The page was thin and its content (one entry) migrated cleanly. Keeping it would have created a split-brain for activity history. ADR-008 documents the rationale.

**`renderHub()` as the nav source of truth.** Previously each system page duplicated its full nav. The hub renderer eliminates drift at the cost of a JS dependency — acceptable because all system pages already depend on `nav.js`.

**Warn chips in session-end.** `/session-end` now detects unresolved "warn" items (open audit findings, backlog bugs) and surfaces a chip to the user. Prevents silent drift between sessions.
