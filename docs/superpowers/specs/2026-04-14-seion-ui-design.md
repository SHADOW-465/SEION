# SEION UI Design Specification
**Date:** 2026-04-14
**Status:** Approved — ready for implementation planning
**Author:** Brainstorming session — Showmik Kumaar × Claude

---

## Purpose

This document is the single source of truth for the SEION website UI. It serves two purposes simultaneously:

1. **Agent prompt** — Any AI agent reads this before touching the codebase. Every design decision is named, reasoned, and binding.
2. **Developer reference** — Every token, component, animation, and interaction is defined here. If it is not in this document, it does not exist in the design.

---

## Decisions Log

| Question | Decision | Reason |
|---|---|---|
| Tech stack | Next.js 16.1 (latest stable), App Router, React 19, TypeScript | Framework flexibility + spec fidelity |
| Component libraries | None — zero shadcn, zero Radix, zero MUI | Spec requires custom-built only |
| Styling | Tailwind CSS v3.4 + CSS custom properties | Design tokens via CSS vars, utility via Tailwind |
| Animation | GSAP 3 + ScrollTrigger + Lenis v1 | GSAP for precision and Safari safety |
| Component structure | Hybrid — simple sections flat, complex sections in folders | Matches file size to actual complexity |
| Contact form backend | Next.js API route → Supabase `contact_submissions` table | Full ownership, no third-party form service |
| Existing components | Wiped entirely — `components/` and `app/page.tsx` deleted | Zero design DNA overlap with new spec |
| Navbar effect | Frosted glass pill with inset rim highlights on scroll | Premium restraint — appropriate for B2B institutional audience |
| Liquid glass | Rejected — too trendy, undermines institutional credibility | SEION audience is skeptical of visual gimmicks |

---

## Section 1 — Design Tokens

### CSS Custom Properties (defined in `app/globals.css`)

```css
:root {
  /* Backgrounds */
  --color-void:          #0C0C0E;
  --color-cream:         #F5F2EB;
  --color-surface:       #141416;
  --color-gold-strip:    #D4952A;

  /* Accent */
  --color-gold:          #D4952A;
  --color-gold-deep:     #8a5f12;
  --color-gold-light:    #f5dfa0;

  /* Semantic */
  --color-green:         #22C47A;
  --color-red:           #E04040;

  /* Borders */
  --color-border-dark:   rgba(255, 255, 255, 0.08);
  --color-border-light:  rgba(0, 0, 0, 0.08);

  /* Typography */
  --font-serif:          'Instrument Serif', Georgia, serif;
  --font-sans:           'DM Sans', system-ui, sans-serif;
  --font-mono:           'JetBrains Mono', 'Courier New', monospace;

  /* Radius */
  --radius-card:         16px;
  --radius-button:       8px;
  --radius-pill:         9999px;

  /* Transitions */
  --ease-entrance:       cubic-bezier(0.16, 1, 0.3, 1);        /* power3.out equivalent */
  --ease-morph:          cubic-bezier(0.25, 0.46, 0.45, 0.94); /* power2.inOut equivalent */
  --ease-spring:         cubic-bezier(0.34, 1.56, 0.64, 1);    /* spring-bounce */
}
```

### Gold Scarcity Rule
Gold (`#D4952A`) appears in **exactly 7 places** on the page. If it appears in more, it means nothing.

| # | Location | Usage |
|---|---|---|
| 1 | Navbar wordmark | `shimmer-sweep` gradient animation |
| 2 | Footer wordmark | `shimmer-sweep` gradient animation |
| 3 | Primary CTA buttons | Fill colour on `GoldButton` and `PillButton` |
| 4 | Section number labels | `01 · 02 · 03 · 04` in Process cards |
| 5 | Manifesto strip | Full-section background |
| 6 | Dashboard data highlights | Revenue arrow, positive indicators |
| 7 | Before/after drag handle | Amber circle drag control |

No gold anywhere else. No gold on hover states of non-button elements. No gold borders on cards.

### Section Background Rhythm
```
Section          Background
─────────────────────────────────────
Navbar + Hero    #0C0C0E  (void)
Proof Strip      #0C0C0E  (void)
Problem          #0C0C0E  (void)
Services         #F5F2EB  (cream)
Demo             #0C0C0E  (void)
Process          #0C0C0E  (void)
Manifesto        #D4952A  (gold)
Industries       #F5F2EB  (cream)
About            #0C0C0E  (void)
Contact          #F5F2EB  (cream)
Footer           #0C0C0E  (void)
```

