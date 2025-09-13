-- Complete Sheikh Committee System Database Schema
-- For new project: ktlhmvlxppxetqctuoen.supabase.co
-- Run this entire script in your Supabase SQL Editor

-- 1. Create members table
CREATE TABLE IF NOT EXISTS members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  join_date DATE NOT NULL,
  payout_turn INTEGER NOT NULL,
  payout_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create daily_statuses table
CREATE TABLE IF NOT EXISTS daily_statuses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('paid', 'unpaid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(member_id, date)
);

-- 3. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_payout_turn ON members(payout_turn);
CREATE INDEX IF NOT EXISTS idx_members_payout_date ON members(payout_date);
CREATE INDEX IF NOT EXISTS idx_members_name ON members(name);
CREATE INDEX IF NOT EXISTS idx_daily_statuses_member_id ON daily_statuses(member_id);
CREATE INDEX IF NOT EXISTS idx_daily_statuses_date ON daily_statuses(date);
CREATE INDEX IF NOT EXISTS idx_daily_statuses_status ON daily_statuses(status);

-- 4. Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_statuses ENABLE ROW LEVEL SECURITY;

-- 5. Drop any existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON members;
DROP POLICY IF EXISTS "Enable read access for all users" ON daily_statuses;
DROP POLICY IF EXISTS "Enable insert for all users" ON daily_statuses;
DROP POLICY IF EXISTS "Enable update for all users" ON daily_statuses;
DROP POLICY IF EXISTS "Enable insert for all users" ON members;
DROP POLICY IF EXISTS "Enable update for all users" ON members;
DROP POLICY IF EXISTS "Enable delete for all users" ON members;
DROP POLICY IF EXISTS "Enable delete for all users" ON daily_statuses;

-- 6. Create comprehensive policies for complete access
CREATE POLICY "Allow all for authenticated" ON members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated" ON daily_statuses FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON members FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON daily_statuses FOR ALL TO anon USING (true) WITH CHECK (true);

-- 7. Grant permissions
GRANT ALL ON members TO authenticated, anon;
GRANT ALL ON daily_statuses TO authenticated, anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated, anon;

-- 8. Insert sample members data (30 members with proper payout turns)
INSERT INTO members (id, name, email, join_date, payout_turn, payout_date) VALUES
('MEM1001', 'Mughees', 'mughees0@example.com', '2023-09-10', 1, '2025-09-24'),
('MEM1002', 'Mujeeb', 'mujeeb1@example.com', '2023-10-15', 2, '2025-10-09'),
('MEM1003', 'Sohaib Sultan', 'sohaib.sultan2@example.com', '2023-11-20', 3, '2025-10-24'),
('MEM1004', 'Usama Khizer', 'usama.khizer3@example.com', '2023-12-05', 4, '2025-11-08'),
('MEM1005', 'Aslan', 'aslan4@example.com', '2024-01-10', 5, '2025-11-23'),
('MEM1006', 'Usama', 'usama5@example.com', '2024-02-15', 6, '2025-12-08'),
('MEM1007', 'Malaika', 'malaika6@example.com', '2024-03-20', 7, '2025-12-23'),
('MEM1008', 'Maa Jee', 'maa.jee7@example.com', '2024-04-05', 8, '2026-01-07'),
('MEM1009', 'haseeb', 'haseeb8@example.com', '2024-05-10', 9, '2026-01-22'),
('MEM1010', 'Ramzan', 'ramzan9@example.com', '2024-06-15', 10, '2026-02-06'),
('MEM1011', 'Mughees', 'mughees10@example.com', '2024-07-20', 11, '2026-02-21'),
('MEM1012', 'Khuzaima', 'khuzaima11@example.com', '2024-08-05', 12, '2026-03-08'),
('MEM1013', 'Abdul Rehman', 'abdul.rehman12@example.com', '2024-09-10', 13, '2026-03-23'),
('MEM1014', 'Mujeeb', 'mujeeb13@example.com', '2024-10-15', 14, '2026-04-07'),
('MEM1015', 'Khuzaima', 'khuzaima14@example.com', '2024-11-20', 15, '2026-04-22'),
('MEM1016', 'Usama Khizer', 'usama.khizer15@example.com', '2024-12-05', 16, '2026-05-07'),
('MEM1017', 'Sohaib Sultan', 'sohaib.sultan16@example.com', '2025-01-10', 17, '2026-05-22'),
('MEM1018', 'Malaika', 'malaika17@example.com', '2025-02-15', 18, '2026-06-06'),
('MEM1019', 'Sohaib Sultan', 'sohaib.sultan18@example.com', '2025-03-20', 19, '2026-06-21'),
('MEM1020', 'Mughees', 'mughees19@example.com', '2025-04-05', 20, '2026-07-06'),
('MEM1021', 'Usama Khizer', 'usama.khizer20@example.com', '2025-05-10', 21, '2026-07-21'),
('MEM1022', 'API', 'api21@example.com', '2025-06-15', 22, '2026-08-05'),
('MEM1023', 'Malaika', 'malaika22@example.com', '2025-07-20', 23, '2026-08-20'),
('MEM1024', 'Sohaib Sultan', 'sohaib.sultan23@example.com', '2025-08-05', 24, '2026-09-04'),
('MEM1025', 'Usama Khizer', 'usama.khizer24@example.com', '2025-09-10', 25, '2026-09-19'),
('MEM1026', 'Sohaib Sultan', 'sohaib.sultan25@example.com', '2025-10-15', 26, '2026-10-04'),
('MEM1027', 'Malaika', 'malaika26@example.com', '2025-11-20', 27, '2026-10-19'),
('MEM1028', 'Mughees', 'mughees27@example.com', '2025-12-05', 28, '2026-11-03'),
('MEM1029', 'Malaika', 'malaika28@example.com', '2026-01-10', 29, '2026-11-18'),
('MEM1030', 'Khuzaima', 'khuzaima29@example.com', '2026-02-15', 30, '2026-12-03')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  join_date = EXCLUDED.join_date,
  payout_turn = EXCLUDED.payout_turn,
  payout_date = EXCLUDED.payout_date,
  updated_at = NOW();

-- 9. Insert initial daily statuses (one paid status for demonstration)
INSERT INTO daily_statuses (member_id, date, status) VALUES
('MEM1001', '2025-09-10', 'paid')
ON CONFLICT (member_id, date) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = NOW();

-- 10. Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 11. Create triggers to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_members_updated_at ON members;
CREATE TRIGGER update_members_updated_at 
    BEFORE UPDATE ON members 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_daily_statuses_updated_at ON daily_statuses;
CREATE TRIGGER update_daily_statuses_updated_at 
    BEFORE UPDATE ON daily_statuses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Database schema created successfully! 30 members inserted with proper payout turns.' as message;
