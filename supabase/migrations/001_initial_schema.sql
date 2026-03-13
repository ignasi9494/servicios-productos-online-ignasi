-- Think Better Platform - Initial Database Schema
-- Run this migration in Supabase SQL Editor

-- ===========================================
-- CUSTOM TYPES
-- ===========================================

CREATE TYPE user_role AS ENUM ('client', 'admin');
CREATE TYPE project_status AS ENUM (
  'questionnaire', 'pending_proposal', 'proposal_sent', 'proposal_accepted',
  'in_development', 'in_review', 'completed', 'delivered'
);
CREATE TYPE plan_type AS ENUM ('launch', 'build', 'scale');
CREATE TYPE proposal_status AS ENUM ('draft', 'sent', 'accepted', 'rejected');
CREATE TYPE questionnaire_status AS ENUM ('in_progress', 'completed', 'abandoned');
CREATE TYPE iteration_status AS ENUM ('requested', 'in_progress', 'completed');
CREATE TYPE payment_type AS ENUM ('deposit', 'final', 'maintenance');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'succeeded', 'failed', 'refunded');
CREATE TYPE sender_role AS ENUM ('client', 'admin', 'system');

-- ===========================================
-- TABLES
-- ===========================================

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  sector TEXT,
  role user_role NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Client projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status project_status NOT NULL DEFAULT 'questionnaire',
  plan plan_type,
  base_price NUMERIC(10,2),
  extras_price NUMERIC(10,2),
  total_price NUMERIC(10,2),
  delivery_days INTEGER,
  max_iterations INTEGER NOT NULL DEFAULT 2,
  used_iterations INTEGER NOT NULL DEFAULT 0,
  contract_signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- AI questionnaire conversations
CREATE TABLE questionnaire_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  messages_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  extracted_data_json JSONB,
  ai_summary TEXT,
  status questionnaire_status NOT NULL DEFAULT 'in_progress',
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Project proposals
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  content_md TEXT NOT NULL,
  stack_description TEXT,
  price_breakdown_json JSONB,
  timeline_description TEXT,
  status proposal_status NOT NULL DEFAULT 'draft',
  sent_at TIMESTAMPTZ,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Internal chat messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_role sender_role NOT NULL,
  content TEXT NOT NULL,
  attachment_url TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Uploaded files
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Design/review iterations
CREATE TABLE iterations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  iteration_number INTEGER NOT NULL,
  description TEXT NOT NULL,
  screenshot_urls JSONB,
  status iteration_status NOT NULL DEFAULT 'requested',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(project_id, iteration_number)
);

-- Payment records
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stripe_payment_id TEXT,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'eur',
  type payment_type NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ===========================================
-- INDEXES
-- ===========================================

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_questionnaire_session ON questionnaire_conversations(session_id);
CREATE INDEX idx_proposals_project_id ON proposals(project_id);
CREATE INDEX idx_messages_project_id ON messages(project_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_files_project_id ON files(project_id);
CREATE INDEX idx_iterations_project_id ON iterations(project_id);
CREATE INDEX idx_payments_project_id ON payments(project_id);
CREATE INDEX idx_payments_stripe_id ON payments(stripe_payment_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, read) WHERE read = false;

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE iterations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Helper function: check if user is admin
CREATE OR REPLACE FUNCTION is_admin(uid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE user_id = uid AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- PROFILES
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id OR is_admin(auth.uid()));

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- PROJECTS
CREATE POLICY "Clients see own projects, admins see all"
  ON projects FOR SELECT
  USING (client_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Clients can create projects"
  ON projects FOR INSERT
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Admins can update projects"
  ON projects FOR UPDATE
  USING (is_admin(auth.uid()));

-- QUESTIONNAIRE CONVERSATIONS
CREATE POLICY "Anyone can create conversations"
  ON questionnaire_conversations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Conversations viewable by admins"
  ON questionnaire_conversations FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Conversations updatable by anyone (session-based)"
  ON questionnaire_conversations FOR UPDATE
  USING (true);

-- PROPOSALS
CREATE POLICY "Clients see own proposals, admins see all"
  ON proposals FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = proposals.project_id AND projects.client_id = auth.uid())
    OR is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage proposals"
  ON proposals FOR INSERT
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update proposals"
  ON proposals FOR UPDATE
  USING (is_admin(auth.uid()));

-- MESSAGES
CREATE POLICY "Project participants can view messages"
  ON messages FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = messages.project_id AND projects.client_id = auth.uid())
    OR is_admin(auth.uid())
  );

CREATE POLICY "Project participants can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND (
      EXISTS (SELECT 1 FROM projects WHERE projects.id = messages.project_id AND projects.client_id = auth.uid())
      OR is_admin(auth.uid())
    )
  );

-- FILES
CREATE POLICY "Project participants can view files"
  ON files FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = files.project_id AND projects.client_id = auth.uid())
    OR is_admin(auth.uid())
  );

CREATE POLICY "Project participants can upload files"
  ON files FOR INSERT
  WITH CHECK (
    auth.uid() = uploaded_by
    AND (
      EXISTS (SELECT 1 FROM projects WHERE projects.id = files.project_id AND projects.client_id = auth.uid())
      OR is_admin(auth.uid())
    )
  );

-- ITERATIONS
CREATE POLICY "Project participants can view iterations"
  ON iterations FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = iterations.project_id AND projects.client_id = auth.uid())
    OR is_admin(auth.uid())
  );

CREATE POLICY "Clients can request iterations"
  ON iterations FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = iterations.project_id AND projects.client_id = auth.uid())
  );

CREATE POLICY "Admins can update iterations"
  ON iterations FOR UPDATE
  USING (is_admin(auth.uid()));

-- PAYMENTS
CREATE POLICY "Clients see own payments, admins see all"
  ON payments FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = payments.project_id AND projects.client_id = auth.uid())
    OR is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage payments"
  ON payments FOR INSERT
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update payments"
  ON payments FOR UPDATE
  USING (is_admin(auth.uid()));

-- NOTIFICATIONS
CREATE POLICY "Users see own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can mark own notifications as read"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (is_admin(auth.uid()));

-- ===========================================
-- TRIGGER: Auto-create profile on signup
-- ===========================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
