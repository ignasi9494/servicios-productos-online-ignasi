export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ProjectStatus =
  | 'questionnaire'
  | 'pending_proposal'
  | 'proposal_sent'
  | 'proposal_accepted'
  | 'in_development'
  | 'in_review'
  | 'completed'
  | 'delivered';

export type PlanType = 'launch' | 'build' | 'scale';
export type UserRole = 'client' | 'admin';
export type ProposalStatus = 'draft' | 'sent' | 'accepted' | 'rejected';
export type QuestionnaireStatus = 'in_progress' | 'completed' | 'abandoned';
export type IterationStatus = 'requested' | 'in_progress' | 'completed';
export type PaymentType = 'deposit' | 'final' | 'full' | 'maintenance';
export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
export type SenderRole = 'client' | 'admin' | 'system';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          company: string | null;
          phone: string | null;
          sector: string | null;
          role: UserRole;
          created_at: string;
          notify_messages: boolean | null;
          notify_proposals: boolean | null;
          notify_payments: boolean | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name: string;
          company?: string | null;
          phone?: string | null;
          sector?: string | null;
          role?: UserRole;
          created_at?: string;
          notify_messages?: boolean | null;
          notify_proposals?: boolean | null;
          notify_payments?: boolean | null;
        };
        Update: {
          full_name?: string;
          company?: string | null;
          phone?: string | null;
          sector?: string | null;
          role?: UserRole;
          notify_messages?: boolean | null;
          notify_proposals?: boolean | null;
          notify_payments?: boolean | null;
        };
      };
      projects: {
        Row: {
          id: string;
          client_id: string;
          name: string;
          status: ProjectStatus;
          plan: PlanType | null;
          base_price: number | null;
          extras_price: number | null;
          total_price: number | null;
          delivery_days: number | null;
          max_iterations: number;
          used_iterations: number;
          contract_signed_at: string | null;
          created_at: string;
          preview_url: string | null;
          delivery_url: string | null;
          internal_notes: string | null;
        };
        Insert: {
          id?: string;
          client_id: string;
          name: string;
          status?: ProjectStatus;
          plan?: PlanType | null;
          base_price?: number | null;
          extras_price?: number | null;
          total_price?: number | null;
          delivery_days?: number | null;
          max_iterations?: number;
          used_iterations?: number;
          contract_signed_at?: string | null;
          created_at?: string;
          preview_url?: string | null;
          delivery_url?: string | null;
          internal_notes?: string | null;
        };
        Update: {
          name?: string;
          status?: ProjectStatus;
          plan?: PlanType | null;
          base_price?: number | null;
          extras_price?: number | null;
          total_price?: number | null;
          delivery_days?: number | null;
          max_iterations?: number;
          used_iterations?: number;
          contract_signed_at?: string | null;
          preview_url?: string | null;
          delivery_url?: string | null;
          internal_notes?: string | null;
        };
      };
      questionnaire_conversations: {
        Row: {
          id: string;
          project_id: string | null;
          session_id: string;
          messages_json: Json;
          extracted_data_json: Json | null;
          ai_summary: string | null;
          status: QuestionnaireStatus;
          started_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          project_id?: string | null;
          session_id: string;
          messages_json?: Json;
          extracted_data_json?: Json | null;
          ai_summary?: string | null;
          status?: QuestionnaireStatus;
          started_at?: string;
          completed_at?: string | null;
        };
        Update: {
          project_id?: string | null;
          messages_json?: Json;
          extracted_data_json?: Json | null;
          ai_summary?: string | null;
          status?: QuestionnaireStatus;
          completed_at?: string | null;
        };
      };
      proposals: {
        Row: {
          id: string;
          project_id: string;
          version: number;
          content_md: string;
          stack_description: string | null;
          price_breakdown_json: Json | null;
          timeline_description: string | null;
          status: ProposalStatus;
          sent_at: string | null;
          responded_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          version?: number;
          content_md: string;
          stack_description?: string | null;
          price_breakdown_json?: Json | null;
          timeline_description?: string | null;
          status?: ProposalStatus;
          sent_at?: string | null;
          responded_at?: string | null;
          created_at?: string;
        };
        Update: {
          content_md?: string;
          stack_description?: string | null;
          price_breakdown_json?: Json | null;
          timeline_description?: string | null;
          status?: ProposalStatus;
          sent_at?: string | null;
          responded_at?: string | null;
        };
      };
      messages: {
        Row: {
          id: string;
          project_id: string;
          sender_id: string;
          sender_role: SenderRole;
          content: string;
          attachment_url: string | null;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          sender_id: string;
          sender_role: SenderRole;
          content: string;
          attachment_url?: string | null;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          content?: string;
          attachment_url?: string | null;
          read_at?: string | null;
        };
      };
      files: {
        Row: {
          id: string;
          project_id: string;
          uploaded_by: string;
          file_name: string;
          file_url: string;
          file_type: string | null;
          file_size: number | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          uploaded_by: string;
          file_name: string;
          file_url: string;
          file_type?: string | null;
          file_size?: number | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          file_name?: string;
          file_url?: string;
          file_type?: string | null;
          file_size?: number | null;
          description?: string | null;
        };
      };
      iterations: {
        Row: {
          id: string;
          project_id: string;
          iteration_number: number;
          description: string;
          screenshot_urls: Json | null;
          status: IterationStatus;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          iteration_number: number;
          description: string;
          screenshot_urls?: Json | null;
          status?: IterationStatus;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          description?: string;
          screenshot_urls?: Json | null;
          status?: IterationStatus;
          completed_at?: string | null;
        };
      };
      payments: {
        Row: {
          id: string;
          project_id: string;
          stripe_payment_id: string | null;
          amount: number;
          currency: string;
          type: PaymentType;
          status: PaymentStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          stripe_payment_id?: string | null;
          amount: number;
          currency?: string;
          type: PaymentType;
          status?: PaymentStatus;
          created_at?: string;
        };
        Update: {
          stripe_payment_id?: string | null;
          amount?: number;
          currency?: string;
          status?: PaymentStatus;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          project_id: string | null;
          type: string;
          title: string;
          body: string | null;
          email_sent: boolean;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          project_id?: string | null;
          type: string;
          title: string;
          body?: string | null;
          email_sent?: boolean;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          email_sent?: boolean;
          read?: boolean;
        };
      };
    };
  };
}
