# SEION — Website Build Context File
**For Claude (Antigravity or any agent): Read this entire file before doing anything. This is your source of truth.**

---

## WHO YOU ARE WORKING WITH

**Founder:** Showmik Kumaar, 20 years old, Chennai, Tamil Nadu  
**Company:** SEION — an AI systems company  
**Domain:** seion.digital  
**Contact:** hello@seion.digital / +91 95518 89752  
**Founded:** 2024

---

## WHAT SEION ACTUALLY IS

SEION builds **custom AI systems for Indian businesses** — specifically:

1. **AI Workflow Automation** — mapping manual operations and replacing repetitive steps with AI-driven systems (invoice follow-ups, customer communication, document processing, report generation)
2. **Business Intelligence Dashboards** — pulling data from Tally, Excel, WhatsApp, and other scattered sources into a single live dashboard that shows what's happening in the business right now
3. **Custom AI Systems** — bespoke AI built for specific operational problems (predictive maintenance for factories, intelligent scheduling for clinics, demand forecasting for distributors)

**The founding insight:** Most AI tools were designed for Western enterprise conditions — clean data, dedicated IT teams, English-first operations. Indian businesses run on Tally and trust and WhatsApp groups. SEION builds systems that work with that reality, not against it.

**Current proof of work (Node Zero):** A business intelligence dashboard built for a manufacturing company's General Manager — converting scattered Tally/Excel data into a live visual analytics system. This is the flagship case study.

---

## THE AUDIENCE

**Primary:** Indian business owners and GMs — manufacturing, healthcare, logistics, retail & MSME, professional services  
**Geography:** Tamil Nadu primarily, pan-India secondary  
**Psychographic:** Cautious with technology. Skeptical of hype. Respond to specificity and proof. Trust is built through demonstration not claims. Likely 40–60 years old, running established businesses, have tried and been burned by software vendors before.  
**Decision trigger:** They need to see what they're buying before agreeing to buy it. Abstract promises don't work. A live working demo works.

---

## POSITIONING (SURFACE LEVEL — WHAT THE WORLD SEES)

"AI systems built for how India actually works."

SEION is positioned as a **focused AI systems company** — not an agency, not a freelancer, not a generic IT vendor. Three services, done properly. Small team by design. Direct access to the people who actually build the system.

**What to say:**  
- Specific results, realistic timelines, honest caveats  
- Indian-specific context (Tally, WhatsApp, Ambattur, Coimbatore, T. Nagar)  
- "We stay until it works. Then we stay some more."  
- "No black boxes. No surprises."  
- "The person who understands your business builds your system."

**What never to say:**  
- "Transform your business"  
- "Cutting-edge" / "innovative" / "disruptive" / "leverage" / "synergy"  
- Any claim that could appear on 10,000 other agency sites  
- Anything that reveals the deeper data/intelligence architecture underneath  

**Stealth rule:** The site reveals capability, not strategy. A business owner should think "this company builds AI for businesses like mine." They should NOT understand that SEION is building a proprietary behavioral data layer across Indian business sectors. That is internal knowledge only.

---

## THE WEBSITE'S JOB

The site must do these things in this order:

1. **Recognition** — The visitor reads the headline and thinks "that's my business." Instant identification with the problem.
2. **Proof** — They see something working, not descriptions of something working. The live dashboard demo is the proof.
3. **Clarity** — They understand exactly what they'd receive, what the process is, and what it costs (in time, not money — money comes in the call).
4. **Low-friction entry** — The ask is a 30-minute audit call, not a purchase. This removes commitment anxiety.

**The demo insight (critical):** Most B2B service sites defer understanding to a sales call. SEION's site compresses discovery into the page itself. When a visitor arrives at the call, they already know what they want — the call is "how soon" not "should I." This collapses the sales cycle.

---

## WEBSITE STRUCTURE

Build a single-page marketing site with these sections in this order:

### NAV
Floating pill navbar. Logo (SEION with shimmer sweep animation — gold gradient cycling through letterforms). Links: Services · How It Works · Industries · About. CTA button (pill shape): "Book 30-min Audit"

