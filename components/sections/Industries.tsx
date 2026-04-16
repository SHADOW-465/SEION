// components/sections/Industries.tsx
'use client';

import { SectionLabel } from '@/components/ui/SectionLabel';

const rows = [
  { name: 'Manufacturing', tags: 'Predictive maintenance · Production analytics · Quality control · Supplier cycles' },
  { name: 'Healthcare & Clinics', tags: 'Appointment no-shows · Billing reconciliation · Patient follow-up · Inventory expiry' },
  { name: 'Logistics & Distribution', tags: 'Route efficiency · Delivery confirmation · Vehicle idle time · Vendor reconciliation' },
  { name: 'Retail & MSME', tags: 'Stock-out prevention · Demand forecasting · Margin by SKU · Customer reorders' },
  { name: 'Professional Services', tags: 'Billing leakage · Document turnaround · Client onboarding · Team utilisation' },
];

export function Industries() {
  return (
    <section
      id="industries"
      data-section-light
      style={{ background: 'var(--color-cream)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-3 mb-12">
          <SectionLabel text="Where We Work" light />
          <h2
            className="font-sans font-bold text-void"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            Industries we&apos;ve built for.
          </h2>
        </div>

        <div>
          {rows.map((row) => (
            <div
              key={row.name}
              className="group flex items-center justify-between py-6 border-b cursor-default"
              style={{
                borderColor: 'var(--color-border-light)',
                transition: 'transform 250ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateX(8px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'; }}
            >
              <div className="flex items-center gap-6">
                <span
                  className="font-sans font-semibold text-void text-lg"
                  style={{ transition: 'color 250ms ease' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-teal)'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-void)'; }}
                >
                  {row.name}
                </span>
                <span className="font-mono text-xs text-void/0 group-hover:text-void/50 transition-all duration-250 hidden lg:block">
                  {row.tags}
                </span>
              </div>
              <span className="font-sans text-void/40 group-hover:text-void/70 transition-all duration-250">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
