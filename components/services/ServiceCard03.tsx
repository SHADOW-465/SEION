// components/services/ServiceCard03.tsx
'use client';

import { useRef } from 'react';

const tags = ['Predictive maintenance', 'IoT integration', 'Scheduling AI', 'Industry-specific'];

export function ServiceCard03() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative bg-white rounded-card p-8 flex flex-col justify-between overflow-hidden group"
      style={{ border: '1px solid var(--color-border-light)', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(400px at var(--mx,50%) var(--my,50%), rgba(212,149,42,0.12), transparent)' }}
      />
      {/* Accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[380ms]"
        style={{ background: 'var(--color-gold)', transitionTimingFunction: 'var(--ease-morph)' }}
      />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="font-mono text-xs text-void/40 uppercase tracking-wider">03</div>
        <h3 className="font-sans font-bold text-void text-xl leading-tight">
          Custom AI Systems
        </h3>
        <p className="font-sans font-bold text-void/80 text-sm">
          The problem no software was built for.
        </p>
        <p className="font-sans text-void/65 text-sm leading-relaxed">
          Your factory&apos;s specific failure pattern. Your clinic&apos;s scheduling complexity.
          Your warehouse&apos;s demand cycle. We build the system for your exact problem — not a
          generic tool you have to adapt to.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 relative z-10">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[0.65rem] uppercase tracking-wider text-void/50 px-2.5 py-1 rounded-md"
            style={{ background: 'rgba(12,12,14,0.06)', border: '1px solid rgba(12,12,14,0.08)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
