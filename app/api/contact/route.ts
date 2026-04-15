// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { ContactFormData } from '@/types';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[+\d\s\-().]{7,20}$/.test(phone);
}

export async function POST(req: NextRequest) {
  let body: ContactFormData;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, company, email, phone, industry, problem } = body;

  if (!name?.trim())     return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (!company?.trim())  return NextResponse.json({ error: 'Company is required' }, { status: 400 });
  if (!email?.trim())    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  if (!phone?.trim())    return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
  if (!industry?.trim()) return NextResponse.json({ error: 'Industry is required' }, { status: 400 });
  if (!problem?.trim())  return NextResponse.json({ error: 'Problem description is required' }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  if (!isValidPhone(phone)) return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });

  // If Supabase is not configured, log and succeed gracefully (preview/demo mode)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('[contact] Supabase not configured — submission logged only:', { name, company, email, industry });
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const { error } = await supabase
    .from('contact_submissions')
    .insert([{
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      industry: industry.trim(),
      problem: problem.trim(),
    }]);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
