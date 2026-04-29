# InsideBoard AI — Brand Knowledge

Operational condensation of the Brand OS for use as Project Knowledge in Claude.
Source: `brandOS-content.md`. This file does not cover repo-editing rules — see `CLAUDE.md` for that.

---

## 1. Positioning essentials

InsideBoard AI is the performance layer that sits on top of the client's existing ecosystem. It addresses what nobody else covers: what happens between tool deployment and actual team performance. Internal label: Performance Orchestration Platform.

**Posture (Level 1)** — Always by your side.
Always alone. Never combined with another formulation. Its strength comes from its isolation. Never translated into French in commercial communications.

**Promise (Level 2)** — Your team's success isn't a matter of luck. We orchestrate it by your side, day after day.
French adaptation: Le succès de vos équipes ne se joue pas au hasard. Nous l'orchestrons à vos côtés, jour après jour.

**Mechanism (Level 3) — proof** — Performance + Engagement + Training + Collaboration = Success. Powered by the Closed Loop: KPI → Insight → Action → Behavior → Performance → KPI. Each dimension is powered by a dedicated **IRON** Agent.

**What InsideBoard is NOT** — Not an LMS. Not an IT tool. Not a digitized consulting firm. Not an additional reporting layer. Not a CRM add-on. Not a "success copilot." Not "an integrated AI assistant."

We never promise transformation. We promise what makes transformation last.

---

## 2. Audiences & activation modes

Same posture, different activation mode per audience.

**Decision-Maker — Revelation.** CHRO, CFO, CIO, Transformation Director. Has invested heavily; results haven't followed; cannot pinpoint why. *"You paid for deployment. You expected performance. No one stayed for what happens in between."* Formats: outbound emails, decision-maker decks, executive whitepapers, LinkedIn signed articles.

**Manager — Recognition.** Team lead, regional manager. Already lives in the space the platform addresses; carries engagement responsibility without proper means. *"What's happening in your team — you can feel it. We show it to you, and give you the means to act before it's too late."* Formats: manager-focused product pages, in-app onboarding, field manager testimonials.

**Partner — Empowerment.** PwC, Deloitte, BearingPoint, IBM. Sells transformations; knows a portion don't last; needs a differentiated asset. *"Your clients ask what happens after deployment. Now you have the answer — and the platform to deliver it."* Formats: partner decks, partner pages, outreach to partner managers.

**End User — Presence.** Sales rep, advisor, field operator. Asked to change behavior daily, often without context. Not a commercial or marketing audience. Addressed exclusively through the product — UX copy, onboarding, **IRON** micro-interactions, Success Widget. *"Bonjour. Que voulez-vous comprendre aujourd'hui ?"*

---

## 3. Registers — prompt blocks

Four registers. The posture and promise stay constant — only delivery adapts. Copy the relevant block directly into the generation context.

**Enterprise — prompt block**
Register: Enterprise. Tone: direct, confident, outcome-oriented. Rules: short sentences (max 20 words), no adjectives, no hedge words (might / could / potentially), no corporate buzzwords, no em dashes, vouvoiement in French. Open with a named reality or a specific number. Never open with a question. Never promise transformation — promise what makes transformation last. End with a clear next step or a single claim.

**Event — prompt block**
Register: Event. Tone: rhythmic, energetic, generous. Rules: use repetition for emphasis, direct address to the audience ("you / vous"), rhetorical figures authorized, one Ember signal moment per piece, no hype or hyperbole, no motivational poster tone. Build narrative tension. The brand thread "Always by your side" may appear as a standalone closing line — never combined with other statements.

**Product — prompt block**
Register: Product. Tone: clear, supportive, present. Rules: plain words only, action-oriented verbs, vouvoiement maintained even in micro-copy, no jargon, no system-speak, no gamification language, max 12 words per UI string. Acknowledge the user's effort. Never condescend. **IRON** greetings use the form: "Bonjour. Que voulez-vous [verb] aujourd'hui ?"

**Partner — prompt block**
Register: Partner. Tone: peer-to-peer, open, one notch more relaxed than Enterprise. Rules: same rigor on substance, no Ember references (Ember belongs to InsideBoard only), partner accent colors travel as functional anchors, collaborative framing ("alongside" not "on top of"), no sales pressure. Speak as equals building something together.

**How to select the register**
- Product UI surface? → Product
- Keynote, launch, or event-bound moment? → Event
- A partner is co-present in the output? → Partner
- Anything else? → Enterprise (default)

When unsure, the answer is always Enterprise. Enterprise is the brand at rest.

---

## 4. Non-negotiable rules

These apply across all registers, all audiences, all formats. No exceptions.

**Verbal rules**
- Never combine "Always by your side" with any other formulation.
- English-first. French is strategic adaptation, not literal translation.
- Vouvoiement systematic in French, including product micro-copy.
- Never use "Activate your success" — phased out.
- Never describe **IRON** as "an integrated AI assistant" or "an AI feature."
- Never inherit change-management terminology from legacy Confluence docs.

**Tone rules**
- No hype, no "disrupt", no startup posture.
- No corporate buzzwords ("synergy", "leverage", "best-in-class").
- No false intimacy ("Hey there", first-name basis in commercial communications).
- No claims of transformation. We claim what makes transformation last.

**Formatting rules**
- No em dashes in body copy. Use periods, commas, or colons.
- Use specific numbers over rounded approximations ("2 out of 3" rather than "most").
- Use short sentences in Enterprise register.

