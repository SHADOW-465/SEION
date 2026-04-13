// components/services/ServiceCard01.tsx
'use client';

import { useRef } from 'react';

const tags = ['Invoice automation', 'WhatsApp workflows', 'Document processing', 'Report generation'];

export function ServiceCard01() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative bg-white rounded-card p-8 flex flex-col justify-between overflow-hidden group h-full"
      style={{
        border: '1px solid var(--color-border-light)',
        boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
      }}
    >
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(400px at var(--mx, 50%) var(--my, 50%), rgba(212,149,42,0.12), transparent)',
        }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[380ms]"
        style={{ background: 'var(--color-gold)', transitionTimingFunction: 'var(--ease-morph)' }}
      />

      <div className="flex flex-col gap-5 relative z-10">
        <div className="font-mono text-xs text-void/40 uppercase tracking-wider">01</div>
        <h3 className="font-sans font-bold text-void text-2xl leading-tight">
          AI Workflow Automation
        </h3>
        <p className="font-sans font-bold text-void/80 text-base">The 14-hour problem.</p>
        <p className="font-sans text-void/65 text-sm leading-relaxed">
          Every week, someone in your business spends 10–20 hours doing things a computer could
          do in seconds. Invoice follow-ups. Customer status messages. Monthly reports. Data entry
          between systems. We map every manual step. Then we build the system that handles it —
          so your people handle the work that actually needs a person.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 relative z-10">
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
