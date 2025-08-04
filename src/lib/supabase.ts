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
      
      // Simulate sending welcome email in demo mode
      console.log('📧 Demo: Welcome email would be sent to:', email);
      
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
      .upsert([{ email, source }], { onConflict: 'email' })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Send welcome email after successful signup
    try {
      await sendWelcomeEmail(email, source);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the signup if email fails
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

async function sendWelcomeEmail(email: string, source: string) {
  try {
    // If Supabase is not configured, just log for demo
    if (!supabase) {
      console.log('📧 Demo mode: Email would be sent to:', email, 'from source:', source);
      return;
    }

    const { data, error } = await supabase.functions.invoke('send-welcome-email', {
      body: { email, source }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw error;
    }

    if (data?.demo) {
      console.log('📧 Demo mode: Email simulated for:', email);
    } else {
      console.log('✅ Welcome email sent successfully to:', email);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    throw error;
  }
}