**Naming & typography rules**
- "Brand OS" — always with a space and capitalised initials. Never `BrandOS`, `brandOS`, `brand os`, `BRAND OS`. Exempted: technical filenames keep their existing form.
- **IRON** — always uppercase and rendered in bold in body copy. In headings, heading weight already provides emphasis — no additional bold needed.
- "InsideBoard AI" — capital I and B (no space between Inside and Board), space, uppercase AI. Never `Insideboard AI`, `Inside Board AI`, `insideboard ai`, `INSIDEBOARD AI` in body copy. Exempted: deliberate all-caps graphic treatments (signatures, stamps, letterheads).

---

## 5. Anti-patterns — recognize & correct

Generic anti-patterns (return to the Verbal Architecture if a draft falls into these):
- Aggressive startup voice → contradicts the maturity of the client base → use sober Enterprise tone.
- Cold IT vendor voice → contradicts the human dimension → reintroduce presence and care.
- Consulting firm voice → contradicts "we execute, we don't advise" → speak from operational reality.
- Generic SaaS marketing → no differentiation, no felt truth → return to the silent wound.
- Motivational poster → lightness becomes hollow → specificity, not enthusiasm.
- Demonstration mode → convinces the head, not the gut → name the felt reality first.

Named anti-patterns currently in use at InsideBoard — recognize and eliminate:
- "Drive success in their transformation" → vague, self-centered, no problem named → "Address what happens between deployment and performance".
- "We're genuinely excited about the opportunity" → aggressive startup register, forbidden → remove, let the facts speak.
- "AI-powered and KPI-driven" → double marketing adjective, no anchor → name what the AI does specifically.
- "Success copilot" → hollow metaphor, does not position **IRON** → "The conversational interface of the platform".
- "Let us help you in your transformation" → consulting register circa 2010 → name the client's specific problem.
- "Unified, data-driven experience" → buzzwords without differentiation → describe the mechanism: KPI → action → behavior.
- "Facilitate a successful and sustainable transformation" → six words saying nothing → "What makes transformation last".
- "So, let us help you" → weak closing, low-grade commercial tone → a precise claim or a specific next step.

---

## 6. Calibration checklist — 5 questions

Apply on any output before release. Can be appended directly to any generation prompt as a self-check.

1. Does the first sentence name a client reality — or does it talk about us? → If us → rewrite.
2. Is there an adjective that could be removed without losing meaning? → If yes → remove it.
3. Does the register match the touchpoint? → If not → recalibrate.
4. Are we promising transformation — or what makes it last? → "Drive transformation" → forbidden.
5. Could this text appear on any competitor's SaaS website? → If yes → restart.

A well-constrained prompt should not need correction — the checklist catches edge cases.

---

## 7. Before / After reference

**Enterprise · commercial follow-up email**
Before: *"We came away impressed by what Fanatics is building and saw a very natural alignment between your global growth priorities and how InsideBoard AI helps organizations connect learning, performance, and coaching into one unified, data-driven experience. We're genuinely excited about the opportunity to collaborate."*
After: *"Fanatics is scaling across 15 countries while trying to make Oracle actually work for your teams. That's exactly the gap we address — between tool deployment and measurable behavior change. Here's what that looks like in practice."*
Why it works: names their reality in line 1; positions InsideBoard without self-promotion; opens on proof, not enthusiasm.

**Enterprise · short company description**
Before: *"The 1st AI Digital Platform for Change Management that helps companies drive success in their transformation. So, let us help you in your transformation."*
After: *"Two out of three transformation projects fail after deployment. Not before. After. InsideBoard addresses what comes after — the gap between go-live and actual team performance."*
Why it works: opens with a fact, not with us; names the problem with precision; positions without a generic claim.

**Event · keynote opening**
Before: *"InsideBoard AI facilitates an efficient and coherent digital transformation through artificial intelligence, notably with its recent success copilot, IRON."*
After: *"You came here to talk about transformation. We'd like to talk about what comes after. After deployment. After training. After your teams said yes. That's where everything actually happens. And that's where we work."*
Why it works: direct address; rhythm through repetition; narrative tension; no buzzwords; posture without demonstration.

**Product · IRON greeting**
Before: *"Hi! I'm IRON, your AI-powered success copilot. I'm here to help you achieve your goals and boost your performance!"*
After (static): *"Hello. What are you working on right now?"* / *"Hello. Where do you want to move forward today?"* / *"Hello. What's your priority at the moment?"*
Why it works: **IRON** does not introduce itself. It does not explain what it is. It activates. Presence is proven through action, not description.

---

## 8. What this document is NOT

This file covers Layers 00, 01, 02, and Sections 04 and 05 of the Brand OS — the validated verbal and operational system. It does not cover:

- **Layer 03 — Visual Identity** (in progress): type system, color (HEX values, allowed combinations, IRON color reservation, Ember signal integrity), data visualisation, space & grid, iconography, illustration, butterfly mark, composition patterns, photography, motion, transversal coherence across registers.
- **Layers 06–09**: Do/Don't, Design Language, Component System, Automation Layer — to be defined.

For the visual system (colors, typography, composition, register canvases, dataviz palette, motion specs), consult the rendered Brand OS at https://r0m1g.github.io/insideboard-brandOS/.

This file does not cover repo-editing protocols. Editing rules, str_replace conventions, branch workflow, structural coherence checks, and operation types are defined in `CLAUDE.md` and `PROCESS.md`.
