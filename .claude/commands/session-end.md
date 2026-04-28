Generate a structured session summary and append it to `system/logbook.html`.

## What this command does

1. Reconstructs what happened this session from git log, modified files, and conversation context
2. Formats it as a `.log-entry` HTML block with `log-type--session` badge
3. Injects it at the top of the entry list in `system/logbook.html` (newest first)

---

## Step 1 — Gather session data

Run these commands to collect facts. Do not skip any.

```bash
# Commits made this session (last 10, both branches)
git log --oneline -10 feat/ui-exploration
git log --oneline -5 main

# Files touched today on the working branch
git diff --name-only HEAD~5..HEAD 2>/dev/null | sort -u

# Current date
date +%Y-%m-%d
```

Also review the conversation to identify:
- What was built or changed (numbered list, specific and concrete)
- Architectural or strategic decisions made
- Any open questions or items left for next session

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
    <section class="sys-section">

      <div class="log-entry">
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

    </section>
```

Remove any optional section (`Decisions`, `Open items`) if there is nothing to say.

---

## Step 4 — Inject into logbook.html

Read `system/logbook.html`. Find the first `<!-- ENTRY:` comment. Insert the new block **immediately before** it (newest entry at the top).

Use `str_replace` — do not rewrite the full file.

**Insertion point** to find:

```
    <!-- ENTRY: 20
```

Replace with:

```
    {{ new entry block }}

    <!-- ENTRY: 20
```

---

## Step 5 — Confirm

After writing, output a one-line confirmation:

```
Session logged — system/logbook.html updated ({{ date }}).
```

Do not commit. Do not open the file in a browser. Do not add anything else.

---

## Rules

- **Concrete only.** No vague summaries ("improved the system"). Name files, classes, commands.
- **English only.** All content written to the file must be in English, even if the conversation was in French.
- **One entry per `/session-end` call.** Never merge two sessions into one entry.
- **No invented content.** If no commits were made, write "No commits this session." If no decisions were made, omit the Decisions section.
- **Date = today.** Use the result of `date +%Y-%m-%d`, not a date from memory.
