-- Migration 003: Add preview_url and delivery_url to projects table
-- Created: 2026-03-14

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS preview_url TEXT,
ADD COLUMN IF NOT EXISTS delivery_url TEXT;
