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
      get_user_replicate: {
        Args: { userid: string }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
