Optimize and register an SVG icon following the InsideBoard AI iconography protocol.

**Trigger:** `/svg` followed by either an inline SVG, a file path, or nothing (in which case ask the user to paste the SVG).

This command is the single execution path for icon optimization. The doctrine lives here. The registry of optimized icons lives in `assets/icons/icons.md`. Logos are managed separately in `assets/logos/` and are out of scope.

**Non-negotiable principles:**
1. **One icon per call.** Never batch.
2. **Validate at every gate.** Anatomical name, aliases, category, functional mapping, `<desc>`, active state, and each file write are all validated by the user before proceeding.
3. **Refuse rather than guess.** Outline-to-stroke conversion is infeasible by AI — alert and stop. Non-standard viewBox needs explicit confirmation.
4. **Anatomical naming.** Filenames describe the SHAPE, never the function. Functions live as semantic aliases and functional mappings in the registry.
5. **Never write to disk without explicit user validation per file.**

---

## Step 0 — System (mandatory first question)

If the user did not specify, ask:

> **System?**
> - [ ] Brand iconography
> - [ ] Platform iconography
> - [ ] Autre : ___

- **Brand** — communication-level icons (literal figuration, can be filled, may use multiple colors for IRON agents). Categories: `agents`, `modes`, `objects`, `states`, `actions`, `navigation`, `layout`, `communication`, `controls`.
- **Platform** — UI-level icons (functional, line-style, single-color). Categories: `navigation`, `layout`, `actions`, `objects`, `states`, `communication`, `controls`.

This determines the destination folder: `assets/icons/[brand|platform]/[category]/`.

---

## Step 1 — Audit (read-only — no modification yet)

### 1.1 Outline detection (Illustrator-style export)

Compute a confidence score (Low / Medium / High) using these signals:
- Path with `fill="#xxxxxx"` (or any non-`none` fill) and **no** `stroke` attribute → +High
- Path with `fill-rule="evenodd"` containing closed sub-paths → +High
- Multiple stacked closed paths forming what visually reads as a stroke → +Medium
- ViewBox larger than 24×24 (e.g. 256×256) suggesting Illustrator export defaults → +Low

**Output the score** and the signals that contributed to it.

If confidence is **High**, ALERT and REFUSE to proceed:
> "This icon is vectorized (outlined fills, not strokes). Confidence: High. Signals: [list]. Conversion to strokes cannot be reliably automated — it requires retracing the icon. Please rework in Figma using stroke mode (`Object → Path → Outline Stroke` reverse is not lossless) and resubmit."

If confidence is **Medium** or **Low**, ask the user whether to continue.

### 1.2 ViewBox check

Standard is `0 0 24 24`. If the SVG declares anything else:
> "ViewBox is `[actual]`. Standard for the icon system is `0 0 24 24`. Is this intentional (brand illustrative icon), or should you re-export from Figma at 24×24?"

- **Intentional** → keep the declared viewBox, document the exception in the registry entry under `Anatomy`.
- **Not intentional** → REFUSE and ask for re-export. Do not attempt to rescale automatically (rescaling produces sub-pixel coordinates that break grid alignment).

### 1.3 Overlap detection

Detect path segments that overlap on the same axis (a known Figma export quirk — the same line drawn 2-3 times). Heuristic:
- Two `<path d="M…">` whose start/end points match within 0.5 unit and direction is identical.
- A `<line>` and a `<path>` segment over the same coordinates.

If detected, ALERT (but do not block):
> "Detected [N] overlapping segments. The icon will render but is heavier and may anti-alias unevenly. Recommendation: Flatten in Figma (`Cmd+E`) and re-export. Continue with current state? (yes / no)"

### 1.4 Primitive substitution

Detect `<path>` data that is geometrically equivalent to a primitive:
- A 4-corner closed path with right angles → `<rect>` (with optional `rx` if rounded)
- An 8-segment path approximating a circle → `<circle>`
- A 2-point straight `<path>` → `<line>`

If found, propose:
> "Path `[d=…]` is equivalent to `<rect width=18 x=3 y=4 rx=2/>`. Replace with primitive? (yes / no)"

Primitives are lighter, more readable, and easier to manipulate. Default recommendation: yes.

### 1.5 Grid check

Icons use an **optical bounding box**, not a geometric one. The 24×24 viewBox intentionally has 1–2px of visual breathing room on each side — coordinates do not need to touch all four edges. This is standard practice (Material, Lucide, Phosphor all follow this convention).

