// components/sections/Manifesto.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const line2Words = ['We', 'stay', 'until', 'it', 'works.', 'Then', 'we', 'stay', 'some', 'more.'];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const spans = ref.current!.querySelectorAll('[data-word]');
      gsap.fromTo(
        spans,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.055,
          scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: 'var(--color-gold)', padding: '6rem 0' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12 flex flex-col gap-4">
        <p className="font-sans text-void/80 text-lg">
          Most AI companies sell you a product and leave you to figure out the rest.
        </p>
        <p
          className="font-serif italic text-void leading-tight"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
        >
          {line2Words.map((word, i) => (
            <span
              key={i}
              data-word
              className="inline-block mr-[0.25em]"
              style={{ opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
