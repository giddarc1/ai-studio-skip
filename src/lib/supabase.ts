import { createClient } from '@supabase/supabase-js';

// For Lovable Cloud Supabase integration, check multiple possible env var formats
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.SUPABASE_URL || 
  import.meta.env.VITE_SUPABASE_PROJECT_URL;

const supabaseKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_ANON_KEY || 
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if variables aren't available (development fallback)
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables not found. Using mock client for development.');
    // Return a mock client that won't break the app
    return {
      auth: {
        signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
        signInWithOAuth: async () => ({ error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: null } })
      }
    } as any;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
};

export const supabase = createSupabaseClient();