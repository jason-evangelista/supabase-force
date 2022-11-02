export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      api_call_analytics: {
        Row: {
          id: string
          api_path: string
          called_at: string
          called_by: string
        }
        Insert: {
          id?: string
          api_path: string
          called_at?: string
          called_by: string
        }
        Update: {
          id?: string
          api_path?: string
          called_at?: string
          called_by?: string
        }
      }
      image_post: {
        Row: {
          id: string
          image_url: string
          compress_action: string
          is_public: boolean
          description: string
          created_by: string
          created_at: string
          updated_at: string
          description_doc: unknown | null
        }
        Insert: {
          id?: string
          image_url: string
          compress_action: string
          is_public: boolean
          description: string
          created_by: string
          created_at?: string
          updated_at?: string
          description_doc?: unknown | null
        }
        Update: {
          id?: string
          image_url?: string
          compress_action?: string
          is_public?: boolean
          description?: string
          created_by?: string
          created_at?: string
          updated_at?: string
          description_doc?: unknown | null
        }
      }
      peer_review: {
        Row: {
          id: string
          review_insight: string
          created_by: string | null
          created_at: string | null
          updated_at: string | null
          review_insight_doc: unknown | null
        }
        Insert: {
          id?: string
          review_insight: string
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
          review_insight_doc?: unknown | null
        }
        Update: {
          id?: string
          review_insight?: string
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
          review_insight_doc?: unknown | null
        }
      }
      user_profile: {
        Row: {
          user_id: string
          user_name: string
          user_email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          user_name: string
          user_email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          user_name?: string
          user_email?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_user_replication: {
        Args: { id: string; user_name: string; user_email: string }
        Returns: undefined
      }
      get_all_image_post: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      get_user_replicate: {
        Args: { userid: string }
        Returns: unknown
      }
      insert_image_post: {
        Args: {
          image_url: string
          is_public: boolean
          description: string
          compress_action: string
          created_by: string
        }
        Returns: undefined
      }
      insert_peer_review: {
        Args: { review_insight: string; created_by: string }
        Returns: undefined
      }
      record_api_call_analytics: {
        Args: { api_path: string; called_by: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
