Detect roadmap-worthy events and update `docs/ROADMAP.md` + `system/docs.html` accordingly.

**Trigger:**
- `/roadmap` alone → **Detection mode**: scan history since the last roadmap update and surface events that require a status change.
- `/roadmap [action]` → **Update mode**: directly apply a known update (`step done`, `step started`, `step reopened`, `step cancelled`, `step mutated`, `new step`, `new phase`, `phase cancelled`).
- `/roadmap reorder` → **Reorder mode**: interactively reorder phases in both files.

One update operation per call. If detection surfaces multiple events, handle them one at a time.

---

## Status legend

| Symbol | Meaning |
|---|---|
| `✓` | Done — shipped, validated |
| `◔` | In progress — actively being worked on |
| `○` | Planned — committed, not started |
| `…` | Future — on the radar, not committed |
| `✗` | Cancelled / Superseded |

---

## Full transition matrix

Every valid state change for a step:

| From | To | Event name |
|---|---|---|
| `○` | `◔` | step started |
| `○` | `✓` | step done (fast-track, no in-progress phase) |
| `○` | `✗` | step cancelled |
| `◔` | `✓` | step done |
| `◔` | `✗` | step cancelled |
| `✓` | `◔` | step reopened |
| `✓` | `✗` | step superseded |
| `…` | `○` | step promoted |

Every valid state change for a phase:

| From | To | Trigger |
|---|---|---|
| `…` | `○` | phase promoted to committed |
| `○` | `◔` | first step becomes ◔ or ✓ |
| `◔` | `✓` | all steps are ✓ (or ✓ + ✗) |
| `✓` | `◔` | any step in phase reopened or added as ◔ |
| Any | `✗` | phase explicitly cancelled or fully superseded |

---

## Cascade rules — mandatory after every step change

After any step status change, evaluate the parent phase. Apply in order:

1. **Any step → ◔** in a phase that is `○` or `✓` → phase **must** become `◔`. No exception.
2. **Any step → ◔** in a phase already `◔` → phase stays `◔`. No action needed.
3. **All steps → ✓** (or ✓ + ✗, with at least one ✓) → **propose** phase → `✓`. Ask for confirmation before writing.
4. **All steps → ✗** → **propose** phase → `✗`. Ask for confirmation before writing.
5. **Step added as `◔`** to a `✓` phase → phase **must** regress to `◔`.
6. **Step added as `○`** to a `✓` phase → phase **must** regress to `◔` (incomplete work is now tracked).

**Consistency check (inverse):** if the phase status is changed directly (without touching steps), verify coherence with step states. If incoherent, surface the conflict before writing:
> "Phase marked ✓ but step X.Y is still ◔ — confirm or resolve before writing."

---

## The two-question gate

Before writing any roadmap update, both questions must be yes:

> 1. Would a team member reading the roadmap tomorrow have a false picture of progress if this isn't updated?
> 2. Is this a trackable deliverable (an outcome or artefact), not just an implementation detail?

If either answer is no, the event belongs in the devlog or a commit message — not the roadmap.

---

## Detection mode — `/roadmap`

### Step 1 — Find the baseline date

Read `docs/ROADMAP.md`. Extract the `**Last updated:**` field:

```bash
grep "^\*\*Last updated:\*\*" docs/ROADMAP.md
```

This is the detection window start.

### Step 2 — Gather evidence

```bash
# Commits since baseline date
git log --since="BASELINE_DATE" --oneline

# Devlog entries since baseline date (by filename)
ls docs/devlog/ | sort
```

Also extract from the current conversation: any deliverables completed, abandoned, or started that were mentioned.

### Step 3 — Match events to steps

For each commit or devlog entry found, attempt to match it to an existing step in `docs/ROADMAP.md`.

**Two categories of match:**

**A — Active step with activity (status `◔`):**
Activity on a step already in progress does not automatically mean it is done. Output a simple activity signal:

```
Activity on step X.Y — [description]
  Evidence : [commit hash or devlog filename]
  → Still in progress or done?
```

Never output a verdict. Never presume the step is done.

