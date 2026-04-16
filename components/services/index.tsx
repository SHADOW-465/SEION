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
      style={{ background: 'var(--color-cream)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div data-fade>
          <SectionLabel text="What We Build" light />
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
            We study how your business runs.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-teal)' }}>
              Then we build the system it needs.
            </em>
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: '16px',
              fontWeight: 300,
              color: 'var(--color-ink-2)',
              maxWidth: '560px',
              lineHeight: 1.75,
              marginBottom: '64px',
            }}
          >
            We do not offer everything. We focus on three types of AI systems that
            create the most measurable impact — and we build each one with precision.
          </p>
        </div>

        {/* 3-column equal grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: 'var(--color-border)' }}
          data-fade
        >
          <ServiceCard01 />
          <ServiceCard02 />
          <ServiceCard03 />
        </div>
      </div>
    </section>
  );
}
