# Icon Registry — InsideBoard AI

The single source of truth for every icon in the system: anatomy, aliases, functional mapping, and the optimized SVG code.

This file is **populated by the `/svg` command** and read by both humans (to find an icon) and the AI (to retrieve icons for content generation by function).

The doctrine and protocol live in [`.claude/commands/svg.md`](../../.claude/commands/svg.md). This file holds entries.

---

## Naming doctrine

**Filenames are anatomical, not functional.** A filename describes the **shape** of the icon. Functions are captured as semantic aliases and functional mappings inside each entry.

- `arrows-left-right.svg` — describes the shape (two horizontal arrows). Aliases capture functions (`icon-resize-h`, `icon-slide-control`, `icon-swap`).
- Never `delete.svg` — the same trash-can icon may serve `delete`, `remove`, `archive`. Use `trash` or `square-x` and bind functions via aliases.

Pattern: `[primary-shape]-[modifier(s)]`, kebab-case, lowercase, English.

---

## Folder structure

```
assets/icons/
├── icons.md                          ← this file
├── brand/
│   ├── agents/      ← IRON agents (Coral, Blue, Sage, Lavender)
│   ├── modes/       ← Knowledge, Deep Search, Multi-Agent, Coaching
│   ├── actions/     navigation/   layout/   objects/   states/
│   ├── communication/   controls/
└── platform/
    ├── navigation/   layout/   actions/   objects/   states/
    ├── communication/   controls/
```

Logos do **not** live here — they are in `assets/logos/`.

---

## Entry format

Every icon, in either system, is documented as:

```markdown
#### [anatomical-name]
- **Anatomy:** [structural description — what the shape looks like]
- **Semantic Aliases:** [comma-separated functional names, or —]
- **Functional Mapping:** [comma-separated platform features or contexts, or —]
- **Active State:** [container | global | none]
- **Code:**
  ```svg
  [minified default SVG]
  ```
```

If the icon has an active variant, the active SVG is appended as a second `Code` block right after the default, labelled `Code (active)`.

---

## Brand iconography

Communication-level icons. May be filled, may use multiple colors for IRON agents.

### agents
*Reserved for the four IRON agents. Each agent has a designated icon and a tagged color (Coral, Blue, Sage, Lavender) that travels with it across surfaces.*

*(empty — no entries yet)*

### modes
*Reserved for the four IRON modes (Knowledge, Deep Search, Multi-Agent, Coaching). Each mode has a dedicated icon set in production.*

*(empty — no entries yet)*

### navigation
*(empty — no entries yet)*

### layout
*(empty — no entries yet)*

### actions
*(empty — no entries yet)*

### objects
*(empty — no entries yet)*

### states
*(empty — no entries yet)*

### communication
*(empty — no entries yet)*

### controls
*(empty — no entries yet)*

---

## Platform iconography

UI-level icons. Functional, line-style, single-color (`currentColor`). Used inside the InsideBoard application.

### navigation
*(empty — no entries yet)*

### layout

#### layout-sidebar-left
- **Anatomy:** A rectangle divided into two columns, with a narrow sidebar on the left.
- **Semantic Aliases:** icon-menu-toggle, icon-sidebar-collapse, icon-sidebar-open, icon-nav-panel
- **Functional Mapping:** Navigation panel toggle, Left panel collapse, Sidebar open
- **Active State:** container
- **Code:**
  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-labelledby="icon-title-layout-sidebar-left icon-desc-layout-sidebar-left"><title id="icon-title-layout-sidebar-left">Layout Sidebar Left</title><desc id="icon-desc-layout-sidebar-left">A rectangle divided into two columns, with a narrow sidebar on the left.</desc><rect width="18" height="16" x="3" y="4" rx="2"/><line x1="9" y1="4" x2="9" y2="20"/></svg>
  ```
- **Code (active):**
  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-labelledby="icon-title-layout-sidebar-left icon-desc-layout-sidebar-left"><title id="icon-title-layout-sidebar-left">Layout Sidebar Left</title><desc id="icon-desc-layout-sidebar-left">A rectangle divided into two columns, with a narrow sidebar on the left.</desc><rect width="18" height="16" x="3" y="4" rx="2" fill="currentColor" fill-opacity="0.15" stroke="none"/><rect width="18" height="16" x="3" y="4" rx="2"/><line x1="9" y1="4" x2="9" y2="20"/></svg>
  ```