**B — Potential new step or phase:**
If the event does not match any existing step, apply the two-question gate before surfacing it:
> 1. Would a team member reading the roadmap tomorrow have a false picture of progress if this isn't here?
> 2. Is this a trackable deliverable (outcome or artefact), not just an implementation detail?

If both yes, output as a candidate with verdict `New step` or `New phase`. Otherwise omit — it belongs in the devlog.

Omit any event that clearly fails the gate.

### Step 4 — Validate candidates

**For active steps with activity (Category A):**

Ask directly, one step at a time:

> **Step X.Y — [description]**
> Activity detected: [evidence]
> - [ ] Still in progress — no change
> - [ ] Done → mark ✓

For any "Done" answer, proceed immediately to Update mode (Step 5) for that step before moving to the next.

**For new step / new phase candidates (Category B):**

Ask:

> **[Proposed step or phase title]**
> Type: [new step | new phase]. Evidence: [reference].
> - [ ] Add to roadmap
> - [ ] Devlog only — skip
> - [ ] Not a real event — discard

For any "Add to roadmap" answer, proceed immediately to Update mode (Step 5) before moving to the next.

---

## Update mode — `/roadmap [action]` or after Detection validation

### Step 5 — Identify the exact change

Ask the following questions in sequence depending on the event type. Do not combine them.

**For step status changes (started / done / reopened / cancelled / superseded / promoted):**

> 5.1 — Which step? (phase + step ID, e.g. "Phase 3, step 3.4")
> 5.2 — New status? (◔ / ✓ / ✗ / ○)
> 5.3 — One-line note for "Recent changes"? (what was delivered or why cancelled)

**For step mutation (description / split / merge):**

> 5.1 — Which step(s)?
> 5.2 — What changes? (new description, or split into N steps with IDs, or merge from N steps into one)
> 5.3 — Does the mutation affect the step's status? (yes / no)
> 5.4 — One-line note for "Recent changes"?

**For new step:**

> 5.1 — Which phase does it belong to?
> 5.2 — Step ID (next available number in that phase)?
> 5.3 — Initial status? (○ / ◔ / `…`)
> 5.4 — Description (one sentence)?
> 5.5 — One-line note for "Recent changes"?

**For new phase:**

> 5.1 — Phase number and name?
> 5.2 — One-sentence description?
> 5.3 — Initial status? (`…` / `○`)
> 5.4 — Steps to include now (each with ID, status, description)?
> 5.5 — Prerequisites or dependencies?
> 5.6 — Related ADRs (if any)?
> 5.7 — One-line note for "Recent changes"?

### Step 6 — Evaluate cascade

After gathering inputs, always run the cascade check (see Cascade rules above):

- Does the step change force a phase status change?
- If yes, state it explicitly before writing:
  > "Step 3.4 → ✓. All remaining steps are ✓/✗ → proposing Phase 3 → ✓. Confirm?"

Never apply a cascade change silently.

### Step 7 — Draft the changes

Show a summary of every field that will change before writing to disk:

```
docs/ROADMAP.md changes:
  Step 3.4 : ○ → ✓
  Phase 3  : ◔ → ✓  (cascade: all steps now done)
  Last updated : 2026-04-29
  Recent changes : prepend new entry

system/docs.html changes:
  phasesData['p3'] steps[3].s : 'planned' → 'done'
  .phase-card[data-phase="p3"] : class + data-status → 'done', tag text → '✓ Complete'
```

### Step 8 — Write to disk

Two files always in the same operation. Never update one without the other.

**File 1: `docs/ROADMAP.md`**

Changes to apply with `str_replace`:
- Step row in the phase table (status symbol)
- Phase section header if phase status changed
- `**Last updated:**` field → today's date + one-line summary
- `## Recent changes` → prepend new entry in this format:
  > `- **YYYY-MM-DD** — [One-line summary of what changed and why, referencing ADR if applicable]`

**File 2: `system/docs.html`**

Two locations (per Update type 9 in `PROCESS.md`):

1. **`.roadmap-track` HTML** — update the `.phase-card` button:
   - `data-status` attribute
   - CSS class (`phase-card--done` / `phase-card--active` / `phase-card--future`)
   - `<span class="phase-tag ...">` text

