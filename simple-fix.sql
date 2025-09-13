-- Simple fix for RLS permissions
-- Copy and paste this entire block into Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON members;
DROP POLICY IF EXISTS "Enable read access for all users" ON daily_statuses;
DROP POLICY IF EXISTS "Enable insert for all users" ON members;
DROP POLICY IF EXISTS "Enable insert for all users" ON daily_statuses;
DROP POLICY IF EXISTS "Enable update for all users" ON members;
DROP POLICY IF EXISTS "Enable update for all users" ON daily_statuses;
DROP POLICY IF EXISTS "Enable delete for all users" ON members;
DROP POLICY IF EXISTS "Enable delete for all users" ON daily_statuses;

-- Create new policies for authenticated users
CREATE POLICY "Allow all for authenticated" ON members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated" ON daily_statuses FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create new policies for anon users
CREATE POLICY "Allow all for anon" ON members FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON daily_statuses FOR ALL TO anon USING (true) WITH CHECK (true);

-- Grant permissions
GRANT ALL ON members TO authenticated, anon;
GRANT ALL ON daily_statuses TO authenticated, anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated, anon;
