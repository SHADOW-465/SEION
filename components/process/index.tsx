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
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.innerWidth < 768) return; // skip sticky on mobile

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
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
