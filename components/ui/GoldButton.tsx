import Link from 'next/link';

interface GoldButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

export function GoldButton({ label, href, onClick, fullWidth, type = 'button' }: GoldButtonProps) {
  const base = [
    'btn-fill-slide',
    'inline-flex items-center justify-center',
    'px-6 py-3 rounded-button',
    'bg-gold text-void',
    'font-sans font-semibold text-sm tracking-tight',
    'transition-all duration-300',
    'hover:shadow-[0_4px_24px_rgba(212,149,42,0.35)]',
    fullWidth ? 'w-full' : '',
  ].join(' ');

  if (href) {
    return <Link href={href} className={base}>{label}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {label}
    </button>
  );
}
