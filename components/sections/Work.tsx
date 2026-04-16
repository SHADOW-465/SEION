// components/sections/Work.tsx
'use client';

import { useEffect, useRef } from 'react';
import { staggerFadeUp } from '@/lib/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/ui/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    tag: 'Workflow Automation',
    client: 'Auto Components Manufacturer',
    location: 'Chennai',
    problem: 'Month-end financial report took 14 manual hours every cycle. Two staff members spent full days compiling data from Tally, bank statements, and delivery records.',
    built: 'Automated data pipeline connecting Tally, bank statements, and delivery records. Report auto-generated and emailed by 9AM on the 1st of every month.',
    result: '14 hours → 0. Two staff reassigned to customer-facing work.',
    metric: '14 hrs → 0',
    metricLabel: 'reporting time',
  },
  {
    tag: 'Business Intelligence',
    client: 'Pharma Distributor',
    location: 'Coimbatore',
    problem: 'Stockouts were discovered only after customer calls. No real-time visibility into inventory across 3 warehouses. Fulfilment rate was declining.',
    built: 'Real-time dashboard unifying WhatsApp orders, Tally stock records, and supplier lead times. Automated alerts for category-level threshold breaches.',
    result: 'Stockout incidents down 60%. Order fulfilment rate improved from 78% to 94% in first quarter.',
    metric: '78% → 94%',
    metricLabel: 'order fulfilment',
  },
  {
    tag: 'Custom AI System',
    client: 'Multi-Specialty Clinic',
    location: 'T. Nagar, Chennai',
    problem: '28% appointment no-show rate was costing the clinic 6–8 billable hours per day. Billing follow-ups were handled manually by one staff member, full-time.',
    built: 'WhatsApp-based appointment reminder system with AI-driven timing personalised per patient. Automated billing status messages with payment link integration.',
    result: 'No-show rate reduced from 28% to 9%. Billing staff time freed by 80%.',
    metric: '28% → 9%',
    metricLabel: 'no-show rate',
  },
];

export function Work() {
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
      id="work"
      ref={ref}
      style={{ background: 'var(--color-surface-light)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div data-fade>
          <SectionLabel text="Work" light />
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(36px, 4vw, 52px)',
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: 'var(--color-void)',
              marginBottom: '16px',
            }}
          >
            Systems we&apos;ve built.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-teal)' }}>Problems we&apos;ve solved.</em>
          </h2>
          <p
            className="font-sans"
            style={{ fontSize: '16px', fontWeight: 300, color: 'var(--color-ink-2)', maxWidth: '560px', lineHeight: 1.75, marginBottom: '64px' }}
          >
            Three engagements. Real clients. Anonymised by request.
          </p>
        </div>

        <div className="flex flex-col" style={{ gap: '2px', background: 'var(--color-border)' }} data-fade>
          {cases.map((c, i) => (
            <div
              key={i}
              className="grid lg:grid-cols-[1fr_1fr_240px] gap-0"
              style={{ background: 'var(--color-card)' }}
            >
              {/* Left: context */}
              <div style={{ padding: '40px', borderRight: '1px solid var(--color-border)' }}>
                <div className="font-mono text-[9px] uppercase tracking-[0.14em] mb-4" style={{ color: 'var(--color-teal)' }}>{c.tag}</div>
                <div className="font-serif mb-1" style={{ fontSize: '20px', fontWeight: 400, color: 'var(--color-void)' }}>{c.client}</div>
                <div className="font-mono text-xs mb-6" style={{ color: 'var(--color-ink-3)' }}>{c.location}</div>
                <p className="font-sans text-sm leading-relaxed" style={{ fontWeight: 300, color: 'var(--color-ink-2)', lineHeight: 1.7 }}>
                  <span className="font-medium" style={{ color: 'var(--color-void)' }}>Problem: </span>
                  {c.problem}
                </p>
              </div>

              {/* Middle: what was built */}
              <div style={{ padding: '40px', borderRight: '1px solid var(--color-border)' }}>
                <div className="font-mono text-[9px] uppercase tracking-[0.14em] mb-4" style={{ color: 'var(--color-ink-3)' }}>What We Built</div>
                <p className="font-sans text-sm leading-relaxed mb-6" style={{ fontWeight: 300, color: 'var(--color-ink-2)', lineHeight: 1.7 }}>{c.built}</p>
                <p className="font-sans text-sm" style={{ fontWeight: 300, color: 'var(--color-ink-2)' }}>
                  <span className="font-medium" style={{ color: 'var(--color-teal)' }}>Result: </span>
                  {c.result}
                </p>
              </div>

              {/* Right: metric */}
              <div className="flex flex-col justify-center items-center text-center" style={{ padding: '40px' }}>
                <div className="font-serif" style={{ fontSize: '36px', fontWeight: 300, color: 'var(--color-teal)', lineHeight: 1 }}>{c.metric}</div>
                <div className="font-mono text-[9px] uppercase tracking-wider mt-2" style={{ color: 'var(--color-ink-3)' }}>{c.metricLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
