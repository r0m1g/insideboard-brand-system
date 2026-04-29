# 2026-04-26 — Component documentation anatomy

**Phase:** 1D  
**Type:** Architecture decision + documentation

---

Started from the backlog idea "Better component descriptions" and quickly established that enriching labels was the wrong frame. The real problem is structural: `system/` entries have no contract, no consistent anatomy, no template. Adding richer text to informal entries just produces better-labelled inconsistency.

Defined a spec-block anatomy (ADR-006) with five named slots — identity, anatomy, variants, usage, related — where `spec-header` is always required and the rest are optional based on component complexity. Foundations and patterns get adapted slot sets appropriate to their content type.

Phase 1D added to roadmap as the bridge between the completed token foundation (1A–1C) and Figma sync (Phase 2). Pilot implementation will use `.chapter` as the reference entry.
