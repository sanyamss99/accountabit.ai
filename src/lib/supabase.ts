import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client if environment variables are missing
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured. Using mock client.');
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

export type EmailSignup = {
  id: string;
  email: string;
  source: string;
  created_at: string;
  updated_at: string;
};

export async function saveEmailSignup(email: string, source: string = 'unknown') {
  try {
    // If Supabase is not configured, simulate success for demo purposes
    if (!supabase) {
      console.log('Demo mode: Email signup simulated', { email, source });
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        success: true, 
        data: { 
          id: crypto.randomUUID(), 
          email, 
          source, 
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } 
      };
    }

    const { data, error } = await supabase
      .from('email_signups')
      .insert([{ email, source }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Error saving email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to save email' 
    };
  }
}