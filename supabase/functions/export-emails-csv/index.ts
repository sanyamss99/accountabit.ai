import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  try {
    // Create Supabase client with service role key for admin access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Fetch all email signups
    const { data: emailSignups, error } = await supabase
      .from('email_signups')
      .select('email, source, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      throw new Error(`Database error: ${error.message}`)
    }

    if (!emailSignups || emailSignups.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No email signups found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Convert to CSV format
    const csvHeader = 'Email,Source,Created At,Updated At\n'
    const csvRows = emailSignups.map(signup => {
      const email = `"${signup.email}"`
      const source = `"${signup.source || 'unknown'}"`
      const createdAt = `"${new Date(signup.created_at).toISOString()}"`
      const updatedAt = `"${new Date(signup.updated_at).toISOString()}"`
      return `${email},${source},${createdAt},${updatedAt}`
    }).join('\n')

    const csvContent = csvHeader + csvRows

    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0]
    const filename = `accountabit-email-signups-${currentDate}.csv`

    console.log(`✅ Exported ${emailSignups.length} email signups to CSV`)

    return new Response(csvContent, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })

  } catch (error) {
    console.error('Error exporting emails to CSV:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to export emails',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})