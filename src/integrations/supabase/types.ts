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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      agencies: {
        Row: {
          address: string
          city: string
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_role: string
          created_at: string
          fleet_size: string
          has_drivers: string
          id: string
          legal_status: Database["public"]["Enums"]["legal_status"]
          motivation: string | null
          name: string
          notes: string | null
          registration_number: string
          status: Database["public"]["Enums"]["partner_status"]
          updated_at: string
          vehicle_types: string[]
          years_in_business: string
        }
        Insert: {
          address: string
          city: string
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_role: string
          created_at?: string
          fleet_size: string
          has_drivers: string
          id?: string
          legal_status: Database["public"]["Enums"]["legal_status"]
          motivation?: string | null
          name: string
          notes?: string | null
          registration_number: string
          status?: Database["public"]["Enums"]["partner_status"]
          updated_at?: string
          vehicle_types?: string[]
          years_in_business: string
        }
        Update: {
          address?: string
          city?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          contact_role?: string
          created_at?: string
          fleet_size?: string
          has_drivers?: string
          id?: string
          legal_status?: Database["public"]["Enums"]["legal_status"]
          motivation?: string | null
          name?: string
          notes?: string | null
          registration_number?: string
          status?: Database["public"]["Enums"]["partner_status"]
          updated_at?: string
          vehicle_types?: string[]
          years_in_business?: string
        }
        Relationships: []
      }
      prospects: {
        Row: {
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at: string
          id: string
          message: string | null
          source: string | null
          status: Database["public"]["Enums"]["prospect_status"]
          updated_at: string
          vehicle_needs: string | null
        }
        Insert: {
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at?: string
          id?: string
          message?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["prospect_status"]
          updated_at?: string
          vehicle_needs?: string | null
        }
        Update: {
          company_name?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string
          id?: string
          message?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["prospect_status"]
          updated_at?: string
          vehicle_needs?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          created_at: string
          daily_rate: number
          duration_days: number
          end_date: string
          id: string
          notes: string | null
          prospect_id: string | null
          reference: string
          start_date: string
          status: Database["public"]["Enums"]["quote_status"]
          total_amount: number
          updated_at: string
          vehicle_id: string | null
          with_driver: boolean
        }
        Insert: {
          created_at?: string
          daily_rate: number
          duration_days: number
          end_date: string
          id?: string
          notes?: string | null
          prospect_id?: string | null
          reference: string
          start_date: string
          status?: Database["public"]["Enums"]["quote_status"]
          total_amount: number
          updated_at?: string
          vehicle_id?: string | null
          with_driver?: boolean
        }
        Update: {
          created_at?: string
          daily_rate?: number
          duration_days?: number
          end_date?: string
          id?: string
          notes?: string | null
          prospect_id?: string | null
          reference?: string
          start_date?: string
          status?: Database["public"]["Enums"]["quote_status"]
          total_amount?: number
          updated_at?: string
          vehicle_id?: string | null
          with_driver?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quotes_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          agency_id: string | null
          brand: string
          category: Database["public"]["Enums"]["vehicle_category"]
          created_at: string
          daily_rate: number
          features: string[]
          fuel_type: string
          id: string
          image_url: string | null
          is_available: boolean
          is_popular: boolean
          model: string
          name: string
          seats: number
          transmission: string
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          brand: string
          category: Database["public"]["Enums"]["vehicle_category"]
          created_at?: string
          daily_rate: number
          features?: string[]
          fuel_type?: string
          id?: string
          image_url?: string | null
          is_available?: boolean
          is_popular?: boolean
          model: string
          name: string
          seats?: number
          transmission?: string
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          brand?: string
          category?: Database["public"]["Enums"]["vehicle_category"]
          created_at?: string
          daily_rate?: number
          features?: string[]
          fuel_type?: string
          id?: string
          image_url?: string | null
          is_available?: boolean
          is_popular?: boolean
          model?: string
          name?: string
          seats?: number
          transmission?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      legal_status: "sarl" | "sa" | "sas" | "ei" | "other"
      partner_status:
        | "candidature"
        | "en_verification"
        | "approuve"
        | "refuse"
        | "suspendu"
      prospect_status:
        | "nouveau"
        | "contacte"
        | "qualifie"
        | "converti"
        | "perdu"
      quote_status: "brouillon" | "envoye" | "accepte" | "refuse" | "expire"
      vehicle_category: "berline" | "suv" | "minibus" | "prestige"
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
      legal_status: ["sarl", "sa", "sas", "ei", "other"],
      partner_status: [
        "candidature",
        "en_verification",
        "approuve",
        "refuse",
        "suspendu",
      ],
      prospect_status: ["nouveau", "contacte", "qualifie", "converti", "perdu"],
      quote_status: ["brouillon", "envoye", "accepte", "refuse", "expire"],
      vehicle_category: ["berline", "suv", "minibus", "prestige"],
    },
  },
} as const
