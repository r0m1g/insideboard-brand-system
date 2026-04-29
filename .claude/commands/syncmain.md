Push all committed work on `main` to remote. GitHub Pages updates automatically on push.

**When to use:** at day-end, or whenever committed work needs to go live. All work is on `main` — no branch switching.

---

## Execution

**Step 1 — Verify working tree is clean**
```bash
git status --short
```
If any uncommitted changes: stop. Commit first.

**Step 2 — Dry run**
```bash
bash scripts/syncmain.sh --dry-run
```

**Step 3 — Push**
```bash
bash scripts/syncmain.sh
```
Runs `git push origin main`.

**Step 4 — Verify**
```bash
git log origin/main -1 --oneline
```

---

## Notes

- All work happens on `main` — there is no working branch to sync from.
- For risky explorations, use a temporary `experiment/<name>` branch — merge and delete when done.
- Commit message convention: `type(scope): description` — see CLAUDE.md for the full table.
