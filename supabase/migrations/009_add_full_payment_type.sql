-- Migration 009: Add 'full' to payment_type enum
-- Fixes: checkout.session.completed webhook fails when payment_type='full'
ALTER TYPE payment_type ADD VALUE IF NOT EXISTS 'full';
