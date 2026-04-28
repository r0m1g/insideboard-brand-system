Close the day: generate the full daily-review entry, run a structural alignment check, commit, and sync to main.

No confirmation prompts. Handle all cases autonomously.

---

## Step 1 — Gather facts

```bash
date +%Y-%m-%d
git log --since="$(date +%Y-%m-%d) 00:00" --oneline
git diff --name-only origin/main -- index.html brandOS-tokens.css brandOS-components.css assets/ system/
git status --short
```

Also extract from the conversation:
- Decisions made today (architectural, process, content)
- Concrete actions taken (files created or modified, scripts run, commands created)

---

## Step 2 — Check for duplicate

Search `system/logbook.html` for `<!-- ENTRY: YYYY-MM-DD daily-review -->` (today's date).

**If found:** the entry already exists — skip to Step 4 (structural check). Note it in the final output.

**If not found:** proceed to Step 3.

---

## Step 3 — Write the daily-review entry

Build the full entry from the facts gathered in Step 1. All four sections must be populated.

**Résumé** — 1–2 paragraphs: what changed today, commit timeline, most-touched files. If no commits: "No commits today."

**Analyse** — `<ul>` of observations: risk flags, quality patterns, anything worth tracking. If nothing notable: `<p>—</p>` with `class="log-section--empty"`.

**Décisions** — `<ul>` of decisions made today from the conversation. If none: `<p>—</p>` with `class="log-section--empty"`.

**Actions** — `<ul>` of concrete actions: files created or modified, scripts run, commands written. If none: `<p>—</p>` with `class="log-section--empty"`.

**Chips:** `N commits` · content chips (`N feat`, `N fix`, etc.) · `log-chip--warn` for risks · `log-chip--ok` if everything clean.

Use this exact template:

```html
    <!-- ENTRY: YYYY-MM-DD daily-review -->
    <section class="sys-section">

      <div class="log-entry">
        <div class="log-entry__head" role="button" tabindex="0" aria-expanded="false">
          <span class="log-type log-type--review">daily review</span>
          <span class="log-entry__date">YYYY-MM-DD</span>
          <span class="log-entry__title"><!-- N commits — topic1, topic2 (max 80 chars) --></span>
          <div class="log-entry__chips">
            <span class="log-chip">N commits</span>
            <!-- additional chips -->
          </div>
          <svg class="log-entry__toggle" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4,6 8,10 12,6"/></svg>
        </div>
        <div class="log-entry__body">
          <div class="log-entry__body-inner">

            <div class="log-section">
              <p class="log-section__label">Résumé</p>
              <!-- 1-2 paragraphs -->
            </div>

            <div class="log-section">
              <p class="log-section__label">Analyse</p>
              <!-- ul or <p>—</p> -->
            </div>

            <div class="log-section">
              <p class="log-section__label">Décisions</p>
              <!-- ul or <p>—</p> -->
            </div>

            <div class="log-section">
              <p class="log-section__label">Actions</p>
              <!-- ul or <p>—</p> -->
            </div>

          </div>
        </div>
      </div>

    </section>
```

**Injection point:** find the first `<!-- ENTRY:` comment in `system/logbook.html`. Insert the new block immediately before it. Use `str_replace` — do not rewrite the file.

---

## Step 4 — Structural alignment check

```bash
# Section numbers in brandOS-content.md
grep -o "### [0-9][^· ]*·[0-9]*" brandOS-content.md | sed 's/### //'

# Section numbers implemented in index.html (.cn divs)
grep -o '<div class="cn">[^<]*</div>' index.html | sed 's/<div class="cn">//;s/<\/div>//'
```

Compare both lists. Report `✓ structural alignment clean` or list orphans. Do not fix — note in output only.

---

## Step 5 — Commit and sync

**Commit the logbook entry:**
```bash
git add system/logbook.html
git commit -m "log: day-end $(date +%Y-%m-%d)"
```

**Run syncmain:**
```bash
bash scripts/syncmain.sh
```

If syncmain fails (working tree not clean, script error): note the failure in output. Do not retry. Do not ask for input.

---

## Output format

```
Day closed — YYYY-MM-DD
  Logbook  : entry written (N commits · N decisions · N actions) | duplicate skipped
  Structure: ✓ aligned | ✗ drift (N orphans)
  Sync     : ✓ synced to main | ✗ failed — [reason]
```

---

## Rules

- **No confirmation prompts.** Handle every case — missing entry, no commits, dirty tree — autonomously.
- **Concrete only.** No vague items. Name files, class names, commands.
- **English only.** All content written to the file must be in English, even if the conversation was in French.
- **One entry per day.** If run a second time and entry already exists, skip Step 3 entirely.
- **No invented content.** If a section has nothing to say, use `<p>—</p>` with `class="log-section--empty"`.
