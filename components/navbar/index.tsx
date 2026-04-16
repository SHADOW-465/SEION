'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PillButton } from '@/components/ui/PillButton';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 48px',
    background: 'rgba(245,242,235,0.92)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
    transition: 'border-color 0.3s',
  };

  return (
    <>
      <nav style={navStyle}>
        {/* Wordmark — gold shimmer kept here */}
        <Link href="/" className="shimmer-gold font-sans font-bold text-xl tracking-tight" style={{ letterSpacing: '0.06em', textDecoration: 'none', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
          SEION
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {[
            { label: 'Services', href: '#services' },
            { label: 'Work', href: '#work' },
            { label: 'How We Work', href: '#process' },
            { label: 'About', href: '#about' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-sm transition-colors duration-200"
              style={{ color: 'var(--color-ink-2)', letterSpacing: '0.04em', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-teal)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-ink-2)'; }}
            >
              {link.label}
            </a>
          ))}
          <PillButton label="Book 30-min Audit" href="#contact" />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-px transition-all duration-300" style={{ background: 'var(--color-void)', transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
          <span className="block h-px transition-all duration-300" style={{ background: 'var(--color-void)', width: menuOpen ? '0' : '24px', opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-6 h-px transition-all duration-300" style={{ background: 'var(--color-void)', transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-center px-8"
          style={{ background: 'var(--color-cream)' }}
        >
          <button
            className="absolute top-6 right-6 font-mono text-xs uppercase tracking-wider"
            onClick={() => setMenuOpen(false)}
            style={{ color: 'var(--color-ink-3)' }}
          >
            Close
          </button>
          <div className="flex flex-col gap-8">
            {[
              { label: 'Services', href: '#services' },
              { label: 'Work', href: '#work' },
              { label: 'How We Work', href: '#process' },
              { label: 'About', href: '#about' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif italic"
                style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', color: 'var(--color-void)', textDecoration: 'none', lineHeight: 1.1 }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
