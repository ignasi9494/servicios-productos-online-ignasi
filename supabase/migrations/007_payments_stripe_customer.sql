-- Migration 007: Add stripe_customer_id to payments table
-- Needed for Stripe Customer Portal (billing portal) feature.
-- The webhook handler stores the customer ID when a checkout session completes.

ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Also add a full payment_type value (was missing from the enum)
-- The 'full' type was being used in code but not defined in the enum
-- Safely add it if not already present
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'full'
      AND enumtypid = 'payment_type'::regtype
  ) THEN
    ALTER TYPE payment_type ADD VALUE 'full';
  END IF;
END$$;