2. **`phasesData` JS object** — update the matching phase entry:
   - Step `.s` field: `'done'` / `'active'` / `'planned'` / `'future'`
   - Phase `name`, `desc`, `note` if changed
   - Add new step objects if new steps were added

**Status mapping (ROADMAP.md → system/docs.html):**

| ROADMAP.md | `data-status` / step `.s` | CSS class | Tag text |
|---|---|---|---|
| `✓` Done | `done` | `phase-card--done` | `✓ Complete` |
| `◔` In progress | `active` | `phase-card--active` | `◔ Active` |
| `○` Planned or `…` Future | `future` | `phase-card--future` | `… Future` |

Ask before writing:
> - [ ] Write both files to disk
> - [ ] Edit draft first

Write only after confirmation.

---

## Reorder mode — `/roadmap reorder`

### Step R1 — Display current phase order

Read `docs/ROADMAP.md` and list all phases in their current order:

```
Current phase order:
  1. Phase 1A · Design system foundation  ✓
  2. Phase 1B · Tokens W3C migration  ✓
  …
```

### Step R2 — Ask for new order

> Describe the new order — e.g. "swap Phase 2 and Phase 3", "move Phase 5 after Phase 2", or list all phase keys in the new sequence.

Parse the instruction and compute the new sequence. If ambiguous, ask for clarification before proceeding.

### Step R3 — Show before/after diff

```
Reorder:
  Before : 1A · 1B · 1C · 1D · 2 · 3 · 4 · 5
  After  : 1A · 1B · 1C · 1D · 3 · 2 · 4 · 5

docs/ROADMAP.md   — reorder ### Phase blocks
system/docs.html  — reorder .phase-card buttons + phasesData entries
Last updated      — update to today + note "phase reorder"
Recent changes    — prepend entry
```

Ask before writing:
> - [ ] Write both files
> - [ ] Cancel

### Step R4 — Write to disk

Apply reorder with `str_replace` in both files:

**`docs/ROADMAP.md`** — move `### Phase X` blocks (including their full content) into the new sequence. Update `**Last updated:**` and prepend to `## Recent changes`.

**`system/docs.html`** — reorder `.phase-card` buttons inside `.roadmap-track`, and reorder the matching entries inside `phasesData`. Preserve all attributes, classes, and step data unchanged — only the sequence changes.

**Rule:** Never renumber phases during a reorder — Phase 2 stays "Phase 2" even if it moves after Phase 3. Only the document order changes.

---

## Day-end integration signal — Step 4b in `/day-end`

After the ADR signal check, add a roadmap staleness check:

```bash
LAST_ROADMAP_DATE=$(grep "^\*\*Last updated:\*\*" docs/ROADMAP.md | sed 's/\*\*Last updated:\*\* //' | grep -o "^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]")
git log --since="$LAST_ROADMAP_DATE" --oneline | wc -l | tr -d ' '
```

If the commit count since the last roadmap update is ≥ 3, append one line to the day-end output:

```
  Roadmap signal : N commits since last roadmap update (LAST_ROADMAP_DATE) — run /roadmap to review
```

Do not update the roadmap in day-end. Surface the signal only.

---

## Behavioral rules

- **One update operation per call.** If detection surfaces multiple events, handle them sequentially — one confirmation per event.
- **Never presume a step is done from activity alone.** Always ask. Activity = signal, not status.
- **Cascade is mandatory.** Never update a step without evaluating its parent phase. Never apply a cascade silently.
- **Consistency check before writing.** If a proposed phase status is incoherent with its step states, surface the conflict and ask for resolution.
- **Two files always together.** `docs/ROADMAP.md` and `system/docs.html` are updated in the same operation. Never one without the other.
- **`Last updated` and `Recent changes` on every write.** No exception.
- **Never write to disk before Step 8 confirmation.**
- **English only.** All content written to files is in English, even when the conversation is in French.
- **No auto-commit.** Writing both files is the final action. Committing is a separate operation the user triggers.
- **Gate before inventing new steps.** If a commit or devlog entry doesn't match any existing step, apply the two-question gate before proposing a new step — most implementation details belong in the devlog.
- **Reorder never renumbers.** Phase IDs and step IDs are preserved as-is — only document order changes.