### actions

#### arrows-left-right
- **Anatomy:** Two horizontal arrows pointing outward from a shared center line.
- **Semantic Aliases:** icon-resize-h, icon-slide-control, icon-swap, icon-periodic-profile-fixed
- **Functional Mapping:** Periodic Profile — Fixed mode, IRON — Resize window width
- **Active State:** none
- **Code:**
  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-labelledby="icon-title-arrows-left-right icon-desc-arrows-left-right"><title id="icon-title-arrows-left-right">Arrows Left Right</title><desc id="icon-desc-arrows-left-right">Two horizontal arrows pointing outward from a shared center line.</desc><path d="M3 12h18M7.5 16.5 3 12l4.5-4.5m9 9L21 12l-4.5-4.5"/></svg>
  ```

### objects

#### camera-plus
- **Anatomy:** A camera body with a trapezoidal mount at the top, a circular lens at the center, and a plus sign at the top right.
- **Semantic Aliases:** icon-add-media, icon-upload-photo
- **Functional Mapping:** Media upload, Add photo
- **Active State:** container
- **Code:**
  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-labelledby="icon-title-camera-plus icon-desc-camera-plus"><title id="icon-title-camera-plus">Camera Plus</title><desc id="icon-desc-camera-plus">A camera body with a trapezoidal mount at the top, a circular lens at the center, and a plus sign at the top right.</desc><path d="M13 7L12.5 5H6.5L6 7H3V19H19V13"/><circle cx="11" cy="13" r="3"/><path d="M19 5V9M17 7H21"/></svg>
  ```
- **Code (active):**
  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-labelledby="icon-title-camera-plus icon-desc-camera-plus"><title id="icon-title-camera-plus">Camera Plus</title><desc id="icon-desc-camera-plus">A camera body with a trapezoidal mount at the top, a circular lens at the center, and a plus sign at the top right. Active state with interior fill.</desc><path d="M3 7L6 7L6.5 5H12.5L13 7H19V19H3Z" fill="currentColor" fill-opacity="0.15" stroke="none"/><path d="M13 7L12.5 5H6.5L6 7H3V19H19V13"/><circle cx="11" cy="13" r="3"/><path d="M19 5V9M17 7H21"/></svg>
  ```

### states
*(empty — no entries yet)*

### communication
*(empty — no entries yet)*

### controls
*(empty — no entries yet)*

---

## Functional Mapping index

The reverse lookup: given a platform feature, which icon represents it?

This index is regenerated from the `Functional Mapping` field of every entry above. When the AI is asked to generate content involving a feature (e.g. "show the Knowledge mode in a slide"), it consults this index first.

| Feature | Icon | System | Category |
|---|---|---|---|
| Navigation panel toggle | layout-sidebar-left | platform | layout |
| Left panel collapse | layout-sidebar-left | platform | layout |
| Sidebar open | layout-sidebar-left | platform | layout |
| Media upload | camera-plus | platform | objects |
| Add photo | camera-plus | platform | objects |
| Periodic Profile — Fixed mode | arrows-left-right | platform | actions |
| IRON — Resize window width | arrows-left-right | platform | actions |

---

## Accessibility — required structure

Every icon SVG includes:

```xml
<svg ... role="img" aria-labelledby="icon-title-[name] icon-desc-[name]">
  <title id="icon-title-[name]">[Title Case Anatomical Name]</title>
  <desc id="icon-desc-[name]">[structural description]</desc>
  ...
</svg>
```

When used in a UI component (button, link), the **functional** label is provided by `aria-label` on the parent element, taking priority over the SVG `<title>` for screen readers. The SVG `<title>`/`<desc>` document the **shape** for code reviewers and AI consumers.
