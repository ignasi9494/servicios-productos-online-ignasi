-- Migration 002: Add notification preferences to profiles table
-- Created: 2026-03-14

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS notify_messages BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notify_proposals BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notify_payments BOOLEAN DEFAULT true;
