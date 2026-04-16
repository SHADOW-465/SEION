'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HeroText } from './HeroText';

const stats = [
  { num: '22+', label: 'AI systems delivered across manufacturing, logistics, and services' },
  { num: '5+',  label: 'Industries actively running SEION-built automation' },
  { num: '₹0',  label: 'Upfront cost for a 30-minute operations audit of your business' },
];

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current!.querySelectorAll('[data-stat]'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12, delay: 0.5 }
      );
    }, statsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '0 48px',
        paddingTop: '80px',
        alignItems: 'center',
        gap: '80px',
        background: 'var(--color-cream)',
      }}
      className="max-md:grid-cols-1 max-md:px-6 max-md:gap-10 max-md:pb-16 max-md:min-h-0"
    >
      {/* Left: text */}
      <HeroText />

      {/* Right: stat blocks */}
      <div ref={statsRef} className="flex flex-col" style={{ gap: '2px' }}>
        {stats.map((s, i) => (
          <div
            key={i}
            data-stat
            className="group"
            style={{
              padding: '28px 32px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-card)',
              boxShadow: '0 2px 16px var(--color-card-shadow)',
              transition: 'background 0.2s, border-color 0.2s',
              opacity: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-card)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-teal)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-card)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
            }}
          >
            <div
              className="font-serif"
              style={{ fontSize: '52px', fontWeight: 300, color: 'var(--color-teal)', lineHeight: 1, marginBottom: '4px' }}
            >
              {s.num}
            </div>
            <div
              className="font-sans"
              style={{ fontSize: '13px', color: 'var(--color-ink-2)', fontWeight: 300, letterSpacing: '0.02em' }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
