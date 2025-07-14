import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface NewsletterSubscriber {
  id: string
  email: string
  created_at: string
}

export interface Booking {
  id: string
  booking_type: string
  created_at: string
  sport: string
  location: string
  time_slot: string
  date: string
  players: number
  duration: number
  name: string
  email: string
  phone: string
  total_amount: number
}

// Database type definitions
export type Database = {
  public: {
    Tables: {
      newsletter: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          booking_type: string
          created_at: string
          sport: string
          location: string
          time_slot: string
          date: string
          players: number
          duration: number
          name: string
          email: string
          phone: string
          total_amount: number
        }
        Insert: {
          id?: string
          booking_type: string
          created_at?: string
          sport: string
          location: string
          time_slot: string
          date: string
          players: number
          duration: number
          name: string
          email: string
          phone: string
          total_amount: number
        }
        Update: {
          id?: string
          booking_type?: string
          created_at?: string
          sport?: string
          location?: string
          time_slot?: string
          date?: string
          players?: number
          duration?: number
          name?: string
          email?: string
          phone?: string
          total_amount?: number
        }
      }
    }
  }
}
