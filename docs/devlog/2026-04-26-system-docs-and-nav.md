# 2026-04-26 — system/docs.html + améliorations nav

## Ce qui a été fait

### Lien System → dans index.html

Ajout d'un lien `System →` dans la sidebar de `index.html`, au-dessus du titre "InsideBoard AI / Brand OS".

- Classe `.nav-system-link` — mono 11px, uppercase, gray-500, hover → ink
- Positionné via marges négatives (`calc(-1 * var(--s7))` vertical, `calc(-1 * var(--s5))` horizontal) pour sortir du padding du sidebar et s'aligner exactement sur la hauteur du lien `← Brand OS` dans les pages system (53px)
- Ligne séparatrice `border-bottom: 1px solid var(--gray-200)` sur toute la largeur
- Flèche horizontale `→` (pas diagonale)

Pendant le réglage : 2 itérations d'alignement vertical pour correspondre exactement à la hauteur du `.sys-nav` côté system (passage de `var(--s3)` à `21px` de padding).

### system/docs.html

Nouvelle page dans `system/` — visualisation de la documentation projet avec le style InsideBoard.

**Sections :**
- **Roadmap** — phases visuelles empilées avec bordure colorée par statut (ember = actif, fn-moss = terminé, grisé = future), steps avec pastille de statut, note ADR en pied de phase
- **Decisions** — table des 5 ADRs (numéro, titre, statut)
- **Devlog** — 3 entrées chronologiques (date + titre)
- **Backlog** — 3 colonnes (Ideas / Bugs / Feedback)

**Nouvelles classes CSS dans brandOS-components.css :**
- `.phase-list`, `.phase-block`, `.phase-block--active/done/future`
- `.phase-tag`, `.phase-tag--active/done/future`
- `.phase-name`, `.phase-desc`, `.phase-note`
- `.phase-steps`, `.phase-step`, `.step-id`, `.step-dot`, `.step-dot--done/planned/future`
- `.adr-list`, `.adr-row`, `.adr-num`, `.adr-title`, `.adr-status`, `.adr-status--implemented/accepted`
- `.devlog-list`, `.devlog-entry`, `.devlog-date`, `.devlog-title`
- `.backlog-grid`, `.backlog-col-title`, `.backlog-empty`, `.backlog-item`, `.backlog-item-date`

Responsive : `.backlog-grid` passe en colonne unique sous 720px.

### Onglet Docs dans la nav system/

Lien `<a href="docs.html">Docs</a>` ajouté dans le bloc `.sys-links` de toutes les pages existantes :
- `system/foundations.html`
- `system/components.html`
- `system/patterns.html`
- `system/assets.html`

## À noter

`system/docs.html` est une page HTML statique — son contenu est synchronisé manuellement avec les fichiers `docs/`. Toute mise à jour de ROADMAP.md, des ADRs, du devlog ou du backlog doit se répercuter ici à la main (ou via prompt Claude Code).
