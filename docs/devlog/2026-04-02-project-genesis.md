# 2026-04-02 → 2026-04-21 — Project Genesis

> *Retrospective entry — written 2026-04-28 from Claude chat conversation history. Dates are approximate where noted.*

**Period:** ~3 weeks of design exploration and strategy work  
**Phase:** Pre-repository (no git yet)  
**Status at close:** Layers 1, 2, and 3 v2 produced. Project ready for GitHub Pages migration.

---

## What happened

### The problem this project was solving

This project did not start as "let's build a brand identity." It started with a practical operational failure: colleagues in Sales, CSM, and Delivery — in France and the US — were producing materials without the Art Director in the loop, and the results were incoherent. The trigger was a PowerPoint vs. Google Slides debate (~April 16). The real tension surfaced there: *"PowerPoint was being used because clients and partners work in it, but it was creating visual identity consistency problems."*

There was no brand book. No Notion. No Figma brand library. No PDF guidelines. There was a first-generation HTML file (`insideboard-brand-system.html`) with a functional but incomplete color system (Combustion / Anthracite / Parchment / Béton), but no verbal identity, no strategy layer, and no rules that non-designers could actually follow. On the product side, Confluence documentation existed but used "change management" vocabulary that the rebrand was explicitly moving away from. Templates were scattered across Microsoft Teams and SharePoint with no enforced coherence.

The stated purpose, finalized during Section 00 drafting on April 22:

> *"The single source of truth for how InsideBoard AI thinks, speaks, looks, and operates — not a static style guide, but a living operating system that governs every brand expression, from a sales deck to an event keynote, from product micro-copy to a partner proposal."*

### Phase 1 — Visual exploration (April 2–8)

The first traceable session (conversation `d59dd2d5`, ~April 2) explored the visual foundation. The Combustion/Anthracite/Parchment/Béton palette was established. A hybrid enterprise/event positioning was tested. The Google Slides + Drive workflow was validated as the internal production stack.

Typography went through three iterations:
- Space Grotesk (rejected by Romain)
- DM Sans → replaced by Source Sans 3
- Source Sans 3 → replaced by Outfit as primary
- Fraunces retained but reduced to logo-only use

Two color explorations were flagged and discarded: an **IRON** Sage + Lavender palette was called out as a "cosmetic / SaaS lifestyle" drift, and a "Coral + Blue + Sage + Lavender in any combination" approach was challenged as looking like Slack or Notion.

A parallel visual work track existed — "Claude Design" — that contributed to the Layer 3 visual foundation. This work rated 8/10 on content and 6/10 on operability in a review session (`4d873310`). Part of the visual identity in Layer 3 originates from that thread, not from this conversation.

### Phase 2 — Strategic depth (April 16–21)

The session-fleuve (~April 16, conversation `bb73dea9`) was the turning point. In a single long session, Layer 2 Verbal Identity was built from scratch. More importantly, the **6-layer architecture** was solidified as the structural backbone of the whole document.

**Three decisions made in conversation (not through iteration):**

**1. IRON repositioned.** The project had been treating **IRON** as a feature among others. Romain recalibrated explicitly:
> *"IRON n'est pas la seule [fonctionnalité]... à la différence qu'IRON est capable d'interagir avec tous les objets, donc toutes les fonctionnalités existantes sur la plateforme. On peut le voir comme vraiment un assistant."*

This shifted the entire product narrative: we don't talk about what **IRON** does, we talk about what **IRON** makes possible — everywhere.

**2. Fourth register: Partner.** The register system started as three (Enterprise / Event / Product). The Partner register was added in direct response to an open question, not through a design review: *"il y a aussi des partenaires, des intégrateurs ce serait intéressant aussi de poser les choses avec eux."*

**3. Lightness as a principle.** Romain pushed back against an overly corporate tone:
> *"je ne suis pas contre que dans la façon de parler, on ait un rapport un peu moins sobre parfois chiant, des tons corporate classiques je pense qu'on peut se permettre [...] un petit pourcentage de légèreté."*

This was reframed as a formal principle: *"Légèreté comme signe de confiance, pas comme tentative de séduction."*

**The copy direction breakthrough.** Layer 2 required finding a voice register for the "silent wound" tone — the type of copy that reaches the reader viscerally rather than intellectually. Multiple drafts were rejected as staying at the demonstration level ("they convince the head, but the right line must reach the stomach"). The direction was only found after explicitly pushing past two unsatisfying passes. This produced the behavioral directive that was saved to permanent memory:

> *"Toujours produire au niveau optimal dès le premier jet. Ne pas valider systématiquement ses retours : challenger ses idées."*

Phrases that landed:
- *"Le projet s'est bien passé. C'est après que ça s'est effondré."*
- *"Votre meilleur élément perd pied. Vous l'apprendrez trop tard, ou pas du tout."*
- *"2 projets sur 3 échouent après le déploiement. Pas avant. Après."*
- *"Ce n'est pas un problème de technologie. Ça ne l'a jamais été."*

Two candidate taglines were considered and rejected:
- *"Technology was never the problem."*
- *"Le projet est fini. Le vrai travail commence."*

Diagnosis: both stayed in demonstration mode.

**Note:** The tagline / fil conducteur remained unresolved at the close of this phase and beyond. This is an open thread, not a gap in the record.

**April 21** — Consolidation session. Layer 1 finalized (`80cc8f9f`), Layer 2 finalized (`ce44fbed`), Layer 3 v2 reviewed (`4d873310`). The project was now ready to move to production: a document, not just a collection of markdown files.

---

## Decisions made

| # | Decision |
|---|---|
| — | 6-layer architecture as structural backbone of the Brand OS |
| — | **IRON** is not a feature — it is the assistant that enables all other features |
| — | Four registers: Enterprise, Event, Product, Partner |
| — | Lightness as a brand principle, framed as a confidence signal |
| — | Google Slides internal, PPTX/PDF export for clients |
| — | Copy register: visceral > demonstrative for the "silent wound" tone |
| — | Fil conducteur: not yet resolved (open) |
| — | **IRON** acronym: not yet resolved between two competing expansions (open) |

---

## Known gaps in this record

- The exact sequence of typography decisions is partially reconstructed.
- The "Claude Design" parallel track contributed to Layer 3. The proportion is not precisely documented.
- Layer 3 content in the final Brand OS reflects a review and synthesis of that external work, not a build-from-scratch.

---

## What came next

The project was at a decision point: it existed as strategy and copy in markdown files, but had no stable home, no consistent structure for non-designers to navigate, and no production process. The answer was a single day of work that changed the nature of the project entirely.
