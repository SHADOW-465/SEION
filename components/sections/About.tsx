// components/sections/About.tsx
import { SectionLabel } from '@/components/ui/SectionLabel';

const factTable = [
  { label: 'Founded', value: '2024 — Chennai, Tamil Nadu' },
  { label: 'Approach', value: 'Custom-built, not templated' },
  { label: 'Languages', value: 'Tamil and English' },
  { label: 'Team', value: 'Small by design — you deal direct' },
  { label: 'First step', value: 'Free 30-min operations audit' },
];

export function About() {
  return (
    <section
      id="about"
      style={{ background: 'var(--color-void)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div className="flex flex-col gap-4">
            <SectionLabel text="About SEION" />
            <h2
              className="font-sans font-bold text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15 }}
            >
              Built in Chennai. Built for how India actually works.
            </h2>
            <p className="font-sans text-white/60 text-sm leading-relaxed mt-2">
              Most enterprise software was designed for companies with dedicated IT teams, clean
              data, and six months to implement. The manufacturers in Ambattur, distributors in
              Coimbatore, clinics in T. Nagar — the software wasn&apos;t built for them.
            </p>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              We were. Every system starts from your existing data — however messy, however
              scattered — and works with the tools you already use. We don&apos;t ask you to change
              how you operate. We build the intelligence layer around what you&apos;ve already built.
            </p>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              We&apos;re a small team by design. The person who understands your business builds your
              system. No handoffs. No account managers. Direct.
            </p>
          </div>

          {/* Fact table */}
          <div
            className="rounded-card overflow-hidden"
            style={{ border: '1px solid var(--color-border-dark)' }}
          >
            {factTable.map((row, i) => (
              <div
                key={row.label}
                className="flex items-start gap-4 p-4"
                style={{ borderBottom: i < factTable.length - 1 ? '1px solid var(--color-border-dark)' : 'none' }}
              >
                <span
                  className="font-mono text-xs uppercase tracking-wider w-28 shrink-0 pt-0.5"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {row.label}
                </span>
                <span className="font-sans text-sm text-white/70">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
