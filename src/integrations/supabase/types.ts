export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booked_at: string
          cancellation_reason: string | null
          cancelled_at: string | null
          checked_in: boolean | null
          checked_in_at: string | null
          credits_used: number | null
          id: string
          schedule_id: string
          status: Database["public"]["Enums"]["booking_status"] | null
          user_id: string
        }
        Insert: {
          booked_at?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          checked_in?: boolean | null
          checked_in_at?: string | null
          credits_used?: number | null
          id?: string
          schedule_id: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          user_id: string
        }
        Update: {
          booked_at?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          checked_in?: boolean | null
          checked_in_at?: string | null
          credits_used?: number | null
          id?: string
          schedule_id?: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "class_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      class_schedules: {
        Row: {
          booked_count: number | null
          capacity: number
          class_id: string
          coach_id: string | null
          created_at: string
          end_time: string
          id: string
          is_recurring: boolean | null
          notes: string | null
          parent_schedule_id: string | null
          recurrence_rule: string | null
          start_time: string
          status: string | null
        }
        Insert: {
          booked_count?: number | null
          capacity?: number
          class_id: string
          coach_id?: string | null
          created_at?: string
          end_time: string
          id?: string
          is_recurring?: boolean | null
          notes?: string | null
          parent_schedule_id?: string | null
          recurrence_rule?: string | null
          start_time: string
          status?: string | null
        }
        Update: {
          booked_count?: number | null
          capacity?: number
          class_id?: string
          coach_id?: string | null
          created_at?: string
          end_time?: string
          id?: string
          is_recurring?: boolean | null
          notes?: string | null
          parent_schedule_id?: string | null
          recurrence_rule?: string | null
          start_time?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_schedules_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_schedules_parent_schedule_id_fkey"
            columns: ["parent_schedule_id"]
            isOneToOne: false
            referencedRelation: "class_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      class_types: {
        Row: {
          badge_label: string | null
          badge_variant: string | null
          created_at: string
          default_capacity: number | null
          default_duration: number | null
          description: string | null
          difficulty_level:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          id: string
          is_active: boolean | null
          name: string
          sort_order: number | null
        }
        Insert: {
          badge_label?: string | null
          badge_variant?: string | null
          created_at?: string
          default_capacity?: number | null
          default_duration?: number | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          id?: string
          is_active?: boolean | null
          name: string
          sort_order?: number | null
        }
        Update: {
          badge_label?: string | null
          badge_variant?: string | null
          created_at?: string
          default_capacity?: number | null
          default_duration?: number | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          id?: string
          is_active?: boolean | null
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      classes: {
        Row: {
          class_type_id: string
          coach_id: string | null
          created_at: string
          id: string
          is_online: boolean | null
          location: string | null
          zoom_link: string | null
        }
        Insert: {
          class_type_id: string
          coach_id?: string | null
          created_at?: string
          id?: string
          is_online?: boolean | null
          location?: string | null
          zoom_link?: string | null
        }
        Update: {
          class_type_id?: string
          coach_id?: string | null
          created_at?: string
          id?: string
          is_online?: boolean | null
          location?: string | null
          zoom_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_class_type_id_fkey"
            columns: ["class_type_id"]
            isOneToOne: false
            referencedRelation: "class_types"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_plans: {
        Row: {
          billing_interval: string
          class_credits: number | null
          created_at: string
          description: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          price: number
          sort_order: number | null
          stripe_price_id: string | null
          stripe_product_id: string | null
          unlimited_classes: boolean | null
          updated_at: string
        }
        Insert: {
          billing_interval?: string
          class_credits?: number | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          sort_order?: number | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          unlimited_classes?: boolean | null
          updated_at?: string
        }
        Update: {
          billing_interval?: string
          class_credits?: number | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          sort_order?: number | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          unlimited_classes?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      memberships: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          notes: string | null
          plan_id: string
          remaining_credits: number | null
          status: Database["public"]["Enums"]["membership_status"] | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          notes?: string | null
          plan_id: string
          remaining_credits?: number | null
          status?: Database["public"]["Enums"]["membership_status"] | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          notes?: string | null
          plan_id?: string
          remaining_credits?: number | null
          status?: Database["public"]["Enums"]["membership_status"] | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "membership_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string | null
          health_notes: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          health_notes?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          health_notes?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          accent_color: string | null
          background_color: string | null
          created_at: string
          cta_link: string | null
          cta_text: string | null
          description: string | null
          dismissible: boolean
          display_type: string
          end_date: string | null
          id: string
          is_active: boolean
          priority: number
          start_date: string
          target_pages: string[] | null
          text_color: string | null
          title: string
          updated_at: string
        }
        Insert: {
          accent_color?: string | null
          background_color?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          dismissible?: boolean
          display_type?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          priority?: number
          start_date?: string
          target_pages?: string[] | null
          text_color?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          accent_color?: string | null
          background_color?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          dismissible?: boolean
          display_type?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          priority?: number
          start_date?: string
          target_pages?: string[] | null
          text_color?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      video_progress: {
        Row: {
          completed: boolean | null
          id: string
          last_watched_at: string | null
          user_id: string
          video_id: string
          watched_seconds: number | null
        }
        Insert: {
          completed?: boolean | null
          id?: string
          last_watched_at?: string | null
          user_id: string
          video_id: string
          watched_seconds?: number | null
        }
        Update: {
          completed?: boolean | null
          id?: string
          last_watched_at?: string | null
          user_id?: string
          video_id?: string
          watched_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "video_progress_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          access_level: Database["public"]["Enums"]["video_access_level"] | null
          category_id: string | null
          coach_id: string | null
          created_at: string | null
          description: string | null
          difficulty_level:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          duration_minutes: number | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          sort_order: number | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          view_count: number | null
          youtube_video_id: string
        }
        Insert: {
          access_level?:
            | Database["public"]["Enums"]["video_access_level"]
            | null
          category_id?: string | null
          coach_id?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          sort_order?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
          youtube_video_id: string
        }
        Update: {
          access_level?:
            | Database["public"]["Enums"]["video_access_level"]
            | null
          category_id?: string | null
          coach_id?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          sort_order?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
          youtube_video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "video_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          created_at: string
          id: string
          notified_at: string | null
          position: number
          schedule_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notified_at?: string | null
          position: number
          schedule_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notified_at?: string | null
          position?: number
          schedule_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "waitlist_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "class_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_video: {
        Args: {
          _access_level: Database["public"]["Enums"]["video_access_level"]
          _user_id: string
        }
        Returns: boolean
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "coach" | "member"
      booking_status: "confirmed" | "cancelled" | "completed" | "no_show"
      difficulty_level: "beginner" | "intermediate" | "advanced" | "all_levels"
      membership_status:
        | "active"
        | "paused"
        | "cancelled"
        | "expired"
        | "pending"
      video_access_level: "public" | "member" | "vip"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "coach", "member"],
      booking_status: ["confirmed", "cancelled", "completed", "no_show"],
      difficulty_level: ["beginner", "intermediate", "advanced", "all_levels"],
      membership_status: [
        "active",
        "paused",
        "cancelled",
        "expired",
        "pending",
      ],
      video_access_level: ["public", "member", "vip"],
    },
  },
} as const