Verify that all coordinates are integers (or at most `.5` increments for visual centering). Non-integer coordinates indicate a Figma layer not aligned to the pixel grid.

If non-integer coordinates are found, ALERT:
> "Coordinates `[list of 3 examples]` are not on the pixel grid. The icon will look slightly blurry at small sizes. Recommendation: snap to grid in Figma. Continue anyway?
> - [ ] Yes, continue
> - [ ] No, I'll fix in Figma first"

### 1.6 Mixed technique detection

Detect when an icon combines different structural techniques — typically a **closed outline shape** (container) with a **symbolic element** drawn on top (plus, arrow, check, dot, badge).

Example: camera body (closed container outline) + `+` sign (symbolic stroke) → `camera-plus`.

This is a valid and often intentional choice for **functional clarity**. But it breaks formal consistency (pure line-drawing uniformity) and must be documented.

If detected, ask:
> **Mixed technique detected** — this icon combines a [container/outline shape] and a [symbolic element].
> - [ ] Intentional — clarity over formal consistency (will be noted in registry `Anatomy`)
> - [ ] Not intentional — I'll rework the icon in Figma
> - [ ] Autre : ___

---

## Step 2 — Naming, categorization, mapping

### 2.1 Anatomical name

Propose a name describing the **shape** of the icon, never its function. Pattern: `[primary-shape]-[modifier(s)]`, kebab-case, lowercase, English.

Examples:
- `arrows-left-right` (two arrows pointing outward)
- `layout-sidebar-left` (rectangle divided 1/3 - 2/3, narrow on left)
- `circle-plus` (plus sign inside a circle)
- `dot-three-vertical` (three vertically stacked dots)
- `chevron-down`, `square-check`, `triangle-warning`

> "Anatomical name proposal: `[name]`. This describes what the icon **looks like**, not what it does. Confirm or rename?"

If the user proposes a function-based name (e.g. `delete`, `submit`), redirect:
> "`delete` describes a function, not a shape. The same icon may serve `delete`, `remove`, `close`, etc. Suggest an anatomical name like `trash`, `x-mark`, or `circle-minus`. The function will be captured as a semantic alias in the next step."

### 2.2 Semantic aliases

Ask:
> "Which semantic aliases? Comma-separated. Leave blank to skip for now."

Aliases follow the convention `icon-[function]-[context]` and are the **how this icon will be referred to** by code or by humans:
- `icon-resize-h, icon-slide-control, icon-swap` for `arrows-left-right`
- `icon-menu-toggle, icon-sidebar-collapse` for `layout-sidebar-left`

Aliases do NOT live in the filename — they live in the registry only.

### 2.3 Category

Propose a category. The same taxonomy is used for both Brand and Platform systems, with two extensions reserved for Brand:

| Category | Scope | Examples |
|---|---|---|
| `navigation` | both | arrows, chevrons, hamburgers, back |
| `layout` | both | sidebar, panels, grids |
| `actions` | both | add, delete, edit, save, share |
| `objects` | both | file, folder, image, camera |
| `states` | both | check, error, warning, info |
| `communication` | both | chat, mail, notification, comment |
| `controls` | both | search, filter, sort, settings |
| `agents` | brand only | IRON agents (Coral, Blue, Sage, Lavender) |
| `modes` | brand only | Knowledge, Deep Search, Multi-Agent, Coaching |

> "Category proposal: `[cat]`. Confirm or change?"

If unclear between two categories, propose both and let the user choose.

### 2.4 Functional Mapping

Ask:
> "Which platform features or contexts does this icon represent? Comma-separated. Leave blank to skip for now."

Examples: `Sidebar collapse, Multi-agent panel toggle, Knowledge mode entry`.

This field is **the bridge between the icon system and content generation**: when later asked to illustrate "Knowledge mode", the AI can scan `icons.md` for icons mapped to "Knowledge mode" and propose them.

### 2.5-gate — Empty fields validation

If **both** Semantic Aliases and Functional Mapping were left blank, insert this gate before proceeding to 2.5:

> **Warning — no aliases or functional mapping.**
> This icon won't appear in any feature search or functional lookup. An icon with no aliases and no mapping is invisible to content generation.
> - [ ] I'll add them now (go back to 2.2)
> - [ ] Skip for now — I'll complete the registry entry manually later
>
> The registry entry will be written with `—` for both fields as a reminder to fill them in later.

### 2.5 Duplicate detection

Before writing, scan `assets/icons/icons.md` for collisions:

