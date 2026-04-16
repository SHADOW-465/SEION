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
      style={{ background: 'var(--color-cream)', padding: '7rem 0' }}
    >
      <div
        ref={ref}
        className="max-w-[720px] mx-auto px-6 lg:px-12 flex flex-col gap-8"
      >
        <div
          data-fade
          style={{ borderLeft: '3px solid var(--color-teal)', paddingLeft: '32px' }}
        >
          <p
            className="font-sans text-base leading-[1.85] lg:text-lg"
            style={{ color: 'var(--color-ink-2)', fontWeight: 400 }}
          >
            Most Indian businesses are drowning in data they can&apos;t read. Scattered across
            Tally, WhatsApp, handwritten registers, and decade-old Excel files — your data
            exists. But nobody has time to read it, let alone act on it. Every decision still
            runs on memory and instinct. Every month-end report costs 14 hours of manual work.
            Every growth opportunity gets missed because nobody saw it coming.
          </p>
        </div>
        <p
          data-fade
          className="font-serif italic"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.2, color: 'var(--color-void)', fontWeight: 400 }}
        >
          We built SEION to end that.
        </p>
      </div>
    </section>
  );
}
