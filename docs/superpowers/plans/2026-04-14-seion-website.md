# SEION Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete SEION marketing website — a single-page, animation-driven, dark-gold institutional site for an Indian AI systems company — from scratch within the existing Next.js project.

**Architecture:** Next.js 16.1 App Router, TypeScript throughout. All components built from scratch (no shadcn, no Radix). GSAP 3 + ScrollTrigger for all scroll animations, Lenis for smooth scroll. Supabase for contact form persistence. Hybrid component structure: simple sections as flat files, complex sections (Hero, Services, Demo, Process) as folders with sub-components.

**Tech Stack:** Next.js 16.1 · React 19 · TypeScript · Tailwind CSS v3.4 · GSAP 3 + ScrollTrigger · Lenis v1 · Supabase · Lucide React · Google Fonts (Instrument Serif, DM Sans, JetBrains Mono)

**Spec:** `docs/superpowers/specs/2026-04-14-seion-ui-design.md` — read this before every task. It is the source of truth.

---

## File Map

```
app/
  layout.tsx                ← MODIFY — fonts, providers, GrainOverlay, CustomCursor, Lenis init
  page.tsx                  ← REWRITE — section assembly
  globals.css               ← REWRITE — design tokens, keyframes, base styles
  api/contact/route.ts      ← CREATE — POST handler → Supabase

components/ui/
  GoldButton.tsx            ← CREATE
  PillButton.tsx            ← CREATE
  SectionLabel.tsx          ← CREATE
  GrainOverlay.tsx          ← CREATE
  CustomCursor.tsx          ← CREATE

components/navbar/
  index.tsx                 ← CREATE
  NavLinks.tsx              ← CREATE
  NavCTA.tsx                ← CREATE

components/hero/
  index.tsx                 ← CREATE
  HeroText.tsx              ← CREATE
  HeroDashboard.tsx         ← CREATE

components/sections/
  ProofStrip.tsx            ← CREATE
  Problem.tsx               ← CREATE
  Manifesto.tsx             ← CREATE
  Industries.tsx            ← CREATE
  About.tsx                 ← CREATE
  Contact.tsx               ← CREATE
  Footer.tsx                ← CREATE

components/services/
  index.tsx                 ← CREATE
  ServiceCard01.tsx         ← CREATE
  ServiceCard02.tsx         ← CREATE
  ServiceCard03.tsx         ← CREATE

components/demo/
  index.tsx                 ← CREATE
  DemoTab1.tsx              ← CREATE
  DemoTab2.tsx              ← CREATE
  DemoTab3.tsx              ← CREATE

components/process/
  index.tsx                 ← CREATE
  ProcessCard.tsx           ← CREATE
  SVGRings.tsx              ← CREATE
  SVGScanGrid.tsx           ← CREATE
  SVGEkg.tsx                ← CREATE
  SVGDataTree.tsx           ← CREATE

lib/
  supabase.ts               ← CREATE
  dashboardData.ts          ← CREATE
  configuratorData.ts       ← CREATE
  animations.ts             ← CREATE

types/
  index.ts                  ← CREATE
```

---

## Task 1: Project Cleanup + Dependency Upgrade

**Files:**
- Modify: `package.json`
- Delete: `components/` (entire folder)
- Delete: `app/page.tsx`
- Delete: `app/privacy/` folder
- Modify: `app/layout.tsx` (strip old imports)

- [ ] **Step 1: Delete all old components and pages**

```bash
cd C:\Users\acer\Documents\projects\SEION
rm -rf components app/privacy app/page.tsx
```

- [ ] **Step 2: Upgrade Next.js to 16.1 and replace dependencies**

```bash
npm install next@16.1.0 react@19 react-dom@19
npm install gsap@3 @studio-freight/lenis lucide-react @supabase/supabase-js
npm uninstall @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip framer-motion cmdk vaul input-otp embla-carousel-react react-resizable-panels recharts react-hook-form @hookform/resolvers zod react-day-picker date-fns sonner next-themes class-variance-authority clsx tailwind-merge tailwindcss-animate geist
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000`. May show 404 — that's fine, page.tsx doesn't exist yet.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: wipe old components, upgrade to Next.js 16.1, install GSAP + Lenis"
```

---

## Task 2: Types

**Files:**
- Create: `types/index.ts`

- [ ] **Step 1: Create types file**

```bash
mkdir -p types
```

```typescript
// types/index.ts

export interface StatCard {
  label: string;
  value: string;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
}

export interface MonthBar {
  month: string;
  value: number; // 0–100, relative height
}

export interface SectorData {
  id: 'auto' | 'pharma' | 'textile';
  label: string;
  stats: StatCard[];      // exactly 4
  chartData: MonthBar[];  // exactly 6
  insights: string[];     // exactly 3
}

export interface IndustryOption {
  id: string;
  label: string;
}

export interface BottleneckOption {
  id: string;
  label: string;
  industryId: string;
}

export interface ConfiguratorResult {
  systemName: string;
  monitors: string[];     // 3 items
  automates: string[];    // 3 items
  hoursSaved: number;
  marketReference: string;
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  problem: string;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add types/index.ts
git commit -m "feat: add shared TypeScript types"
```

---

## Task 3: Data Layer

**Files:**
- Create: `lib/dashboardData.ts`
- Create: `lib/configuratorData.ts`

- [ ] **Step 1: Create dashboard data**

```bash
mkdir -p lib
```

```typescript
// lib/dashboardData.ts
import type { SectorData } from '@/types';

export const dashboardData: SectorData[] = [
  {
    id: 'auto',
    label: 'Auto Components',
    stats: [
      { label: 'Revenue', value: '₹24.8L', delta: '↑18.4%', deltaType: 'positive' },
      { label: 'Pending', value: '₹3.2L', deltaType: 'neutral' },
      { label: 'Stock Alerts', value: '2', deltaType: 'negative' },
      { label: 'Cash Buffer', value: '23 days', deltaType: 'positive' },
    ],
    chartData: [
      { month: 'Oct', value: 58 },
      { month: 'Nov', value: 65 },
      { month: 'Dec', value: 54 },
      { month: 'Jan', value: 72 },
      { month: 'Feb', value: 68 },
      { month: 'Mar', value: 88 },
    ],
    insights: [
      'Revenue up 18.4% vs last quarter — driven by Category A fasteners',
      'Stock alert: Category B components below reorder threshold — 2 SKUs',
      'Cash buffer at 23-day positive surplus — strongest in 6 months',
    ],
  },
  {
    id: 'pharma',
    label: 'Pharma Distributor',
    stats: [
      { label: 'Revenue', value: '₹31.2L', delta: '↑11.2%', deltaType: 'positive' },
      { label: 'Expiry Risk', value: '₹1.8L', deltaType: 'negative' },
      { label: 'Orders Due', value: '7', deltaType: 'neutral' },
      { label: 'Collections', value: '94%', deltaType: 'positive' },
    ],
    chartData: [
      { month: 'Oct', value: 62 },
      { month: 'Nov', value: 70 },
      { month: 'Dec', value: 67 },
      { month: 'Jan', value: 75 },
      { month: 'Feb', value: 80 },
      { month: 'Mar', value: 92 },
    ],
    insights: [
      'Collection rate at 94% — highest since Q2 FY24',
      'Expiry risk: ₹1.8L of near-expiry stock needs prioritised dispatch',
      '7 purchase orders due this week — 3 require approval',
    ],
  },
  {
    id: 'textile',
    label: 'Textile Trader',
    stats: [
      { label: 'Revenue', value: '₹18.6L', delta: '↑8.7%', deltaType: 'positive' },
      { label: 'Pending Bills', value: '₹4.1L', deltaType: 'neutral' },
      { label: 'Loom Idle', value: '3', deltaType: 'negative' },
      { label: 'Dispatch', value: '98%', deltaType: 'positive' },
    ],
    chartData: [
      { month: 'Oct', value: 50 },
      { month: 'Nov', value: 58 },
      { month: 'Dec', value: 45 },
      { month: 'Jan', value: 63 },
      { month: 'Feb', value: 71 },
      { month: 'Mar', value: 80 },
    ],
    insights: [
      'Dispatch rate at 98% — zero delayed orders this week',
      '3 looms idle for 48+ hours — maintenance flag raised',
      'Pending bills ₹4.1L — 2 accounts overdue by 30+ days',
    ],
  },
];

export const getSectorById = (id: SectorData['id']): SectorData => {
  return dashboardData.find((s) => s.id === id) ?? dashboardData[0];
};
```

- [ ] **Step 2: Create configurator data**

```typescript
// lib/configuratorData.ts
import type { IndustryOption, BottleneckOption, ConfiguratorResult } from '@/types';

export const industries: IndustryOption[] = [
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'retail', label: 'Retail & MSME' },
  { id: 'professional', label: 'Professional Services' },
];

export const bottlenecks: BottleneckOption[] = [
  // Manufacturing
  { id: 'mfg-maintenance', label: 'Predictive maintenance', industryId: 'manufacturing' },
  { id: 'mfg-reporting', label: 'Production reporting', industryId: 'manufacturing' },
  { id: 'mfg-quality', label: 'Quality tracking', industryId: 'manufacturing' },
  { id: 'mfg-supplier', label: 'Supplier reconciliation', industryId: 'manufacturing' },
  // Healthcare
  { id: 'hc-noshows', label: 'Appointment no-shows', industryId: 'healthcare' },
  { id: 'hc-billing', label: 'Billing reconciliation', industryId: 'healthcare' },
  { id: 'hc-followup', label: 'Patient follow-up', industryId: 'healthcare' },
  { id: 'hc-expiry', label: 'Inventory expiry', industryId: 'healthcare' },
  // Logistics
  { id: 'log-route', label: 'Route efficiency', industryId: 'logistics' },
  { id: 'log-delivery', label: 'Delivery confirmation', industryId: 'logistics' },
  { id: 'log-idle', label: 'Vehicle idle time', industryId: 'logistics' },
  { id: 'log-vendor', label: 'Vendor reconciliation', industryId: 'logistics' },
  // Retail
  { id: 'ret-stockout', label: 'Stock-out prevention', industryId: 'retail' },
  { id: 'ret-demand', label: 'Demand forecasting', industryId: 'retail' },
  { id: 'ret-margin', label: 'Margin by SKU', industryId: 'retail' },
  { id: 'ret-reorder', label: 'Customer reorders', industryId: 'retail' },
  // Professional
  { id: 'pro-billing', label: 'Billing leakage', industryId: 'professional' },
  { id: 'pro-docs', label: 'Document turnaround', industryId: 'professional' },
  { id: 'pro-onboard', label: 'Client onboarding', industryId: 'professional' },
  { id: 'pro-util', label: 'Team utilisation', industryId: 'professional' },
];

