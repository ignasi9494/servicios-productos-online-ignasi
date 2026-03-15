-- Migration 008: Add email column to profiles table
-- Fixes: admin panel was using auth.admin.getUserById() (requires service_role key)
-- which always fails from frontend (anon key only), causing emails to go to placeholder addresses.

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Backfill email for existing users from auth.users
UPDATE profiles p
SET email = u.email
FROM auth.users u
WHERE p.user_id = u.id
  AND p.email IS NULL;

-- Update trigger to also store email on new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
