#!/usr/bin/env bash
# scripts/syncmain.sh
#
# Sync display files from feat/ui-exploration to main in a single commit.
# Governance files (CLAUDE.md, PROCESS.md, brandOS-content.md, docs/) stay
# on feat/ui-exploration only and are never pushed to main.
#
# Usage:
#   bash scripts/syncmain.sh            — sync and commit
#   bash scripts/syncmain.sh --dry-run  — show what would sync, no changes
#
# DEPRECATED after GitLab migration (Phase 5 · step G.5):
#   Once feat/ui-exploration is merged into main, this script is no longer needed.
#   Delete it or keep as archive reference.

set -euo pipefail

WORKING_BRANCH="feat/ui-exploration"
MAIN_BRANCH="main"

# Files and directories synced to main (display layer only).
# Governance exclusions: CLAUDE.md, PROCESS.md, brandOS-content.md, docs/
DISPLAY_TARGETS=(
  ".claude/"
  ".gitignore"
  "assets/"
  "brandOS-components.css"
  "brandOS-tokens.css"
  "index.html"
  "journal/"
  "scripts/"
  "system/"
  "tokens.json"
)

DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

# ── guards ──────────────────────────────────────────────────────────────────

CURRENT=$(git branch --show-current)
if [[ "$CURRENT" != "$WORKING_BRANCH" ]]; then
  echo "✗ Must run from $WORKING_BRANCH (currently on $CURRENT)" >&2
  exit 1
fi

if ! git diff --quiet -- ':(exclude).DS_Store' || ! git diff --cached --quiet; then
  echo "✗ Uncommitted changes detected — commit or stash before syncing" >&2
  exit 1
fi

# ── dry run ──────────────────────────────────────────────────────────────────

if $DRY_RUN; then
  echo "Dry run — targets that would sync to $MAIN_BRANCH:"
  for t in "${DISPLAY_TARGETS[@]}"; do
    echo "  $t"
  done
  echo ""
  echo "Governance exclusions (never touch main):"
  echo "  CLAUDE.md"
  echo "  PROCESS.md"
  echo "  brandOS-content.md"
  echo "  docs/"
  exit 0
fi

# ── sync ─────────────────────────────────────────────────────────────────────

git checkout "$MAIN_BRANCH"

for t in "${DISPLAY_TARGETS[@]}"; do
  git checkout "$WORKING_BRANCH" -- "$t" 2>/dev/null || true
done

# Nothing changed → already in sync
if git diff --cached --quiet && git diff --quiet; then
  echo "✓ Already in sync — nothing to commit on $MAIN_BRANCH"
  git checkout "$WORKING_BRANCH"
  git push origin "$WORKING_BRANCH"
  echo "✓ Pushed $WORKING_BRANCH to remote"
  exit 0
fi

# Build commit message from last working-branch commit
LAST=$(git log "$WORKING_BRANCH" -1 --format="%s")
git add -A
git commit -m "sync: $(date +%Y-%m-%d) — $LAST"

git checkout "$WORKING_BRANCH"
git push origin "$WORKING_BRANCH"
echo "✓ Synced to $MAIN_BRANCH — $WORKING_BRANCH pushed to remote"
