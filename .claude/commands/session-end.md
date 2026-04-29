Generate a structured session summary and append it to `system/logbook.html`.

**Day boundary:** a "day" runs from 05:00 to 04:59 the next morning. A session started before 05:00 is dated to the previous calendar day — working until 2am on Wednesday night produces a Wednesday entry, not Thursday.

## What this command does

1. Reconstructs what happened this session from git log, modified files, and conversation context
2. Formats it as a `.log-entry` HTML block with `log-type--session` badge
3. Injects it at the top of the entry list in `system/logbook.html` (newest first)
4. Commits `system/logbook.html` — push is handled by `/day-end`, not here

---

## Step 1 — Gather session data

Run these commands to collect facts. Do not skip any.

```bash
# Commits made this session (last 10)
git log --oneline -10

# Files touched this session
git diff --name-only HEAD~5..HEAD 2>/dev/null | sort -u

# Working date (before 05:00 = previous calendar day)
python3 -c "
from datetime import datetime, timedelta
now = datetime.now()
d = now.date() if now.hour >= 5 else now.date() - timedelta(days=1)
print(d.strftime('%Y-%m-%d'))
"
```

Also review the conversation to identify:
- What was built or changed (numbered list, specific and concrete)
- Architectural or strategic decisions made
- Any open questions or items left for next session

---

## Step 1b — Roadmap activity check

Run before building the log entry. Check if any active steps (◔) have had relevant activity since the last roadmap update.

```bash
LAST_ROADMAP_DATE=$(grep "^\*\*Last updated:\*\*" docs/ROADMAP.md | sed 's/\*\*Last updated:\*\* //' | grep -o "^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]")
git log --since="$LAST_ROADMAP_DATE" --oneline
```

**If no commits found since that date** → skip this step silently, proceed to Step 2.

**If commits found:**

1. Read `docs/ROADMAP.md` — identify all steps with status `◔`
2. For each active step, check whether any commits since `LAST_ROADMAP_DATE` plausibly relate to it (by scope, keywords, or conversation context)
3. For each match, ask one at a time:

   > **Step X.Y — [description]**
   > Activity detected: [commit reference]
   > - [ ] Still in progress — no change
   > - [ ] Done → mark ✓

4. For each step marked done:
   - Run cascade check (see Cascade rules in `/roadmap`)
   - Show draft: which fields change in both files
   - Write `docs/ROADMAP.md` + `system/docs.html` immediately, before moving to the next match
   - Do not commit — these files will be staged by Step 5

**Rules:**
- Never presume a step is done from a commit alone — always ask.
- If a commit could match multiple active steps, ask which one it relates to before asking about status.
- Silent if nothing to surface — do not add noise when there are no active steps with activity.

---

## Step 2 — Build the chips

Choose chips that summarize the session truthfully:

- File count: `N files` (use git diff output)
- Commit count: `N commits`
- Status chip: `log-chip--ok` for shipped work, `log-chip--warn` for open items

---

## Step 3 — Write the HTML block

Use this exact template. Replace all `{{ }}` placeholders with real content.

```html
      <!-- ENTRY: {{ YYYY-MM-DD }} session -->
      <div class="log-entry" data-type="session">
        <div class="log-entry__head" role="button" tabindex="0" aria-expanded="false">
          <span class="log-type log-type--session">session</span>
          <span class="log-entry__date">{{ YYYY-MM-DD }}</span>
          <span class="log-entry__title">{{ 8-word max title — main subject of the session }}</span>
          <div class="log-entry__chips">
            <span class="log-chip">{{ N }} files</span>
            <span class="log-chip">{{ N }} commits</span>
            <span class="log-chip log-chip--ok">shipped</span>
          </div>
          <svg class="log-entry__toggle" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4,6 8,10 12,6"/></svg>
        </div>
        <div class="log-entry__body">
          <div class="log-entry__body-inner">

            <div class="log-section">
              <p class="log-section__label">Work done</p>
              <ol>
                <!-- One <li> per meaningful topic. Be specific: file names, class names, decisions. -->
                <li><strong>{{ Topic title }}</strong> — {{ what was done, file references, notable details }}</li>
              </ol>
            </div>

            <div class="log-section">
              <p class="log-section__label">Commits</p>
              <ul>
                <!-- One <li> per commit. Format: <code>branch</code> — <code>message</code> -->
                <li><code>{{ branch }}</code> — <code>{{ commit message }}</code></li>
              </ul>
            </div>

            <!-- Include the Decisions section only if architectural or process decisions were made -->
            <div class="log-section">
              <p class="log-section__label">Decisions</p>
              <ul>
                <li>{{ decision — context and rationale }}</li>
              </ul>
            </div>

            <!-- Include Open items only if something was explicitly left for next session -->
            <div class="log-section">
              <p class="log-section__label">Open items</p>
              <ul>
                <li>{{ what remains + why it was deferred }}</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
```

