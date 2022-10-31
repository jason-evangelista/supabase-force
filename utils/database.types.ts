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
      image_post: {
        Row: {
          image_url: string
          compress_action: string
          is_public: boolean
          description: string
          created_by: string
          id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          image_url: string
          compress_action: string
          is_public: boolean
          description: string
          created_by: string
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          image_url?: string
          compress_action?: string
          is_public?: boolean
          description?: string
          created_by?: string
          id?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_profile: {
        Row: {
          user_id: string
          user_name: string
          user_email: string
          updated_at: string
          created_at: string
        }
        Insert: {
          user_id: string
          user_name: string
          user_email: string
          updated_at?: string
          created_at?: string
        }
        Update: {
          user_id?: string
          user_name?: string
          user_email?: string
          updated_at?: string
          created_at?: string
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
    }
    Enums: {
      [_ in never]: never
    }
  }
}
