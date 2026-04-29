Run a complete alignment audit of the Brand OS project.

**Non-negotiable principles:**
1. **Invariants, not specific cases.** Every check must apply to any future addition without modification.
2. **Observed evidence, not assumed.** Every check produces a concrete *Observed* line (count, file:line, diff). No "OK" without evidence.
3. **Bidirectional.** For any A→B relation, also verify B→A (orphans in both directions).
4. **Source of truth named.** Every check declares: the rule, the source, the derived artifact.
5. **If you can't verify, say so.** Mark `⊘ not-automatically-verifiable` rather than inventing a verdict.

**Execution order (non-negotiable):** Layer 0 first. If governance is broken, auditing the rest is wrong. End with Layer 12 (self-verification).

**Mandatory output format for every check:**
```
[Layer X · check Y] <short invariant name>
  Rule     : <one-line invariant>
  Source   : <file:section or path>
  Derived  : <file:section or "—">
  Method   : <how it was verified — grep, diff, parse, etc.>
  Observed : <count + concrete examples file:line, or diff>
  Verdict  : ✓ aligned | ✗ drift | ⚠ partial | ⊘ not-verifiable
```

---

## Layer 0 — Governance

**Before any other check: is the compass correct?** If Layer 0 has drift, flag it and continue, but the user knows the rest is judged against potentially stale rules.

### 0.1 — Internal coherence between rule files
- Invariant: `CLAUDE.md` (project) and `PROCESS.md` never contradict each other
- Method: extract imperative rules from each file, look for explicit contradictions (X says "always Y", Z says "never Y")

### 0.2 — Reference integrity (docs cite things that exist)
- Invariant: every file/class/selector/section named in `CLAUDE.md` or `PROCESS.md` actually exists
- Method: extract names cited in tables (Key classes, File architecture, Responsive breakpoints, Section structure example, Layer name vs section title), grep against the real codebase
- Mandatory bidirectional: any recurring pattern in the code (3+ occurrences of a structural class) must be documented

### 0.3 — Rules ↔ enforcement (meta-coverage)
- Invariant: every rule in `CLAUDE.md`/`PROCESS.md` is covered by at least one audit layer
- Method: extract the list of imperative rules, map each one to a layer (1–11). Any unmapped rule → audit gap to flag

### 0.4 — Governance freshness
- Invariant: ADRs marked "Accepted" still reflect the state of the code
- Method: for each Accepted ADR, verify the decision is still implemented (whenever verifiable)
- Memory entries: dated and consistent with current rules

---

## Layer 1 — Sources of truth & generated artifacts

### 1.1 — Generation pipeline (artifacts up to date)
- Invariant: every generated file matches what its generator would produce on the current source
- Method:
  - `tokens.json` → `brandOS-tokens.css`: run `node scripts/build-tokens.js` into a temp file, diff against the current `brandOS-tokens.css`. Diff ≠ 0 → either an illegal hand-edit, or a rebuild was forgotten
- Required Observed: the exact diff (first hunks) or "empty diff"

### 1.2 — `brandOS-content.md` ↔ `index.html` (structure)
- Invariant: bijection between `### N·N Title` (content.md) and `<!-- SECTION: sNN -->` (index.html), same order, same numbering
- Invariant: bijection between `## Layer XX · Name` (content.md) and `.layer-intro` (index.html)
- Method: extract both lists, compare in bulk. List explicitly orphans source→derived AND derived→source
- Required Observed: count on both sides, list of any divergences

### 1.3 — `brandOS-content.md` ↔ `index.html` (content)
- Invariant: every visible text in `index.html` is traceable to `brandOS-content.md` (derivation rule: see CLAUDE.md "Content derivation rules")
- Method: for each section, verify `h2` matches the title, `.pr` matches the first paragraph, `.li-name`/`.li-desc` match the `## Layer`. Spot-check on 20% of random sections (full check if <10 sections)
- Required Observed: sections checked + textual divergences found

### 1.3b — `assets/icons/` ↔ `assets/icons/icons.md` (registry sync)
- Invariant: every SVG file in `assets/icons/` (excluding `-active` variants) has a matching `#### name` entry in `icons.md`, and every entry in `icons.md` (excluding the template `[anatomical-name]`) has a matching SVG file
- Method: `node scripts/check-icons.js` → exit 0 means clean; exit 1 prints orphans in both directions
- Required Observed: script output (exit code + count line, or list of orphans)
- Verdict `✗` drift if any orphan detected in either direction

