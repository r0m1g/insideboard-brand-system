# ADR-009 — Single-branch workflow (main only)

**Status:** Implemented
**Date:** 2026-04-29
**Author:** Romain (Art Director)

---

## Context

The project started with two branches: `feat/ui-exploration` as the
working branch and `main` as the published branch (served by GitHub
Pages). The intent was to keep main clean and only push stable work.

In practice, `syncmain.sh` was a 93-line script that checked out main,
merged from the working branch, committed, and pushed. The complexity
introduced bugs: the script never pushed `feat/ui-exploration` itself,
leading to 13 commits that existed only locally for an extended period.
A subsequent git audit revealed the working branch had also diverged
from remote, requiring a force push.

As a solo project with no PRs or peer review, the two-branch model
added overhead with no corresponding safety benefit.

---

## Options considered

**Option A — Keep two-branch model (feat/ui-exploration + main)**
Working branch absorbs daily changes; main is always a clean, reviewed
state. Standard practice for team workflows.
*Rejected: the separation serves no purpose for a solo project. The
sync complexity caused actual bugs. The "clean main" invariant was
not providing value — GitHub Pages just needs a push.*

**Option B — Single branch (main only)**
All work happens directly on main. `syncmain.sh` becomes a simple
`git push origin main`. Risky explorations use short-lived
`experiment/<name>` branches, deleted after merging.
*Accepted.*

---

## Decision

`main` is the only persistent branch. All commits go to main directly.

`syncmain.sh` was rewritten from 93 lines to ~30: a clean-tree guard
followed by `git push origin main`. The two-branch checkout logic is
removed entirely.

For risky explorations: create `experiment/<name>`, merge back to main,
delete. These are short-lived and never become a second working branch.

Session workflow: `session-end` commits, `day-end` pushes to remote.
Push is a deliberate, validated step — not automatic.

---

## Consequences

**Positive:**
- No sync complexity, no divergence risk.
- `syncmain.sh` is trivially auditable.
- All governance files, CSS, and content live on one branch.

**Negative / trade-offs:**
- No staging buffer — a bad commit goes to the published branch.
  Mitigation: `git reset --hard origin/main` before pushing, or
  `experiment/` branches for anything uncertain.

---

## Related decisions

- ADR-001 — Design System Architecture (GitHub Pages publishing model)