### HERO
**Layout:** Two-column — left: headline + copy + CTAs / right: live working dashboard component  
**Left side copy:**

Overline: `AI Systems · Chennai, India`

Line 1 (smaller sans): `Your business runs on WhatsApp,`  
Line 2 (smaller sans): `Tally, and gut feel.`  
Line 3 (large serif italic): `We make it run on intelligence.`

Body: `Custom AI systems for Indian businesses — automation workflows, live dashboards, and decision tools built around the data you already have.`

CTA primary: `Book a free 30-min audit`  
CTA secondary: `See a live demo ↓` (scrolls to demo section)

**Right side:** A fully functional React dashboard component — NOT a screenshot. Real state. Real data. Shows: stat cards (Revenue ₹24.8L ↑18.4%, Pending ₹3.2L, Stock Alerts 2, Cash Buffer 23 days), bar chart of monthly revenue, rotating AI insight panel. Sector switcher tabs: Auto Components / Pharma Distributor / Textile Trader. Data reloads per sector.

### PROOF STRIP
Thin bar. Left: 3 animated counters (22+ systems delivered, 5+ industries, 30 min free audit). Right: scrolling marquee of sectors with diamond separators.

### PROBLEM SECTION
Dark background. One powerful paragraph that names the exact pain before offering the solution.

`Most Indian businesses are drowning in data they can't read. Scattered across Tally, WhatsApp, handwritten registers, and decade-old Excel files — your data exists. But nobody has time to read it, let alone act on it. Every decision still runs on memory and instinct. Every month-end report costs 14 hours of manual work. Every growth opportunity gets missed because nobody saw it coming.`

`We built SEION to end that.`

### SERVICES (Bento Grid)
Label: `What We Build`  
Headline: `Three problems. Solved properly.`  
Sub: `Not six. Not twelve. Three types of AI systems that create measurable impact — and we build each one as if it's the only thing we do.`

**Card 01 — AI Workflow Automation** (large card, spans full height left column)  
Hook: `The 14-hour problem.`  
Body: `Every week, someone in your business spends 10–20 hours doing things a computer could do in seconds. Invoice follow-ups. Customer status messages. Monthly reports. Data entry between systems. We map every manual step. Then we build the system that handles it — so your people handle the work that actually needs a person.`  
Tags: Invoice automation · WhatsApp workflows · Document processing · Report generation

**Card 02 — Business Intelligence** (top right — with live typewriter feed)  
Hook: `Your data exists. You're just not reading it.`  
Body: `We connect Tally, Excel, WhatsApp, and every other source into one live dashboard. You see today's numbers today — not last month's.`  
Live feed messages (typewriter loop):
- `Revenue: ↑ 18.4% vs last quarter — Auto Components, Chennai`
- `Stock alert: Category B below reorder threshold`
- `3 vendor payments pending — ₹2.4L outstanding`
- `Top margin SKU this week: Ref #A-047`
- `Cash buffer forecast: 23-day positive surplus`

**Card 03 — Custom AI Systems** (bottom right)  
Hook: `The problem no software was built for.`  
Body: `Your factory's specific failure pattern. Your clinic's scheduling complexity. Your warehouse's demand cycle. We build the system for your exact problem — not a generic tool you have to adapt to.`  
Tags: Predictive maintenance · IoT integration · Scheduling AI · Industry-specific

### DEMO SECTION
Label: `See It Working`  
Headline: `Not a promise. A demonstration.`  
Sub: `Every client starts skeptical. The fastest way to earn trust is to show the work. Explore a real SEION-built system below.`

**Three tabs:**

**Tab 1 — Live Dashboard:** Full working dashboard. Sector switcher (Auto Components / Pharma / Textile). Stats, bar chart, AI insight rotator. All functional React state. Not a mockup.