---

## Section 2 — Typography

### Typeface Stack
| Role | Font | Weight | Size |
|---|---|---|---|
| Display / drama | Instrument Serif Italic | 400i | `clamp(3.5rem, 8vw, 7rem)` |
| Heading sans | DM Sans | 700 | `clamp(1.5rem, 3vw, 2.5rem)` |
| Body | DM Sans | 400 | `1rem` / `line-height: 1.75` |
| Overline / label | JetBrains Mono | 400 | `0.75rem` uppercase, `0.1em` letter-spacing |
| Data / numbers | JetBrains Mono | 500 | `0.875rem – 1rem` |
| UI / nav links | DM Sans | 500 | `0.9375rem` |

### Google Fonts Load (in `app/layout.tsx` `<head>`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

---

## Section 3 — Global Effects

### Grain Overlay
Rendered once in `app/layout.tsx` via `<GrainOverlay />`.

```css
/* In globals.css */
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,..."); /* feTurbulence SVG */
}
```

Non-negotiable. Eliminates flat digital look on all backgrounds.

### Custom Cursor (desktop only)
`<CustomCursor />` rendered in `app/layout.tsx`. Hidden via `@media (pointer: coarse)`.

- **Dot:** 8px × 8px, `background: #D4952A`, `border-radius: 50%`, follows mouse immediately
- **Ring:** 32px × 32px, `border: 1.5px solid #D4952A`, `border-radius: 50%`, follows with 80ms lerp lag via `requestAnimationFrame`
- **On hover over interactive elements:** Dot scales to `1.5×`, ring scales to `1.8×` with `200ms` transition
- **System cursor hidden:** `cursor: none` on `body`

