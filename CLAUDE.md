# CLAUDE.md — InsideBoard AI Brand OS

This file is read automatically by Claude Code at the start of every session.
It defines the project architecture, constraints, and behavioral rules.

---

## Project

InsideBoard AI Brand OS — a living HTML document that serves as the single source of truth for the brand identity system. Built and maintained by the Art Director.

---

## File architecture

| File                   | Role                                                              |
|------------------------|-------------------------------------------------------------------|
| `tokens.json`            | Source of truth for design tokens (W3C Design Tokens format)      |
| `brandOS-tokens.css`     | **Generated** from `tokens.json` — never hand-edit                |
| `scripts/build-tokens.js`| Generator: `tokens.json` → `brandOS-tokens.css`                   |
| `brandOS-components.css` | All component styles, layout, navigation, responsive breakpoints  |
| `index.html`           | Pure HTML — named index.html for GitHub Pages (required by web servers) |
| `brandOS-content.md`           | Content source of truth — maps 1:1 to HTML sections              |
| `PROCESS.md`           | Full update protocols and prompt-types for all operation types    |
| `docs/`                | Project documentation: ROADMAP, ADRs, devlog, backlog            |
| `system/`              | Design system playground — consumes root CSS, never duplicates it |

---

## Behavioral rules — non-negotiable

### Editing rules
- **str_replace only** for all modifications. Never rewrite a complete file when a section has changed.
- **One file per operation.** A content update targets `index.html` only. A token update targets `tokens.json` only (then regenerate). A component update targets `brandOS-components.css` only.
- **Never hand-edit `brandOS-tokens.css`.** It is generated from `tokens.json` by `scripts/build-tokens.js`. Edits will be lost on the next regeneration. To change a token: edit `tokens.json`, then run `node scripts/build-tokens.js`.
- **Never add `<style>` blocks to `index.html`.** All styles live in the CSS files.
- **Section markers must be preserved.** Every `<!-- SECTION: id -->` and `<!-- /SECTION: id -->` comment must remain intact after any edit.

### Reading rules
- For content updates: read `brandOS-components.css` (class names only) + `brandOS-content.md` (content). Do not read `tokens.json` or `brandOS-tokens.css`.
- For token updates: read `tokens.json` only.
- For component updates: read `brandOS-components.css` only.
- For full regeneration: read `tokens.json`, `brandOS-components.css`, and `brandOS-content.md`.

### Never do
- Never rewrite `index.html` in full unless explicitly instructed with the regeneration prompt from `PROCESS.md`.
- Never add inline styles to `index.html` sections (inline styles already present on specific elements are intentional — do not remove them, but do not add new ones).
- Never modify `tokens.json` or `brandOS-components.css` during a content-only operation.
- Never hand-edit `brandOS-tokens.css` — it is a generated artifact. Edit `tokens.json` instead, then re-run the generator.
- **Never write visible text into `index.html` that does not already exist in `brandOS-content.md`.** This includes labels, captions, mode names, demo copy — anything a user reads. If the text doesn't exist in `brandOS-content.md`, add it there first, then derive the HTML from it. No exception.

### Writing rules — language
- **All produced files are in English.** Code, comments, skills, commands (`.claude/commands/`), audits, ADRs, devlog entries, backlog, PROCESS, CLAUDE, and any other committed artifact. French belongs to the live chat between Romain and Claude — never to files. Even when the chat instruction is in French, file output stays English. Brand content in `brandOS-content.md` and the rendered `index.html` is currently English-only; producing a French version would be an explicit, separate operation, not a drift from a French conversation.

### Writing rules — naming & typography
- **"Brand OS"** — always with a space and capitalised initials. Never `BrandOS`, `brandOS`, `brand os`, or `BRAND OS`. Exempted: technical filenames (`brandOS-content.md`, `brandOS-tokens.css`, `brandOS-components.css`) keep their form as established identifiers.
- **"IRON"** — always uppercase and bold in body copy (`<strong>IRON</strong>` in HTML, `**IRON**` in markdown). In headings, heading weight already provides emphasis — no additional bold needed. Exempted: JS string contexts rendered via `.textContent`.
- **"InsideBoard AI"** — always with capital I and B (no space between Inside and Board), space, uppercase AI. Never `Insideboard AI`, `Inside Board AI`, `insideboard ai`, or `INSIDEBOARD AI` in body copy. Exempted: deliberate all-caps graphic treatments (email signatures, stamps, letterheads).

