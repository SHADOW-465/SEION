-- Create table for storing project inquiries from the slideshow
CREATE TABLE IF NOT EXISTS project_inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  message TEXT,
  interested_project VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster queries
CREATE INDEX IF NOT EXISTS idx_project_inquiries_email ON project_inquiries(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_project_inquiries_created_at ON project_inquiries(created_at);

-- Create index on interested_project for filtering
CREATE INDEX IF NOT EXISTS idx_project_inquiries_project ON project_inquiries(interested_project);

-- Add RLS (Row Level Security) policies if needed
ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts from anyone (for form submissions)
CREATE POLICY "Allow public inserts" ON project_inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Policy to allow authenticated users to read their own submissions
CREATE POLICY "Users can read own inquiries" ON project_inquiries
  FOR SELECT TO authenticated
  USING (auth.uid()::text = email OR auth.role() = 'service_role');

-- Add a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_project_inquiries_updated_at 
  BEFORE UPDATE ON project_inquiries 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
