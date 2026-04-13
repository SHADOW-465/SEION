interface SectionLabelProps {
  text: string;
  light?: boolean;
}

export function SectionLabel({ text, light }: SectionLabelProps) {
  return (
    <div
      className={`section-label flex items-center gap-2 ${light ? 'text-void/60' : 'text-white/60'}`}
    >
      <span style={{ color: 'var(--color-gold)' }}>◆</span>
      {text}
    </div>
  );
}