### 1.4 — Multi-source coherence
- Invariant: no piece of information has two divergent sources of truth
- Generic examples (recompute dynamically): the list of ADRs (cited in `system/docs.html` JS and present as files), the list of phases (ROADMAP.md and JS), the list of layers (content.md and `.lbadges`/nav)
- Method: for any structured list present in 2+ places, extract and compare

---

## Layer 2 — Generic semantic coherence

### 2.1 — Textual state ↔ CSS modifier class
- Invariant: **wherever a state is expressed both textually and visually styled, the mapping (text → modifier class) is complete and coherent**
- Method:
  1. Identify the sets of states in the project (backlog statuses, register modes, active states, etc.). Source: grep `.X--Y` classes in CSS, plus repetitive textual labels in HTML
  2. For each set, verify that any element with a textual state (`done`, `active`, etc.) also carries the matching modifier class (and conversely)
- Required Observed: the (text, applied classes) pairs found by sample

### 2.2 — `data-*` attributes and their triggers
- Invariant: every CSS selector `[data-X="Y"]` corresponds to an attribute actually present in the HTML (and vice versa)
- Method: grep attribute selectors in CSS, grep `data-` in HTML, diff

---

## Layer 3 — CSS ↔ HTML (bidirectional coverage)

### 3.1 — Every used class exists
- Invariant: every class referenced in `index.html`, `system/*.html`, `docs.html` is defined in `brandOS-components.css` or `brandOS-tokens.css`
- Method: extract used classes (parse `class="..."`), extract defined classes (parse CSS selectors), diff usage→definition
- Required Observed: count + list of missing classes

### 3.2 — Every defined class is used (dead code)
- Invariant: no CSS class defined and used nowhere
- Method: diff definition→usage. Before comparing, filter out tokens that contain `$`, `{`, `}` (JS template literal artifacts), standalone punctuation, and tokens starting with a non-alpha character — these are grep extraction artefacts, not real class names. Also exclude JS-toggled classes (set dynamically, never in static HTML) and utility classes explicitly marked (`u-` prefix, `/* utility */` comment, etc.)
- Verdict `⚠ partial` acceptable for utilities and JS-toggled classes
- Required Observed: count + list of genuine dead-code candidates (after filtering)

---

## Layer 4 — JS ↔ data

- Invariant: any JS that iterates over a documentary structure covers 100% of that structure
- Method: for each script (inline or external) that parses/iterates a markdown file or dataset, compare the structure expected by the script against the actual structure of the data
- Generically covers: roadmap-renderer ↔ ROADMAP.md, register-switcher ↔ defined modes, etc.
- Required Observed: the expected structure (extracted from JS) vs the actual structure (extracted from data)

---

## Layer 5 — Structural integrity (HTML, anchors, assets)

### 5.1 — Section markers
- Invariant: every `<!-- SECTION: id -->` has its matching `<!-- /SECTION: id -->` (same id), and wraps a `<section id="id">`
- Method: parse all markers, do open/close/section.id matching

### 5.2 — `id` uniqueness
- Invariant: every `id="..."` in `index.html` is unique
- Method: grep + count

### 5.3 — Internal links
- Invariant: every `href="#X"` in HTML points to an existing `id="X"`
- Method: extract `href="#..."` values → strip the leading `#` from each → sort; extract all `id="..."` values → sort; `comm -23` to find hrefs with no matching id. Do **not** compare raw href strings to raw id strings (the `#` prefix makes them always differ).

### 5.4 — Assets
- Invariant: every asset reference (`src=`, `href=`, `url(...)`) points to an existing file; every file in `assets/` is referenced somewhere
- Method: extract all `assets/...` references, list `assets/`, do a bidirectional diff

### 5.5 — Heading hierarchy
- Invariant: no level skip (h1 → h3 with no h2)
- Method: sequential parse of headings in `index.html`

---

## Layer 6 — Accessibility (existing rules to enforce)

- Invariant: every a11y rule declared in `CLAUDE.md` is respected in the HTML
- Method: extract a11y rules from CLAUDE.md (e.g. `.li-ghost` must have `aria-hidden="true"`), grep the HTML to verify
- No invented a11y rules — only those written in governance
- If a new a11y practice is detected in code but not documented → flag for addition to CLAUDE.md (reverse Layer 0.2 loop)

