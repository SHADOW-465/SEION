// components/demo/index.tsx
'use client';

import { useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { DemoTab1 } from './DemoTab1';
import { DemoTab2 } from './DemoTab2';
import { DemoTab3 } from './DemoTab3';

const tabs = [
  { id: 'dashboard', label: 'Live Dashboard' },
  { id: 'before-after', label: 'Before & After' },
  { id: 'build-yours', label: 'Build Yours' },
] as const;

type TabId = typeof tabs[number]['id'];

export function Demo() {
  const [active, setActive] = useState<TabId>('dashboard');

  return (
    <section
      id="demo"
      style={{ background: 'var(--color-void)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-10">
          <SectionLabel text="See It Working" />
          <h2
            className="font-sans font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            Not a promise. A demonstration.
          </h2>
          <p className="font-sans text-white/50 text-base max-w-xl leading-relaxed">
            Every client starts skeptical. The fastest way to earn trust is to show the work.
            Explore a real SEION-built system below.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-4 border-b mb-10 overflow-x-auto" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="relative pb-3 font-sans font-medium text-sm transition-all duration-200 whitespace-nowrap"
              style={{ color: active === tab.id ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
            >
              {tab.label}
              {active === tab.id && (
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 origin-left"
                  style={{ background: 'var(--color-gold)', animation: 'scaleInX 250ms var(--ease-morph) forwards' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {active === 'dashboard'    && <DemoTab1 />}
        {active === 'before-after' && <DemoTab2 />}
        {active === 'build-yours'  && <DemoTab3 />}
      </div>
    </section>
  );
}
