'use client';

import { useEffect, useRef, useState } from 'react';
import { NavLinks } from './NavLinks';
import { NavCTA } from './NavCTA';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const lightSections = document.querySelectorAll('[data-section-light]');
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const anyIntersecting = entries.some((e) => e.isIntersecting);
        setIsLight(anyIntersecting);
      },
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 }
    );
    lightSections.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrolledDark: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow:
      'inset 0 0 0 0.5px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.24)',
  };

  const scrolledLight: React.CSSProperties = {
    background: 'rgba(245,242,235,0.72)',
    backdropFilter: 'blur(24px) saturate(160%)',
    WebkitBackdropFilter: 'blur(24px) saturate(160%)',
    border: '1px solid rgba(0,0,0,0.08)',
    boxShadow:
      'inset 0 0 0 0.5px rgba(255,255,255,0.5), 0 8px 32px rgba(0,0,0,0.08)',
  };

  const navStyle: React.CSSProperties = scrolled
    ? isLight ? scrolledLight : scrolledDark
    : {};

  return (
    <>
      <header
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-8 px-6 py-3 rounded-pill"
        style={{
          minWidth: 'min(640px, 90vw)',
          maxWidth: '90vw',
          transition: 'all 350ms cubic-bezier(0.25,0.46,0.45,0.94)',
          ...navStyle,
        }}
      >
        <a href="#" className="shrink-0">
          <span className="shimmer-gold font-sans font-bold text-xl tracking-tight">
            SEION
          </span>
        </a>

        <NavLinks light={isLight && scrolled} />

        <div className="hidden md:block">
          <NavCTA />
        </div>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ color: isLight && scrolled ? '#0C0C0E' : '#ffffff' }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            background: 'rgba(12,12,14,0.96)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {[
            { label: 'Services', href: '#services' },
            { label: 'How It Works', href: '#process' },
            { label: 'Industries', href: '#industries' },
            { label: 'About', href: '#about' },
            { label: 'Contact', href: '#contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans font-semibold text-2xl text-white/90 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <NavCTA />
        </div>
      )}
    </>
  );
}
