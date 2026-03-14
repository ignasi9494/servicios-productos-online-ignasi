-- Migration 004: Add internal_notes column to projects table
-- Created: 2026-03-14

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS internal_notes TEXT;
