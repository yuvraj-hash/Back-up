import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
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

export interface Registration {
  id: string
  created_at: string
  type: 'participant' | 'spectator'
  event_name: string
  name: string
  email: string
  phone: string
  number: number
  spl_requirements: string | null
  seat_no: string | null
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
      registrations: {
        Row: {
          id: string
          created_at: string
          type: 'participant' | 'spectator'
          event_name: string
          name: string
          email: string
          phone: string
          number: number
          spl_requirements: string | null
          seat_no: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          type: 'participant' | 'spectator'
          event_name: string
          name: string
          email: string
          phone: string
          number: number
          spl_requirements?: string | null
          seat_no?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          type?: 'participant' | 'spectator'
          event_name?: string
          name?: string
          email?: string
          phone?: string
          number?: number
          spl_requirements?: string | null
          seat_no?: string | null
        }
      }
    }
  }
}

// Function to insert registration data
export const insertRegistration = async (registrationData: {
  type: 'participant' | 'spectator'
  event_name: string
  name: string
  email: string
  phone: string
  number: number
  spl_requirements?: string | null
  seat_no?: string | null
}) => {
  const { data, error } = await supabase
    .from('registrations')
    .insert([registrationData])
    .select()
    .single()

  if (error) {
    console.error('Error inserting registration:', error)
    throw error
  }

  return data
}

// Function to get all registrations
export const getRegistrations = async () => {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching registrations:', error)
    throw error
  }

  return data
}

// Function to get registrations by event
export const getRegistrationsByEvent = async (eventName: string) => {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('event_name', eventName)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching registrations by event:', error)
    throw error
  }

  return data
}