**a. Anatomical name match** (exact)
> "Icon `[name]` already exists in `[system]/[category]`. Update existing entry or pick a different name?"

If updating: **the SVG code, the `<desc>`, and the active state are overwritten**, but **the semantic aliases and functional mapping are preserved** (they were validated by a human). Show what will be preserved before proceeding.

**b. Semantic alias collision** (any one alias already used)
> "Alias `[X]` is already used by icon `[Y]` in the registry. Either remove this alias from the new icon, or replace the existing one."

**c. Visual similarity** (heuristic)

Compare the new SVG against existing entries in the registry:
- Same number of `<path>`/`<rect>`/`<circle>` elements
- Coordinates close within ~5% (after viewBox normalization)
- Same stroke topology (open vs closed, segment count)

If a close match is found:
> "ALERT — visual similarity detected with `[name]` (in `[system]/[category]`). The two icons may be near-duplicates. Compare them before proceeding. Continue with the new icon, merge into the existing one, or cancel?"

This is a soft warning, never a block.

---

## Step 3 — Standardization (the "Clean Sweep")

Apply systematically. Order matters: clean first, then add accessibility nodes.

### 3.1 Strip junk

Remove:
- `id`, `class`, `data-*` attributes (except those needed for active state, see 4.x)
- Inline `style` attributes (move geometry to attributes)
- Figma metadata: `xmlns:figma`, `figma:*`
- Sodipodi/Inkscape namespaces and attributes
- HTML comments
- Empty `<g>` wrappers (flatten their children up)
- `width`/`height` declarations in CSS form (we set them as attributes)
- Any `<defs>` containing only unused gradients/filters

### 3.2 Normalize root `<svg>` attributes

The root must declare exactly:
```
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"   (or the validated brand override)
width="24" height="24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
role="img"
aria-labelledby="icon-title-[anatomical-name] icon-desc-[anatomical-name]"
```

Exception: if the user explicitly requested miter joins for a sharp graphic effect, swap `stroke-linejoin="round"` for `"miter"` and document it in `Anatomy`.

**Homothetic scaling — doctrine**

This icon system is **homothetic by design**: when an icon is scaled (via CSS `width`/`height` or `transform: scale()`), both the geometry and the `stroke-width` scale proportionally. This is SVG's default behavior and is intentionally preserved.

`vector-effect="non-scaling-stroke"` is **explicitly NOT used** — it would decouple stroke from geometry, breaking visual consistency at non-native sizes.

All icons are authored at **24×24 / stroke-width 2** (the base size). Consuming components may set a different `width`/`height`; the stroke scales with them. For precise optical control at specific sizes, the recommended stroke pairings are:

| Render size | stroke-width |
|---|---|
| 16px | 1.5 |
| 24px | 2 (base — authored here) |
| 32px | 2.5 |
| 48px | 3 |

### 3.3 Normalize children

- Replace any `fill="#xxxxxx"` (non-`none`) with `fill="currentColor"` only when the child is part of an active-state fill (otherwise remove `fill`).
- Replace any `stroke="#xxxxxx"` with the inherited stroke from the root (i.e. remove the attribute from the child).
- Round all coordinates to integers where possible (warned in 1.5). Never silently rescale; round only if the coordinate is within 0.05 of an integer.

### 3.4 Insert accessibility nodes

As the **first two children** of the root, in this order:
```xml
<title id="icon-title-[anatomical-name]">[Title Case Anatomical Name]</title>
<desc id="icon-desc-[anatomical-name]">[structural description]</desc>
```

The `<desc>` describes the **shape**, not the function. Examples:
- `arrows-left-right`: *Two horizontal arrows pointing outward from a shared center.*
- `layout-sidebar-left`: *A rectangle divided into two columns, with a narrow sidebar on the left.*

Propose a `<desc>` and ask the user to validate or edit:
> "`<desc>` proposal: *[text]*. Validate, edit, or rewrite?"

Never skip this step. The `<desc>` is the most stable asset of the icon and should be correct on first write.

**Accessibility model — visual primitive with self-documenting metadata**

Icons in this system are **visual primitives**: their semantic meaning is determined by the UI component that wraps them, not by the SVG itself.

- The SVG carries `role="img"` + `<title>` + `<desc>` for **standalone and catalog use** (documentation, `system/icons.html`, registry). This is what the `/svg` command produces.
- When embedded in a functional component (button, nav item, link), the **consuming element** carries the functional `aria-label` (e.g. `<button aria-label="Add media">`), and the SVG should receive `aria-hidden="true"` and `focusable="false"` added by the component — not here.

