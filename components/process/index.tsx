// components/process/index.tsx
'use client';

import { useEffect, useRef } from 'react';
import { staggerFadeUp } from '@/lib/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SVGRings } from './SVGRings';
import { SVGScanGrid } from './SVGScanGrid';
import { SVGEkg } from './SVGEkg';
import { SVGDataTree } from './SVGDataTree';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: 'Step 01',
    title: 'Operations audit',
    body: 'Before writing a single line of code, we spend time inside your business. We map how it actually runs — not how you describe it on paper, but what happens on the ground. Where time is lost. Where decisions are made slowly.',
    svg: <SVGRings />,
  },
  {
    step: 'Step 02',
    title: 'System design',
    body: 'We design the AI system architecture before building anything. What gets automated, what gets measured, what decisions the system makes. You approve the design before a single rupee is spent on development.',
    svg: <SVGScanGrid />,
  },
  {
    step: 'Step 03',
    title: 'Build and calibrate',
    body: 'We build in iterations. The first version works within 2–3 weeks. Then we calibrate against real usage — adjusting what the system does based on what your business actually needs.',
    svg: <SVGEkg />,
  },
  {
    step: 'Step 04',
    title: 'Ongoing operation',
    body: 'An AI system that no one monitors stops working. We provide ongoing monitoring and refinement — ensuring the system continues to improve as your business grows and changes.',
    svg: <SVGDataTree />,
  },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      staggerFadeUp(ref.current!.querySelectorAll('[data-fade]'), { start: 'top 85%' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={ref}
      style={{ background: 'var(--color-void)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div data-fade>
          <SectionLabel text="How We Work" light={false} />
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(36px, 4vw, 52px)',
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: 'rgba(255,255,255,0.92)',
              marginBottom: '16px',
            }}
          >
            A deliberate process.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-teal-light)' }}>Not a template.</em>
          </h2>
          <p
            className="font-sans"
            style={{ fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: '560px', lineHeight: 1.75, marginBottom: '64px' }}
          >
            Every AI system we build starts with deep understanding of your specific operations.
            We do not apply generic solutions to specific problems.
          </p>
        </div>

        {/* 2×2 grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: 'rgba(255,255,255,0.08)' }}
          data-fade
        >
          {steps.map((s) => (
            <div
              key={s.step}
              className="flex flex-col gap-8"
              style={{
                background: 'var(--color-void)',
                padding: '48px 40px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#161614'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-void)'; }}
            >
              <div className="flex flex-col gap-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--color-teal-2)' }}>{s.step}</div>
                <h3 className="font-serif" style={{ fontSize: '24px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>{s.title}</h3>
                <p className="font-sans text-sm" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{s.body}</p>
              </div>
              <div className="flex justify-center opacity-70">{s.svg}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
