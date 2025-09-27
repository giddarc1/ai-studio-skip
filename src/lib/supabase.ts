import { createClient } from '@supabase/supabase-js';

// Supabase configuration - using actual project credentials
const supabaseUrl = 'https://yofxdbitnnwchbycqllo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZnhkYml0bm53Y2hieWNxbGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MzU0ODYsImV4cCI6MjA3NDUxMTQ4Nn0.sbAFWPfOf2jZMbFW6Pu59eMrqBFpbxQv-Z8uD4NQNVU';

// Create Supabase client with your actual project credentials
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});