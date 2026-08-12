-- System info table for dynamic public website content
-- This replaces hardcoded information in site.ts

CREATE TABLE IF NOT EXISTS system_info (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  shop_name TEXT NOT NULL DEFAULT 'V-Technologies',
  short_name TEXT NOT NULL DEFAULT 'V-Tech',
  tagline TEXT NOT NULL DEFAULT 'Repair & Service Experts',
  phone TEXT NOT NULL DEFAULT '+91 91791 05875',
  whatsapp TEXT NOT NULL DEFAULT '+91 91791 05875',
  email TEXT NOT NULL DEFAULT 'vtech.jbp@gmail.com',
  address TEXT NOT NULL DEFAULT 'F4 Hotel Plaza (Madhushala), Besides Jayanti Complex, Marhatal, Jabalpur, MP 482002',
  website_url TEXT,
  gst_number TEXT,
  established_year INTEGER DEFAULT 2007,
  business_hours TEXT DEFAULT 'Mon-Sat: 10 AM - 8 PM',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_system_info_updated_at
  BEFORE UPDATE ON system_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default system info
INSERT INTO system_info (shop_name, short_name, tagline, phone, whatsapp, email, address, established_year)
VALUES (
  'V-Technologies',
  'V-Tech',
  'Repair & Service Experts',
  '+91 91791 05875',
  '+91 91791 05875',
  'vtech.jbp@gmail.com',
  'F4 Hotel Plaza (Madhushala), Besides Jayanti Complex, Marhatal, Jabalpur, MP 482002',
  2007
)
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE system_info ENABLE ROW LEVEL POLICY;

-- Policy: Allow everyone to read system info (public website needs this)
CREATE POLICY "Allow public read access to system_info"
  ON system_info FOR SELECT
  USING (true);

-- Policy: Only admin can update system info
CREATE POLICY "Allow admin to update system_info"
  ON system_info FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'developer')
    )
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON system_info TO anon, authenticated;
GRANT ALL ON system_info TO authenticated;