### Process is mandatory
`PROCESS.md` defines the update protocol for every operation type. It is not optional reading — follow it for every edit, without waiting to be reminded. Before touching any file, identify the operation type (content / token / component / new section) and apply the corresponding protocol from `PROCESS.md`.

### Branch workflow

**`main`** is the single working branch. All edits happen here. GitHub Pages serves directly from `main`.

**To publish:** run `/syncmain` — pushes `main` to remote. Propose proactively at the end of any session where `index.html`, the CSS files, or `system/` changed meaningfully.

For risky explorations, create a temporary `experiment/<name>` branch and delete it after merging back.

### Commit conventions (Conventional Commits)

All commit messages follow: `type(scope): description`

| Type | When to use |
|------|------------|
| `feat` | New section, component, icon, or feature |
| `fix` | Bug in HTML, CSS, scripts, or content error |
| `style` | Visual CSS / token change, no structural impact |
| `refactor` | CSS restructuring, class rename — no visual change |
| `docs` | ROADMAP, ADR, PROCESS.md, CLAUDE.md updates |
| `chore` | Build scripts, config, generated files |
| `log` | Logbook entries — session-end, day-end |

**Scopes:** section IDs (`s11`, `s22`), system areas (`tokens`, `components`, `nav`, `icons`, `system`), doc areas (`roadmap`, `adr`, `logbook`), scripts (`syncmain`, `build-tokens`).

**Examples:**
- `feat(s22): add tone & voice section`
- `fix(nav): correct mobile z-index on hero badges`
- `style(tokens): update ember to #D45A2A`
- `docs(roadmap): mark phase 2 complete`
- `chore(syncmain): simplify to single-branch push`
- `log(session): 2026-04-29 — branch consolidation`

### Structural coherence — mandatory

`brandOS-content.md` is the single source of truth for structure: layer names, section titles, section order, and what exists. `index.html` implements it. No other file maintains a structural list.

**After any structural operation** (new section, removed section, renamed layer or section title), verify before closing:
- Every `### N·N Title` in `brandOS-content.md` that is implemented has a matching `<!-- SECTION: id -->` in `index.html`
- Every `## Layer XX · Name` in `brandOS-content.md` has a matching `.layer-intro` and nav group in `index.html`

**At the start of any session where files have been modified**, run this alignment check first. If drift is detected between `brandOS-content.md` and `index.html`, surface it to the user before doing anything else.

Never leave a session with `brandOS-content.md` and `index.html` out of structural sync.

---

## Section structure

Each section in `index.html` follows this pattern:

```html
<!-- SECTION: s22 -->
<section class="chapter" id="s22">
  <div class="ch"><div class="cn">2·2</div><div>
    <h2>Section title</h2>
    <p class="pr">Principle with <em>highlight</em>.</p>
  </div></div>
  <div class="cb">
    <!-- section content -->
  </div>
</section>
<!-- /SECTION: s22 -->
```

The `<!-- SECTION -->` and `<!-- /SECTION -->` markers are the anchor points for all `str_replace` operations.

---

## Key classes — quick reference

| Class          | Component                        |
|----------------|----------------------------------|
| `.chapter`     | Section container                |
| `.ch`          | Chapter header (number + title)  |
| `.cb`          | Chapter body content             |
| `.cn`          | Section number (mono)            |
| `.pr`          | Chapter principle (large body)   |
| `.sub`         | h3 subsection title              |
| `.mi`          | h4 micro label (mono uppercase)  |
| `.rules-grouped` | Do / Don't / Note rule list (grouped by category) |
| `.callout`     | Callout box (add `.warn` variant)|
| `.fd`          | Formula dark block               |
| `.pc`          | Posture card (large Ink block)   |
| `.agrid`       | Audience card grid               |
| `.acard`       | Audience card                    |
| `.dtbl`        | Differentiation table            |
| `.vtbl`        | Verbal architecture table        |
| `.atbl`        | Anti-patterns table              |
| `.refc`        | Reference card (dark mono)       |
| `.layer-intro` | Layer divider (animated header)  |
| `.li-label`    | Layer number label (e.g. "Layer 01") |
| `.li-name`     | Layer name — large display type  |
| `.li-desc`     | Layer description — one sentence |
| `.li-ghost`    | Decorative echo of `.li-name` — always `aria-hidden="true"` |
| `.lbadges`     | Hero badge strip (one per layer) |
| `.lb`          | Individual hero badge            |
| `.rsw`         | Register switcher                |
| `.rdemo`       | Register demo block              |