### 6.3 — No `@media` rules in `index.html`
- Invariant: all responsive breakpoints live in `brandOS-components.css` — `index.html` contains zero `@media` blocks
- Source: CLAUDE.md Responsive section
- Derived: `index.html`
- Method: `grep -c "@media" index.html` → expected: 0

### 6.4 — `.nav-overlay` pointer-events when inactive
- Invariant: `.nav-overlay` has `pointer-events:none` on its base selector (not only on `.visible`) — prevents the overlay from blocking hero clicks on mobile when it is hidden
- Source: CLAUDE.md "Known z-index stack" + Responsive rules
- Derived: `brandOS-components.css`
- Method: `grep -A3 "\.nav-overlay" brandOS-components.css | grep "pointer-events"` → `pointer-events:none` must appear on the base `.nav-overlay` rule, not only on `.nav-overlay.visible`

---

## Layer 7 — Writing conformance

- Invariant: all typographic rules from `CLAUDE.md` are respected across all content files
- Method:
  - "Brand OS": grep forbidden variants (`BrandOS`, `brandOS`, `brand os`, `BRAND OS`) in `*.md`/`*.html` excluding technical files (`brandOS-*.css`, the `brandOS-content.md` filename itself only)
  - "IRON": find body copy occurrences not wrapped in `<strong>`. Use the precise command:
    ```bash
    grep -n "IRON" index.html | grep -v "<strong>IRON\|IRON</strong>\|<h[1-6]\|<a \|textContent\|<!--"
    ```
    Classify each remaining hit by context: heading element → exempt; nav `<a>` → exempt; JS string / `.textContent` → exempt; inline `<b>` wrapping IRON → **violation** (rule requires `<strong>`, not `<b>`); bare text in body → violation.
  - "InsideBoard AI": grep forbidden variants
  - No `<style>` block in `index.html`
  - No hand-edits to generated files (Layer 1.1 already covers this)
- Required Observed: violation count + 3 examples max (file:line)

---

## Layer 8 — `system/` playground

- Invariant: every `system/*.html` page (excluding `lab/`) respects the 4 rules from CLAUDE.md
- Method: for each file in `system/`:
  - links `../brandOS-tokens.css` AND `../brandOS-components.css` ✓
  - has `<body class="sys">` ✓
  - has no `<style>` block in the `<body>` ✓
  - fake-content heuristic: no mention of "InsideBoard AI" or "IRON" in the body (except footer/branding nav)
- `system/lab/`: exempt from the fake-content rule but subject to the other 3

---

## Layer 9 — Branches & git workflow

- Invariant: `main` only contains `index.html`, CSS, `assets/`, `system/` (no `docs/`, `PROCESS.md`, `CLAUDE.md`)
- Invariant: if `feat/ui-exploration` is ahead of `main` for `index.html`/CSS/`system/`, a `/syncmain` is proposable
- Method:
  - `git ls-tree -r main --name-only` → verify no private file leaked there
  - `git diff --name-only main..feat/ui-exploration` → list divergent public files
- Required Observed: exact list of concerned files

---

## Layer 10 — Documentation freshness + devlog ↔ git

### 10.1 — `docs/ROADMAP.md` ↔ actual state
- Invariant: no phase marked "in progress" for already-merged code, no phase "planned" for already-shipped code
- Method: for each ROADMAP phase with a status, check coherence against git log and code state (verifiable only when explicit markers exist)

### 10.2 — Backlog ↔ reality
- Invariant: backlog `done` items are actually done, open `bug` items are reproducible
- Method: spot-check on the 5 most recent items

### 10.3 — Devlog ↔ git
- Invariant: every day with commits on `feat/ui-exploration` has a `docs/devlog/YYYY-MM-DD-*.md` file
- Method: `git log --since="14 days ago" --pretty=format:"%ad" --date=short` → unique dates, compare with devlog listing

### 10.4 — `docs/ROADMAP.md` ↔ `system/docs.html` (phase sync)
- Invariant: every `### Phase X` in `docs/ROADMAP.md` has a matching `.phase-card[data-phase]` button in `system/docs.html` AND a matching key in the `phasesData` JS object. Phase status must match.
- Method:
  - Extract phase names + statuses from ROADMAP.md (`### Phase X · Name` + status symbols `✓` / `◔` / `○` / `…`)
  - Extract `data-phase` values + `data-status` from `system/docs.html` `.phase-card` buttons
  - Extract keys from `phasesData` object in `system/docs.html`
  - Three-way comparison: ROADMAP phases ↔ HTML cards ↔ phasesData keys
