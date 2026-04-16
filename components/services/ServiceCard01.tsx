'use client';

const tags = ['Invoice automation', 'WhatsApp workflows', 'Document processing', 'Report generation'];

export function ServiceCard01() {
  return (
    <div
      className="group relative overflow-hidden flex flex-col"
      style={{
        background: 'var(--color-cream)',
        padding: '48px 40px',
        transition: 'background 0.25s',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,92,74,0.03)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-cream)'; }}
    >
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{ background: 'var(--color-teal)' }}
      />

      <div className="font-mono text-xs tracking-[0.1em] uppercase mb-6" style={{ color: 'var(--color-ink-3)' }}>01</div>
      <h3 className="font-serif mb-4" style={{ fontSize: '26px', fontWeight: 400, lineHeight: 1.2, color: 'var(--color-void)' }}>
        AI Workflow Automation
      </h3>
      <p className="font-sans text-sm leading-relaxed mb-6 flex-1" style={{ fontWeight: 300, color: 'var(--color-ink-2)', lineHeight: 1.7 }}>
        We map your current operations, identify the highest-cost manual steps, and build AI
        systems that handle them automatically. Customer communication, document processing,
        scheduling, reporting — anything that follows a pattern can be automated.
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="font-mono text-[9px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-sm" style={{ background: 'var(--color-teal-light)', color: 'var(--color-teal)' }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
