# 2026-04-23 — CSS Externalization and Multi-File Architecture

> *Retrospective entry — written 2026-04-28 from git history and Claude chat conversation history.*

**Session duration:** ~2h  
**Phase:** Pre-1A (structural groundwork)  
**Commits:** 5 (`105b231` → `2fe179c`)  
**Status at close:** CSS externalized. Badge system with WIP states in place. Architecture ready for Claude Code collaboration.

---

## What happened

### CSS externalization

Until April 23, all styles lived inline in `index.html` — the document was a single self-contained file. This had served its purpose during rapid iteration, but it was becoming a liability: Claude Code couldn't surgically edit styles without risking full rewrites of the HTML, and any refactor touched the entire file.

The fix was a clean split: `brandOS-tokens.css` for variables, `brandOS-components.css` for all component styles. Both linked from `index.html`. No more inline `<style>` block.

This enabled the `str_replace`-only protocol that would govern all subsequent work: surgical edits targeting specific sections, never full-file rewrites.

The README created on April 22 was deleted in the same session — the Brand OS itself is the documentation; a README would be a second source of truth with no clear owner.

### Badge system

The hero badges (`.lb`) already existed from the April 22 session. Two refinements landed on April 23:

**Hover states redesigned.** The original hover behavior wasn't brand-aligned. The redesigned states used Ember (the warm brand accent) for validated sections and a distinct outline treatment for WIP sections. The hover system established a visual language that communicated document status without requiring the reader to understand an explicit legend.

**WIP state added.** Section 03 existed but was not yet validated — produced but not reviewed. A `.wip` class was added with Ember outline + Ember text, no fill. Multiple passes were needed to get the behavior right: `background: transparent` had to be made explicit to override the default browser state, which was overriding the intentional no-fill decision.

**Badges converted to nav links.** The `.lb` elements in the hero strip became anchor links, directly navigating to their respective sections. Validated status was surfaced in the link behavior: clicking a validated badge scrolls to a stable, final section.

### Multi-file architecture decision (conversation `1dc0ebd4`)

The architecture for working with Claude Code was settled here. The problem: Claude Code operating on a single large HTML file would either need to read the entire file for every operation, or risk making changes without full context. Both outcomes were bad.

The solution was a five-file architecture where each file has a single, clearly bounded responsibility:

```
index.html               ← structure only, no inline styles, no raw content
brandOS-tokens.css       ← CSS variables, generated from tokens.json (later)
brandOS-components.css   ← all component styles
brandOS-content.md       ← source of truth for all visible text
PROCESS.md               ← update protocols by operation type
CLAUDE.md                ← auto-read instructions for Claude Code
```

Two rules were locked in explicitly:

**`str_replace` only.** Never rewrite a complete file when a section has changed. Reason: full rewrites burn tokens, introduce drift (Claude Code "reconstructing from memory" rather than editing), and make diffs unreadable. A section change should produce a diff that touches only that section.

**One file per operation.** A content update touches `index.html` only. A token update touches `tokens.json` only. A component update touches `brandOS-components.css` only. Cross-file changes are explicit, not accidental.

These two rules have held without exception since they were set.

---

## Decisions made

| # | Decision |
|---|---|
| — | CSS externalized to `brandOS-tokens.css` + `brandOS-components.css` — no more inline styles |
| — | README deleted — the Brand OS document is its own documentation |
| — | `.wip` state: Ember outline + Ember text, explicit `background: transparent` |
| — | Hero badges → nav anchor links |
| — | `str_replace`-only protocol for all Claude Code edits |
| — | One-file-per-operation rule for all update types |
| — | Five-file architecture: `index.html` / CSS pair / content.md / PROCESS.md / CLAUDE.md |

---

## What's next

- `PROCESS.md` to be written: formalize update protocols so they can be executed without remembering them
- Layer-level section introductions — the document structure was still flat across layers
- Navigation needs a structural refactor to match the layer/section hierarchy
