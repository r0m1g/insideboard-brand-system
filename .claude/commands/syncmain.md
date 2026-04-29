Sync all display files from `feat/ui-exploration` to `main` in a single commit.

**When to use:** when a session's work is ready to publish. Run once per session — not after every commit. Replaces the manual `sync:` double-commit pattern.

**What syncs:** `.claude/`, `.gitignore`, `assets/`, `brandOS-components.css`, `brandOS-tokens.css`, `index.html`, `scripts/`, `system/`, `tokens.json`.

**What never syncs (governance exclusions):** `CLAUDE.md`, `PROCESS.md`, `brandOS-content.md`, `docs/`.

---

## Execution

**Step 1 — Verify working tree is clean**
```bash
git status --short
```
If any uncommitted changes: stop. Ask user to commit or stash first.

**Step 2 — Dry run (show what will sync)**
```bash
bash scripts/syncmain.sh --dry-run
```
Confirm output looks correct before proceeding.

**Step 3 — Run the sync**
```bash
bash scripts/syncmain.sh
```
Script switches to `main`, checks out display targets, commits, switches back to `feat/ui-exploration`.

**Step 4 — Push to remote**

The sync script already pushes `feat/ui-exploration` automatically. Only `main` needs an explicit push here:
```bash
git push origin main
```
If push fails: note the error in output. Do not retry. Do not ask for input.

**Step 5 — Verify**
```bash
git log main -2 --oneline
git log origin/feat/ui-exploration -1 --oneline
```
Confirm the sync commit is on `main` and `origin/feat/ui-exploration` matches local HEAD.

---

## Deprecation note

This command is **temporary**. After GitLab migration (Phase 5 · step G.5), `feat/ui-exploration` will be merged into `main` as the single source of truth. At that point:
- Delete `scripts/syncmain.sh`
- Delete this command file
- Work directly on `main`
- Use `experiment/*` branches for risky explorations instead
