#!/bin/sh
# Pre-commit cascade validation — InsideBoard AI Brand OS
# Enforces dependency map rules from CLAUDE.md §Dependency map
# Blocks commit if a source file was staged without its required derived artifact.

STAGED=$(git diff --cached --name-only)
ERRORS=0

# ─────────────────────────────────────────────────────────────
# BLOCK 1 — tokens.json → brandOS-tokens.css
# Rule: any edit to tokens.json requires a CSS rebuild before commit
# ─────────────────────────────────────────────────────────────
if echo "$STAGED" | grep -q "^tokens\.json$"; then
  if ! echo "$STAGED" | grep -q "^brandOS-tokens\.css$"; then
    echo "✗ tokens.json staged without brandOS-tokens.css"
    echo "  Run: node scripts/build-tokens.js  then stage the result."
    ERRORS=$((ERRORS + 1))
  fi
fi

# ─────────────────────────────────────────────────────────────
# BLOCK 2 — brandOS-tokens.css must not be hand-edited
# Rule: CSS is generated — only valid source is tokens.json or build script change
# ─────────────────────────────────────────────────────────────
if echo "$STAGED" | grep -q "^brandOS-tokens\.css$"; then
  if ! echo "$STAGED" | grep -qE "^tokens\.json$|^scripts/build-tokens\.js$"; then
    echo "✗ brandOS-tokens.css staged without tokens.json or build-tokens.js"
    echo "  This file is generated — do not hand-edit."
    echo "  If you ran the generator: also stage tokens.json or build-tokens.js."
    ERRORS=$((ERRORS + 1))
  fi
fi

# ─────────────────────────────────────────────────────────────
# BLOCK 3 — docs/ROADMAP.md → system/docs.html
# Rule: roadmap status changes must be synced to the docs page
# ─────────────────────────────────────────────────────────────
if echo "$STAGED" | grep -q "^docs/ROADMAP\.md$"; then
  if ! echo "$STAGED" | grep -q "^system/docs\.html$"; then
    echo "✗ docs/ROADMAP.md staged without system/docs.html"
    echo "  Sync required: phasesData JS object + .roadmap-track HTML (Update type 9)."
    ERRORS=$((ERRORS + 1))
  fi
fi

# ─────────────────────────────────────────────────────────────
# BLOCK 4 — assets/icons/*.svg → assets/icons/icons.md
# Rule: every new or modified icon must have a registry entry
# ─────────────────────────────────────────────────────────────
if echo "$STAGED" | grep -qE "^assets/icons/.+\.svg$"; then
  if ! echo "$STAGED" | grep -q "^assets/icons/icons\.md$"; then
    echo "✗ SVG file staged without assets/icons/icons.md"
    echo "  Add or update the registry entry (Step 6 of /svg)."
    ERRORS=$((ERRORS + 1))
  fi
fi

# ─────────────────────────────────────────────────────────────
# WARN (non-blocking) — brandOS-content.md → index.html
# Rule: content changes should be reflected in HTML
# Warning only — legitimate to stage content.md alone for planning edits
# ─────────────────────────────────────────────────────────────
if echo "$STAGED" | grep -q "^brandOS-content\.md$"; then
  if ! echo "$STAGED" | grep -q "^index\.html$"; then
    echo "⚠ brandOS-content.md staged without index.html"
    echo "  If this is a planning edit, ignore. Otherwise update the matching section."
  fi
fi

# ─────────────────────────────────────────────────────────────
# Result
# ─────────────────────────────────────────────────────────────
if [ "$ERRORS" -gt 0 ]; then
  echo ""
  echo "$ERRORS cascade error(s). Commit blocked. Fix the above, then re-stage."
  exit 1
fi

exit 0