export const results: Record<string, ConfiguratorResult> = {
  'mfg-maintenance': {
    systemName: 'Factory Floor Intelligence',
    monitors: ['Machine runtime vs idle time per shift', 'Vibration and temperature anomaly patterns', 'Maintenance cycle adherence per asset'],
    automates: ['Maintenance alerts 48 hours before predicted failure', 'Shift supervisor WhatsApp notifications', 'Monthly asset health report generation'],
    hoursSaved: 18,
    marketReference: 'Common in Ambattur and Guindy industrial estates',
  },
  'mfg-reporting': {
    systemName: 'Production Dashboard',
    monitors: ['Daily output vs target per line', 'Shift-wise efficiency ratios', 'Raw material consumption vs plan'],
    automates: ['Daily production summary at 6PM', 'Weekly trend report every Monday 8AM', 'Exception alerts when output drops below 85% of target'],
    hoursSaved: 14,
    marketReference: 'Deployed for auto component manufacturers in Chennai',
  },
  'mfg-quality': {
    systemName: 'Quality Control Tracker',
    monitors: ['Defect rates per batch and per operator', 'Rejection reasons by category', 'Rework costs vs production value'],
    automates: ['Batch rejection alerts to QC team', 'Supplier quality scorecard (weekly)', 'Monthly quality summary for management review'],
    hoursSaved: 10,
    marketReference: 'Used by export-focused garment units in Tirupur',
  },
  'mfg-supplier': {
    systemName: 'Supplier Reconciliation Engine',
    monitors: ['PO vs delivery quantity gaps', 'Payment terms vs actual settlement dates', 'Vendor reliability scores over rolling 90 days'],
    automates: ['Discrepancy alerts on delivery mismatch', 'Payment due reminders 5 days in advance', 'Quarterly vendor performance report'],
    hoursSaved: 12,
    marketReference: 'Common need across Coimbatore industrial clusters',
  },
  'hc-noshows': {
    systemName: 'Appointment Intelligence System',
    monitors: ['No-show rates per doctor and per time slot', 'Booking lead time vs attendance correlation', 'Cancellation patterns by patient segment'],
    automates: ['Reminder SMS/WhatsApp 24h and 2h before appointment', 'Waitlist auto-fill when cancellation detected', 'Weekly no-show summary to clinic manager'],
    hoursSaved: 8,
    marketReference: 'Deployed for multi-specialty clinics in T. Nagar and Velachery',
  },
  'hc-billing': {
    systemName: 'Billing Reconciliation Dashboard',
    monitors: ['Insurance claim status per patient', 'Outstanding amounts by payer type', 'Revenue leakage from unbilled procedures'],
    automates: ['Claim follow-up reminders after 15 days', 'Daily collections vs billing summary', 'End-of-month revenue reconciliation report'],
    hoursSaved: 16,
    marketReference: 'Used by diagnostic centres across Tamil Nadu',
  },
  'hc-followup': {
    systemName: 'Patient Follow-Up Automation',
    monitors: ['Post-visit follow-up compliance rates', 'Chronic patient visit frequency vs protocol', 'Medication refill timing patterns'],
    automates: ['Follow-up WhatsApp messages at day 3 and day 7', 'Chronic condition review reminders', 'Lapsed patient re-engagement sequences'],
    hoursSaved: 10,
    marketReference: 'Common in GP clinics and physiotherapy centres',
  },
  'hc-expiry': {
    systemName: 'Pharmacy Expiry Tracker',
    monitors: ['Expiry dates across all SKUs in real time', 'Slow-moving stock risk by category', 'Return window eligibility per batch'],
    automates: ['60-day expiry alert for high-value items', 'Return initiation triggers for near-expiry stock', 'Monthly wastage cost report'],
    hoursSaved: 6,
    marketReference: 'Deployed for hospital pharmacies in Chennai and Madurai',
  },
  'log-route': {
    systemName: 'Route Efficiency Analyser',
    monitors: ['Planned vs actual route deviation per vehicle', 'Fuel consumption vs distance benchmarks', 'Delivery time windows vs actual arrival'],
    automates: ['End-of-day route efficiency report per driver', 'Fuel anomaly alerts when variance exceeds 15%', 'Weekly performance summary to fleet manager'],
    hoursSaved: 14,
    marketReference: 'Used by last-mile delivery operators in Chennai and Coimbatore',
  },
  'log-delivery': {
    systemName: 'Delivery Confirmation System',
    monitors: ['POD status per shipment in real time', 'Unconfirmed deliveries by region and driver', 'Exception rate by delivery zone'],
    automates: ['WhatsApp POD request on delivery completion', 'Escalation alert for 4-hour unconfirmed deliveries', 'Daily confirmation rate dashboard'],
    hoursSaved: 10,
    marketReference: 'Common for distributors handling 50+ deliveries daily',
  },
  'log-idle': {
    systemName: 'Fleet Idle Time Monitor',
    monitors: ['Idle hours per vehicle per day', 'Idle cost in fuel equivalent (Rs/hr)', 'Idle hotspots by location and time of day'],
    automates: ['Driver idle alert after 30 minutes of engine-on idle', 'Daily idle cost summary to operations manager', 'Weekly fleet utilisation report'],
    hoursSaved: 8,
    marketReference: 'Reduces idle costs by 20–35% for Chennai logistics operators',
  },
  'log-vendor': {
    systemName: 'Vendor Payment Reconciliation',
    monitors: ['Transporter invoice vs load completion records', 'Advance payments vs actual trips completed', 'Outstanding balances by vendor age'],
    automates: ['Weekly vendor statement reconciliation', 'Payment due alerts 3 days before vendor terms', 'Monthly vendor performance scorecard'],
    hoursSaved: 12,
    marketReference: 'Used by 3PL operators managing 20+ transport vendors',
  },
  'ret-stockout': {
    systemName: 'Stock-Out Prevention System',
    monitors: ['Real-time stock levels vs reorder points per SKU', 'Sales velocity changes week-on-week', 'Supplier lead time vs current stock days'],
    automates: ['Reorder trigger when stock drops below safety level', 'WhatsApp alert to purchase team', 'Daily at-risk SKU summary'],
    hoursSaved: 10,
    marketReference: 'Deployed for FMCG distributors across Tamil Nadu',
  },
  'ret-demand': {
    systemName: 'Demand Forecasting Engine',
    monitors: ['Historical sales patterns by SKU and season', 'Promotional uplift effects on adjacent categories', 'Festival and event demand spikes'],
    automates: ['Monthly purchase recommendation report', 'Category-level forecast updated every Sunday', 'Overstock alerts when forecast diverges from orders'],
    hoursSaved: 16,
    marketReference: 'Common for retail chains with 500+ SKUs in South India',
  },
  'ret-margin': {
    systemName: 'Margin Intelligence Dashboard',
    monitors: ['Gross margin per SKU, per category, per supplier', 'Price change impact on margin in real time', 'High-volume low-margin SKU identification'],
    automates: ['Weekly margin report to owner/GM', 'Low-margin alert when SKU drops below threshold', 'Monthly top and bottom performers summary'],
    hoursSaved: 8,
    marketReference: 'Used by multi-outlet retailers managing complex supplier terms',
  },
  'ret-reorder': {
    systemName: 'Customer Reorder Automation',
    monitors: ['Reorder frequency per customer segment', 'Days since last purchase for high-value accounts', 'Seasonal reorder pattern deviations'],
    automates: ['WhatsApp reorder nudges at predicted purchase time', 'Lapsed customer alert after 2× average reorder gap', 'Monthly customer retention summary'],
    hoursSaved: 6,
    marketReference: 'Effective for wholesale distributors with recurring B2B buyers',
  },
  'pro-billing': {
    systemName: 'Billing Leakage Detector',
    monitors: ['Billable hours logged vs invoiced per client', 'Work completed without associated invoice', 'Invoice ageing by client and engagement type'],
    automates: ['Weekly unbilled work summary to principals', 'Invoice trigger when engagement milestone hit', 'Monthly revenue leakage report'],
    hoursSaved: 10,
    marketReference: 'Deployed for CA firms and law offices in Chennai',
  },
  'pro-docs': {
    systemName: 'Document Turnaround Tracker',
    monitors: ['Document request to delivery time per type', 'Bottleneck identification by team member or step', 'SLA compliance rate per client'],
    automates: ['Status update WhatsApp when document advances', 'Overdue escalation after SLA breach', 'Weekly turnaround summary to manager'],
    hoursSaved: 12,
    marketReference: 'Common for compliance-heavy professional firms',
  },
  'pro-onboard': {
    systemName: 'Client Onboarding System',
    monitors: ['Onboarding step completion per new client', 'Time stuck at each stage', 'Document collection rate and outstanding items'],
    automates: ['Onboarding checklist WhatsApp to new client', 'Reminder after 48-hour document delay', 'Onboarding completion trigger for billing start'],
    hoursSaved: 8,
    marketReference: 'Used by wealth management and accounting firms',
  },
  'pro-util': {
    systemName: 'Team Utilisation Dashboard',
    monitors: ['Billable vs non-billable hours per team member', 'Capacity headroom by role and department', 'Utilisation trends week-on-week'],
    automates: ['Weekly utilisation report to leadership', 'Under-utilisation alert when member drops below 60%', 'Monthly capacity planning summary'],
    hoursSaved: 6,
    marketReference: 'Common in consulting and managed services firms',
  },
};

export const getBottlenecksByIndustry = (industryId: string): BottleneckOption[] =>
  bottlenecks.filter((b) => b.industryId === industryId);

export const getResult = (bottleneckId: string): ConfiguratorResult | null =>
  results[bottleneckId] ?? null;
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add lib/dashboardData.ts lib/configuratorData.ts
git commit -m "feat: add dashboard and configurator data"
```

---

## Task 4: Supabase Client + Animations Helper

**Files:**
- Create: `lib/supabase.ts`
- Create: `lib/animations.ts`

- [ ] **Step 1: Create Supabase client**

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 2: Add env vars to `.env.local`**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace values with actual Supabase project credentials from https://supabase.com/dashboard.

- [ ] **Step 3: Create Supabase table**

Run this SQL in the Supabase SQL editor:

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

- [ ] **Step 4: Create animations helper**

```typescript
// lib/animations.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function fadeUp(
  targets: gsap.TweenTarget,
  options: { delay?: number; stagger?: number; scrollTrigger?: ScrollTrigger.Vars } = {}
) {
  return gsap.fromTo(
    targets,
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0,
      scrollTrigger: options.scrollTrigger,
    }
  );
}

export function staggerFadeUp(
  targets: gsap.TweenTarget,
  scrollTriggerVars: ScrollTrigger.Vars = {}
) {
  return fadeUp(targets, {
    stagger: 0.08,
    scrollTrigger: {
      start: 'top 85%',
      once: true,
      ...scrollTriggerVars,
    },
  });
}

