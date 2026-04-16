'use client';

const tags = ['Predictive maintenance', 'IoT integration', 'Scheduling AI', 'Industry-specific'];

export function ServiceCard03() {
  return (
    <div
      className="group relative overflow-hidden flex flex-col"
      style={{ background: 'var(--color-card)', padding: '48px 40px', transition: 'background 0.25s' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,92,74,0.03)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-card)'; }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: 'var(--color-teal)' }} />

      <div className="font-mono text-xs tracking-[0.1em] uppercase mb-6" style={{ color: 'var(--color-ink-3)' }}>03</div>
      <h3 className="font-serif mb-4" style={{ fontSize: '26px', fontWeight: 400, lineHeight: 1.2, color: 'var(--color-void)' }}>
        Custom AI Systems
      </h3>
      <p className="font-sans text-sm leading-relaxed mb-6 flex-1" style={{ fontWeight: 300, color: 'var(--color-ink-2)', lineHeight: 1.7 }}>
        For businesses with specific, complex problems that off-the-shelf tools cannot solve.
        We design and build bespoke AI systems — from predictive maintenance to intelligent
        scheduling — built around your actual operations, not a template.
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
