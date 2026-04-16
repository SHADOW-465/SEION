'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Desktop floating pill */}
      <div
        className="hidden md:block fixed left-0 right-0"
        style={{ top: '20px', zIndex: 100 }}
      >
        <nav
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: scrolled ? '12px 24px' : '14px 28px',
            borderRadius: '9999px',
            background: scrolled ? 'rgba(245,242,235,0.88)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
            border: scrolled ? '1px solid rgba(216,212,200,0.7)' : '1px solid transparent',
            boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="shimmer-gold font-sans font-bold"
            style={{
              fontSize: '18px',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            SEION
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8">
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
                style={{
                  color: 'var(--color-ink-2)',
                  letterSpacing: '0.03em',
                  textDecoration: 'none',
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-teal)'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-ink-2)'; }}
              >
                {link.label}
              </a>
            ))}

            {/* CTA */}
            <a
              href="#contact"
              className="font-sans font-medium text-xs rounded-full transition-all duration-200"
              style={{
                background: 'var(--color-void)',
                color: 'var(--color-cream)',
                padding: '9px 20px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1.5px solid var(--color-void)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--color-teal)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-teal)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--color-void)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-void)';
              }}
            >
              Book Audit
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile top bar */}
      <nav
        className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between"
        style={{
          zIndex: 100,
          padding: '16px 24px',
          background: scrolled ? 'rgba(245,242,235,0.92)' : 'rgba(245,242,235,0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <Link
          href="/"
          className="shimmer-gold font-sans font-bold"
          style={{ fontSize: '16px', letterSpacing: '0.08em', textDecoration: 'none', textTransform: 'uppercase' }}
        >
          SEION
        </Link>

        <button
          className="flex flex-col gap-1.5 p-2"
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
        <div className="fixed inset-0 flex flex-col justify-center px-8 md:hidden" style={{ background: 'var(--color-cream)', zIndex: 200 }}>
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
