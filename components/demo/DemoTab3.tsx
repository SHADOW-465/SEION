// components/demo/DemoTab3.tsx
'use client';

import { useState } from 'react';
import { industries, getBottlenecksByIndustry, getResult } from '@/lib/configuratorData';
import { GoldButton } from '@/components/ui/GoldButton';

type Step = 1 | 2 | 3;

export function DemoTab3() {
  const [step, setStep]               = useState<Step>(1);
  const [industry, setIndustry]       = useState('');
  const [bottleneck, setBottleneck]   = useState('');

  const result = bottleneck ? getResult(bottleneck) : null;

  const selectIndustry = (id: string) => {
    setIndustry(id);
    setBottleneck('');
    setStep(2);
  };

  const selectBottleneck = (id: string) => {
    setBottleneck(id);
    setStep(3);
  };

  const chipBase = 'font-sans font-medium text-sm px-5 py-3 rounded-button transition-all duration-200 cursor-pointer border';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicators */}
      <div className="flex items-center gap-3 mb-8">
        {([1, 2, 3] as Step[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[0.65rem]"
              style={{
                background: step >= s ? 'var(--color-gold)' : 'rgba(255,255,255,0.08)',
                color: step >= s ? 'var(--color-void)' : 'rgba(255,255,255,0.3)',
              }}
            >
              {s}
            </div>
            {s < 3 && <div className="w-8 h-px" style={{ background: step > s ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)' }} />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div style={{ animation: 'fadeSlideIn 250ms ease forwards' }}>
          <p className="font-sans font-semibold text-white mb-4">Select your industry</p>
          <div className="flex flex-wrap gap-3">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => selectIndustry(ind.id)}
                className={chipBase}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor = 'var(--color-gold)';
                  (e.target as HTMLElement).style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                }}
              >
                {ind.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div style={{ animation: 'fadeSlideIn 250ms ease forwards' }}>
          <p className="font-sans font-semibold text-white mb-4">What&apos;s your biggest bottleneck?</p>
          <div className="flex flex-wrap gap-3">
            {getBottlenecksByIndustry(industry).map((b) => (
              <button
                key={b.id}
                onClick={() => selectBottleneck(b.id)}
                className={chipBase}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor = 'var(--color-gold)';
                  (e.target as HTMLElement).style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
          <button className="mt-4 font-mono text-xs text-white/40 hover:text-white/70" onClick={() => setStep(1)}>
            ← Change industry
          </button>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && result && (
        <div style={{ animation: 'fadeSlideIn 250ms ease forwards' }}>
          <div
            className="rounded-card p-6 flex flex-col gap-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-wider mb-1">Your System</div>
              <h3 className="font-sans font-bold text-white text-xl">{result.systemName}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/40 mb-2">What it monitors</div>
                <ul className="flex flex-col gap-1.5">
                  {result.monitors.map((m) => (
                    <li key={m} className="font-sans text-xs text-white/70 flex items-start gap-1.5">
                      <span style={{ color: 'var(--color-green)' }}>✓</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/40 mb-2">What it automates</div>
                <ul className="flex flex-col gap-1.5">
                  {result.automates.map((a) => (
                    <li key={a} className="font-sans text-xs text-white/70 flex items-start gap-1.5">
                      <span style={{ color: 'var(--color-green)' }}>✓</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/40">Hours saved / week</div>
                <div className="font-mono font-semibold text-white text-xl">{result.hoursSaved}+</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[0.65rem] text-white/30 italic">{result.marketReference}</div>
              </div>
            </div>
            <GoldButton label="Get this built →" href="#contact" />
          </div>
          <button className="mt-4 font-mono text-xs text-white/40 hover:text-white/70" onClick={() => setStep(1)}>
            ← Start over
          </button>
        </div>
      )}
    </div>
  );
}
