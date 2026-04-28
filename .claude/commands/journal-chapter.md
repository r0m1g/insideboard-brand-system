Add a new chapter to the personal journal, or edit an existing chapter.

The journal is a personal narrative side project — the story behind how the Brand OS was built, written for an external reader. It is **not** part of the Brand OS itself. Source of truth: `journal/journal.md`. Rendered page: `system/journal.html`.

---

## Scope — what this command DOES NOT do

- Does not touch `docs/devlog/` (engineering log — different exercise)
- Does not update `docs/ROADMAP.md`
- Does not create an ADR
- Does not propose a devlog technique entry for this work
- Does not commit (per memory `feedback_no_auto_commit`)

The journal is a side project hors périmètre Brand OS — see CLAUDE.md section `journal/`.

---

## Architecture

| File | Role |
|---|---|
| `journal/journal.md` | Source of truth for all chapter content |
| `journal/illustrations/journal-chN.png` | Chapter illustration |
| `system/journal.html` | Rendered page — manually synced from `journal.md` |

### `journal.md` chapter convention

```
## Chapter NN — Title

**Date:** Apr 25–26, 2026
**Mood:** One sentence that opens the chapter visually.
**Illustration alt:** Descriptive alt text for accessibility.
**Pull:** The pull-quote sentence(s).

First paragraph of the body.

Second paragraph.

Third paragraph (with **IRON** preserved as **IRON**, italics as *italics*).
```

### Mapping `journal.md` → `<article class="j-chapter">`

| Markdown | HTML |
|---|---|
| `## Chapter NN — Title` | `<h2 class="j-chapter__title">Title</h2>` + ghost number `NN` + `<span class="j-chapter__num">Chapter NN</span>` |
| `**Date:**` value | `<span class="j-chapter__date">value</span>` |
| `**Mood:**` value | `<p class="j-chapter__mood">value</p>` |
| `**Illustration alt:**` value | `<img alt="value">` |
| `**Pull:**` value | `<div class="j-pull">value</div>` |
| Body paragraphs | `<p>` inside `<div class="j-body">` |
| `*x*` | `<em>x</em>` |
| `**IRON**` | `<strong>IRON</strong>` (per CLAUDE.md writing rules) |
| `` `code` `` | `<code>code</code>` |

### Closing element

- All chapters except the last use `<div class="j-sep">…</div>` (3-line separator).
- The last chapter (chronologically most recent / ongoing) uses `<div class="j-coda"><div class="j-coda__line"></div><span class="j-coda__text">Ongoing</span></div>`.
- When adding a new last chapter, swap the previous last chapter's `j-coda` back to `j-sep`.

---

## Steps

1. **Identify operation.** Ask: new chapter, or edit an existing one? If new: which chapter number? (Auto-increment from the last `## Chapter NN` in `journal.md`.) If edit: which chapter?

2. **Read references.** Always read these three chapters first to recalibrate the voice:
   - `system/journal.html` Chapter 01 — "The gap"
   - `system/journal.html` Chapter 04 — "When Brand OS stopped being a name"
   - `system/journal.html` Chapter 05 — "The language of objects"
   And the existing `journal/journal.md` for context.

3. **Gather raw material from Romain.** For a new chapter, ask in free form: what's the story? What was the tension? What was decided? What artifacts were produced? Take notes — do not start writing yet.

4. **Draft in `journal.md`.** Apply the Voice & Style block below strictly. Write the chapter directly in `journal/journal.md` (Edit append for new, Edit str_replace for edit).

5. **Sync HTML.** Generate the corresponding `<article class="j-chapter">` block and insert it in `system/journal.html` before `</main>` (str_replace on the closing `</main>` marker, prepending the new article). For edits, str_replace the targeted article.

6. **Update the JS `meta` array.** In the `<script>` block of `system/journal.html`, find the `const meta = [ … ];` and add (or update) the entry for this chapter:
   ```
   { label: '<short title>', date: '<short date>' }
   ```
   Without this, the new chapter does not appear in the sidebar timeline.

7. **Verify illustration.** Check that `journal/illustrations/journal-chNN.png` exists. If missing, list it as a TODO for Romain — do not invent or generate the file.

8. **Swap previous coda → sep** if a new last chapter was added (see Closing element above).

