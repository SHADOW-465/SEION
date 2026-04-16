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
  const [msgIndex, setMsgIndex] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
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
        timeoutRef.current = setTimeout(() => setMsgIndex((i) => (i + 1) % messages.length), 2400);
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
      className="group relative overflow-hidden flex flex-col"
      style={{ background: 'var(--color-card)', padding: '48px 40px', transition: 'background 0.25s' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,92,74,0.03)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-card)'; }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: 'var(--color-teal)' }} />

      <div className="flex items-center justify-between mb-6">
        <div className="font-mono text-xs tracking-[0.1em] uppercase" style={{ color: 'var(--color-ink-3)' }}>02</div>
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-teal)' }} />
            <div className="absolute inset-0 rounded-full" style={{ background: 'var(--color-teal)', animation: 'ping-pulse 2s ease-out infinite' }} />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'var(--color-ink-3)' }}>Live Feed</span>
        </div>
      </div>

      <h3 className="font-serif mb-3" style={{ fontSize: '26px', fontWeight: 400, lineHeight: 1.2, color: 'var(--color-void)' }}>
        Business Intelligence
      </h3>
      <p className="font-sans text-sm leading-relaxed mb-6 flex-1" style={{ fontWeight: 300, color: 'var(--color-ink-2)', lineHeight: 1.7 }}>
        We connect Tally, Excel, WhatsApp, and every other source into one live dashboard.
        You see today&apos;s numbers today — not last month&apos;s.
      </p>

      <div className="rounded-sm p-4" style={{ background: 'rgba(12,12,14,0.04)', border: '1px solid var(--color-border)' }}>
        <p className="font-mono text-xs leading-relaxed min-h-[3em]" style={{ color: 'var(--color-ink-2)' }}>
          {displayText}
          <span style={{ opacity: cursorOn ? 1 : 0, color: 'var(--color-teal)' }}>|</span>
        </p>
      </div>
    </div>
  );
}
