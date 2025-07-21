/*
  # Fix RLS policies for anonymous email signups

  1. Security Changes
    - Drop existing restrictive policies
    - Create new policy allowing anonymous users to insert email signups
    - Maintain read restrictions for authenticated users only

  2. Policy Details
    - Allow INSERT for anonymous (anon) role
    - Allow SELECT for authenticated users to read their own data
    - Use proper policy syntax for Supabase RLS
*/

-- Drop existing policies that might be blocking anonymous inserts
DROP POLICY IF EXISTS "Allow anonymous email signups" ON email_signups;
DROP POLICY IF EXISTS "Users can read own email data" ON email_signups;

-- Create policy to allow anonymous users to insert email signups
CREATE POLICY "Enable insert for anonymous users" ON email_signups
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Create policy to allow authenticated users to read their own email data
CREATE POLICY "Enable read for authenticated users" ON email_signups
  FOR SELECT 
  TO authenticated 
  USING (auth.uid()::text = id::text);