9. **Stop.** No commit. No devlog entry. No ROADMAP update. Just report what changed.

---

## Voice & writing style — NON-NEGOTIABLE

This is a literary narrative for an external reader. It is the story behind the Brand OS, not a log. Adopt the following voice exactly. It is not optional flavor — it is the deliverable.

### Openings

- Open with a state-of-the-world, a tension, or an unresolved question. NEVER with an action by an author.
- GOOD: "Before there was a document, there was a problem."
- GOOD: "Phase 3 opened a question that had no obvious answer."
- GOOD: "The shift from document to system happened incrementally, then all at once."
- BAD: "In this chapter we'll cover…"
- BAD: "I started Phase 3 by thinking about icons."

### Cadence

- Medium-length declarative sentences (12–25 words), interspersed with short ones for emphasis. NOT the staccato of an engineering log.
- Three-beat rhythm is a signature pattern. Use sparingly but use it:
  - "Decks, proposals, one-pagers."
  - "Brand System, Brand OS, Brand Source."
  - "the strategy, the verbal identity, the visual system."
- Em-dash (—) for precision and contrast. Avoid comma cascades and nested parentheses.

### Person and voice

- Third-person abstracted voice. NEVER "I", NEVER "we", NEVER "you".
- GOOD: "The Art Director was one person."
- GOOD: "The repo was renamed the same afternoon."
- BAD: "I renamed the repo that afternoon."
- The narrator is invisible. The work, the decisions, the people involved are what move on the page.

### Binary oppositions

- Frame stakes as oppositions. This is structural to the voice.
  - "Not a style guide. Not a set of templates. Something closer to…"
  - "Not because people didn't care. Because there was nothing to hold onto."
  - "The shape is the name. The function is the context."

### The pull quote

- Each chapter has exactly one `**Pull:**` — a self-contained formulation, memorable, often the philosophical core of the chapter.
- It should be a sentence (or two short ones) that could stand alone on a wall.
- GOOD: "str_replace only. One file per operation."
- GOOD: "An ADR that explains the why is worth more than the decision itself — six months later, when you can't remember."
- BAD: "We made some good decisions about file architecture."
- Real quotes (e.g. "*ok pour Brand OS.*") may appear in the body in italics, but the `**Pull:**` field itself is a formulation, not an attribution.

### Concreteness

- Anchor in dates, counts, real artifacts, real file names.
  - "On April 22, three names were on the table"
  - "Thirteen commits in one day, the document online before the end of the evening."
- No vague time markers ("recently", "a while back").
- No vague counts ("a few", "many", "several").

### Metaphor

- Spatial and concrete metaphors, used economically.
  - "no surgical entry point", "nothing to hold onto", "an operating system for the brand", "left the studio".
- One per chapter, max two. Never decorative.

### Closures

- End the chapter with a sentence that opens, recontextualizes, or resolves on a different plane than where it started.
  - "None of this existed in a file. It existed in text, in drafts, in a back-and-forth that slowly produced a shared vocabulary. The document came later."
  - "For the first time, the Brand OS wasn't being built — it was being shown."
- Never a recap. Never "and that's the story of…".

### Philosophical asides

- Short philosophical observations are welcome, embedded in the flow.
  - "Both are obvious. The point of writing them down is that obvious things stop being obvious under time pressure."
- One per chapter, max. They earn their place by being precise, not profound.

### Vocabulary

- Use precise words: drift, anatomical, source of truth, operating system, doctrine, primitive, register, surgical, fragile.
- Refuse: nice, great, amazing, beautiful, awesome, incredible, powerful, robust, seamless, elegant, leverage, journey, story (as a marketing word).

### Hard nos

- No emojis, no exclamation marks.
- No first person ("I", "we", "you").
- No marketing register.
- No "in this chapter", "as we'll see", "let's explore".
- No nostalgic reflection ("looking back…").
- No moral lessons. Observations are fine; lessons are not.
- No filler transitions ("moving on", "next up", "additionally").

### Naming rules (from CLAUDE.md)

- "Brand OS" — always with space, capitalised initials. Never "BrandOS", "brandOS", "brand os".
- "InsideBoard AI" — capital I and B, no space, uppercase AI.
- "**IRON**" — uppercase + bold in body copy. In headings, heading weight already provides emphasis.
