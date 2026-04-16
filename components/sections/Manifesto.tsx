// components/sections/Manifesto.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const parts = ref.current!.querySelectorAll('[data-reveal]');
      gsap.fromTo(
        parts,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 65%',
            once: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--color-teal)', padding: '10rem 0' }}
    >
      {/* Background texture decor */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 flex flex-col gap-12 relative z-10">
        <div data-reveal className="flex flex-col gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.5)' }}>Our Philosophy</span>
          <p className="font-sans text-xl md:text-2xl max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Most AI companies focus on selling you a tool and leaving you to train your people.
          </p>
        </div>

        <div data-reveal className="flex flex-col gap-2">
          <p className="font-sans text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>We focus on:</p>
          <h2
            className="font-serif italic leading-[1.05]"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'rgba(255,255,255,0.95)' }}
          >
            Building the <em style={{ color: 'rgba(255,255,255,0.95)' }}>Intelligence</em> that runs your business while you sleep.
          </h2>
        </div>
      </div>
    </section>
  );
}
