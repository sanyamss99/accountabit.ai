/*
  # Disable RLS security for email_signups table

  1. Changes
    - Drop all existing RLS policies for email_signups table
    - Disable Row Level Security entirely for email_signups table
    - Allow unrestricted data flow for email signups

  This removes all security restrictions and allows any user to insert email data.
*/

-- Drop all existing policies for email_signups table
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON email_signups;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON email_signups;
DROP POLICY IF EXISTS "Allow anonymous email signups" ON email_signups;
DROP POLICY IF EXISTS "Allow authenticated users to read own data" ON email_signups;

-- Disable Row Level Security entirely
ALTER TABLE email_signups DISABLE ROW LEVEL SECURITY;