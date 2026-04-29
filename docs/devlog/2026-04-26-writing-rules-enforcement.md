# 2026-04-26 — Writing rules enforcement

## What happened

Established and enforced three brand writing rules across the entire project:

- **"Brand OS"** — with a space and capitalised initials. Never `BrandOS`.
- **"IRON"** — always uppercase and bold in body copy (`<strong>IRON</strong>` in HTML, `**IRON**` in markdown). Heading exemption. JS `.textContent` exemption documented as a known bug.
- **"InsideBoard AI"** — capital I and B, no space, space + uppercase AI.

## Files updated

- `brandOS-content.md` — §2·5 extended with Naming & typography rules subsection; ~26 IRON occurrences bolded
- `index.html` — §2·5 HTML updated; ~35 IRON occurrences wrapped in `<strong>`; nav-brand-sub fixed
- `CLAUDE.md` — Writing rules added to behavioral rules; title fixed
- `PROCESS.md` — Title and body references fixed; IRON bolded in token description
- `docs/ROADMAP.md`, `docs/backlog/ideas.md`, all ADRs, all devlogs — `BrandOS` → `Brand OS`
- `system/*.html` — nav `← Brand OS` fixed in all pages
- `system/lab/*.html` — nav + IRON bold

## Bug logged

Register switcher `rc` object (`index.html` L1522-1528) renders via `.textContent` — `<strong>` tags appear literally. Fix: migrate static strings to HTML, keep only switch logic in JS.

## Memory / process

- Saved `feedback_syncmain.md` — never use `git cherry-pick` for syncmain; always use `git checkout <branch> -- <files>`
- `feedback_writing_rules.md` updated with InsideBoard AI rule
- Writing rules added to `CLAUDE.md` behavioral rules for session-start enforcement
