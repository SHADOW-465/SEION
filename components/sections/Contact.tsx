// components/sections/Contact.tsx
'use client';

import { useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GoldButton } from '@/components/ui/GoldButton';
import type { ContactFormData } from '@/types';

const industries = ['Manufacturing', 'Healthcare', 'Logistics', 'Retail & MSME', 'Professional Services'];

const inputBase = [
  'w-full font-sans text-sm rounded-button px-4 py-3',
  'bg-white border text-void placeholder:text-void/40',
  'focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50',
  'transition-all duration-200',
].join(' ');

export function Contact() {
  const [form, setForm]       = useState<ContactFormData>({ name: '', company: '', email: '', phone: '', industry: '', problem: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  const update = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-section-light
      style={{ background: 'var(--color-surface-light)', padding: '7rem 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left intro */}
          <div className="flex flex-col gap-4">
            <SectionLabel text="Get In Touch" light />
            <h2
              className="font-sans font-bold text-void"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.15 }}
            >
              Start with 30 minutes. No pitch. No pressure.
            </h2>
            <p className="font-sans text-void/65 text-sm leading-relaxed mt-2">
              Tell us what your business does and where the friction is. We&apos;ll tell you honestly
              — in that call — whether AI will actually help, what it would look like, and what it
              would cost. If it&apos;s not the right fit, we&apos;ll say that too.
            </p>
            <p className="font-sans text-void/65 text-sm leading-relaxed">
              Most clients arrive expecting a sales pitch. They leave with a clear answer either
              way. That&apos;s the point.
            </p>
            <p className="font-mono text-xs text-void/50 uppercase tracking-wider mt-2">
              Response within 4 hours on business days.
            </p>
          </div>

          {/* Right form */}
          <div>
            {success ? (
              <div
                className="rounded-card p-8 flex flex-col gap-3 items-start"
                style={{ background: 'rgba(26,92,74,0.08)', border: '1px solid rgba(26,92,74,0.2)' }}
              >
                <div className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--color-teal)' }}>
                  ✓ Booked
                </div>
                <p className="font-sans text-void font-semibold text-lg">
                  We&apos;ll confirm within 4 hours. Check your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={inputBase} placeholder="Name"    value={form.name}    onChange={update('name')}    required style={{ borderColor: 'var(--color-border-light)' }} />
                  <input className={inputBase} placeholder="Company" value={form.company} onChange={update('company')} required style={{ borderColor: 'var(--color-border-light)' }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={inputBase} type="email" placeholder="Email" value={form.email} onChange={update('email')} required style={{ borderColor: 'var(--color-border-light)' }} />
                  <input className={inputBase} type="tel"   placeholder="Phone" value={form.phone} onChange={update('phone')} required style={{ borderColor: 'var(--color-border-light)' }} />
                </div>
                <select className={inputBase} value={form.industry} onChange={update('industry')} required style={{ borderColor: 'var(--color-border-light)' }}>
                  <option value="">Select industry</option>
                  {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                </select>
                <textarea
                  className={`${inputBase} resize-none`}
                  rows={4}
                  placeholder="Describe where time is wasted, decisions are slow, or data is scattered — the more specific the better"
                  value={form.problem}
                  onChange={update('problem')}
                  required
                  style={{ borderColor: 'var(--color-border-light)' }}
                />
                {error && <p className="font-mono text-xs" style={{ color: 'var(--color-red)' }}>{error}</p>}
                <GoldButton label={loading ? 'Submitting...' : 'Book the 30-min audit'} type="submit" fullWidth />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
