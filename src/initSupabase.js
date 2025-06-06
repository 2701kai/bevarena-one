// src/initSupabase.js
// Mock database connection using Supabase (for future scalability)
import { createClient } from "@supabase/supabase-js";

// Replace with your own Supabase project URL and anon key in .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example usage:
// supabase.from('users').select('*').then(console.log);
