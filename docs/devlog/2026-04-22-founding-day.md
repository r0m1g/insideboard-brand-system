# 2026-04-22 — Founding Day

> *Retrospective entry — written 2026-04-28 from git history and Claude chat conversation history.*

**Session duration:** ~8h across three conversation threads  
**Phase:** 0 (pre-phase numbering) → becoming Phase 1  
**Commits:** 13  
**Status at close:** Brand OS live on GitHub Pages. Sections 00, 04, and 05 added. Document mobile-ready.

---

## What happened

April 22 was the day the project changed nature. Three conversations ran in sequence, each building directly on the previous one. By the end of the day, the project had a public URL, a new name, and three new sections.

### First thread — GitHub Pages migration (conversation `4ab3366f`)

The strategy and verbal identity work had been accumulating in markdown files. Moving to a stable, browsable, shareable document required a hosting decision. The options considered:

- **Netlify Drop** — eliminated immediately: the link is only available for one hour.
- **GitHub Pages** — chosen.

The setup took minutes:
1. Repo created at `r0m1g/insideboard-brandOS` (renamed from `insideboard-brand-system`)
2. The main HTML file renamed to `index.html` — *"c'est important, GitHub Pages cherche ce nom par défaut"*
3. Pages activated on the `main` branch

The rename from `insideboard-brand-system` to `insideboard-brandOS` was a byproduct of the naming decision made in the same session (see below).

### Second thread — Brand OS naming and content sprint (conversation `ad06dc2a`)

This was the most consequential conversation of the day. It opened with a naming question: `Brand System`, `Brand OS`, or `Brand Source`?

The argument for `Brand OS`:

> *"Brand OS [...] signale que c'est un système opérationnel, pas un guide statique. Cohérent avec l'ADN tech de la marque et avec la couche Automation que tu construis. Un document qui va jusqu'à l'automatisation de la production n'est pas un 'brand guide' — c'est un système d'exploitation de la marque."*

Romain validated in one line: *"ok pour Brand OS !"*

This was the most structurally significant decision of the project. It retroactively reframed everything produced before: the strategy, the verbal identity, the visual system. Not a brand guide. An operating system.

**Section 00 — System Overview** was drafted and refined in this conversation. The title went through three iterations: `Introduction & Governance` → `Not a Style Guide` → `System Overview` (with a sub-section titled `The Brand OS`). The audience table, document map, usage table, and governance blocks were all written here.

**Section 04 — Brand Experience Map** was added in the same session: touchpoint map, production logic, and the 5-question calibration checklist. The checklist is the most operationally useful piece in the entire document:

> *"5. Could this text appear on any competitor's SaaS website? If yes → restart."*

**Section 05 — Brand Voice in Action** followed: before/after examples, anti-patterns, and the calibration checklist in its applied form.

**IRON greetings** were updated in the same thread: static and contextual modes added to sections s16 and s23. Document map updated to mark section 05 as Validated.

### Mobile responsiveness sprint

The initial upload had already exposed mobile overflow issues. These were fixed in sequence across 8 commits during the afternoon:

- `overflow-x: hidden` on body, `min-width: 0` on grid children, `flex-wrap` on the eyebrow element
- Table overflow: cells stacked vertically on mobile instead of a 3-column layout
- Column labels restored via CSS `::before` for the stacked view
- Bottom border on stacked table cards: three iterations to get right (double border → outer border → `box-shadow` to avoid overflow clipping)
- Final fix: `padding-bottom: 1px` to prevent last card border from being clipped

The table border problem was the most stubborn: the standard `border-bottom` approach was clipped by `overflow: hidden` on the parent. The `box-shadow` workaround is the canonical solution for this pattern.

### Third thread — Aesthetic refinements (conversation `673e4b6f`)

A shorter session at the end of the day covering hover state polish and visual calibration. The badge (`.lb`) hover states were redesigned to be brand-aligned. This set the visual language for interactive states that would carry through the rest of the project.

---

## Decisions made

| # | Decision |
|---|---|
| — | GitHub Pages on `main` branch, `index.html` as entry point — no build step, no ambiguity |
| — | **Brand System → Brand OS** — the naming shift that reframes the entire project |
| — | Repo renamed `insideboard-brandOS` to match the new identity |
| — | Section 00 title: `System Overview` (not `Introduction & Governance`, not `Not a Style Guide`) |
| — | 5-question calibration checklist as the operational anchor of Section 05 |
| — | `box-shadow` for mobile table card borders — avoids `overflow` clipping |

---

## What's next

- CSS externalization: styles are still inline in `index.html`
- Process rules for Claude Code: multi-file architecture, str_replace-only protocol
- Badge system needs formalization: `.wip` states, nav link behavior
