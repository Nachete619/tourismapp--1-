import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Create a mock Supabase client for development/preview when env vars aren't available
const createMockClient = () => {
  console.warn("Using mock Supabase client. Some features will be limited.")

  // Return a mock client with methods that return empty data
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          limit: () => Promise.resolve({ data: [], error: null, count: 0 }),
          single: () => Promise.resolve({ data: null, error: null }),
        }),
        order: () => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
      }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: {}, error: null }),
        }),
      }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
      signUp: () => Promise.resolve({ data: {}, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
  } as any
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

// Create the appropriate client
export const supabase = isSupabaseConfigured ? createClient<Database>(supabaseUrl, supabaseAnonKey) : createMockClient()

// Export a flag to check if Supabase is configured
export const isSupabaseAvailable = isSupabaseConfigured
