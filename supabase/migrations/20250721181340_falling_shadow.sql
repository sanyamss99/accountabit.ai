/*
  # Create email signups table

  1. New Tables
    - `email_signups`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `source` (text) - tracks which button was clicked
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `email_signups` table
    - Add policy for public insert access (for signups)
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS email_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text DEFAULT 'unknown',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert email signups (for the signup form)
CREATE POLICY "Anyone can insert email signups"
  ON email_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow users to read their own email signup data
CREATE POLICY "Users can read own email data"
  ON email_signups
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_email_signups_updated_at
  BEFORE UPDATE ON email_signups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();