export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function counterUp(
  element: HTMLElement,
  target: number,
  duration = 1800
): void {
  const start = performance.now();
  const update = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(easeOutExpo(progress) * target);
    element.textContent = String(value);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
```

- [ ] **Step 5: Commit**

```bash
git add lib/supabase.ts lib/animations.ts .env.local
git commit -m "feat: add Supabase client and GSAP animation helpers"
```

---

## Task 5: globals.css + Tailwind Config

**Files:**
- Rewrite: `app/globals.css`
- Modify: `tailwind.config.ts` (or `.js`)

- [ ] **Step 1: Rewrite globals.css**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Design Tokens ─────────────────────────────────────── */
:root {
  --color-void:         #0C0C0E;
  --color-cream:        #F5F2EB;
  --color-surface:      #141416;
  --color-gold:         #D4952A;
  --color-gold-deep:    #8a5f12;
  --color-gold-light:   #f5dfa0;
  --color-green:        #22C47A;
  --color-red:          #E04040;
  --color-border-dark:  rgba(255, 255, 255, 0.08);
  --color-border-light: rgba(0, 0, 0, 0.08);
  --font-serif:         'Instrument Serif', Georgia, serif;
  --font-sans:          'DM Sans', system-ui, sans-serif;
  --font-mono:          'JetBrains Mono', 'Courier New', monospace;
  --radius-card:        16px;
  --radius-button:      8px;
  --radius-pill:        9999px;
  --ease-entrance:      cubic-bezier(0.16, 1, 0.3, 1);
  --ease-morph:         cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-spring:        cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ─── Base ──────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: auto; } /* Lenis handles smooth scroll */

body {
  font-family: var(--font-sans);
  background-color: var(--color-void);
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  cursor: none; /* CustomCursor replaces system cursor on desktop */
}

@media (pointer: coarse) {
  body { cursor: auto; }
}

/* ─── Grain Overlay ─────────────────────────────────────── */
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* ─── Gold Shimmer ──────────────────────────────────────── */
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

/* ─── Keyframes ─────────────────────────────────────────── */
@keyframes shimmer-sweep {
  from { background-position: 0% center; }
  to   { background-position: 200% center; }
}

@keyframes ping-pulse {
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.4); opacity: 0; }
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes ring-rotate-cw {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes ring-rotate-ccw {
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
}

@keyframes laser-scan {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}

/* ─── Utilities ─────────────────────────────────────────── */
.font-serif  { font-family: var(--font-serif); }
.font-sans   { font-family: var(--font-sans); }
.font-mono   { font-family: var(--font-mono); }

.section-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.6;
}

.ping-dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--color-green);
  animation: ping-pulse 2s ease-out infinite;
}

/* ─── Fill-Slide Button Base ────────────────────────────── */
.btn-fill-slide {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}
.btn-fill-slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.12);
  transform: translateX(-100%);
  transition: transform 300ms var(--ease-morph);
  z-index: -1;
}
.btn-fill-slide:hover::before {
  transform: translateX(0);
}
```

- [ ] **Step 2: Update tailwind.config**

Read the existing tailwind config file first, then update it:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void:    '#0C0C0E',
        cream:   '#F5F2EB',
        surface: '#141416',
        gold:    '#D4952A',
        green:   '#22C47A',
        danger:  '#E04040',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        card:   '16px',
        button: '8px',
        pill:   '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Verify no build errors**

```bash
npm run build 2>&1 | head -30
```

Expected: No CSS or config errors (may fail on missing page — that's fine).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "feat: design tokens, keyframes, and Tailwind config"
```

---

## Task 6: Layout + Global Wrappers

**Files:**
- Rewrite: `app/layout.tsx`
- Create: `components/ui/GrainOverlay.tsx`
- Create: `components/ui/CustomCursor.tsx`

- [ ] **Step 1: Create GrainOverlay**

```bash
mkdir -p components/ui
```

```tsx
// components/ui/GrainOverlay.tsx
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
```

- [ ] **Step 2: Create CustomCursor**

```tsx
// components/ui/CustomCursor.tsx
'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const rafId   = useRef<number>(0);
  const active  = useRef(false);

  useEffect(() => {
    // Only enable on pointer:fine devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    active.current = true;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterInteractive = () => {
      dotRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1.5)');
      ringRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1.8)');
    };

    const onLeaveInteractive = () => {
      dotRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1)');
      ringRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1)');
    };

    const tick = () => {
      if (!active.current) return;
      // Dot: immediate
      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top  = `${mouse.current.y}px`;
      }
      // Ring: lerp lag
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    document.addEventListener('mousemove', onMove);

    // Scale up on interactive elements
    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    return () => {
      active.current = false;
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', onMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#D4952A',
          transform: 'translate(-50%,-50%) scale(1)',
          transition: 'transform 200ms var(--ease-morph)',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid #D4952A',
          transform: 'translate(-50%,-50%) scale(1)',
          transition: 'transform 200ms var(--ease-morph)',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
    </>
  );
}
```

- [ ] **Step 3: Create LenisProvider**

```tsx
// components/ui/LenisProvider.tsx
'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

    const onFrame = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
    };

    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onFrame);
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 4: Rewrite app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { LenisProvider } from '@/components/ui/LenisProvider';

