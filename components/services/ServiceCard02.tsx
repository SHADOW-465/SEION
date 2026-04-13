// components/services/ServiceCard02.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

const messages = [
  'Revenue: ↑ 18.4% vs last quarter — Auto Components, Chennai',
  'Stock alert: Category B below reorder threshold',
  '3 vendor payments pending — ₹2.4L outstanding',
  'Top margin SKU this week: Ref #A-047',
  'Cash buffer forecast: 23-day positive surplus',
];

export function ServiceCard02() {
  const [displayText, setDisplayText] = useState('');
  const [msgIndex, setMsgIndex]       = useState(0);
  const [cursorOn, setCursorOn]       = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let charIndex = 0;
    const msg = messages[msgIndex];

    const typeChar = () => {
      if (charIndex <= msg.length) {
        setDisplayText(msg.slice(0, charIndex));
        charIndex++;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(typeChar, 44);
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setMsgIndex((i) => (i + 1) % messages.length);
        }, 2400);
      }
    };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(typeChar, 44);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [msgIndex]);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="bg-white rounded-card p-8 flex flex-col justify-between"
      style={{ border: '1px solid var(--color-border-light)', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs text-void/40 uppercase tracking-wider">02</div>
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-green)' }} />
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'var(--color-green)', animation: 'ping-pulse 2s ease-out infinite' }}
              />
            </div>
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-void/50">Live Feed</span>
          </div>
        </div>
        <h3 className="font-sans font-bold text-void text-xl leading-tight">
          Business Intelligence
        </h3>
        <p className="font-sans font-bold text-void/80 text-sm">
          Your data exists. You&apos;re just not reading it.
        </p>
        <p className="font-sans text-void/65 text-sm leading-relaxed">
          We connect Tally, Excel, WhatsApp, and every other source into one live dashboard.
          You see today&apos;s numbers today — not last month&apos;s.
        </p>
      </div>

      <div
        className="mt-6 rounded-lg p-4"
        style={{ background: 'rgba(12,12,14,0.04)', border: '1px solid rgba(12,12,14,0.08)' }}
      >
        <p className="font-mono text-void/70 text-xs leading-relaxed min-h-[3em]">
          {displayText}
          <span style={{ opacity: cursorOn ? 1 : 0, color: 'var(--color-gold)' }}>|</span>
        </p>
      </div>
    </div>
  );
}
