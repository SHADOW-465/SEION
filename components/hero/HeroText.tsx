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
      <div data-hero-overline>
        <SectionLabel text="AI Systems · Chennai, India" />
      </div>

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

      <p
        data-hero-body
        className="font-sans text-white/60 text-base leading-relaxed"
        style={{ maxWidth: 480 }}
      >
        Custom AI systems for Indian businesses — automation workflows, live dashboards,
        and decision tools built around the data you already have.
      </p>

      <div data-hero-ctas className="flex flex-wrap items-center gap-4">
        <GoldButton label="Book a free 30-min audit" href="#contact" />
        <a
          href="#demo"
          className="font-sans font-medium text-sm text-white/60 hover:text-white transition-colors hover:-translate-y-px inline-flex items-center gap-1.5"
        >
          See a live demo <span>↓</span>
        </a>
      </div>
    </div>
  );
}