**Tab 2 — Before & After:** Horizontal drag slider. Left panel (dark red tint): WhatsApp message pile-up, 14 messages unanswered, 4.2hr avg response, manual report due. Right panel (dark green tint): Auto-replies in 52 seconds, invoice auto-sent, report auto-generated 9AM on the 1st, 0 pending messages. Drag handle in amber/gold.

**Tab 3 — Build Yours:** 3-step configurator.  
Step 1: Select industry (Manufacturing / Healthcare / Logistics / Retail & MSME / Professional Services)  
Step 2: Select biggest bottleneck (options change per industry)  
Step 3: Generated result card showing system name, what it monitors, what it automates, hours saved per week, Indian market reference. CTA: "Get this built →" pre-fills contact form.

### PROCESS (Sticky Stack)
Label: `How We Work`  
Headline: `No black boxes. No surprises.`  
Sub: `You know exactly what we're building, why, and what it will do — before a single rupee is spent on development.`

4 full-viewport cards that stack on scroll (GSAP sticky):

**Step 01:** `We sit in your business first.` — Before any proposal, we spend time understanding how operations actually run. Not from a call — by watching, asking, mapping. With animated SVG: rotating concentric rings.

**Step 02:** `You approve the design before we build.` — We write out exactly what the system does. You review and sign off before development starts. With animated SVG: dot grid with scanning laser line.

**Step 03:** `Working in weeks, not months.` — First functional version 2–3 weeks after build start. Test against real data. Iterate. With animated SVG: EKG waveform drawing itself.

**Step 04:** `We stay. The system improves.` — Ongoing monitoring, refinement, adaptation as your business grows. Not a handoff. With animated SVG: branching data tree growing outward.

