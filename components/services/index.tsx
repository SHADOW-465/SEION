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
      data-section-light
      style={{ background: 'var(--color-cream)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-3 mb-12" data-fade>
          <SectionLabel text="What We Build" light />
          <h2
            className="font-sans font-bold text-void"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            Three problems. Solved properly.
          </h2>
          <p className="font-sans text-void/65 text-base max-w-xl leading-relaxed">
            Not six. Not twelve. Three types of AI systems that create measurable impact — and
            we build each one as if it&apos;s the only thing we do.
          </p>
        </div>

        {/* Bento grid — responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:row-span-2" data-fade><ServiceCard01 /></div>
          <div data-fade><ServiceCard02 /></div>
          <div data-fade><ServiceCard03 /></div>
        </div>
      </div>
    </section>
  );
}
