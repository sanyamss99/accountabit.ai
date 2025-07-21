import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type EmailSignup = {
  id: string;
  email: string;
  source: string;
  created_at: string;
  updated_at: string;
};

export async function saveEmailSignup(email: string, source: string = 'unknown') {
  try {
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