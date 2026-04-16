'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GoldButton } from '@/components/ui/GoldButton';

export function HeroText() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('[data-hero-eyebrow]', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo('[data-hero-title]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
        .fromTo('[data-hero-body]', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo('[data-hero-ctas]', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="flex flex-col" style={{ paddingRight: '24px' }}>
      {/* Eyebrow */}
      <div
        data-hero-eyebrow
        className="font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-3"
        style={{ color: 'var(--color-teal)', marginBottom: '24px', opacity: 0 }}
      >
        <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--color-teal)' }} />
        AI Systems Company — Chennai, India
      </div>

      {/* Main headline */}
      <h1
        data-hero-title
        className="font-serif"
        style={{
          fontSize: 'clamp(52px, 5.5vw, 76px)',
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: 'var(--color-void)',
          marginBottom: '28px',
          opacity: 0,
        }}
      >
        AI systems built<br />
        for how{' '}
        <em style={{ fontStyle: 'italic', color: 'var(--color-teal)' }}>
          India actually works
        </em>
      </h1>

      {/* Body */}
      <p
        data-hero-body
        className="font-sans"
        style={{
          fontSize: '16px',
          fontWeight: 300,
          color: 'var(--color-ink-2)',
          lineHeight: 1.75,
          maxWidth: '440px',
          marginBottom: '40px',
          opacity: 0,
        }}
      >
        We design and build custom AI systems — automation workflows, intelligence
        dashboards, and decision-support tools — made specifically for Indian businesses
        and the operational realities they face.
      </p>

      {/* CTAs */}
      <div data-hero-ctas className="flex items-center gap-5 flex-wrap" style={{ opacity: 0 }}>
        <GoldButton label="Start a conversation" href="#contact" />
        <a href="#services" className="btn-ghost-ink">
          See what we build
        </a>
      </div>
    </div>
  );
}
