// components/demo/DemoTab2.tsx
'use client';

import { useRef, useState, useCallback } from 'react';

export function DemoTab2() {
  const [pct, setPct]             = useState(50);
  const [dragging, setDragging]   = useState(false);
  const containerRef              = useRef<HTMLDivElement>(null);

  const updatePct = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const raw  = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(5, Math.min(95, raw)));
  }, []);

  const onMouseMove = (e: React.MouseEvent) => { if (dragging) updatePct(e.clientX); };
  const onTouchMove = (e: React.TouchEvent) => { if (dragging) updatePct(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="relative rounded-card overflow-hidden select-none"
      style={{ height: 400, cursor: 'col-resize' }}
      onMouseMove={onMouseMove}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={onTouchMove}
      onTouchEnd={() => setDragging(false)}
    >
      {/* Before panel (left) */}
      <div
        className="absolute inset-0 flex flex-col justify-center px-10 gap-4"
        style={{ background: 'rgba(26,10,10,0.95)', borderRight: '1px solid rgba(224,64,64,0.2)' }}
      >
        <div className="font-mono text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--color-red)', opacity: 0.7 }}>
          Before SEION
        </div>
        {[
          { label: 'Unanswered messages', value: '14' },
          { label: 'Avg response time', value: '4.2 hrs' },
          { label: 'Monthly report', value: '❌ Manual — 14 hrs' },
          { label: 'Pending follow-ups', value: '23' },
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-center">
            <span className="font-sans text-xs text-white/50">{row.label}</span>
            <span className="font-mono text-xs" style={{ color: 'var(--color-red)' }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* After panel (right), clipped */}
      <div
        className="absolute inset-0 flex flex-col justify-center px-10 gap-4"
        style={{
          background: 'rgba(10,26,15,0.95)',
          clipPath: `inset(0 ${100 - pct}% 0 0)`,
        }}
      >
        <div className="font-mono text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--color-green)', opacity: 0.7 }}>
          After SEION
        </div>
        {[
          { label: 'Auto-replies sent in', value: '52 seconds' },
          { label: 'Invoice auto-sent', value: '✓ On approval' },
          { label: 'Report auto-generated', value: '✓ 9AM on 1st' },
          { label: 'Pending messages', value: '0' },
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-center">
            <span className="font-sans text-xs text-white/50">{row.label}</span>
            <span className="font-mono text-xs" style={{ color: 'var(--color-green)' }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center"
        style={{ left: `${pct}%`, transform: 'translateX(-50%)', zIndex: 10 }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-col-resize select-none"
          style={{
            background: 'var(--color-gold)',
            boxShadow: '0 0 0 3px rgba(212,149,42,0.3)',
            fontSize: '1rem',
            color: 'var(--color-void)',
            fontWeight: 700,
          }}
        >
          ⟺
        </div>
        <div className="absolute top-0 bottom-0 w-px" style={{ background: 'rgba(212,149,42,0.4)' }} />
      </div>
    </div>
  );
}
