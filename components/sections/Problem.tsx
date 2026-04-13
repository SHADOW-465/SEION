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