### Smooth Scroll (Lenis)
Initialised once in `app/layout.tsx` client component wrapper:
```ts
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### Gold Shimmer Gradient
```css
.shimmer-gold {
  background: linear-gradient(
    90deg,
    #8a5f12 0%,
    #D4952A 30%,
    #f5dfa0 50%,
    #D4952A 70%,
    #8a5f12 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer-sweep 3s linear infinite;
}

@keyframes shimmer-sweep {
  from { background-position: 0% center; }
  to   { background-position: 200% center; }
}
```

Applied **only** to the SEION wordmark in `Navbar` and `Footer`.

---

## Section 4 — Component Architecture

### File Structure
```
app/
  layout.tsx                — fonts, Lenis init, GrainOverlay, CustomCursor, providers
  page.tsx                  — section assembly in order, GSAP context root
  globals.css               — Tailwind directives, CSS custom properties, keyframes
  api/
    contact/
      route.ts              — POST handler → validates → inserts to Supabase

components/
  ui/                       — shared primitives, zero external dependencies
    GoldButton.tsx          — fill-slide hover, 8px radius, gold fill
    PillButton.tsx          — pill radius, navbar CTA only, same fill-slide
    SectionLabel.tsx        — JetBrains Mono overline, uppercase, gold ◆ prefix
    GrainOverlay.tsx        — fixed grain texture, rendered once in layout
    CustomCursor.tsx        — dot + ring amber cursor, desktop only

  navbar/
    index.tsx               — floating pill, scroll morph, light-section detection
    NavLinks.tsx            — link list with hover lift
    NavCTA.tsx              — PillButton instance

  hero/
    index.tsx               — two-column layout, GSAP entrance orchestration
    HeroText.tsx            — overline + 3-line headline + body + CTAs
    HeroDashboard.tsx       — live React dashboard component (stat cards, bar chart, insight rotator, sector switcher)

  sections/                 — simple sections, one file each
    ProofStrip.tsx          — animated counters + sector marquee
    Problem.tsx             — single dark paragraph section
    Manifesto.tsx           — gold background + word-by-word reveal
    Industries.tsx          — animated hover list, 5 rows
    About.tsx               — two-column: paragraphs + fact table
    Contact.tsx             — form + success state + Supabase POST
    Footer.tsx              — rounded top, shimmer wordmark, status dot

  services/
    index.tsx               — bento grid layout shell
    ServiceCard01.tsx       — AI Workflow Automation (large left, full height)
    ServiceCard02.tsx       — Business Intelligence (typewriter feed)
    ServiceCard03.tsx       — Custom AI Systems (tags grid)

  demo/
    index.tsx               — tab shell, tab state management
    DemoTab1.tsx            — full dashboard (reuses HeroDashboard + dashboardData)
    DemoTab2.tsx            — before/after drag slider
    DemoTab3.tsx            — 3-step industry configurator

  process/
    index.tsx               — GSAP ScrollTrigger sticky pin orchestration
    ProcessCard.tsx         — reusable card shell (step number, title, body, SVG slot)
    SVGRings.tsx            — concentric ring rotation (Step 01)
    SVGScanGrid.tsx         — laser scanline over dot grid (Step 02)
    SVGEkg.tsx              — stroke-dashoffset EKG waveform (Step 03)
    SVGDataTree.tsx         — branching data tree growth (Step 04)

lib/
  supabase.ts               — Supabase client initialisation
  dashboardData.ts          — SectorData[] — single source for hero + demo tab 1
  configuratorData.ts       — industry → bottleneck → ConfiguratorResult mappings
  animations.ts             — shared GSAP helpers: fadeUp(), staggerFadeUp(), counterUp()

types/
  index.ts                  — ContactFormData, SectorData, StatCard, MonthBar,
                              IndustryOption, BottleneckOption, ConfiguratorResult
```

### Architectural Rules (binding)
1. **`'use client'`** on every component using `useEffect`, `useState`, `useRef`, mouse events, or GSAP. Server components for static shells only.
2. **All GSAP inside `gsap.context()`** with `ctx.revert()` in the `useEffect` cleanup. No leaked animations.
3. **Dashboard data lives only in `lib/dashboardData.ts`** — imported by `HeroDashboard` and `DemoTab1`. No duplication.
4. **Configurator logic lives only in `lib/configuratorData.ts`** — pure data, no JSX.
5. **No `any` types.** All props and data shapes defined in `types/index.ts`.
6. **CSS custom properties for all design tokens.** Consumed via `var(--color-gold)` or Tailwind arbitrary values `text-[var(--color-gold)]`.
7. **Mobile:** Cursor disabled. Spotlight glow disabled. Sticky stack becomes scrollable vertical cards. All GSAP animations preserved with reduced `y` offset (28px → 16px).

---

## Section 5 — Navbar

### Layout
Fixed, horizontally centered, `top: 1.25rem`, `z-index: 50`.
Pill shape: `border-radius: 9999px`.
Width: `fit-content`, min `640px`, max `90vw`.
Mobile (`< 768px`): `width: calc(100% - 2rem)`.

Contents (left to right): SEION wordmark · nav links · PillButton CTA

### State Machine
| State | Trigger | Visual |
|---|---|---|
| `transparent` | Page at top | `background: transparent`, white text, no border |
| `frosted` | Scrolled past hero | Frosted glass pill (see below) |
| `frosted-light` | Intersecting cream section | Same blur, light-mode colours |

### Frosted Glass (scrolled, dark sections)
```css
background: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(24px) saturate(180%);
-webkit-backdrop-filter: blur(24px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.12);
box-shadow:
  inset 0 0 0 0.5px rgba(255, 255, 255, 0.06),
  inset 0 1px 0 rgba(255, 255, 255, 0.08),
  0 8px 32px rgba(0, 0, 0, 0.24);
```

### Frosted Glass (scrolled, light/cream sections)
```css
background: rgba(245, 242, 235, 0.72);
backdrop-filter: blur(24px) saturate(160%);
-webkit-backdrop-filter: blur(24px) saturate(160%);
border: 1px solid rgba(0, 0, 0, 0.08);
box-shadow:
  inset 0 0 0 0.5px rgba(255, 255, 255, 0.5),
  0 8px 32px rgba(0, 0, 0, 0.08);
```
Links and logo switch to `#0C0C0E` in this state.

### Morph Transition
`transition: all 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` on all properties.

### Light-Section Detection
`IntersectionObserver` on each cream-background section. `rootMargin: "-80px 0px 0px 0px"` to account for navbar height. When intersecting, navbar switches to `frosted-light` state.

### Mobile Menu
Hamburger icon (3 lines → X). Click → full-screen overlay:
- `background: rgba(12, 12, 14, 0.96)`, `backdrop-filter: blur(20px)`
- Links stacked vertically, large size, fade-up entrance stagger
- CTA button at bottom

---

## Section 6 — Hero

### Layout
`min-height: 100dvh`. CSS Grid, 2 columns (55% / 45%) on desktop. Single column on mobile (text above, dashboard below).

### Left Column — HeroText
GSAP timeline on mount, `power3.out`, each element staggers:

| Element | Font | Delay |
|---|---|---|
| Overline: `AI Systems · Chennai, India` | JetBrains Mono, gold dot prefix | 0s |
| Line 1: `Your business runs on WhatsApp,` | DM Sans 700, `clamp(2rem, 4vw, 3rem)` | +0.1s |
| Line 2: `Tally, and gut feel.` | DM Sans 700, same size | +0.18s |
| Line 3: `We make it run on intelligence.` | Instrument Serif Italic, `clamp(3rem, 6vw, 5rem)` | +0.28s |
| Body paragraph | DM Sans 400, `1rem`, max-width `480px` | +0.42s |
| CTA primary: `Book a free 30-min audit` | GoldButton | +0.54s |
| CTA secondary: `See a live demo ↓` | Ghost button, scroll-to demo | +0.62s |

All: `y: 28→0, opacity: 0→1, duration: 0.7s`.

### Right Column — HeroDashboard
Live React component with real `useState`. Not an image. Not a screenshot.

**Sector switcher tabs:** `Auto Components / Pharma Distributor / Textile Trader`
- Switching triggers `sector-switch` animation: `opacity: 0→1` on data area, `200ms`
- Switching re-runs `bar-chart-rise` on the bar chart

**Stat cards (4 per sector):**
| Sector: Auto Components | Value | Delta |
|---|---|---|
| Revenue | ₹24.8L | ↑18.4% |
| Pending | ₹3.2L | — |
| Stock Alerts | 2 | — |
| Cash Buffer | 23 days | — |

**Bar chart:** 6-month revenue, `scaleY: 0→1` on mount, `stagger: 0.06s`.

**AI insight rotator:** 3 insights per sector, cycles every 4s, `opacity` fade `200ms`.

**Live dot:** Green `#22C47A`, CSS `ping` pulse animation.

---

## Section 7 — Proof Strip

Thin dark bar (`padding: 1.5rem 0`). Two halves:

**Left — Counters (3):**
- `22+` systems delivered
- `5+` industries
- `30 min` free audit

Each counter: `requestAnimationFrame` from 0 to target, `1800ms`, `easeOutExpo`. Triggered once on `ScrollTrigger onEnter`.

**Right — Marquee:**
Sectors: `Auto Components ◆ Pharma Distribution ◆ Textile Trading ◆ Manufacturing ◆ Healthcare ◆ Logistics ◆ Retail & MSME ◆ Professional Services`
CSS: `translateX(-50%) 28s linear infinite`. `animation-play-state: paused` on `mouseenter`.

---

## Section 8 — Problem

Dark section. Centered, max-width `720px`, `padding: 6rem 0`.

**Paragraph 1:** `opacity: 0.75`, DM Sans 400, exact copy:
> *Most Indian businesses are drowning in data they can't read. Scattered across Tally, WhatsApp, handwritten registers, and decade-old Excel files — your data exists. But nobody has time to read it, let alone act on it. Every decision still runs on memory and instinct. Every month-end report costs 14 hours of manual work. Every growth opportunity gets missed because nobody saw it coming.*

**Paragraph 2:** Instrument Serif Italic, `2rem`, full opacity:
> *We built SEION to end that.*

Both fade-up on ScrollTrigger.

---

## Section 9 — Services (Bento Grid)

Cream background. `SectionLabel`: "What We Build". Headline: "Three problems. Solved properly."

CSS Grid: `grid-template-columns: 1fr 1fr` desktop, `1fr` mobile.
Card 01 spans `grid-row: 1 / 3` (full height left column).

### All Cards Share
- `background: #ffffff`
- `border: 1px solid var(--color-border-light)`
- `border-radius: var(--radius-card)` (16px)
- `padding: 2rem`
- `box-shadow: 0 2px 24px rgba(0,0,0,0.06)`
- Fade-up on ScrollTrigger stagger

### Card 01 — AI Workflow Automation
- Large, left column, full height
- `spotlight-glow` on `mousemove`
- `accent-line` on hover (gold, `scaleX: 0→1`, `380ms`)
- Tags: `Invoice automation · WhatsApp workflows · Document processing · Report generation`

### Card 02 — Business Intelligence
- Top right
- Typewriter feed: `44ms/char`, `2400ms` pause, 5 messages cycling
- "Live Feed" label + green pulsing dot
- Messages (exact):
  1. `Revenue: ↑ 18.4% vs last quarter — Auto Components, Chennai`
  2. `Stock alert: Category B below reorder threshold`
  3. `3 vendor payments pending — ₹2.4L outstanding`
  4. `Top margin SKU this week: Ref #A-047`
  5. `Cash buffer forecast: 23-day positive surplus`

### Card 03 — Custom AI Systems
- Bottom right
- Same `spotlight-glow` + `accent-line` as Card 01
- Tags: `Predictive maintenance · IoT integration · Scheduling AI · Industry-specific`

---

## Section 10 — Demo

Dark background. `SectionLabel`: "See It Working". Headline: "Not a promise. A demonstration."

### Tab Shell
Three tabs: `Live Dashboard · Before & After · Build Yours`
Active tab: gold `2px` underline, `scaleX: 0→1` from left, `250ms`.
Inactive tabs: `opacity: 0.4`.

### Tab 1 — Live Dashboard
Full `HeroDashboard` re-instance. Larger, centered. Sector switcher. Same data from `lib/dashboardData.ts`.

### Tab 2 — Before & After
Horizontal drag slider. Full-width.

**Left panel** (dark red tint `rgba(224,64,64,0.08)`):
- 14 unanswered WhatsApp messages
- Avg response time: 4.2 hrs
- Monthly report: ❌ Due manually
- `opacity: 0.9` text

**Right panel** (dark green tint `rgba(34,196,122,0.08)`):
- Auto-replies sent in 52 seconds
- Invoice auto-sent on approval
- Report auto-generated 9AM on 1st
- 0 pending messages

**Drag handle:** 40px amber gold circle, `⟺` icon, centered on clip boundary.
**Interaction:** `mousemove` / `touchmove` → updates `clip-path: inset(0 {100-pct}% 0 0)` on right panel.
**Initial position:** 50%.

### Tab 3 — Build Yours Configurator
3 steps. Step transitions: `opacity: 0→1, y: 12→0, 250ms ease`.

**Step 1 — Select Industry:**
Manufacturing · Healthcare · Logistics · Retail & MSME · Professional Services
Large clickable chips, one selectable at a time.

**Step 2 — Select Bottleneck (changes per industry):**

| Industry | Bottleneck options |
|---|---|
| Manufacturing | Predictive maintenance · Production reporting · Quality tracking · Supplier reconciliation |
| Healthcare | Appointment no-shows · Billing reconciliation · Patient follow-up · Inventory expiry |
| Logistics | Route efficiency · Delivery confirmation · Vehicle idle time · Vendor reconciliation |
| Retail & MSME | Stock-out prevention · Demand forecasting · Margin by SKU · Customer reorders |
| Professional Services | Billing leakage · Document turnaround · Client onboarding · Team utilisation |

**Step 3 — Generated Result Card:**
System name · What it monitors (3 bullets) · What it automates (3 bullets) · Hours saved per week · Indian market reference
CTA: "Get this built →" — pre-fills contact form `industry` field on click.

---

## Section 11 — Process (Sticky Stack)

Dark section. 4 full-viewport (`100dvh`) cards.

**GSAP mechanic:**
- Each card pinned via `ScrollTrigger pin: true`
- Entering card: `y: 100%→0, duration: 0.6s, power3.out`
- Departing card (as next enters): `scale: 0.94, filter: blur(8px), opacity: 0.3, duration: 0.4s`
- Test on Safari specifically — use `will-change: transform` on card elements

| Step | Title | SVG component | Animation |
|---|---|---|---|
| `01` | We sit in your business first. | `SVGRings` | 3 concentric rings: `8s / 12s / 16s`, alternating CW/CCW |
| `02` | You approve the design before we build. | `SVGScanGrid` | Laser line: `translateX` full grid width, `2.2s linear infinite` |
| `03` | Working in weeks, not months. | `SVGEkg` | `stroke-dashoffset: 600→0`, `2.4s power2.inOut`, loops |
| `04` | We stay. The system improves. | `SVGDataTree` | Branch paths draw outward, stagger `0.15s`, loops |

Step numbers: JetBrains Mono, gold (`#D4952A`), `0.75rem` uppercase.
Titles: DM Sans 700, `clamp(1.75rem, 3vw, 2.25rem)`.
Body: DM Sans 400, max 2 lines, `opacity: 0.75`.
SVG: positioned right column on desktop, above text on mobile.

---

## Section 12 — Manifesto Strip

Full width. `background: #D4952A` (gold). `padding: 5rem 0`. One of gold's 7 uses.

**Line 1:** `Most AI companies sell you a product and leave you to figure out the rest.`
DM Sans 400, `#0C0C0E`, `1.125rem`, `opacity: 0.8`.

**Line 2:** `We stay until it works. Then we stay some more.`
Instrument Serif Italic, `#0C0C0E`, `clamp(2.5rem, 5vw, 4rem)`.

**Word-reveal animation on Line 2:**
Split into `<span>` per word, `display: inline-block`.
GSAP: `opacity: 0→1, y: 16→0`, `stagger: 0.055s`, ScrollTrigger `start: "top 70%"`.

---

## Section 13 — Industries

Cream background. `SectionLabel`: "Where We Work". Headline: "Industries we've built for."

5 rows. Each row: `border-bottom: 1px solid var(--color-border-light)`, `padding: 1.5rem 0`.
Layout: flex row — industry name (left) + sub-tags (center, hidden by default) + arrow `→` (right).

**Hover state (CSS transitions, `250ms ease`):**
- Row: `translateX(0→8px)`
- Industry name: `color: #0C0C0E → #D4952A`
- Sub-tags: `opacity: 0→0.8`, `translateX(-4px→0)`
- Arrow: `translateX(0→4px)`

| Industry | Sub-tags |
|---|---|
| Manufacturing | Predictive maintenance · Production analytics · Quality control · Supplier cycles |
| Healthcare & Clinics | Appointment no-shows · Billing reconciliation · Patient follow-up · Inventory expiry |
| Logistics & Distribution | Route efficiency · Delivery confirmation · Vehicle idle time · Vendor reconciliation |
| Retail & MSME | Stock-out prevention · Demand forecasting · Margin by SKU · Customer reorders |
| Professional Services | Billing leakage · Document turnaround · Client onboarding · Team utilisation |

---

## Section 14 — About

Void background. Two columns: left (3 paragraphs) / right (fact table).

Exact copy from `SEION_CONTEXT.md`. No paraphrasing.

**Fact table:**
`border: 1px solid var(--color-border-dark)`, `border-radius: 12px`.
Each row: `border-bottom: 1px solid var(--color-border-dark)`, `padding: 1rem 1.25rem`.
Label: JetBrains Mono, gold, `0.75rem`. Value: DM Sans, white.

| Label | Value |
|---|---|
| Founded | 2024 — Chennai, Tamil Nadu |
| Approach | Custom-built, not templated |
| Languages | Tamil and English |
| Team | Small by design — you deal direct |
| First step | Free 30-min operations audit |

---

## Section 15 — Contact

Cream background. Two columns: left (intro copy) / right (form).

### Intro Copy
Exact text from spec. Three short blocks:
1. `Tell us what your business does and where the friction is...`
2. `Most clients arrive expecting a sales pitch. They leave with a clear answer either way.`
3. `Response within 4 hours on business days.`

### Form Fields
```
Row 1: Name [text]        | Company [text]
Row 2: Email [email]      | Phone [tel]
Row 3: Industry [select]  → Manufacturing / Healthcare / Logistics / Retail & MSME / Professional Services
Row 4: Problem [textarea] — placeholder: "Describe where time is wasted, decisions are slow, or data is scattered..."
```
Submit: `GoldButton`, label: "Book the 30-min audit", full-width.

### Success State
Form `opacity: 0→fade out`. Success block fades in:
> *Booked. We'll confirm within 4 hours. Check your email.*

### API Route — `app/api/contact/route.ts`
```
POST /api/contact
Body: { name, company, email, phone, industry, problem }
Validates: all fields required, email format, phone format
On success: inserts to Supabase `contact_submissions` table
Returns: 200 { success: true } or 400 { error: string }
```

### Supabase Table: `contact_submissions`
```sql
CREATE TABLE contact_submissions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  company     text NOT NULL,
  email       text NOT NULL,
  phone       text NOT NULL,
  industry    text NOT NULL,
  problem     text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);
```

---

## Section 16 — Footer

`border-radius: 2rem 2rem 0 0` (rounded top corners). Void background.

**Top row:** SEION shimmer wordmark (second of 2 gold uses) + tagline: "AI systems for Indian business." (`opacity: 0.5`)

**Middle row:** Two link columns:
- Services: AI Workflow Automation · Business Intelligence · Custom AI Systems
- Company: About · How It Works · Contact

**Bottom row:**
- Left: `© 2026 SEION. All rights reserved.`
- Right: `● Systems Operational` — green pulsing dot + JetBrains Mono, `0.75rem`

---

## Section 17 — Animation Registry

Complete named animation inventory. Canonical names used in code comments and `lib/animations.ts`.

| Name | Component(s) | Technique | Specification |
|---|---|---|---|
| `shimmer-sweep` | Navbar, Footer (wordmark only) | CSS `background-position` | `3s linear infinite`, gold gradient |
| `hero-entrance` | Hero | GSAP timeline, on mount | Sequence: overline→line1→line2→line3→body→CTAs→dashboard. `y:28→0, opacity:0→1, power3.out` |
| `bar-chart-rise` | HeroDashboard, DemoTab1 | GSAP `scaleY: 0→1` | `stagger: 0.06s, duration: 0.6s`. On mount + sector switch |
| `insight-rotate` | HeroDashboard | `setInterval` + opacity fade | `4000ms` interval, `200ms` fade |
| `sector-switch` | HeroDashboard, DemoTab1 | React state + CSS | `opacity: 0→1, 200ms`. Re-triggers `bar-chart-rise` |
| `counter-count` | ProofStrip | `requestAnimationFrame` | `1800ms`, `easeOutExpo`. ScrollTrigger `onEnter`, once |
| `sector-marquee` | ProofStrip | CSS `translateX(-50%) 28s linear infinite` | `animation-play-state: paused` on hover |
| `fade-up` | All non-hero sections | GSAP `fromTo` | `y:28→0, opacity:0→1, stagger:0.08s`. ScrollTrigger `start:"top 85%"` |
| `sticky-stack` | ProcessStack | GSAP ScrollTrigger `pin:true` | Enter: `y:100%→0`. Depart: `scale:0.94, blur:8px, opacity:0.3` |
| `word-reveal` | ManifestoStrip | GSAP span stagger | `y:16→0, opacity:0→1, stagger:0.055s`. ScrollTrigger `start:"top 70%"` |
| `typewriter` | ServiceCard02 | `setInterval` char-by-char | `44ms/char`, `2400ms` pause. Blinking cursor: `opacity` toggle `530ms` |
| `ekg-draw` | SVGEkg | SVG `stroke-dashoffset` | `600→0, 2.4s, power2.inOut`. `repeat:-1`, 1s pause between loops |
| `ring-rotate` | SVGRings | CSS `@keyframes rotate` | Ring 1: `8s CW`. Ring 2: `12s CCW`. Ring 3: `16s CW` |
| `laser-scan` | SVGScanGrid | CSS `@keyframes translateX` | Full grid width, `2.2s linear infinite` |
| `tree-grow` | SVGDataTree | SVG `stroke-dashoffset` per branch | Branch stagger `0.15s`, loops |
| `ping-pulse` | Footer status dot, Hero live dot | CSS `@keyframes ping` | `scale:1→2.4, opacity:0.6→0, 2s ease-out infinite` |
| `nav-morph` | Navbar | CSS transitions + IntersectionObserver | `350ms, var(--ease-morph)` |
| `spotlight-glow` | ServiceCard01, ServiceCard03 | `mousemove` → CSS vars → `radial-gradient` | `radial-gradient(400px at var(--mx) var(--my), rgba(212,149,42,0.12), transparent)` |
| `accent-line` | ServiceCard01, ServiceCard03 | CSS `scaleX: 0→1` | `transform-origin: left, 380ms, var(--ease-morph)`. Gold `2px` bottom border |
| `fill-slide` | GoldButton, PillButton | CSS `::before` pseudo slide | `translateX(-100%)→0` on hover, `300ms, var(--ease-morph)` |
| `industry-hover` | IndustriesList rows | CSS transitions, `250ms ease` | Row `translateX(0→8px)`, name `→gold`, arrow `translateX(0→4px)`, tags `opacity:0→0.8` |
| `drag-reveal` | DemoTab2 | `mousemove`/`touchmove` → `clip-path` | `clip-path: inset(0 {100-pct}% 0 0)` on right panel |
| `configurator-step` | DemoTab3 | CSS opacity + translateY | `opacity:0→1, y:12→0, 250ms ease` |
| `tab-underline` | DemoShell | CSS `scaleX: 0→1` | `transform-origin: left, 250ms, var(--ease-morph)`. Gold `2px` underline |
| `cursor-trail` | CustomCursor | `mousemove` + `requestAnimationFrame` lerp | Dot: immediate. Ring: `80ms` lerp lag |

---

## Section 18 — Interaction Contract (Universal Rules)

These rules govern every interactive element site-wide. Non-negotiable.

1. **Buttons always use `fill-slide`.** Never plain colour change. No exceptions.
2. **Bento cards always use `spotlight-glow` + `accent-line`.** No flat hover states.
3. **All scroll animations use GSAP `fade-up`.** No CSS scroll-driven animations — GSAP for consistency and Safari safety.
4. **Looping SVG animations use GSAP `repeat: -1`.** Not CSS `animation` on paths needing precise control.
5. **Hover colour changes use gold only.** No blue, teal, or purple on any hover/active/focus state.
6. **All GSAP cleans up.** Every `useEffect` with GSAP returns `ctx.revert()`.
7. **Mobile disables:** Custom cursor, spotlight glow. All other interactions preserved.
8. **No particle effects, no neural network patterns, no floating orbs.** Ever.
9. **No purple, blue, or teal anywhere** in the UI — not as background, text, border, shadow, or glow.
10. **No component library classes** (no `btn`, no `card` from shadcn/Radix/Bootstrap). Every class is Tailwind or custom.

---

## Section 19 — Data Schemas

### `lib/dashboardData.ts`
```typescript
interface StatCard {
  label: string;
  value: string;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
}

interface MonthBar {
  month: string;   // 'Jul' | 'Aug' | ...
  value: number;   // relative height 0–100
}

interface SectorData {
  id: 'auto' | 'pharma' | 'textile';
  label: string;
  stats: StatCard[];        // exactly 4
  chartData: MonthBar[];    // exactly 6
  insights: string[];       // exactly 3
}
```

### `lib/configuratorData.ts`
```typescript
interface IndustryOption {
  id: string;
  label: string;
}

interface BottleneckOption {
  id: string;
  label: string;
  industryId: string;
}

interface ConfiguratorResult {
  systemName: string;
  monitors: string[];       // 3 items
  automates: string[];      // 3 items
  hoursSaved: number;
  marketReference: string;  // e.g. "Common in Coimbatore pharma distributors"
}
```

### `types/index.ts`
```typescript
interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  problem: string;
}
```

---

## Section 20 — Hard Constraints (Non-Negotiable)

Directly from `SEION_CONTEXT.md`. Reproduced here so no agent misses them.

1. Dashboard in hero right column = functional React component. Real `useState`. Not an image.
2. Demo Tab 1 dashboard = functional. Sector switcher changes real data.
3. Before/after slider = actually drags. Not a static split image.
4. Configurator = actually generates a result based on selections.
5. Contact form = wired to `/api/contact`. Has success state.
6. Email everywhere = `hello@seion.digital`. Never Gmail.
7. Grain overlay = present. `body::after` equivalent. `z-index: 9999`.
8. Shimmer = navbar wordmark + footer wordmark only.
9. Process sticky stack = GSAP pin. Test on Safari specifically.
10. All buttons = `fill-slide` interaction on hover. Not just colour change.
11. No purple, blue, or teal as any colour anywhere.
12. No particle fields, neural networks, floating orbs, circuit patterns.
13. All copy = use exact text from `SEION_CONTEXT.md`. Do not rewrite or summarise.
14. No component libraries. Build from scratch.
15. Next.js 16.1, latest stable. App Router. TypeScript throughout.

---

## Section 21 — What Success Looks Like

> A manufacturing GM in Chennai lands on this site. Within 10 seconds he recognises his business in the hero headline. Within 30 seconds he's interacting with the live dashboard and seeing data patterns that look like his own business. Within 2 minutes he understands exactly what SEION would build for him, what the process looks like, and what the first step is. He books the audit without needing to speak to anyone first.

Every design decision in this document exists to serve that outcome. If a decision does not serve it, it is wrong.
