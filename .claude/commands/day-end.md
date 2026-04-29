Close the day: generate the full daily-review entry, run a structural alignment check, commit, and sync to main.

**Day boundary:** a "day" runs from 05:00 to 04:59 the next morning. Running this command before 05:00 always targets the previous calendar date — so working until 2am on a Wednesday night still closes Wednesday, not Thursday.

No confirmation prompts. Handle all cases autonomously.

---

## Step 1 — Gather facts

```bash
# Clean .DS_Store before anything else (macOS artefact — always safe to discard)
find . -name ".DS_Store" -not -path "./.git/*" -delete

# Resolve the working date: before 05:00 = still yesterday
python3 -c "
from datetime import datetime, timedelta
now = datetime.now()
d = now.date() if now.hour >= 5 else now.date() - timedelta(days=1)
print(d.strftime('%Y-%m-%d'))
"
git log --since="$(python3 -c "from datetime import datetime,timedelta; n=datetime.now(); d=n.date() if n.hour>=5 else n.date()-timedelta(days=1); print(str(d)+' 00:00')")" --oneline
git diff --name-only origin/main
git status --short
```

Also extract from the conversation:
- Decisions made today (architectural, process, content)
- Concrete actions taken (files created or modified, scripts run, commands created)

---

## Step 2 — Check for existing entry

```bash
grep -c "<!-- ENTRY: WORKING_DATE daily-review -->" system/logbook.html
```
(substitute the working date resolved in Step 1)

**If count ≥ 1 (entry exists):** proceed to Step 3 anyway — regenerate the full entry with today's complete picture, then **replace** the existing block in place using `str_replace`. Locate the block from `<!-- ENTRY: WORKING_DATE daily-review -->` to the closing `</div>` of the `.log-entry` div.

**If count = 0 (no entry):** proceed to Step 3, then **insert** before the first `<!-- ENTRY:` comment.

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
      <div class="log-entry" data-type="review">
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

**Commit the logbook entry** (use the working date resolved in Step 1, not raw `date`):
```bash
WORKING_DATE=$(python3 -c "from datetime import datetime,timedelta; n=datetime.now(); d=n.date() if n.hour>=5 else n.date()-timedelta(days=1); print(d.strftime('%Y-%m-%d'))")
git add system/logbook.html
git commit -m "log(daily): ${WORKING_DATE}"
```

**Push to remote:**
```bash
bash scripts/syncmain.sh
```

If push fails: note the failure in output. Do not retry. Do not ask for input.

---

## Output format

```
Day closed — YYYY-MM-DD
  Logbook  : entry written (N commits · N decisions · N actions) | duplicate skipped
  Structure: ✓ aligned | ✗ drift (N orphans)
  Push     : ✓ main pushed to remote | ✗ failed — [reason]
```

---

## Rules

- **No confirmation prompts.** Handle every case — missing entry, no commits, dirty tree — autonomously.
- **Concrete only.** No vague items. Name files, class names, commands.
- **English only.** All content written to the file must be in English, even if the conversation was in French.
- **One entry per day, always updated.** If run a second time, regenerate and replace the existing entry — never create a duplicate.
- **Day boundary = 05:00.** Running before 05:00 counts as the previous calendar day.
- **No invented content.** If a section has nothing to say, use `<p>—</p>` with `class="log-section--empty"`.
