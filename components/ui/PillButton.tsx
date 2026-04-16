// components/ui/PillButton.tsx
import Link from 'next/link';

interface PillButtonProps {
  label: string;
  href?: string;
}

export function PillButton({ label, href }: PillButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center font-sans font-medium text-sm px-5 py-2.5 rounded-pill text-cream transition-colors duration-200"
        style={{ background: 'var(--color-void)', letterSpacing: '0.02em' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-teal)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-void)'; }}
      >
        {label}
      </Link>
    );
  }
  return (
    <button
      className="inline-flex items-center justify-center font-sans font-medium text-sm px-5 py-2.5 rounded-pill text-cream transition-colors duration-200"
      style={{ background: 'var(--color-void)', letterSpacing: '0.02em' }}
    >
      {label}
    </button>
  );
}
