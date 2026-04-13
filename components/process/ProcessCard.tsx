// components/process/ProcessCard.tsx
import type { ReactNode } from 'react';

interface ProcessCardProps {
  step: string;
  title: string;
  body: string;
  svg: ReactNode;
}

export function ProcessCard({ step, title, body, svg }: ProcessCardProps) {
  return (
    <div
      className="w-full min-h-[100dvh] flex items-center justify-center"
      style={{ background: 'var(--color-void)' }}
    >
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="flex flex-col gap-5">
            <div
              className="font-mono text-sm uppercase tracking-wider"
              style={{ color: 'var(--color-gold)' }}
            >
              {step}
            </div>
            <h3
              className="font-sans font-bold text-white"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', lineHeight: 1.15 }}
            >
              {title}
            </h3>
            <p className="font-sans text-white/60 text-base leading-relaxed max-w-md">{body}</p>
          </div>
          {/* SVG */}
          <div className="flex items-center justify-center">{svg}</div>
        </div>
      </div>
    </div>
  );
}
