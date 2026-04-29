#!/usr/bin/env bash
# scripts/syncmain.sh
#
# Push main to remote. All work happens on main — no branch switching needed.
#
# Usage:
#   bash scripts/syncmain.sh            — push and confirm
#   bash scripts/syncmain.sh --dry-run  — show current state, no push

set -euo pipefail

DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

CURRENT=$(git branch --show-current)

if $DRY_RUN; then
  echo "Dry run — current branch: $CURRENT"
  echo "Last commit:"
  git log -1 --oneline
  exit 0
fi

if [[ "$CURRENT" != "main" ]]; then
  echo "✗ Must run from main (currently on $CURRENT)" >&2
  exit 1
fi

if ! git diff --quiet -- ':(exclude).DS_Store' || ! git diff --cached --quiet; then
  echo "✗ Uncommitted changes detected — commit first" >&2
  exit 1
fi

git push origin main
echo "✓ main pushed to remote"
