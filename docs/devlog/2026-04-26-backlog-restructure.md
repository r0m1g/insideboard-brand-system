# Backlog restructure + visual display

**Date:** 2026-04-26

## What changed

Replaced the flat 3-category backlog (bugs / ideas / feedback) with a 5-category semantic structure:

| File | Role |
|---|---|
| `bugs.md` | Display defects — existing, updated |
| `todo.md` | Concrete near-term actions with open/done status |
| `ideas.md` | Speculative features, longer-horizon — existing, updated |
| `questions.md` | Open decisions that need an answer before acting |
| `workflow.md` | Claude process improvements — commands, personas, rules |
| `BACKLOG.md` | Master table — one row per item, links to category files |

25 items captured and classified from raw session notes (French → English).

## Visual display in system/docs.html

The Backlog section in `system/docs.html` was rebuilt:
- Old: 3-column grid (Ideas / Bugs / Feedback)
- New: filterable row list — category · item · status — matching the roadmap filter pattern
- Filter buttons: Bug (ember), Todo (steel), Idea / Question / Workflow (gray)
- Done items shown with strikethrough + gray text
- JS filter logic added to the inline script block

## CSS additions in brandOS-components.css

New classes: `.backlog-table`, `.backlog-row`, `.backlog-cat`, `.backlog-text`, `.backlog-status` and variants. Filter button states reuse `.rf-btn` + new modifiers `.rf-btn--bug`, `.rf-btn--todo`, etc.
