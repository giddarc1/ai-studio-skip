import { createClient } from '@supabase/supabase-js';

// For Lovable Cloud Supabase integration, check multiple possible env var formats
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.SUPABASE_URL || 
  import.meta.env.VITE_SUPABASE_PROJECT_URL ||
  import.meta.env.VITE_SUPABASE_ANON_URL;

const supabaseKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_ANON_KEY || 
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_KEY;

// Debug: Log available environment variables (remove in production)
console.log('Environment check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseKey,
  url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'none',
  availableEnvVars: Object.keys(import.meta.env).filter(key => key.includes('SUPABASE'))
});

// Create a more permissive client
const createSupabaseClient = () => {
  // If we have both URL and key, try to create real client
  if (supabaseUrl && supabaseKey) {
    console.log('Creating real Supabase client');
    try {
      return createClient(supabaseUrl, supabaseKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      });
    } catch (error) {
      console.error('Failed to create Supabase client:', error);
    }
  }
  
  console.warn('Using mock Supabase client - configure environment variables for full functionality');
  // Return a mock client that won't break the app
  return {
    auth: {
      signInWithPassword: async (credentials: any) => {
        console.log('Mock signInWithPassword called');
        return { data: null, error: new Error('Please configure Supabase environment variables to enable authentication') };
      },
      signUp: async (credentials: any) => {
        console.log('Mock signUp called');
        return { 
          data: { user: null, session: null }, 
          error: new Error('Please configure Supabase environment variables to enable registration') 
        };
      },
      signInWithOAuth: async (options: any) => {
        console.log('Mock signInWithOAuth called');
        return { error: new Error('Please configure Supabase environment variables and OAuth providers') };
      },
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: (callback: any) => ({ 
        data: { 
          subscription: {
            unsubscribe: () => {
              console.log('Mock subscription unsubscribed');
            }
          }
        }
      })
    }
  } as any;
};

export const supabase = createSupabaseClient();