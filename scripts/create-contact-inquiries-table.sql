-- Create table for storing contact form inquiries
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  role VARCHAR(255),
  industry VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON contact_inquiries(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at);

-- Create index on company for filtering
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_company ON contact_inquiries(company);

-- Add RLS (Row Level Security) policies
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts from anyone (for form submissions)
CREATE POLICY "Allow public contact inquiries" ON contact_inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Policy to allow authenticated users to read inquiries
CREATE POLICY "Allow reading contact inquiries" ON contact_inquiries
  FOR SELECT TO authenticated
  USING (auth.role() = 'service_role');

-- Add a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_inquiries_updated_at 
  BEFORE UPDATE ON contact_inquiries 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
