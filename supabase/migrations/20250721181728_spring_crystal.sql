/*
  # Fix email signups RLS policy

  1. Security Changes
    - Update RLS policy to allow anonymous users to insert email signups
    - Keep existing policy for authenticated users to read their own data
    - Ensure anonymous users can only insert, not read other users' data

  2. Changes Made
    - Drop existing restrictive INSERT policy
    - Create new policy allowing anonymous users to insert email signups
    - Maintain data privacy by preventing anonymous users from reading existing data
*/

-- Drop the existing restrictive policy if it exists
DROP POLICY IF EXISTS "Anyone can insert email signups" ON email_signups;

-- Create a new policy that allows anonymous users to insert email signups
CREATE POLICY "Allow anonymous email signups"
  ON email_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure authenticated users can still read their own data (keep existing policy)
-- This policy should already exist from the previous migration