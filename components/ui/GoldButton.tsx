// components/ui/GoldButton.tsx
import Link from 'next/link';

interface GoldButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function GoldButton({ label, href, onClick, fullWidth, type = 'button' }: GoldButtonProps) {
  const className = `btn-ink${fullWidth ? ' w-full' : ''}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {label}
    </button>
  );
}