---

## Content derivation rules — what comes from where

Every content element in `index.html` must be derivable from `brandOS-content.md`. Never write content directly into the HTML.

| HTML element | Source in content.md |
|---|---|
| `.cn` (section number) | The `N·N` prefix of the `###` heading — e.g. `### 1·1 Positioning` → `1·1` |
| `h2` (section title) | The text of the `###` heading after the number — e.g. `Positioning` |
| `.pr` (principle) | **The first paragraph** immediately after the `###` heading, verbatim or condensed to the key sentence |
| `.li-label` | Combined number and layer name from `## Layer XX · Name` — e.g. `00 · System Overview` |
| `.li-name` | First sentence of the `*italic line*` immediately after the `## Layer` heading |
| `.li-desc` | Remainder of the `*italic line*` following `.li-name` |
| `h3.sub` | `####` subheadings within the section |
| `h4.mi` | `#####` subheadings within the section |
| nav `<li>` | Section title (same as `h2`) |

**Rule:** If content cannot be found in `brandOS-content.md`, add it there first — then update the HTML.

**`.pr` rule — non-negotiable:** The `.pr` paragraph is the **first paragraph** of the `###` section verbatim. It does NOT replace the remaining paragraphs — those stay in `.cb`. Never condense, rewrite, or invent `.pr` text. If the first paragraph is long, use it in full.

**Second paragraph rule:** If a `###` section has a second paragraph in content.md, it belongs in `.cb` as a `<p>` before the first `####` subsection — never dropped.

---

## Layer name vs section title — critical distinction

Every layer has two distinct identifiers that must never be confused:

| Element | Uses | Example |
|---------|------|---------|
| `.li-name` (layer intro) | First sentence of italic descriptor | `Governance layer.` |
| `.ng-name` (nav group label) | **Layer name** | `System Overview` |
| `.lb` (hero badge in `.lbadges`) | **Layer name** | `00 · System Overview` |
| nav `<li>` | **Section title** from `### N·N Title` | `The Brand OS` |
| `.cn` (chapter number) | **Section number** | `0·1` |
| `h2` (chapter title) | **Section title** | `The Brand OS` |

**Rule:** `.lbadges` badges always use the **layer name**, never the section title. When a layer name differs from its first section title, the badge still shows the layer name.

---

## Responsive — rules and checklist

All responsive breakpoints live in `brandOS-components.css`. Never add `@media` rules to `index.html`.

| Breakpoint | Scope |
|---|---|
| `≤960px` | Mobile nav (sidebar hidden, hamburger shown), hero h1 reduced, main padding reduced |
| `≤720px` | Grids collapse, tables stack as cards, font sizes reduced |
| `≤480px` | Single-column grids, further font reductions |

**When making a content change (Update type 1), also check:**
- Does the new content introduce a new nav item or hero badge? → verify it's clickable on mobile (no z-index overlay blocking it)
- Does the new section use a multi-column grid? → a `@media(max-width:720px)` rule may be needed in `brandOS-components.css`
- Does a new table use custom column headers? → the `::before` content labels for mobile stacking may need updating in `brandOS-components.css`

**Known z-index stack:**
| Element | z-index |
|---|---|
| `.tweaks` panel | 100 |
| `.nav-overlay` | 149 |
| `nav.side` (mobile) | 150 |
| `.nav-toggle` | 200 |

The `.nav-overlay` must always have `pointer-events:none` when not `.visible` — otherwise it blocks clicks on the hero section on mobile.

---

## JS — do not modify

The inline `<script>` block at the bottom of `index.html` handles:
- Register switcher (`applyReg()`)
- Density tweaks panel
- Nav active state via IntersectionObserver
- Mobile nav toggle

These 40 lines are stable. Do not modify, move, or rewrite them.

---

## Content source

`brandOS-content.md` is the authoritative content source. Its structure maps to `index.html` sections:

- `## Layer 00` → `#s00`
- `## Layer 1` → `#s11` through `#s17`
- `## Layer 2` → `#s21` through `#s27`
- `## Layer 3` → `#s01` through `#s10`
- `## Section 04` → `#s40`
- `## Section 05` → `#s50`

When in doubt about update protocols, read `PROCESS.md`.

---

## Iconography

Icons are managed via the `/svg` command — the single execution path for icon optimization, naming, and registration. The doctrine lives in [`.claude/commands/svg.md`](.claude/commands/svg.md).

| File | Role |
|---|---|
| `.claude/commands/svg.md` | Protocol — outline detection, anatomical naming, standardization, active states, validation gates |
| `assets/icons/icons.md` | Registry — every icon documented with anatomy, semantic aliases, functional mapping, inline SVG code |
| `assets/icons/[brand\|platform]/[category]/*.svg` | Optimized icon files |
| `assets/logos/*.svg` | Logos — managed separately, not part of the icon system |

**Key rules:**
- **Filenames are anatomical, never functional.** `arrows-left-right.svg`, not `resize.svg`. Functions are captured as `Semantic Aliases` in the registry. The same icon can serve multiple functions; only one anatomical name describes its shape.
- **One icon per `/svg` call.** The command always validates anatomical name, aliases, category, functional mapping, `<desc>`, active state, and each file write before proceeding.
- **Outline-to-stroke conversion is refused.** If a SVG is detected as vectorized fills (Illustrator export), the command alerts and asks for re-export from Figma in stroke mode. Conversion is not reliably automatable by AI.
- **The `Functional Mapping` field of every registry entry** is the bridge between the icon system and content generation: when the AI is asked to illustrate a feature (e.g. "Knowledge mode"), it consults `assets/icons/icons.md` to retrieve matching icons by function.
- Brand iconography ↔ platform iconography are kept distinct (per `brandOS-content.md` section 2·5). The `/svg` command asks which system the icon belongs to as its first question.

---

## Documentation — docs/

| File | Role |
|---|---|
| `docs/ROADMAP.md` | Authoritative status of all phases and steps — update when a step changes state |
| `docs/decisions/ADR-*.md` | Architecture Decision Records — one file per architectural decision |
| `docs/devlog/` | Narrative session logs — one file per session, named `YYYY-MM-DD-slug.md` |
| `docs/backlog/ideas.md` | Speculative ideas not yet committed |
| `docs/backlog/bugs.md` | Known bugs and regressions |
| `docs/backlog/feedback.md` | Stakeholder or self-review feedback |

**Proactive rule:** At natural moments (phase complete, bug found and fixed, architectural decision made, session wrapping up), propose updating the relevant doc. Do not wait to be asked.

**Roadmap sync rule:** `docs/ROADMAP.md` and `system/docs.html` are a source/derived pair. Any change to `docs/ROADMAP.md` (phase status, new phase, step update) **must** be followed immediately by the corresponding update to `system/docs.html` (`phasesData` JS object + `.roadmap-track` HTML). See Update type 9 in `PROCESS.md` for the exact mapping. Never leave them out of sync.

---

## system/ — playground rules

- All `system/` pages link to `../brandOS-tokens.css` and `../brandOS-components.css` — never duplicate CSS
- All `system/` pages use `<body class="sys">` to activate the product register skin (white bg, Steel accent)
- Component prototypes in `system/` use fake/lorem content only — never real brand content
- `system/lab/` archives experiments (`ui-test.html`, `animation-test.html`) — do not delete them
- Update type 6 in `PROCESS.md` is the protocol for all system/ operations

---

## journal/ — out-of-scope side project

The `journal/` directory holds a personal narrative side project — the story behind how the Brand OS was built, written for an external reader (password-gated on GitHub Pages). It is **not** part of the Brand OS itself.

| File | Role |
|---|---|
| `journal/journal.md` | Source of truth for all chapter content |
| `journal/illustrations/` | Chapter illustrations (PNG) |
| `system/journal.html` | Rendered page — manually derived from `journal.md` |

**Hard rules:**
- Edits to `journal/` or to the chapter content inside `system/journal.html` **do not** trigger a devlog entry, a ROADMAP update, or an ADR.
- `/audit` ignores `journal/` and the chapter content inside `system/journal.html`.
- `brandOS-content.md` and `journal/journal.md` are independent — never cross-reference.
- The `/journal-chapter` command is the single execution path for adding or editing chapters.
