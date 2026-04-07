import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://xxrzifumbzkhjxqtqkln.supabase.co';
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4cnppZnVtYnpraGp4cXRxa2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MzY1MjksImV4cCI6MjA5MTAxMjUyOX0.jgj91vGYLbfckRfE26f-rYorQDfEBZ0arSkOM3Bnn_A';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL or Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
