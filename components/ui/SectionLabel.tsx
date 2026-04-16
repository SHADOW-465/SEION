// components/ui/SectionLabel.tsx
interface SectionLabelProps {
  text: string;
  light?: boolean;  // true = on cream bg (ink text), false = on dark bg (muted white text)
  teal?: boolean;   // true = on teal bg (white/translucent text)
}

export function SectionLabel({ text, light = true, teal = false }: SectionLabelProps) {
  const textColor = teal
    ? 'rgba(255,255,255,0.6)'
    : light
    ? 'var(--color-ink-3, #8a8880)'
    : 'rgba(255,255,255,0.35)';

  return (
    <div
      className="flex items-center gap-3"
      style={{ marginBottom: '48px' }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[0.18em] whitespace-nowrap"
        style={{ color: textColor }}
      >
        {text}
      </span>
      <div
        className="flex-1 h-px"
        style={{
          background: teal
            ? 'rgba(255,255,255,0.15)'
            : light
            ? 'var(--color-border, #d8d4c8)'
            : 'rgba(255,255,255,0.1)',
        }}
      />
    </div>
  );
}
