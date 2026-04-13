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
                <span ref={(el: HTMLSpanElement | null) => { counterRefs.current[i] = el; }}>0</span>
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