### MANIFESTO STRIP
Background: amber/gold (#D4952A). Full width.

`Most AI companies sell you a product and leave you to figure out the rest.`

`We stay until it works. Then we stay some more.`

(Second line: large serif italic, word-by-word scroll reveal)

### INDUSTRIES
Label: `Where We Work`  
Headline: `Industries we've built for.`

Animated hover list (hover slides row right, name turns accent, arrow moves):
- **Manufacturing** — Predictive maintenance · Production analytics · Quality control · Supplier cycles
- **Healthcare & Clinics** — Appointment no-shows · Billing reconciliation · Patient follow-up · Inventory expiry
- **Logistics & Distribution** — Route efficiency · Delivery confirmation · Vehicle idle time · Vendor reconciliation
- **Retail & MSME** — Stock-out prevention · Demand forecasting · Margin by SKU · Customer reorders
- **Professional Services** — Billing leakage · Document turnaround · Client onboarding · Team utilisation

### ABOUT
Label: `About SEION`  
Headline: `Built in Chennai. Built for how India actually works.`

Para 1: `Most enterprise software was designed for companies with dedicated IT teams, clean data, and six months to implement. The manufacturers in Ambattur, distributors in Coimbatore, clinics in T. Nagar — the software wasn't built for them.`

Para 2: `We were. Every system starts from your existing data — however messy, however scattered — and works with the tools you already use. We don't ask you to change how you operate. We build the intelligence layer around what you've already built.`

Para 3: `We're a small team by design. The person who understands your business builds your system. No handoffs. No account managers. Direct.`

Right column fact table:
| Founded | 2024 — Chennai, Tamil Nadu |
| Approach | Custom-built, not templated |
| Languages | Tamil and English |
| Team | Small by design — you deal direct |
| First step | Free 30-min operations audit |

### CONTACT
Label: `Get In Touch`  
Headline: `Start with 30 minutes. No pitch. No pressure.`

Left intro: `Tell us what your business does and where the friction is. We'll tell you honestly — in that call — whether AI will actually help, what it would look like, and what it would cost. If it's not the right fit, we'll say that too.`

`Most clients arrive expecting a sales pitch. They leave with a clear answer either way. That's the point.`

`Response within 4 hours on business days.`

Form fields: Name + Company / Email + Phone / Industry (select) / Problem (textarea: "Describe where time is wasted, decisions are slow, or data is scattered — the more specific the better")

Submit button: `Book the 30-min audit`  
Success message: `Booked. We'll confirm within 4 hours. Check your email.`

Wire form to: Formspree or Netlify Forms. Not a dead form.

### FOOTER
Rounded top corners. SEION wordmark (shimmer). Tagline: "AI systems for Indian business." Two link columns (Services / Company). Bottom: copyright left, "● Systems Operational" status indicator right.

---

## RESEARCH TASK FOR CLAUDE

Before designing anything, do the following:

**1. Browse these sites and extract what works:**
- `betterstack.com` — how they use concrete numbers as proof, carousel of product screenshots in hero
- `linear.app` — how restraint and monochrome create premium signal
- `cursor.com` — minimal decoration, typeface doing the work
- `razorpay.com` — best-designed Indian fintech site, trust signals, dark hero
- `setu.co` — Chennai fintech infrastructure, closest Indian comp to SEION
- `dukaan.io` — Indian startup, SMB audience, product-forward
- `lapa.ninja/category/bento-grid/` — 75 documented bento grid sites, study layout patterns
- `lapa.ninja/category/artificial-intelligence/` — 198 AI landing pages, identify what separates premium from generic
- `lapa.ninja/color/black/` — dark-palette site patterns

**2. Identify and synthesize:**
- Which hero pattern converts for B2B service companies
- How premium B2B sites signal credibility without testimonials (SEION has no named clients to show publicly yet)
- What micro-interactions appear on the top 10% of sites in the dark SaaS category
- How Indian companies (Razorpay, Setu, Dukaan) handle trust signals differently from Western SaaS

**3. Then design the site** using the content above and your research findings. Every design decision must have a reason. Do not default to generic patterns.

---

## DESIGN PARAMETERS

**Aesthetic direction:** Institutional dark with amber/gold accent. Not tech-startup dark — institutional-document dark. Think: the annual report of a company that has already proven itself, not a startup trying to look like one.

**What to avoid absolutely:**
- Purple gradients
- Particle systems / neural network graphics / floating orbs
- Generic stock photography of people in offices
- Testimonial carousels
- "AI-powered" buzzword copy
- Any design that could appear unchanged on a competing site

**Typography:** Instrument Serif (display/italic emphasis) + DM Sans (body/UI) + JetBrains Mono (labels/data/code). All from Google Fonts.

**Colour:** Near-black (#0C0C0E) primary. Warm amber/gold (#D4952A) as the single accent — used sparingly on: section numbers, data highlights, primary CTAs, logo shimmer. Light cream (#F5F2EB) for alternating sections. No other colours except green (#22C47A) for live/positive indicators and red (#E04040) for alerts.

**Accent usage rule:** Gold appears in maximum 7 places on the page. Scarcity creates meaning. If it appears everywhere, it means nothing.

**Logo shimmer:** `background: linear-gradient(90deg, #8a5f12 0%, #D4952A 30%, #f5dfa0 50%, #D4952A 70%, #8a5f12 100%)` animating `background-position` left to right in a 3s loop. Applied to SEION wordmark in navbar and footer only.

**Section alternation:** Dark (#0C0C0E) → Light (#F5F2EB) → Dark → Amber (#D4952A for manifesto only) → Light → Dark → Light → Dark

**Buttons:** Pill shape ONLY for the floating navbar CTA. All page CTAs use rounded-rect (8px radius). Fill-slide interaction on hover — a coloured panel slides in from left beneath the button text, changing colours.

**Cards:** 12–20px border-radius. Spotlight cursor-glow effect on bento cards (radial gradient follows mouse). Bottom accent-line on service cards (scaleX 0→1 on hover, left to right, 380ms).

**Navigation:** Fixed floating pill. Transparent on load, morphs to frosted glass (backdrop-filter: blur(20px)) on scroll. Detects light sections and switches logo/link colours to dark.

**Grain overlay:** `body::after` fixed inset 0 z-index 9999 pointer-events none — SVG feTurbulence noise at 3.5% opacity. Eliminates flat digital look.

**Smooth scroll:** Lenis library. `lerp: 0.08`. Synced to GSAP ticker.

**Custom cursor (desktop only):** 8px dot + 32px trailing ring, both amber. Ring follows with 80ms lag.

---

## TECHNICAL STACK

- React 19 + Vite
- Tailwind CSS v3.4
- GSAP 3 with ScrollTrigger plugin
- Lenis v1.0 for smooth scroll
- Lucide React for icons
- Google Fonts (Instrument Serif, DM Sans, JetBrains Mono)
- Form: Formspree or Netlify Forms
- Single App.jsx output — no component libraries, no shadcn, no MUI

---

## ANIMATIONS — REQUIRED

| Animation | Where | How |
|---|---|---|
| Logo shimmer sweep | Navbar + footer wordmark | CSS gradient-position animation 3s linear infinite |
| Hero timeline entrance | On load | GSAP timeline — overline, line1, line2, line3, body, CTAs, dashboard in sequence |
| Dashboard bar chart | Hero + demo tab 1 | GSAP scaleY from 0 on mount, stagger 0.06s |
| Section fade-up | Every non-hero section | GSAP fromTo y:28 opacity:0 → y:0 opacity:1 on scroll, stagger 0.08s on siblings |
| Sticky card stack | Process section | GSAP pin — entering card y:100%→0, leaving card scale:0.94 blur:8px opacity:0.3 |
| Word-by-word reveal | Manifesto strip | Split into word spans, stagger 0.055s on scroll |
| Typewriter + cursor | Service card 02 | JS character-by-character, 44ms per char, 2.4s pause, blinking cursor |
| Sector marquee | Proof strip | CSS translateX(-50%) 28s linear infinite, pause on hover |
| Animated counters | Proof strip | requestAnimationFrame count from 0, 1800ms, easeOutExpo |
| EKG path draw | Process card 03 | stroke-dashoffset 600→0, 2.4s, loops |
| Concentric ring rotation | Process card 01 | CSS @keyframes rotate, 3 rings at different speeds and directions |
| Laser scanline | Process card 02 | CSS @keyframes translateX across dot grid, 2.2s loop |
| Pulsing status dot | Footer + hero | CSS @keyframes ping — scale 1→2.4 opacity 0.6→0, 2s ease-out infinite |
| Nav morph | On scroll | IntersectionObserver + CSS transition 350ms |
| Spotlight on bento | Bento grid hover | Track mousemove → CSS custom properties --mx --my → radial-gradient overlay |
| Before/after drag | Demo tab 2 | Mouse/touch drag → clip-path percentage update |
| Configurator transitions | Demo tab 3 | Fade + slide between steps |

---

## HARD CONSTRAINTS — NON-NEGOTIABLE

1. Dashboard in hero right column = functional React component. Real useState. Not an image.
2. Demo tab 1 dashboard = functional. Sector switcher changes real data.
3. Before/after slider = actually drags. Not a static split image.
4. Configurator = actually generates a result based on selections.
5. Contact form = wired to real endpoint. Has success state.
6. Email everywhere = hello@seion.digital. Never Gmail.
7. Grain overlay = present. body::after. z-index 9999.
8. Shimmer = navbar wordmark + footer wordmark only.
9. Process sticky stack = GSAP pin. Test on Safari specifically.
10. All buttons = fill-slide interaction on hover. Not just colour change.
11. No purple, blue, or teal as any colour anywhere.
12. No particle fields, neural networks, floating orbs, circuit patterns.
13. All copy = use exact text from the WEBSITE STRUCTURE section. Do not rewrite or summarise.
14. No component libraries. Build from scratch.

---

## WHAT SUCCESS LOOKS LIKE

A manufacturing GM in Chennai lands on this site. Within 10 seconds he recognises his business in the hero headline. Within 30 seconds he's interacting with the live dashboard and seeing data patterns that look like his own business. Within 2 minutes he understands exactly what SEION would build for him, what the process looks like, and what the first step is. He books the audit without needing to speak to anyone first.

That is the outcome this site must produce.
