import Link from 'next/link';

interface PillButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

export function PillButton({ label, href, onClick }: PillButtonProps) {
  const base = [
    'btn-fill-slide',
    'inline-flex items-center justify-center',
    'px-5 py-2.5 rounded-pill',
    'bg-gold text-void',
    'font-sans font-semibold text-sm tracking-tight',
    'transition-all duration-300',
    'hover:shadow-[0_4px_20px_rgba(212,149,42,0.35)]',
  ].join(' ');

  if (href) {
    return <Link href={href} className={base}>{label}</Link>;
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {label}
    </button>
  );
}
