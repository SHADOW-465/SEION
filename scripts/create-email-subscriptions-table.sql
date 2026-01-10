-- Create table for storing email subscriptions from hero section
CREATE TABLE IF NOT EXISTS email_subscriptions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(100) NOT NULL DEFAULT 'hero_section',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create index on email for faster queries
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_email ON email_subscriptions(email);

-- Create index on subscribed_at for sorting
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_date ON email_subscriptions(subscribed_at);

-- Add RLS (Row Level Security) policies
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts from anyone (for subscriptions)
CREATE POLICY "Allow public email subscriptions" ON email_subscriptions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Policy to allow authenticated users to read subscriptions
CREATE POLICY "Allow reading subscriptions" ON email_subscriptions
  FOR SELECT TO authenticated
  USING (true);
