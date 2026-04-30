# Todo

Concrete near-term actions. Captured as notes — not yet assigned or scheduled.

Format: `- [date] [status: open/done] Item — context`

---

- [2026-04-30] [open] Migrer les logos vers currentColor — les SVG source (`logo-insideboard-ink.svg`, `mark-insideboard-ink.svg`) ont des couleurs hardcodées. Solution temporaire en place : sprite inline dans index.html et system/assets.html. Quand les nouveaux exports Figma arrivent : (1) changer `fill:#1b1712` → `fill:currentColor` dans les deux fichiers SVG, (2) supprimer les blocs `<symbol>` des deux HTML, (3) revenir à des `<img>` simples partout, (4) CSS `color` sur les containers pour gérer fond clair / fond sombre.

- [2026-04-28] [open] Audit permission prompts — scan transcripts to identify all repeated "always yes" approvals (file writes in .claude/, scripts/, system/, Bash commands, MCP tools) and consolidate into an allowlist in .claude/settings.json. Goal: zero friction on routine operations, prompts reserved for destructive or irreversible actions only.

- [2026-04-26] [open] Create GitHub README — enough context now to write a meaningful one
- [2026-04-26] [open] Add a discreet link from Brand OS to docs.html
- [2026-04-26] [open] Resolve public GitHub visibility — migrate to internal access with Google Connect (infrastructure already in place; coordinate with devs)
- [2026-04-26] [done] System nav link added from Brand OS — commit 18280ef
- [2026-04-26] [done] Visual roadmap — system/docs.html frise — commit 18280ef
- [2026-04-26] [done] Writing rules enforced across all files (Brand OS / IRON / InsideBoard AI) — commits a8c555d, 5e375cb
