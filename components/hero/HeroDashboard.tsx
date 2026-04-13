'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { dashboardData, getSectorById } from '@/lib/dashboardData';
import type { SectorData } from '@/types';
import gsap from 'gsap';

interface HeroDashboardProps {
  compact?: boolean;
}

export function HeroDashboard({ compact = false }: HeroDashboardProps) {
  const [activeSector, setActiveSector] = useState<SectorData['id']>('auto');
  const [data, setData]                 = useState(() => getSectorById('auto'));
  const [insightIndex, setInsightIndex] = useState(0);
  const [insightVisible, setInsightVisible] = useState(true);
  const barsRef = useRef<HTMLDivElement>(null);

  const animateBars = useCallback(() => {
    if (!barsRef.current) return;
    const bars = barsRef.current.querySelectorAll('[data-bar]');
    gsap.fromTo(
      bars,
      { scaleY: 0, transformOrigin: 'bottom' },
      { scaleY: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06 }
    );
  }, []);

  const switchSector = (id: SectorData['id']) => {
    setActiveSector(id);
    setTimeout(() => {
      setData(getSectorById(id));
      setInsightIndex(0);
      animateBars();
    }, 150);
  };

  useEffect(() => { animateBars(); }, [animateBars]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInsightVisible(false);
      setTimeout(() => {
        setInsightIndex((i) => (i + 1) % data.insights.length);
        setInsightVisible(true);
      }, 200);
    }, 4000);
    return () => clearInterval(interval);
  }, [data.insights.length]);

  return (
    <div
      className="rounded-card bg-surface border w-full"
      style={{ borderColor: 'var(--color-border-dark)', padding: compact ? '1.25rem' : '1.5rem' }}
    >
      {/* Sector tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {dashboardData.map((sector) => (
          <button
            key={sector.id}
            onClick={() => switchSector(sector.id)}
            className="font-mono text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded-md transition-all duration-200"
            style={{
              background:   activeSector === sector.id ? 'rgba(212,149,42,0.15)' : 'transparent',
              color:        activeSector === sector.id ? 'var(--color-gold)' : 'rgba(255,255,255,0.4)',
              border:       activeSector === sector.id ? '1px solid rgba(212,149,42,0.3)' : '1px solid transparent',
            }}
          >
            {sector.label}
          </button>
        ))}
      </div>

      {/* Stat cards */}
      <div
        className="grid grid-cols-2 gap-2 mb-4"
        style={{ transition: 'opacity 200ms', opacity: insightVisible ? 1 : 0.6 }}
      >
        {data.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-3"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/40 mb-1">
              {stat.label}
            </div>
            <div className="font-sans font-bold text-white text-lg leading-none">
              {stat.value}
            </div>
            {stat.delta && (
              <div
                className="font-mono text-[0.65rem] mt-1"
                style={{
                  color: stat.deltaType === 'positive'
                    ? 'var(--color-green)'
                    : stat.deltaType === 'negative'
                    ? 'var(--color-red)'
                    : 'rgba(255,255,255,0.4)',
                }}
              >
                {stat.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div
        ref={barsRef}
        className="flex items-end gap-1.5 mb-4"
        style={{ height: compact ? 60 : 80 }}
      >
        {data.chartData.map((bar) => (
          <div key={bar.month} className="flex-1 flex flex-col items-center gap-1">
            <div
              data-bar
              className="w-full rounded-sm"
              style={{
                height: `${bar.value}%`,
                background: 'rgba(212,149,42,0.6)',
                transformOrigin: 'bottom',
                maxHeight: compact ? 48 : 64,
              }}
            />
            <span className="font-mono text-[0.55rem] text-white/30">{bar.month}</span>
          </div>
        ))}
      </div>

      {/* AI insight */}
      <div
        className="rounded-lg p-3 flex items-start gap-2.5"
        style={{
          background: 'rgba(34,196,122,0.06)',
          border: '1px solid rgba(34,196,122,0.12)',
          transition: 'opacity 200ms',
          opacity: insightVisible ? 1 : 0,
        }}
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-green)' }} />
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'var(--color-green)', animation: 'ping-pulse 2s ease-out infinite' }}
          />
        </div>
        <p className="font-mono text-[0.65rem] text-white/70 leading-relaxed">
          {data.insights[insightIndex]}
        </p>
      </div>
    </div>
  );
}
