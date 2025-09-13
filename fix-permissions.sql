-- Fix RLS permissions for Sheikh Committee System
-- Run this in your Supabase SQL Editor

-- 1. First, let's check current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('members', 'daily_statuses');

-- 2. Drop all existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON members;
DROP POLICY IF EXISTS "Enable read access for all users" ON daily_statuses;
DROP POLICY IF EXISTS "Enable insert for all users" ON members;
DROP POLICY IF EXISTS "Enable insert for all users" ON daily_statuses;
DROP POLICY IF EXISTS "Enable update for all users" ON members;
DROP POLICY IF EXISTS "Enable update for all users" ON daily_statuses;
DROP POLICY IF EXISTS "Enable delete for all users" ON members;
DROP POLICY IF EXISTS "Enable delete for all users" ON daily_statuses;

-- 3. Create new policies that allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for authenticated users" ON daily_statuses
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Also create policies for anon users (for public access)
CREATE POLICY "Allow all operations for anon users" ON members
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for anon users" ON daily_statuses
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- 5. Grant necessary permissions
GRANT ALL ON members TO authenticated;
GRANT ALL ON members TO anon;
GRANT ALL ON daily_statuses TO authenticated;
GRANT ALL ON daily_statuses TO anon;

-- 6. Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;

-- 7. Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('members', 'daily_statuses')
ORDER BY tablename, policyname;