The `/svg` command always produces the standalone form. Overrides for component use are the responsibility of the implementing developer.

### 3.5 Minify

Final pass:
- Remove leading/trailing whitespace inside attribute values
- Collapse internal whitespace in `d=` to single spaces
- Remove the XML declaration `<?xml ...?>` (not needed in HTML/HTML-embedded SVG)
- Remove any DOCTYPE
- Single-line the entire SVG when displayed in chat output

---

## Step 4 — Active state (optional)

Ask:
> **Active state?**
> - [ ] (a) Container fill — interior 15% fill (closed shape: camera, sidebar, file)
> - [ ] (b) Global background — rounded rect 24×24 rx=4 at 15% opacity (line icons: arrows, plus, chevron)
> - [ ] (c) None
> - [ ] Autre : ___

If **(a) Container fill**:
- Identify the primary closed shape in the icon (the largest closed path or the outermost `<rect>`).
- Add a duplicate of that shape as the **first child after `<desc>`**, with `fill="currentColor" fill-opacity="0.15"` and no `stroke`.
- This produces a soft fill inside the container while the outline remains crisp.

If **(b) Global background**:
- Insert as the **first child after `<desc>`**:
  ```xml
  <rect width="24" height="24" rx="4" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  ```
- This produces a rounded badge behind the line icon.

The active variant is written to a **separate file**: `[anatomical-name]-active.svg`.

The user always validates the produced active SVG visually before it is written. Show both default and active rendered side-by-side via the optimized code, and ask:
> "Active variant produced. Confirm or adjust?"

---

## Step 5 — Output

Display in chat, in this order:

1. **The default optimized SVG**, single line, ready to copy:
   ```svg
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-labelledby="icon-title-[name] icon-desc-[name]"><title id="icon-title-[name]">[Title]</title><desc id="icon-desc-[name]">[desc]</desc>[children]</svg>
   ```

2. **The active SVG** (if produced), same format.

3. **The destination paths**:
   - `assets/icons/[brand|platform]/[category]/[anatomical-name].svg`
   - `assets/icons/[brand|platform]/[category]/[anatomical-name]-active.svg` *(if applicable)*

4. **The registry entry** to be appended to `assets/icons/icons.md` under the matching section:
   ```markdown
   #### [anatomical-name]
   - **Anatomy:** [structural description, derived from <desc>]
   - **Semantic Aliases:** [comma-separated, or —]
   - **Functional Mapping:** [comma-separated features, or —]
   - **Active State:** [container | global | none]
   - **Code:**
     ```svg
     [minified default SVG]
     ```
   ```

   If active state present, the active SVG is included as a second `Code` block under the same entry.

---

## Step 6 — Three separate validations (write to disk)

Propose **three actions, one at a time**, waiting for user validation between each:

1. > "Write `[name].svg` to `assets/icons/[system]/[cat]/`?"
2. > "Write `[name]-active.svg` to `assets/icons/[system]/[cat]/`?" *(only if active state was produced)*
3. > "Append the registry entry to `assets/icons/icons.md`?"

If the destination directory does not exist, create it as part of the corresponding write (no separate step).

If any of the three is declined, do not chain — stop, the user can re-run the relevant action manually later.

---

## Behavioral rules

- **One icon per `/svg` call.** Never optimize multiple icons in a single invocation.
- **Never modify icons in `assets/logos/`.** Logos are not part of the icon system.
- **Never write to disk before Step 6 validation.**
- **If anatomical name proposal is rejected**, restart from Step 2.1 with the new name.
- **When updating an existing icon**, preserve `Semantic Aliases` and `Functional Mapping` from the existing registry entry; overwrite `Anatomy`, `Active State`, and `Code`.
- **English only.** All filenames, registry entries, `<title>`, `<desc>`, and chat-output prose are in English. The conversation between user and Claude can happen in French, but every artifact written to disk is English.
- **No commit, no syncmain.** This command produces and registers icons. Committing and syncing to `main` are separate operations the user triggers explicitly.
- **Questions use checkbox format.** All decision questions during the protocol use checkboxes with an `Autre` option for free-form input:
  ```
  > **Question label?**
  > - [ ] Option A
  > - [ ] Option B
  > - [ ] Autre : ___
  ```
  Never use (a)/(b)/(c) lettered lists without checkboxes. The user clicks or types the option letter/text.
