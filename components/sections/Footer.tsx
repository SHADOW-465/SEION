// components/sections/Footer.tsx
export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-void)',
        borderRadius: '2rem 2rem 0 0',
        padding: '4rem 0 2rem',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 pb-10 border-b" style={{ borderColor: 'var(--color-border-dark)' }}>
          <div className="flex flex-col gap-2">
            <span className="shimmer-gold font-sans font-bold text-2xl tracking-tight">SEION</span>
            <p className="font-serif italic" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>AI systems for Indian business</p>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/30 mb-4">Services</div>
              <ul className="flex flex-col gap-2.5">
                {['AI Workflow Automation', 'Business Intelligence', 'Custom AI Systems'].map((s) => (
                  <li key={s}><a href="#services" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/30 mb-4">Company</div>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'About', href: '#about' },
                  { label: 'How It Works', href: '#process' },
                  { label: 'Contact', href: '#contact' },
                ].map((l) => (
                  <li key={l.label}><a href={l.href} className="font-sans text-sm text-white/50 hover:text-white transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="font-mono text-xs text-white/25">© 2026 SEION. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-teal)' }} />
              <div className="absolute inset-0 rounded-full" style={{ background: 'var(--color-teal)', animation: 'ping-pulse 2s ease-out infinite' }} />
            </div>
            <span className="font-mono text-xs text-white/40">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