Remove any optional section (`Decisions`, `Open items`) if there is nothing to say.

---

## Step 4 — Inject or update logbook.html

**First, check for an existing entry for today (use the working date resolved in Step 1):**

```bash
WORKING_DATE=$(python3 -c "from datetime import datetime,timedelta; n=datetime.now(); d=n.date() if n.hour>=5 else n.date()-timedelta(days=1); print(d.strftime('%Y-%m-%d'))")
grep -c "<!-- ENTRY: ${WORKING_DATE} session -->" system/logbook.html
```

**If count ≥ 1 (entry exists):**
Read the file, locate the full entry block — from `<!-- ENTRY: YYYY-MM-DD session -->` down to and including the closing `</div>` of the `.log-entry` div. Replace the entire block with the new version using `str_replace`. This updates the entry in place.

**If count = 0 (no entry yet):**
Find the first `<!-- ENTRY:` comment in `system/logbook.html`. Insert the new block **immediately before** it using `str_replace`:

```
      <!-- ENTRY: 20
```

→

```
      {{ new entry block }}

      <!-- ENTRY: 20
```

---

## Step 4b — Warn resolution

**Skip this step if the entry written in Step 3 contains no `log-chip--warn` chips.**

If warn chips are present:

**1. Surface each warn** — one line per chip: what it represents and what would be needed to resolve it.

**2. Ask via `AskUserQuestion`** — `multiSelect: true`, one option per distinct warn chip (max 3; if more, group the least critical as "Other warns"). Add a final option "None — skip all".

Each option label = the chip text. Each option description = why it appeared and what resolving it requires.

**3. For each warn the user selects**, append one line to `docs/backlog/open-items.md`:

```
- [{{ YYYY-MM-DD }}] {{ chip label }} — {{ why it occurred }} — Resolution: {{ what would fix it }}
```

When an item is later resolved: strike through the entire line and append `✓ resolved YYYY-MM-DD`. Do not delete. The session log for the resolving session is the trace — no extra logbook entry needed.

**4. If no warns, or user selects "None — skip all"**: proceed to Step 5 silently.

---

## Step 5 — Commit and sync

```bash
git add system/logbook.html
git commit -m "log(session): {{ YYYY-MM-DD }} — {{ short title }}"
```

If Step 1b wrote roadmap files, include them in the same commit. If Step 4b wrote backlog entries, include `docs/backlog/open-items.md`. Stage all relevant files before the single commit:

```bash
git add system/logbook.html docs/ROADMAP.md system/docs.html docs/backlog/open-items.md
git commit -m "log(session): {{ YYYY-MM-DD }} — {{ short title }}"
```

Push is handled by `/day-end` — do not push at session-end.

---

## Step 6 — Confirm

After the push, output a one-line confirmation:

```
Session logged — system/logbook.html committed ({{ date }}). Push with /day-end.
```

Do not open the file in a browser. Do not add anything else.

---

## Rules

- **Concrete only.** No vague summaries ("improved the system"). Name files, classes, commands.
- **English only.** All content written to the file must be in English, even if the conversation was in French.
- **One entry per `/session-end` call.** Never merge two sessions into one entry.
- **No invented content.** If no commits were made, write "No commits this session." If no decisions were made, omit the Decisions section.
- **Date = working date.** Use the Python-resolved date from Step 1 (05:00 boundary) — not raw `date +%Y-%m-%d` and not a date from memory.