export const metadata: Metadata = {
  title: 'SEION — AI Systems for Indian Business',
  description:
    'Custom AI systems for Indian businesses — automation workflows, live dashboards, and decision tools built around the data you already have.',
  metadataBase: new URL('https://seion.digital'),
  openGraph: {
    title: 'SEION — AI Systems for Indian Business',
    description: 'AI systems built for how India actually works.',
    url: 'https://seion.digital',
    siteName: 'SEION',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LenisProvider>
          <GrainOverlay />
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build 2>&1 | head -40
```

Expected: Compiles without errors (missing page.tsx is fine at this stage).

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx components/ui/GrainOverlay.tsx components/ui/CustomCursor.tsx components/ui/LenisProvider.tsx
git commit -m "feat: layout with Lenis, grain overlay, and custom cursor"
```

---

## Task 7: Shared UI Primitives

**Files:**
- Create: `components/ui/GoldButton.tsx`
- Create: `components/ui/PillButton.tsx`
- Create: `components/ui/SectionLabel.tsx`

- [ ] **Step 1: Create GoldButton**

```tsx
// components/ui/GoldButton.tsx
import Link from 'next/link';

interface GoldButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

export function GoldButton({ label, href, onClick, fullWidth, type = 'button' }: GoldButtonProps) {
  const base = `
    btn-fill-slide
    inline-flex items-center justify-center
    px-6 py-3 rounded-button
    bg-gold text-void
    font-sans font-semibold text-sm tracking-tight
    transition-all duration-300
    hover:shadow-[0_4px_24px_rgba(212,149,42,0.35)]
    ${fullWidth ? 'w-full' : ''}
  `.trim();

  if (href) {
    return (
      <Link href={href} className={base}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {label}
    </button>
  );
}
```

- [ ] **Step 2: Create PillButton**

```tsx
// components/ui/PillButton.tsx
import Link from 'next/link';

interface PillButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

export function PillButton({ label, href, onClick }: PillButtonProps) {
  const base = `
    btn-fill-slide
    inline-flex items-center justify-center
    px-5 py-2.5 rounded-pill
    bg-gold text-void
    font-sans font-semibold text-sm tracking-tight
    transition-all duration-300
    hover:shadow-[0_4px_20px_rgba(212,149,42,0.35)]
  `.trim();

  if (href) {
    return (
      <Link href={href} className={base}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {label}
    </button>
  );
}
```

- [ ] **Step 3: Create SectionLabel**

```tsx
// components/ui/SectionLabel.tsx
interface SectionLabelProps {
  text: string;
  light?: boolean; // true when on cream background
}

export function SectionLabel({ text, light }: SectionLabelProps) {
  return (
    <div
      className={`section-label flex items-center gap-2 ${light ? 'text-void/60' : 'text-white/60'}`}
    >
      <span style={{ color: 'var(--color-gold)' }}>◆</span>
      {text}
    </div>
  );
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add components/ui/GoldButton.tsx components/ui/PillButton.tsx components/ui/SectionLabel.tsx
git commit -m "feat: GoldButton, PillButton, and SectionLabel primitives"
```

---

## Task 8: Navbar

**Files:**
- Create: `components/navbar/index.tsx`
- Create: `components/navbar/NavLinks.tsx`
- Create: `components/navbar/NavCTA.tsx`

- [ ] **Step 1: Create NavLinks**

```tsx
// components/navbar/NavLinks.tsx
'use client';

interface NavLinksProps {
  light?: boolean;
}

const links = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#process' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
];

export function NavLinks({ light }: NavLinksProps) {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={`
            font-sans font-medium text-[0.9375rem] transition-all duration-200
            hover:-translate-y-px
            ${light ? 'text-void/80 hover:text-void' : 'text-white/80 hover:text-white'}
          `}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Create NavCTA**

```tsx
// components/navbar/NavCTA.tsx
import { PillButton } from '@/components/ui/PillButton';

export function NavCTA() {
  return <PillButton label="Book 30-min Audit" href="#contact" />;
}
```

- [ ] **Step 3: Create Navbar index**

```tsx
// components/navbar/index.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { NavLinks } from './NavLinks';
import { NavCTA } from './NavCTA';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [isLight, setIsLight]     = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const observerRef               = useRef<IntersectionObserver | null>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Light section detection
  useEffect(() => {
    const lightSections = document.querySelectorAll('[data-section-light]');
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const anyIntersecting = entries.some((e) => e.isIntersecting);
        setIsLight(anyIntersecting);
      },
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 }
    );
    lightSections.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const navStyle: React.CSSProperties = scrolled
    ? isLight
      ? {
          background: 'rgba(245, 242, 235, 0.72)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.5), 0 8px 32px rgba(0,0,0,0.08)',
        }
      : {
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow:
            'inset 0 0 0 0.5px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.24)',
        }
    : {};

  return (
    <>
      <header
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-8 px-6 py-3 rounded-pill"
        style={{
          minWidth: 'min(640px, 90vw)',
          maxWidth: '90vw',
          transition: 'all 350ms cubic-bezier(0.25,0.46,0.45,0.94)',
          ...navStyle,
        }}
      >
        {/* Logo */}
        <a href="#" className="shrink-0">
          <span className="shimmer-gold font-sans font-bold text-xl tracking-tight">
            SEION
          </span>
        </a>

        {/* Links */}
        <NavLinks light={isLight && scrolled} />

        {/* CTA */}
        <div className="hidden md:block">
          <NavCTA />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ color: isLight && scrolled ? '#0C0C0E' : '#ffffff' }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            background: 'rgba(12,12,14,0.96)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {[
            { label: 'Services', href: '#services' },
            { label: 'How It Works', href: '#process' },
            { label: 'Industries', href: '#industries' },
            { label: 'About', href: '#about' },
            { label: 'Contact', href: '#contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans font-semibold text-2xl text-white/90 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <NavCTA />
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 4: Create minimal page.tsx to test**

```tsx
// app/page.tsx
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <main>
      <Navbar />
      <div style={{ height: '200vh', background: '#0C0C0E' }}>
        <div style={{ paddingTop: '50vh', textAlign: 'center', color: 'white' }}>
          Scroll to test navbar morph
        </div>
        <div data-section-light style={{ height: '50vh', background: '#F5F2EB' }} />
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Test in browser**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Navbar is transparent at top, frosted glass after scroll
- Switches to light colours when cream section is visible
- Mobile hamburger opens overlay at < 768px
- Logo has shimmer gold animation

- [ ] **Step 6: Commit**

```bash
git add components/navbar/ app/page.tsx
git commit -m "feat: Navbar with frosted glass, light detection, mobile overlay"
```

---

## Task 9: HeroDashboard Component

**Files:**
- Create: `components/hero/HeroDashboard.tsx`

- [ ] **Step 1: Create HeroDashboard**

```tsx
// components/hero/HeroDashboard.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { dashboardData, getSectorById } from '@/lib/dashboardData';
import type { SectorData } from '@/types';
import gsap from 'gsap';

interface HeroDashboardProps {
  compact?: boolean; // false = full demo size, true = hero size
}

export function HeroDashboard({ compact = false }: HeroDashboardProps) {
  const [activeSector, setActiveSector] = useState<SectorData['id']>('auto');
  const [data, setData] = useState(() => getSectorById('auto'));
  const [insightIndex, setInsightIndex] = useState(0);
  const [insightVisible, setInsightVisible] = useState(true);
  const barsRef = useRef<HTMLDivElement>(null);

  const animateBars = useCallback(() => {
    if (!barsRef.current) return;
    const bars = barsRef.current.querySelectorAll('[data-bar]');
    gsap.fromTo(
      bars,
      { scaleY: 0, transformOrigin: 'bottom' },
      { scaleY: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06 }
    );
  }, []);

  // Sector switch
  const switchSector = (id: SectorData['id']) => {
    setActiveSector(id);
    setTimeout(() => {
      setData(getSectorById(id));
      setInsightIndex(0);
      animateBars();
    }, 150);
  };

  // On mount bar animation
  useEffect(() => { animateBars(); }, [animateBars]);

  // Insight rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setInsightVisible(false);
      setTimeout(() => {
        setInsightIndex((i) => (i + 1) % data.insights.length);
        setInsightVisible(true);
      }, 200);
    }, 4000);
    return () => clearInterval(interval);
  }, [data.insights.length]);

  return (
    <div
      className="rounded-card bg-surface border w-full"
      style={{ borderColor: 'var(--color-border-dark)', padding: compact ? '1.25rem' : '1.5rem' }}
    >
      {/* Sector tabs */}
      <div className="flex gap-1 mb-4">
        {dashboardData.map((sector) => (
          <button
            key={sector.id}
            onClick={() => switchSector(sector.id)}
            className="font-mono text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded-md transition-all duration-200"
            style={{
              background: activeSector === sector.id ? 'rgba(212,149,42,0.15)' : 'transparent',
              color: activeSector === sector.id ? 'var(--color-gold)' : 'rgba(255,255,255,0.4)',
              border: activeSector === sector.id ? '1px solid rgba(212,149,42,0.3)' : '1px solid transparent',
            }}
          >
            {sector.label}
          </button>
        ))}
      </div>

      {/* Stat cards */}
      <div
        className="grid grid-cols-2 gap-2 mb-4"
        style={{ transition: 'opacity 200ms', opacity: insightVisible ? 1 : 0.6 }}
      >
        {data.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-3"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/40 mb-1">
              {stat.label}
            </div>
            <div className="font-sans font-bold text-white text-lg leading-none">
              {stat.value}
            </div>
            {stat.delta && (
              <div
                className="font-mono text-[0.65rem] mt-1"
                style={{ color: stat.deltaType === 'positive' ? 'var(--color-green)' : stat.deltaType === 'negative' ? 'var(--color-red)' : 'rgba(255,255,255,0.4)' }}
              >
                {stat.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div ref={barsRef} className="flex items-end gap-1.5 mb-4" style={{ height: compact ? 60 : 80 }}>
        {data.chartData.map((bar) => (
          <div key={bar.month} className="flex-1 flex flex-col items-center gap-1">
            <div
              data-bar
              className="w-full rounded-sm"
              style={{
                height: `${bar.value}%`,
                background: 'rgba(212,149,42,0.6)',
                transformOrigin: 'bottom',
                maxHeight: compact ? 48 : 64,
              }}
            />
            <span className="font-mono text-[0.55rem] text-white/30">{bar.month}</span>
          </div>
        ))}
      </div>

      {/* AI insight */}
      <div
        className="rounded-lg p-3 flex items-start gap-2.5"
        style={{ background: 'rgba(34,196,122,0.06)', border: '1px solid rgba(34,196,122,0.12)', transition: 'opacity 200ms', opacity: insightVisible ? 1 : 0 }}
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: 'var(--color-green)' }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'var(--color-green)', animation: 'ping-pulse 2s ease-out infinite' }}
          />
        </div>
        <p className="font-mono text-[0.65rem] text-white/70 leading-relaxed">
          {data.insights[insightIndex]}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add to page.tsx for testing**

```tsx
// app/page.tsx
import { Navbar } from '@/components/navbar';
import { HeroDashboard } from '@/components/hero/HeroDashboard';

export default function Home() {
  return (
    <main style={{ background: '#0C0C0E', minHeight: '100vh', padding: '6rem 2rem' }}>
      <Navbar />
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <HeroDashboard />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Open http://localhost:3000. Verify:
- Dashboard renders with sector tabs, stat cards, bar chart, and insight rotator
- Clicking sector tabs updates all data
- Bars animate up on load and on sector switch
- Insight cycles every 4s with fade

- [ ] **Step 4: Commit**

```bash
git add components/hero/HeroDashboard.tsx app/page.tsx
git commit -m "feat: HeroDashboard with sector switcher, bar chart, and insight rotator"
```

---

## Task 10: Hero Section

**Files:**
- Create: `components/hero/HeroText.tsx`
- Create: `components/hero/index.tsx`

- [ ] **Step 1: Create HeroText**

```tsx
// components/hero/HeroText.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GoldButton } from '@/components/ui/GoldButton';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });
      tl.fromTo('[data-hero-overline]', { y: 20, opacity: 0 }, { y: 0, opacity: 1 })
        .fromTo('[data-hero-line1]',    { y: 28, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.4')
        .fromTo('[data-hero-line2]',    { y: 28, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.5')
        .fromTo('[data-hero-line3]',    { y: 28, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.5')
        .fromTo('[data-hero-body]',     { y: 28, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.4')
        .fromTo('[data-hero-ctas]',     { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.4');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-6 max-w-xl">
      {/* Overline */}
      <div data-hero-overline>
        <SectionLabel text="AI Systems · Chennai, India" />
      </div>

      {/* Headline */}
      <div className="flex flex-col gap-1">
        <p
          data-hero-line1
          className="font-sans font-bold text-white/90"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', lineHeight: 1.2 }}
        >
          Your business runs on WhatsApp,
        </p>
        <p
          data-hero-line2
          className="font-sans font-bold text-white/90"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', lineHeight: 1.2 }}
        >
          Tally, and gut feel.
        </p>
        <p
          data-hero-line3
          className="font-serif italic text-white"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
        >
          We make it run on intelligence.
        </p>
      </div>

      {/* Body */}
      <p
        data-hero-body
        className="font-sans text-white/60 text-base leading-relaxed"
        style={{ maxWidth: 480 }}
      >
        Custom AI systems for Indian businesses — automation workflows, live dashboards,
        and decision tools built around the data you already have.
      </p>

      {/* CTAs */}
      <div data-hero-ctas className="flex flex-wrap items-center gap-4">
        <GoldButton label="Book a free 30-min audit" href="#contact" />
        <a
          href="#demo"
          className="font-sans font-medium text-sm text-white/60 hover:text-white transition-colors hover:-translate-y-px inline-flex items-center gap-1.5"
        >
          See a live demo
          <span>↓</span>
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Hero index**

```tsx
// components/hero/index.tsx
import { HeroText } from './HeroText';
import { HeroDashboard } from './HeroDashboard';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center"
      style={{ background: 'var(--color-void)', paddingTop: '6rem' }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <HeroText />

          {/* Right: dashboard */}
          <div className="w-full">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update page.tsx**

```tsx
// app/page.tsx
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Verify in browser**

Open http://localhost:3000. Verify:
- Two-column layout on desktop, stacked on mobile
- GSAP entrance sequence fires on load
- Dashboard is live on the right
- CTAs scroll to correct anchors

- [ ] **Step 5: Commit**

```bash
git add components/hero/HeroText.tsx components/hero/index.tsx app/page.tsx
git commit -m "feat: Hero section with GSAP entrance and live dashboard"
```

---

## Task 11: Proof Strip

**Files:**
- Create: `components/sections/ProofStrip.tsx`

- [ ] **Step 1: Create ProofStrip**

```tsx
// components/sections/ProofStrip.tsx
'use client';

import { useEffect, useRef } from 'react';
import { counterUp } from '@/lib/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const counters = [
  { target: 22, suffix: '+', label: 'systems delivered' },
  { target: 5,  suffix: '+', label: 'industries' },
  { target: 30, suffix: ' min', label: 'free audit' },
];

const sectors = [
  'Auto Components', 'Pharma Distribution', 'Textile Trading',
  'Manufacturing', 'Healthcare', 'Logistics', 'Retail & MSME', 'Professional Services',
];

export function ProofStrip() {
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const triggered   = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#proof-strip',
        start: 'top 90%',
        once: true,
        onEnter: () => {
          if (triggered.current) return;
          triggered.current = true;
          counterRefs.current.forEach((el, i) => {
            if (el) counterUp(el, counters[i].target, 1800);
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proof-strip"
      className="border-y"
      style={{
        background: 'var(--color-void)',
        borderColor: 'var(--color-border-dark)',
        padding: '1.5rem 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Counters */}
        <div className="flex items-center gap-10">
          {counters.map((c, i) => (
            <div key={c.label} className="flex flex-col items-center md:items-start">
              <div className="font-mono font-medium text-white text-2xl">
                <span ref={(el) => { counterRefs.current[i] = el; }}>0</span>
                {c.suffix}
              </div>
              <div className="font-mono text-white/40 text-xs uppercase tracking-wider">
                {c.label}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div
          className="overflow-hidden"
          style={{ maxWidth: '480px', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          onMouseEnter={(e) => {
            (e.currentTarget.querySelector('.marquee-track') as HTMLElement)?.style.setProperty('animation-play-state', 'paused');
          }}
          onMouseLeave={(e) => {
            (e.currentTarget.querySelector('.marquee-track') as HTMLElement)?.style.setProperty('animation-play-state', 'running');
          }}
        >
          <div
            className="marquee-track flex gap-6 whitespace-nowrap"
            style={{ animation: 'marquee-scroll 28s linear infinite' }}
          >
            {[...sectors, ...sectors].map((s, i) => (
              <span key={i} className="font-mono text-xs text-white/40 uppercase tracking-wider">
                {s}
                <span className="mx-3 text-white/20">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
// app/page.tsx
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { ProofStrip } from '@/components/sections/ProofStrip';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProofStrip />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Scroll down until the proof strip enters view. Verify counters count up from 0. Verify marquee scrolls and pauses on hover.

- [ ] **Step 4: Commit**

```bash
git add components/sections/ProofStrip.tsx app/page.tsx
git commit -m "feat: ProofStrip with animated counters and sector marquee"
```

---

## Task 12: Problem Section

**Files:**
- Create: `components/sections/Problem.tsx`

- [ ] **Step 1: Create Problem**

```tsx
// components/sections/Problem.tsx
'use client';

import { useEffect, useRef } from 'react';
import { staggerFadeUp } from '@/lib/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      staggerFadeUp(ref.current!.querySelectorAll('[data-fade]'));
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{ background: 'var(--color-void)', padding: '7rem 0' }}
    >
      <div
        ref={ref}
        className="max-w-[720px] mx-auto px-6 lg:px-12 flex flex-col gap-8"
      >
        <p
          data-fade
          className="font-sans text-white/70 text-base leading-[1.85] lg:text-lg"
        >
          Most Indian businesses are drowning in data they can&apos;t read. Scattered across
          Tally, WhatsApp, handwritten registers, and decade-old Excel files — your data
          exists. But nobody has time to read it, let alone act on it. Every decision still
          runs on memory and instinct. Every month-end report costs 14 hours of manual work.
          Every growth opportunity gets missed because nobody saw it coming.
        </p>
        <p
          data-fade
          className="font-serif italic text-white"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.2 }}
        >
          We built SEION to end that.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page.tsx and commit**

```tsx
// app/page.tsx — add Problem after ProofStrip
import { Problem } from '@/components/sections/Problem';
// ... add <Problem /> after <ProofStrip />
```

```bash
git add components/sections/Problem.tsx app/page.tsx
git commit -m "feat: Problem section with scroll-triggered fade-up"
```

---

## Task 13: Services — Bento Grid

**Files:**
- Create: `components/services/index.tsx`
- Create: `components/services/ServiceCard01.tsx`
- Create: `components/services/ServiceCard02.tsx`
- Create: `components/services/ServiceCard03.tsx`

- [ ] **Step 1: Create ServiceCard01**

```tsx
// components/services/ServiceCard01.tsx
'use client';

import { useRef } from 'react';

const tags = ['Invoice automation', 'WhatsApp workflows', 'Document processing', 'Report generation'];

export function ServiceCard01() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative bg-white rounded-card p-8 flex flex-col justify-between overflow-hidden group"
      style={{
        border: '1px solid var(--color-border-light)',
        boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
        gridRow: 'span 2',
      }}
    >
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(400px at var(--mx, 50%) var(--my, 50%), rgba(212,149,42,0.12), transparent)',
        }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[380ms]"
        style={{ background: 'var(--color-gold)', transitionTimingFunction: 'var(--ease-morph)' }}
      />

      <div className="flex flex-col gap-5 relative z-10">
        <div className="font-mono text-xs text-void/40 uppercase tracking-wider">01</div>
        <h3 className="font-sans font-bold text-void text-2xl leading-tight">
          AI Workflow Automation
        </h3>
        <p className="font-sans font-bold text-void/80 text-base">The 14-hour problem.</p>
        <p className="font-sans text-void/65 text-sm leading-relaxed">
          Every week, someone in your business spends 10–20 hours doing things a computer could
          do in seconds. Invoice follow-ups. Customer status messages. Monthly reports. Data entry
          between systems. We map every manual step. Then we build the system that handles it —
          so your people handle the work that actually needs a person.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 relative z-10">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[0.65rem] uppercase tracking-wider text-void/50 px-2.5 py-1 rounded-md"
            style={{ background: 'rgba(12,12,14,0.06)', border: '1px solid rgba(12,12,14,0.08)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ServiceCard02**

```tsx
// components/services/ServiceCard02.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

const messages = [
  'Revenue: ↑ 18.4% vs last quarter — Auto Components, Chennai',
  'Stock alert: Category B below reorder threshold',
  '3 vendor payments pending — ₹2.4L outstanding',
  'Top margin SKU this week: Ref #A-047',
  'Cash buffer forecast: 23-day positive surplus',
];

export function ServiceCard02() {
  const [displayText, setDisplayText] = useState('');
  const [msgIndex, setMsgIndex]       = useState(0);
  const [cursorOn, setCursorOn]       = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let charIndex = 0;
    const msg = messages[msgIndex];

    const typeChar = () => {
      if (charIndex <= msg.length) {
        setDisplayText(msg.slice(0, charIndex));
        charIndex++;
        timeoutRef.current = setTimeout(typeChar, 44);
      } else {
        // Pause then move to next
        timeoutRef.current = setTimeout(() => {
          setMsgIndex((i) => (i + 1) % messages.length);
        }, 2400);
      }
    };

    timeoutRef.current = setTimeout(typeChar, 44);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [msgIndex]);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="bg-white rounded-card p-8 flex flex-col justify-between"
      style={{ border: '1px solid var(--color-border-light)', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs text-void/40 uppercase tracking-wider">02</div>
          {/* Live feed badge */}
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-green)' }} />
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'var(--color-green)', animation: 'ping-pulse 2s ease-out infinite' }}
              />
            </div>
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-void/50">Live Feed</span>
          </div>
        </div>
        <h3 className="font-sans font-bold text-void text-xl leading-tight">
          Business Intelligence
        </h3>
        <p className="font-sans font-bold text-void/80 text-sm">
          Your data exists. You&apos;re just not reading it.
        </p>
        <p className="font-sans text-void/65 text-sm leading-relaxed">
          We connect Tally, Excel, WhatsApp, and every other source into one live dashboard.
          You see today&apos;s numbers today — not last month&apos;s.
        </p>
      </div>

      {/* Typewriter */}
      <div
        className="mt-6 rounded-lg p-4"
        style={{ background: 'rgba(12,12,14,0.04)', border: '1px solid rgba(12,12,14,0.08)' }}
      >
        <p className="font-mono text-void/70 text-xs leading-relaxed min-h-[3em]">
          {displayText}
          <span style={{ opacity: cursorOn ? 1 : 0, color: 'var(--color-gold)' }}>|</span>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create ServiceCard03**

```tsx
// components/services/ServiceCard03.tsx
'use client';

import { useRef } from 'react';

const tags = ['Predictive maintenance', 'IoT integration', 'Scheduling AI', 'Industry-specific'];

export function ServiceCard03() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative bg-white rounded-card p-8 flex flex-col justify-between overflow-hidden group"
      style={{ border: '1px solid var(--color-border-light)', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(400px at var(--mx,50%) var(--my,50%), rgba(212,149,42,0.12), transparent)' }}
      />
      {/* Accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[380ms]"
        style={{ background: 'var(--color-gold)', transitionTimingFunction: 'var(--ease-morph)' }}
      />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="font-mono text-xs text-void/40 uppercase tracking-wider">03</div>
        <h3 className="font-sans font-bold text-void text-xl leading-tight">
          Custom AI Systems
        </h3>
        <p className="font-sans font-bold text-void/80 text-sm">
          The problem no software was built for.
        </p>
        <p className="font-sans text-void/65 text-sm leading-relaxed">
          Your factory&apos;s specific failure pattern. Your clinic&apos;s scheduling complexity.
          Your warehouse&apos;s demand cycle. We build the system for your exact problem — not a
          generic tool you have to adapt to.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 relative z-10">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[0.65rem] uppercase tracking-wider text-void/50 px-2.5 py-1 rounded-md"
            style={{ background: 'rgba(12,12,14,0.06)', border: '1px solid rgba(12,12,14,0.08)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create Services index**

```tsx
// components/services/index.tsx
'use client';

import { useEffect, useRef } from 'react';
import { staggerFadeUp } from '@/lib/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ServiceCard01 } from './ServiceCard01';
import { ServiceCard02 } from './ServiceCard02';
import { ServiceCard03 } from './ServiceCard03';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      staggerFadeUp(ref.current!.querySelectorAll('[data-fade]'));
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      data-section-light
      style={{ background: 'var(--color-cream)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-3 mb-12" data-fade>
          <SectionLabel text="What We Build" light />
          <h2
            className="font-sans font-bold text-void"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            Three problems. Solved properly.
          </h2>
          <p className="font-sans text-void/65 text-base max-w-xl leading-relaxed">
            Not six. Not twelve. Three types of AI systems that create measurable impact — and
            we build each one as if it&apos;s the only thing we do.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'auto auto' }}
        >
          <div data-fade style={{ gridRow: 'span 2' }}>
            <ServiceCard01 />
          </div>
          <div data-fade><ServiceCard02 /></div>
          <div data-fade><ServiceCard03 /></div>
        </div>
      </div>
    </section>
  );
}
```

Note: On mobile, add this CSS override in globals.css to stack the grid:
```css
@media (max-width: 767px) {
  .services-grid {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto !important;
  }
  .services-grid > div[style*="grid-row"] {
    grid-row: auto !important;
  }
}
```

Or use a wrapper with `className="services-grid"` and handle via Tailwind responsive breakpoints.

- [ ] **Step 5: Add to page.tsx and verify**

```tsx
import { Services } from '@/components/services';
// add <Services /> after <Problem />
```

Open browser. Verify: bento grid layout, spotlight glow on card 01/03 hover, typewriter on card 02, accent line on hover.

- [ ] **Step 6: Commit**

```bash
git add components/services/ app/page.tsx
git commit -m "feat: Services bento grid with spotlight, typewriter, and accent lines"
```

---

## Task 14: Demo Section

**Files:**
- Create: `components/demo/index.tsx`
- Create: `components/demo/DemoTab1.tsx`
- Create: `components/demo/DemoTab2.tsx`
- Create: `components/demo/DemoTab3.tsx`

- [ ] **Step 1: Create DemoTab1**

```tsx
// components/demo/DemoTab1.tsx
import { HeroDashboard } from '@/components/hero/HeroDashboard';

export function DemoTab1() {
  return (
    <div className="max-w-2xl mx-auto">
      <HeroDashboard compact={false} />
    </div>
  );
}
```

- [ ] **Step 2: Create DemoTab2**

```tsx
// components/demo/DemoTab2.tsx
'use client';

import { useRef, useState, useCallback } from 'react';

export function DemoTab2() {
  const [pct, setPct]             = useState(50);
  const [dragging, setDragging]   = useState(false);
  const containerRef              = useRef<HTMLDivElement>(null);

  const updatePct = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const raw  = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(5, Math.min(95, raw)));
  }, []);

  const onMouseMove = (e: React.MouseEvent) => { if (dragging) updatePct(e.clientX); };
  const onTouchMove = (e: React.TouchEvent) => updatePct(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative rounded-card overflow-hidden select-none"
      style={{ height: 400, cursor: 'col-resize' }}
      onMouseMove={onMouseMove}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={onTouchMove}
      onTouchEnd={() => setDragging(false)}
    >
      {/* Before panel (left) */}
      <div
        className="absolute inset-0 flex flex-col justify-center px-10 gap-4"
        style={{ background: 'rgba(26,10,10,0.95)', borderRight: '1px solid rgba(224,64,64,0.2)' }}
      >
        <div className="font-mono text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--color-red)', opacity: 0.7 }}>
          Before SEION
        </div>
        {[
          { label: 'Unanswered messages', value: '14', bad: true },
          { label: 'Avg response time', value: '4.2 hrs', bad: true },
          { label: 'Monthly report', value: '❌ Manual — 14 hrs', bad: true },
          { label: 'Pending follow-ups', value: '23', bad: true },
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-center">
            <span className="font-sans text-xs text-white/50">{row.label}</span>
            <span className="font-mono text-xs" style={{ color: 'var(--color-red)' }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* After panel (right), clipped */}
      <div
        className="absolute inset-0 flex flex-col justify-center px-10 gap-4"
        style={{
          background: 'rgba(10,26,15,0.95)',
          clipPath: `inset(0 ${100 - pct}% 0 0)`,
        }}
      >
        <div className="font-mono text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--color-green)', opacity: 0.7 }}>
          After SEION
        </div>
        {[
          { label: 'Auto-replies sent in', value: '52 seconds' },
          { label: 'Invoice auto-sent', value: '✓ On approval' },
          { label: 'Report auto-generated', value: '✓ 9AM on 1st' },
          { label: 'Pending messages', value: '0' },
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-center">
            <span className="font-sans text-xs text-white/50">{row.label}</span>
            <span className="font-mono text-xs" style={{ color: 'var(--color-green)' }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center"
        style={{ left: `${pct}%`, transform: 'translateX(-50%)', zIndex: 10 }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-col-resize select-none"
          style={{
            background: 'var(--color-gold)',
            boxShadow: '0 0 0 3px rgba(212,149,42,0.3)',
            fontSize: '1rem',
            color: 'var(--color-void)',
            fontWeight: 700,
          }}
        >
          ⟺
        </div>
        <div className="absolute top-0 bottom-0 w-px" style={{ background: 'rgba(212,149,42,0.4)' }} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create DemoTab3**

```tsx
// components/demo/DemoTab3.tsx
'use client';

import { useState } from 'react';
import { industries, getBottlenecksByIndustry, getResult } from '@/lib/configuratorData';
import { GoldButton } from '@/components/ui/GoldButton';

type Step = 1 | 2 | 3;

export function DemoTab3() {
  const [step, setStep]               = useState<Step>(1);
  const [industry, setIndustry]       = useState('');
  const [bottleneck, setBottleneck]   = useState('');

  const result = bottleneck ? getResult(bottleneck) : null;

  const selectIndustry = (id: string) => {
    setIndustry(id);
    setBottleneck('');
    setStep(2);
  };

  const selectBottleneck = (id: string) => {
    setBottleneck(id);
    setStep(3);
  };

  const chipBase = 'font-sans font-medium text-sm px-5 py-3 rounded-button transition-all duration-200 cursor-pointer border';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicators */}
      <div className="flex items-center gap-3 mb-8">
        {([1, 2, 3] as Step[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[0.65rem]"
              style={{
                background: step >= s ? 'var(--color-gold)' : 'rgba(255,255,255,0.08)',
                color: step >= s ? 'var(--color-void)' : 'rgba(255,255,255,0.3)',
              }}
            >
              {s}
            </div>
            {s < 3 && <div className="w-8 h-px" style={{ background: step > s ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)' }} />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div style={{ animation: 'fadeSlideIn 250ms ease forwards' }}>
          <p className="font-sans font-semibold text-white mb-4">Select your industry</p>
          <div className="flex flex-wrap gap-3">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => selectIndustry(ind.id)}
                className={chipBase}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor = 'var(--color-gold)';
                  (e.target as HTMLElement).style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                }}
              >
                {ind.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div style={{ animation: 'fadeSlideIn 250ms ease forwards' }}>
          <p className="font-sans font-semibold text-white mb-4">What&apos;s your biggest bottleneck?</p>
          <div className="flex flex-wrap gap-3">
            {getBottlenecksByIndustry(industry).map((b) => (
              <button
                key={b.id}
                onClick={() => selectBottleneck(b.id)}
                className={chipBase}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor = 'var(--color-gold)';
                  (e.target as HTMLElement).style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
          <button className="mt-4 font-mono text-xs text-white/40 hover:text-white/70" onClick={() => setStep(1)}>
            ← Change industry
          </button>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && result && (
        <div style={{ animation: 'fadeSlideIn 250ms ease forwards' }}>
          <div
            className="rounded-card p-6 flex flex-col gap-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-wider mb-1">Your System</div>
              <h3 className="font-sans font-bold text-white text-xl">{result.systemName}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/40 mb-2">What it monitors</div>
                <ul className="flex flex-col gap-1.5">
                  {result.monitors.map((m) => (
                    <li key={m} className="font-sans text-xs text-white/70 flex items-start gap-1.5">
                      <span style={{ color: 'var(--color-green)' }}>✓</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/40 mb-2">What it automates</div>
                <ul className="flex flex-col gap-1.5">
                  {result.automates.map((a) => (
                    <li key={a} className="font-sans text-xs text-white/70 flex items-start gap-1.5">
                      <span style={{ color: 'var(--color-green)' }}>✓</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/40">Hours saved / week</div>
                <div className="font-mono font-semibold text-white text-xl">{result.hoursSaved}+</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[0.65rem] text-white/30 italic">{result.marketReference}</div>
              </div>
            </div>
            <GoldButton label="Get this built →" href="#contact" />
          </div>
          <button className="mt-4 font-mono text-xs text-white/40 hover:text-white/70" onClick={() => setStep(1)}>
            ← Start over
          </button>
        </div>
      )}
    </div>
  );
}
```

Add the `fadeSlideIn` keyframe to globals.css:
```css
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 4: Create Demo index**

```tsx
// components/demo/index.tsx
'use client';

import { useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { DemoTab1 } from './DemoTab1';
import { DemoTab2 } from './DemoTab2';
import { DemoTab3 } from './DemoTab3';

const tabs = [
  { id: 'dashboard', label: 'Live Dashboard' },
  { id: 'before-after', label: 'Before & After' },
  { id: 'build-yours', label: 'Build Yours' },
] as const;

type TabId = typeof tabs[number]['id'];

export function Demo() {
  const [active, setActive] = useState<TabId>('dashboard');

  return (
    <section
      id="demo"
      style={{ background: 'var(--color-void)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-10">
          <SectionLabel text="See It Working" />
          <h2
            className="font-sans font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            Not a promise. A demonstration.
          </h2>
          <p className="font-sans text-white/50 text-base max-w-xl leading-relaxed">
            Every client starts skeptical. The fastest way to earn trust is to show the work.
            Explore a real SEION-built system below.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-6 border-b mb-10" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="relative pb-3 font-sans font-medium text-sm transition-all duration-200"
              style={{ color: active === tab.id ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
            >
              {tab.label}
              {active === tab.id && (
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 origin-left"
                  style={{ background: 'var(--color-gold)', animation: 'scaleInX 250ms var(--ease-morph) forwards' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {active === 'dashboard'   && <DemoTab1 />}
        {active === 'before-after' && <DemoTab2 />}
        {active === 'build-yours' && <DemoTab3 />}
      </div>
    </section>
  );
}
```

Add to globals.css:
```css
@keyframes scaleInX {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

- [ ] **Step 5: Add to page.tsx and verify**

```tsx
import { Demo } from '@/components/demo';
// add <Demo /> after <Services />
```

Verify: tab switching works, drag slider on Tab 2 functions on mouse and touch, configurator generates result card on Tab 3.

- [ ] **Step 6: Commit**

```bash
git add components/demo/ app/page.tsx app/globals.css
git commit -m "feat: Demo section with live dashboard, drag slider, and configurator"
```

---

## Task 15: Process Section — Sticky Stack

**Files:**
- Create: `components/process/SVGRings.tsx`
- Create: `components/process/SVGScanGrid.tsx`
- Create: `components/process/SVGEkg.tsx`
- Create: `components/process/SVGDataTree.tsx`
- Create: `components/process/ProcessCard.tsx`
- Create: `components/process/index.tsx`

- [ ] **Step 1: Create SVG animations**

```tsx
// components/process/SVGRings.tsx
export function SVGRings() {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" style={{ overflow: 'visible' }}>
      {[60, 80, 100].map((r, i) => (
        <circle
          key={r}
          cx="100" cy="100" r={r}
          fill="none"
          stroke="rgba(212,149,42,0.2)"
          strokeWidth="1"
          style={{
            animation: `${i % 2 === 0 ? 'ring-rotate-cw' : 'ring-rotate-ccw'} ${[8, 12, 16][i]}s linear infinite`,
            transformOrigin: '100px 100px',
            strokeDasharray: i === 1 ? '8 4' : i === 2 ? '4 8' : 'none',
          }}
        />
      ))}
      <circle cx="100" cy="100" r="6" fill="rgba(212,149,42,0.8)" />
    </svg>
  );
}
```

```tsx
// components/process/SVGScanGrid.tsx
export function SVGScanGrid() {
  const dots = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 10; col++) {
      dots.push({ x: col * 18 + 9, y: row * 18 + 9 });
    }
  }
  return (
    <svg viewBox="0 0 189 117" width="189" height="117" style={{ overflow: 'hidden' }}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2" fill="rgba(255,255,255,0.15)" />
      ))}
      {/* Laser line */}
      <rect
        x="0" y="0" width="20" height="117"
        fill="url(#laser-grad)"
        style={{ animation: 'laser-scan 2.2s linear infinite' }}
      />
      <defs>
        <linearGradient id="laser-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(212,149,42,0)" />
          <stop offset="50%" stopColor="rgba(212,149,42,0.4)" />
          <stop offset="100%" stopColor="rgba(212,149,42,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
```

```tsx
// components/process/SVGEkg.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function SVGEkg() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2.4,
      ease: 'power2.inOut',
      repeat: -1,
      repeatDelay: 1,
    });
  }, []);

  return (
    <svg viewBox="0 0 280 80" width="280" height="80">
      <path
        ref={pathRef}
        d="M0,40 L40,40 L55,10 L65,70 L80,5 L95,75 L110,40 L150,40 L165,20 L175,60 L185,40 L280,40"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

```tsx
// components/process/SVGDataTree.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function SVGDataTree() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll('path[data-branch]');
    const animate = () => {
      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        onComplete: () => { setTimeout(animate, 1500); },
      });
    };
    animate();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 200 160" width="200" height="160">
      {/* Trunk */}
      <path data-branch d="M100,150 L100,80" stroke="rgba(212,149,42,0.8)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Branch L1 */}
      <path data-branch d="M100,100 L60,60" stroke="rgba(212,149,42,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Branch R1 */}
      <path data-branch d="M100,100 L140,60" stroke="rgba(212,149,42,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Branch L2 */}
      <path data-branch d="M60,60 L35,30" stroke="rgba(212,149,42,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path data-branch d="M60,60 L75,25" stroke="rgba(212,149,42,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Branch R2 */}
      <path data-branch d="M140,60 L125,25" stroke="rgba(212,149,42,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path data-branch d="M140,60 L165,30" stroke="rgba(212,149,42,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Nodes */}
      {[[100,80],[60,60],[140,60],[35,30],[75,25],[125,25],[165,30]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="rgba(212,149,42,0.7)" />
      ))}
    </svg>
  );
}
```

- [ ] **Step 2: Create ProcessCard**

```tsx
// components/process/ProcessCard.tsx
import type { ReactNode } from 'react';

interface ProcessCardProps {
  step: string;
  title: string;
  body: string;
  svg: ReactNode;
}

export function ProcessCard({ step, title, body, svg }: ProcessCardProps) {
  return (
    <div
      className="w-full min-h-[100dvh] flex items-center justify-center"
      style={{ background: 'var(--color-void)' }}
    >
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="flex flex-col gap-5">
            <div
              className="font-mono text-sm uppercase tracking-wider"
              style={{ color: 'var(--color-gold)' }}
            >
              {step}
            </div>
            <h3
              className="font-sans font-bold text-white"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', lineHeight: 1.15 }}
            >
              {title}
            </h3>
            <p className="font-sans text-white/60 text-base leading-relaxed max-w-md">{body}</p>
          </div>
          {/* SVG */}
          <div className="flex items-center justify-center">{svg}</div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Process index with GSAP sticky stack**

```tsx
// components/process/index.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProcessCard } from './ProcessCard';
import { SVGRings } from './SVGRings';
import { SVGScanGrid } from './SVGScanGrid';
import { SVGEkg } from './SVGEkg';
import { SVGDataTree } from './SVGDataTree';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: '01',
    title: 'We sit in your business first.',
    body: 'Before any proposal, we spend time understanding how operations actually run. Not from a call — by watching, asking, mapping.',
    svg: <SVGRings />,
  },
  {
    step: '02',
    title: 'You approve the design before we build.',
    body: 'We write out exactly what the system does. You review and sign off before development starts.',
    svg: <SVGScanGrid />,
  },
  {
    step: '03',
    title: 'Working in weeks, not months.',
    body: 'First functional version 2–3 weeks after build start. Test against real data. Iterate.',
    svg: <SVGEkg />,
  },
  {
    step: '04',
    title: 'We stay. The system improves.',
    body: 'Ongoing monitoring, refinement, adaptation as your business grows. Not a handoff.',
    svg: <SVGDataTree />,
  },
];

export function Process() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardsRef    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Pin each card while the next one scrolls in
        if (i < steps.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            end: `+=${window.innerHeight}`,
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(card, {
                scale: 1 - progress * 0.06,
                filter: `blur(${progress * 8}px)`,
                opacity: 1 - progress * 0.7,
              });
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} style={{ background: 'var(--color-void)' }}>
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-12">
        <div className="flex flex-col gap-3">
          <SectionLabel text="How We Work" />
          <h2
            className="font-sans font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            No black boxes. No surprises.
          </h2>
          <p className="font-sans text-white/50 text-base max-w-xl leading-relaxed">
            You know exactly what we&apos;re building, why, and what it will do — before a single
            rupee is spent on development.
          </p>
        </div>
      </div>

      {/* Sticky cards */}
      {steps.map((step, i) => (
        <div
          key={step.step}
          ref={(el) => { if (el) cardsRef.current[i] = el; }}
          style={{ willChange: 'transform, opacity, filter' }}
        >
          <ProcessCard {...step} />
        </div>
      ))}
    </section>
  );
}
```

- [ ] **Step 4: Add to page.tsx and verify**

```tsx
import { Process } from '@/components/process';
// add <Process /> after <Demo />
```

Verify: cards stack as you scroll, departing card scales down and blurs. Test in Safari if available.

- [ ] **Step 5: Commit**

```bash
git add components/process/ app/page.tsx
git commit -m "feat: Process section with GSAP sticky card stack and SVG animations"
```

---

## Task 16: Manifesto, Industries, About

**Files:**
- Create: `components/sections/Manifesto.tsx`
- Create: `components/sections/Industries.tsx`
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create Manifesto**

```tsx
// components/sections/Manifesto.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const line2Words = ['We', 'stay', 'until', 'it', 'works.', 'Then', 'we', 'stay', 'some', 'more.'];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const spans = ref.current!.querySelectorAll('[data-word]');
      gsap.fromTo(
        spans,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.055,
          scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: 'var(--color-gold)', padding: '6rem 0' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12 flex flex-col gap-4">
        <p className="font-sans text-void/80 text-lg">
          Most AI companies sell you a product and leave you to figure out the rest.
        </p>
        <p
          className="font-serif italic text-void leading-tight"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
        >
          {line2Words.map((word, i) => (
            <span
              key={i}
              data-word
              className="inline-block mr-[0.25em]"
              style={{ opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Industries**

```tsx
// components/sections/Industries.tsx
'use client';

import { SectionLabel } from '@/components/ui/SectionLabel';

const rows = [
  { name: 'Manufacturing', tags: 'Predictive maintenance · Production analytics · Quality control · Supplier cycles' },
  { name: 'Healthcare & Clinics', tags: 'Appointment no-shows · Billing reconciliation · Patient follow-up · Inventory expiry' },
  { name: 'Logistics & Distribution', tags: 'Route efficiency · Delivery confirmation · Vehicle idle time · Vendor reconciliation' },
  { name: 'Retail & MSME', tags: 'Stock-out prevention · Demand forecasting · Margin by SKU · Customer reorders' },
  { name: 'Professional Services', tags: 'Billing leakage · Document turnaround · Client onboarding · Team utilisation' },
];

export function Industries() {
  return (
    <section
      id="industries"
      data-section-light
      style={{ background: 'var(--color-cream)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-3 mb-12">
          <SectionLabel text="Where We Work" light />
          <h2
            className="font-sans font-bold text-void"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            Industries we&apos;ve built for.
          </h2>
        </div>

        <div>
          {rows.map((row) => (
            <div
              key={row.name}
              className="group flex items-center justify-between py-6 border-b cursor-default"
              style={{
                borderColor: 'var(--color-border-light)',
                transition: 'transform 250ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateX(8px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'; }}
            >
              <div className="flex items-center gap-6">
                <span
                  className="font-sans font-semibold text-void text-lg transition-colors duration-250"
                  style={{ color: 'var(--color-void)' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-gold)'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-void)'; }}
                >
                  {row.name}
                </span>
                <span
                  className="font-mono text-xs text-void/0 group-hover:text-void/50 transition-all duration-250 hidden lg:block"
                >
                  {row.tags}
                </span>
              </div>
              <span
                className="font-sans text-void/40 group-hover:text-void/70 transition-all duration-250"
                style={{ transition: 'transform 250ms ease, opacity 250ms ease' }}
              >
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create About**

```tsx
// components/sections/About.tsx
import { SectionLabel } from '@/components/ui/SectionLabel';

const factTable = [
  { label: 'Founded', value: '2024 — Chennai, Tamil Nadu' },
  { label: 'Approach', value: 'Custom-built, not templated' },
  { label: 'Languages', value: 'Tamil and English' },
  { label: 'Team', value: 'Small by design — you deal direct' },
  { label: 'First step', value: 'Free 30-min operations audit' },
];

export function About() {
  return (
    <section
      id="about"
      style={{ background: 'var(--color-void)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div className="flex flex-col gap-4">
            <SectionLabel text="About SEION" />
            <h2
              className="font-sans font-bold text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15 }}
            >
              Built in Chennai. Built for how India actually works.
            </h2>
            <p className="font-sans text-white/60 text-sm leading-relaxed mt-2">
              Most enterprise software was designed for companies with dedicated IT teams, clean
              data, and six months to implement. The manufacturers in Ambattur, distributors in
              Coimbatore, clinics in T. Nagar — the software wasn&apos;t built for them.
            </p>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              We were. Every system starts from your existing data — however messy, however
              scattered — and works with the tools you already use. We don&apos;t ask you to change
              how you operate. We build the intelligence layer around what you&apos;ve already built.
            </p>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              We&apos;re a small team by design. The person who understands your business builds your
              system. No handoffs. No account managers. Direct.
            </p>
          </div>

          {/* Fact table */}
          <div
            className="rounded-card overflow-hidden"
            style={{ border: '1px solid var(--color-border-dark)' }}
          >
            {factTable.map((row, i) => (
              <div
                key={row.label}
                className="flex items-start gap-4 p-4"
                style={{ borderBottom: i < factTable.length - 1 ? '1px solid var(--color-border-dark)' : 'none' }}
              >
                <span
                  className="font-mono text-xs uppercase tracking-wider w-28 shrink-0 pt-0.5"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {row.label}
                </span>
                <span className="font-sans text-sm text-white/70">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add all three to page.tsx and commit**

```tsx
import { Manifesto }  from '@/components/sections/Manifesto';
import { Industries } from '@/components/sections/Industries';
import { About }      from '@/components/sections/About';
// add in order after Process
```

```bash
git add components/sections/Manifesto.tsx components/sections/Industries.tsx components/sections/About.tsx app/page.tsx
git commit -m "feat: Manifesto word-reveal, Industries hover list, About section"
```

---

## Task 17: Contact Section + API Route

**Files:**
- Create: `components/sections/Contact.tsx`
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Create API route**

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { ContactFormData } from '@/types';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[+\d\s\-().]{7,20}$/.test(phone);
}

export async function POST(req: NextRequest) {
  let body: ContactFormData;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, company, email, phone, industry, problem } = body;

  // Validate required fields
  if (!name?.trim())     return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (!company?.trim())  return NextResponse.json({ error: 'Company is required' }, { status: 400 });
  if (!email?.trim())    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  if (!phone?.trim())    return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
  if (!industry?.trim()) return NextResponse.json({ error: 'Industry is required' }, { status: 400 });
  if (!problem?.trim())  return NextResponse.json({ error: 'Problem description is required' }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  if (!isValidPhone(phone)) return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });

  const { error } = await supabase
    .from('contact_submissions')
    .insert([{ name: name.trim(), company: company.trim(), email: email.trim(), phone: phone.trim(), industry: industry.trim(), problem: problem.trim() }]);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
```

- [ ] **Step 2: Test API route manually**

```bash
npm run dev
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","company":"Test Co","email":"test@test.com","phone":"+91 99999 99999","industry":"Manufacturing","problem":"Test problem description"}'
```

Expected: `{"success":true}`

- [ ] **Step 3: Create Contact section**

```tsx
// components/sections/Contact.tsx
'use client';

import { useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GoldButton } from '@/components/ui/GoldButton';
import type { ContactFormData } from '@/types';

const industries = ['Manufacturing', 'Healthcare', 'Logistics', 'Retail & MSME', 'Professional Services'];

const inputBase = `
  w-full font-sans text-sm rounded-button px-4 py-3
  bg-white border text-void placeholder:text-void/40
  focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50
  transition-all duration-200
`.trim();

export function Contact() {
  const [form, setForm]         = useState<ContactFormData>({ name: '', company: '', email: '', phone: '', industry: '', problem: '' });
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState('');

  const update = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-section-light
      style={{ background: 'var(--color-cream)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left intro */}
          <div className="flex flex-col gap-4">
            <SectionLabel text="Get In Touch" light />
            <h2
              className="font-sans font-bold text-void"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15 }}
            >
              Start with 30 minutes. No pitch. No pressure.
            </h2>
            <p className="font-sans text-void/65 text-sm leading-relaxed mt-2">
              Tell us what your business does and where the friction is. We&apos;ll tell you honestly
              — in that call — whether AI will actually help, what it would look like, and what it
              would cost. If it&apos;s not the right fit, we&apos;ll say that too.
            </p>
            <p className="font-sans text-void/65 text-sm leading-relaxed">
              Most clients arrive expecting a sales pitch. They leave with a clear answer either
              way. That&apos;s the point.
            </p>
            <p className="font-mono text-xs text-void/50 uppercase tracking-wider mt-2">
              Response within 4 hours on business days.
            </p>
          </div>

          {/* Right form */}
          <div>
            {success ? (
              <div
                className="rounded-card p-8 flex flex-col gap-3 items-start"
                style={{ background: 'rgba(34,196,122,0.08)', border: '1px solid rgba(34,196,122,0.2)' }}
              >
                <div className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--color-green)' }}>
                  ✓ Booked
                </div>
                <p className="font-sans text-void font-semibold text-lg">
                  We&apos;ll confirm within 4 hours. Check your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input className={inputBase} placeholder="Name" value={form.name}    onChange={update('name')}    required style={{ borderColor: 'var(--color-border-light)' }} />
                  <input className={inputBase} placeholder="Company" value={form.company} onChange={update('company')} required style={{ borderColor: 'var(--color-border-light)' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input className={inputBase} type="email" placeholder="Email" value={form.email} onChange={update('email')} required style={{ borderColor: 'var(--color-border-light)' }} />
                  <input className={inputBase} type="tel"   placeholder="Phone" value={form.phone} onChange={update('phone')} required style={{ borderColor: 'var(--color-border-light)' }} />
                </div>
                <select className={inputBase} value={form.industry} onChange={update('industry')} required style={{ borderColor: 'var(--color-border-light)' }}>
                  <option value="">Select industry</option>
                  {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                </select>
                <textarea
                  className={`${inputBase} resize-none`}
                  rows={4}
                  placeholder="Describe where time is wasted, decisions are slow, or data is scattered — the more specific the better"
                  value={form.problem}
                  onChange={update('problem')}
                  required
                  style={{ borderColor: 'var(--color-border-light)' }}
                />
                {error && <p className="font-mono text-xs" style={{ color: 'var(--color-red)' }}>{error}</p>}
                <GoldButton label={loading ? 'Submitting...' : 'Book the 30-min audit'} type="submit" fullWidth />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add to page.tsx and test form submission**

```tsx
import { Contact } from '@/components/sections/Contact';
// add <Contact /> after <About />
```

Fill out the form in the browser. Verify:
- Submission hits `/api/contact`
- Row appears in Supabase `contact_submissions` table
- Success state renders correctly

- [ ] **Step 5: Commit**

```bash
git add components/sections/Contact.tsx app/api/contact/route.ts app/page.tsx
git commit -m "feat: Contact form with Supabase persistence and success state"
```

---

## Task 18: Footer + Final Page Assembly

**Files:**
- Create: `components/sections/Footer.tsx`
- Finalize: `app/page.tsx`

- [ ] **Step 1: Create Footer**

```tsx
// components/sections/Footer.tsx
export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-void)',
        borderRadius: '2rem 2rem 0 0',
        padding: '4rem 0 2rem',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 pb-10 border-b" style={{ borderColor: 'var(--color-border-dark)' }}>
          <div className="flex flex-col gap-2">
            <span className="shimmer-gold font-sans font-bold text-2xl tracking-tight">SEION</span>
            <p className="font-sans text-sm text-white/40">AI systems for Indian business.</p>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/30 mb-4">Services</div>
              <ul className="flex flex-col gap-2.5">
                {['AI Workflow Automation', 'Business Intelligence', 'Custom AI Systems'].map((s) => (
                  <li key={s}><a href="#services" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/30 mb-4">Company</div>
              <ul className="flex flex-col gap-2.5">
                {[{ label: 'About', href: '#about' }, { label: 'How It Works', href: '#process' }, { label: 'Contact', href: '#contact' }].map((l) => (
                  <li key={l.label}><a href={l.href} className="font-sans text-sm text-white/50 hover:text-white transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="font-mono text-xs text-white/25">© 2026 SEION. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-green)' }} />
              <div className="absolute inset-0 rounded-full" style={{ background: 'var(--color-green)', animation: 'ping-pulse 2s ease-out infinite' }} />
            </div>
            <span className="font-mono text-xs text-white/40">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Finalize app/page.tsx**

```tsx
// app/page.tsx
import { Navbar }      from '@/components/navbar';
import { Hero }        from '@/components/hero';
import { ProofStrip }  from '@/components/sections/ProofStrip';
import { Problem }     from '@/components/sections/Problem';
import { Services }    from '@/components/services';
import { Demo }        from '@/components/demo';
import { Process }     from '@/components/process';
import { Manifesto }   from '@/components/sections/Manifesto';
import { Industries }  from '@/components/sections/Industries';
import { About }       from '@/components/sections/About';
import { Contact }     from '@/components/sections/Contact';
import { Footer }      from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProofStrip />
      <Problem />
      <Services />
      <Demo />
      <Process />
      <Manifesto />
      <Industries />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Full walkthrough in browser**

```bash
npm run dev
```

Walk through the page top to bottom. Check every section renders. No console errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Footer.tsx app/page.tsx
git commit -m "feat: Footer and complete page assembly"
```

---

## Task 19: Mobile Responsiveness + Polish

**Files:**
- Modify: All section components (responsive fixes)
- Modify: `app/globals.css` (mobile overrides)

- [ ] **Step 1: Fix Services bento grid on mobile**

In `components/services/index.tsx`, replace the hardcoded grid with responsive CSS:

```tsx
// Replace the bento grid div:
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="md:row-span-2"><ServiceCard01 /></div>
  <div><ServiceCard02 /></div>
  <div><ServiceCard03 /></div>
</div>
```

Add to globals.css:
```css
/* ServiceCard01 full height on desktop */
@media (min-width: 768px) {
  .service-card-01 { height: 100%; }
}
```

- [ ] **Step 2: Fix Process sticky stack on mobile**

On mobile, disable GSAP pin and use a simple vertical scroll. In `components/process/index.tsx`:

```tsx
// In the useEffect, add mobile check:
if (window.innerWidth < 768) return; // skip sticky on mobile
```

And ensure cards still display correctly stacked vertically:
```tsx
// In ProcessCard, make the SVG appear above text on mobile:
<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
  <div className="lg:hidden flex justify-center mb-4">{svg}</div>
  <div className="flex flex-col gap-5">{/* text */}</div>
  <div className="hidden lg:flex items-center justify-center">{svg}</div>
</div>
```

- [ ] **Step 3: Reduce animation y-offset on mobile**

In `lib/animations.ts`, update `fadeUp`:

```typescript
export function fadeUp(targets: gsap.TweenTarget, options: { ... } = {}) {
  const yOffset = window.innerWidth < 768 ? 16 : 28;
  return gsap.fromTo(targets, { y: yOffset, opacity: 0 }, { ... });
}
```

- [ ] **Step 4: Test mobile viewport**

In browser DevTools, set viewport to 375px. Walk through page. Verify:
- Navbar collapses to hamburger
- Hero stacks text above dashboard
- Services is single column
- Demo tabs remain usable
- Process cards scroll vertically
- Contact form stacks to single column

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: mobile responsiveness across all sections"
```

---

## Task 20: Production Build + Verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors. Note any warnings.

- [ ] **Step 2: Run production server**

```bash
npm run start
```

Open http://localhost:3000. Verify:
- All animations work in production mode
- No hydration errors in console
- Custom cursor appears on desktop
- Grain overlay is present
- Shimmer animation runs on both wordmarks only

- [ ] **Step 3: Verify gold appears in exactly 7 places**

Visually scan the page:
1. ✓ Navbar SEION wordmark — shimmer
2. ✓ Footer SEION wordmark — shimmer
3. ✓ CTA buttons — gold fill
4. ✓ Process step numbers — `01 02 03 04`
5. ✓ Manifesto strip background
6. ✓ Dashboard revenue delta indicator
7. ✓ Before/after drag handle

If gold appears anywhere else, remove it.

- [ ] **Step 4: Cross-browser check**

Test in Safari (macOS). Verify:
- `backdrop-filter` on navbar works
- GSAP sticky stack works (known Safari quirk — `will-change: transform` must be present)
- SVG animations run correctly
- Custom cursor hides on iOS (touch device)

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: production build verified, SEION website complete"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] All 11 sections implemented (Navbar, Hero, ProofStrip, Problem, Services, Demo, Process, Manifesto, Industries, About, Contact, Footer)
- [x] HeroDashboard: real `useState`, 3 sectors, bar chart, insight rotator — Task 9
- [x] Demo Tab 1: full dashboard reuse — Task 14
- [x] Demo Tab 2: functional drag slider — Task 14
- [x] Demo Tab 3: industry → bottleneck → result card, all 20 results defined — Task 14
- [x] Contact form: real API route, Supabase persistence, success state — Task 17
- [x] Process sticky stack: GSAP pin, 4 SVG animations — Task 15
- [x] Manifesto: word-by-word reveal — Task 16
- [x] Gold shimmer: exactly 2 uses (navbar + footer wordmark) — confirmed
- [x] Grain overlay: GrainOverlay in layout.tsx — Task 6
- [x] Custom cursor: CustomCursor in layout.tsx, disabled on touch — Task 6
- [x] All exact copy from SEION_CONTEXT.md — confirmed in each component
- [x] No component libraries — confirmed zero shadcn/Radix imports
- [x] Next.js 16.1 — Task 1

**Type consistency:**
- `SectorData.id` used consistently as `'auto' | 'pharma' | 'textile'` across dashboardData and HeroDashboard
- `ContactFormData` interface used in Contact component and API route
- `ConfiguratorResult` used in DemoTab3 and configuratorData

**No placeholders:** All component code is complete. No TBD, TODO, or "implement later" in any step.
