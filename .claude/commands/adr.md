Detect architectural decisions worth recording and author new ADR files.

**Trigger:**
- `/adr` alone → **Detection mode**: scan history since the last ADR and propose candidates.
- `/adr [topic]` → **Authoring mode**: directly author an ADR for a known decision.

One ADR per call. If detection surfaces multiple candidates, handle them one at a time.

---

## The six criteria (project-specific)

A decision is ADR-worthy if it matches **at least one** of these:

1. **Source-of-truth ownership** — determines which file is authoritative for a type of data.
2. **Universal constraint** — creates a rule that every future entry of a type must follow.
3. **Hard-to-reverse format or spec choice** — adopts a standard, schema, or naming convention that external tools or other files depend on.
4. **Visual register or identity class** — defines what a *category* of page, component, or element looks like (not a single instance).
5. **Phase sequencing constraint** — establishes that X must happen before Y, with lasting consequences.
6. **Permanent new file or directory** — introduces an artifact that becomes a structural dependency.

**The two-question gate** (both must be yes):
> 1. Would a future maintainer need to know *why* — and would the code or content alone not tell them?
> 2. Were at least two concrete alternatives considered and rejected?

If either answer is no, the decision belongs in the devlog, not an ADR.

---

## Detection mode — `/adr`

### Step 1 — Find the baseline date

Read all files in `docs/decisions/`. Extract the most recent `**Date:**` field:

```bash
grep -h "^\*\*Date:\*\*" docs/decisions/*.md | sort | tail -1
```

This is the detection window start. Everything from that date onward is in scope.

### Step 2 — Gather evidence

```bash
# Commits since baseline date
git log --since="BASELINE_DATE" --oneline

# Devlog entries since baseline date (by filename)
ls docs/devlog/ | sort
```

Also extract from the current conversation: any decisions, choices between alternatives, or constraints that were mentioned.

### Step 3 — Apply the six criteria

For each candidate found (commit, devlog entry, or conversation event), check it against the six criteria and the two-question gate. Output a ranked list:

```
Candidate 1 — [proposed title]
  Criterion : [which of the six]
  Evidence  : [commit hash or devlog filename or conversation reference]
  Gate      : options considered? [yes / unclear] — future maintainer needs why? [yes / unclear]
  Verdict   : ADR candidate | Devlog only | Uncertain

Candidate 2 — …
```

Omit anything that clearly fails both gate questions.

### Step 4 — Validate candidates

For each candidate with verdict `ADR candidate` or `Uncertain`, ask:

> **[Proposed title]**
> Criterion: [which one]. Evidence: [reference].
> - [ ] Write ADR
> - [ ] Devlog only — skip
> - [ ] Not a real decision — discard

For any `Write ADR` answer, proceed immediately to Authoring mode (Step 5) for that candidate before moving to the next one.

---

## Authoring mode — `/adr [topic]` or after Detection validation

### Step 5 — Gather decision inputs

Ask the following questions in sequence. Do not combine them.

**5.1 — Context**
> What problem or tension prompted this decision? What would have happened without it?

**5.2 — Options considered**
> What alternatives did you actually evaluate? List them, even briefly. For each: why was it rejected (or accepted)?

If the user can name only one option (the chosen one), insert this gate:
> "Only one option listed. An ADR's value is in the rejected alternatives — they explain *why* the chosen path was taken. If no real alternatives were considered, this decision may be better placed in the devlog. Do you want to continue as an ADR or log it as a devlog entry instead?"

**5.3 — Decision**
> What was decided, precisely? Name files, classes, formats, rules.

**5.4 — Consequences**
> What does this unlock (positive)? What does it constrain or cost (negative / trade-offs)?

**5.5 — Related ADRs**
Scan `docs/decisions/` titles. Propose links to related ADRs the user may want to reference. Ask for confirmation — do not add links the user doesn't recognise.

### Step 6 — Determine the ADR number

```bash
ls docs/decisions/ADR-*.md | sort | tail -1
```

Increment by one. If no ADRs exist, start at 001.

### Step 7 — Draft the ADR

Build the full file from the inputs gathered in Step 5. Show the full draft in chat before writing to disk.

**Template:**

```markdown
# ADR-XXX — [Title]

**Status:** Accepted
**Date:** YYYY-MM-DD
**Author:** Romain (Art Director)

---

## Context

[Why this decision was needed — the problem or tension it resolves]

---

## Options considered

**Option A — [name]**
[description]
*Accepted.*

**Option B — [name]**
[description]
*Rejected: [reason].*

---

## Decision

[What was decided, in full — name files, classes, formats, rules explicitly]

---

## Consequences

**Positive:**
- …

**Negative / trade-offs:**
- …

---

## Related decisions

- ADR-XXX — [Title]
```

**Status values:** `Accepted` (decided, not yet fully implemented) · `Implemented` (decision fully in place) · `Deprecated` (superseded by a later ADR).

### Step 8 — Write to disk

Show the destination path:
> `docs/decisions/ADR-XXX-[kebab-title].md`

Ask:
> - [ ] Write this ADR to disk
> - [ ] Edit first

Write only after confirmation.

### Step 9 — Register in docs.html

After writing the ADR file, immediately append the new entry to the ADR list in `system/docs.html`.

Locate the last `.adr-row` block inside `.adr-list` and insert after it:

```html
<div class="adr-row">
  <span class="adr-num">ADR-XXX</span>
  <span class="adr-title">[Title]</span>
  <span class="adr-status adr-status--[status]">[Status]</span>
</div>
```

Status class mapping: `Accepted` → `adr-status--accepted` · `Implemented` → `adr-status--implemented` · `Deprecated` → `adr-status--deprecated`

No confirmation needed — this is a mechanical sync, no different from token regeneration.

---

## Integration signal — day-end

At the end of the `/day-end` command, after the structural alignment check and before the commit, run a lightweight scan:

```bash
LAST_ADR_DATE=$(grep -h "^\*\*Date:\*\*" docs/decisions/*.md | sort | tail -1 | sed 's/\*\*Date:\*\* //')
git log --since="$LAST_ADR_DATE" --oneline | wc -l
```

If the commit count since the last ADR is ≥ 5, append one line to the day-end output:

```
  ADR signal : N commits since last ADR (LAST_ADR_DATE) — run /adr to review
```

Do not generate or propose an ADR in day-end. Only surface the signal.

---

## Behavioral rules

- **One ADR per call.** Never batch multiple decisions into a single file.
- **Never invent rejected options.** If the user cannot recall alternatives, surface the gate at Step 5.2 — do not fabricate plausible alternatives.
- **Never write to disk before Step 8 confirmation.**
- **English only.** All ADR file content is in English, even when the conversation is in French.
- **No auto-commit.** Writing the ADR file is the final action. Committing is a separate operation the user triggers.
- **No PROCESS.md update** unless the ADR introduces a new Update type — if it does, flag it explicitly after writing the file.
- **Status is `Accepted` by default.** Change to `Implemented` only if the decision is already fully in place at the time of writing.