- Status mapping to verify:

  | ROADMAP.md symbol | `data-status` | CSS class |
  |---|---|---|
  | `✓` Done | `done` | `phase-card--done` |
  | `◔` In progress | `active` | `phase-card--active` |
  | `○` Planned / `…` Future | `future` | `phase-card--future` |

- Required Observed: phase count on both sides, any missing entry, any status mismatch (file:line)
- Verdict `✗` drift if any phase present in ROADMAP.md is absent from docs.html (or vice versa)

---

## Layer 11 — Past-violation detection

- Invariant: recent git log contains no commit that violates governance rules
- Method: on the last 20 commits:
  - direct edit of `brandOS-tokens.css` not preceded/followed by a change to `tokens.json` or `scripts/build-tokens.js` → violation
  - `<style>` block added to `index.html` → violation
  - text added to `index.html` without a corresponding change in `brandOS-content.md` → violation (heuristic: commit touching `index.html` but not `brandOS-content.md`, to inspect)
- Use verdict `⚠` rather than `✗` when the heuristic could yield false positives

---

## Layer 12 — Audit self-verification (closing layer)

**This layer runs after all the others.**

### 12.1 — Rule coverage
- For every imperative rule found in Layer 0.3, indicate which layer actually enforced it
- Any rule without enforcement → audit gap to fix in this file

### 12.2 — File coverage (gaps only)
- Do **not** list every file. Only report files that are not covered by any audit layer and are not trivially excluded (fonts, logos, binary assets, `.gitignore`, `.DS_Store`).
- Method: for each non-trivial file in the repo, identify which layer(s) explicitly read or grep it. Any file with no matching layer is an audit gap — flag it with a suggested layer to extend.
- A file is "covered" if at least one layer check explicitly reads it or greps its content.

### 12.3 — Layer-list regeneration check
- Meta question: if a new rule were added to `CLAUDE.md` today, would it be automatically covered by an existing layer?
- If not → suggest the layer to extend or create

---

## Final report

Output structure:

1. **Executive summary**: 1 line per layer, global status (✓/✗/⚠), number of drifts found
2. **Per-layer details**: every check in the strict format defined at the top
3. **Coverage section** (Layer 12): unenforced rules, untouched files, extension suggestions
4. **Prioritized action plan**:
   - **Blocking** (governance broken, derivation incoherent)
   - **Minor** (drift to fix soon)
   - **Informational** (note, not urgent)

**Never propose automatic fixes during the audit.** The report informs; corrections go through dedicated operations (Update types in `PROCESS.md`).

**After all corrections are applied**, the action plan includes this mandatory final step — listed as an explicit numbered item at the same level as any blocking or minor fix:

**Step N — Add an audit entry to `system/logbook.html`**
Append a new `<div class="log-entry" data-type="audit">` entry following the structure of the existing audit entries in `system/logbook.html`:
- Date of the run
- Layer-by-layer status (✓ / ⚠ / ✗)
- Finding counts by priority (blocking / minor / informational)
- A findings table: one row per item — finding description, fix applied, resolution status
- A logbook-style `audit-desc` paragraph: written as a human would read it months later — honest, specific, with a sense of what the system looked like at this moment and what the run actually changed. Not a changelog. Not a list. A record.

Use the existing `data-type="audit"` entries in `system/logbook.html` as the template. This step is not optional — the audit history is the institutional memory of the system's health.

**Step N+1 — Write a devlog entry**
Create `docs/devlog/YYYY-MM-DD-audit-run.md` (same date as the run). Content:

```markdown
# Audit run — YYYY-MM-DD

**Layers checked:** 0–12
**Findings:** X blocking, Y minor, Z informational
**All fixed:** yes / no (list what remains open if any)

Ref: [system/logbook.html](../../system/logbook.html) — audit entry for this date (filter: Audit).

## Notable findings
[One bullet per finding that has architectural significance — things a future reader
would want to know when they see a related commit or face a similar decision.]
```

This step links the two tracking systems: the logbook (audit filter) holds the health record, `devlog/` holds the decision context. Both must exist after a run.
