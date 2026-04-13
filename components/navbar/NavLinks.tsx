'use client';

interface NavLinksProps {
  light?: boolean;
}

const links = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#process' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
];

export function NavLinks({ light }: NavLinksProps) {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={[
            'font-sans font-medium text-[0.9375rem] transition-all duration-200',
            'hover:-translate-y-px',
            light ? 'text-void/80 hover:text-void' : 'text-white/80 hover:text-white',
          ].join(' ')}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
