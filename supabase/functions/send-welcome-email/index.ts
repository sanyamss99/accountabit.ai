import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, source } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Email template
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to accountabit.ai</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 40px 30px; text-align: center; }
        .logo { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
        .content { padding: 40px 30px; }
        .welcome-box { background: #f1f5f9; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .features { margin: 30px 0; }
        .feature { display: flex; align-items: flex-start; margin: 15px 0; }
        .feature-icon { width: 24px; height: 24px; background: #2563eb; border-radius: 50%; margin-right: 15px; flex-shrink: 0; margin-top: 2px; }
        .cta-button { display: inline-block; background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { background: #f8fafc; padding: 30px; text-align: center; color: #64748b; font-size: 14px; }
        .social-links { margin: 20px 0; }
        .social-links a { color: #2563eb; text-decoration: none; margin: 0 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">accountabit.ai</div>
          <p style="margin: 0; font-size: 18px; opacity: 0.9;">Your AI Accountability Coach</p>
        </div>
        
        <div class="content">
          <h1 style="color: #1e293b; margin-bottom: 20px;">Welcome to the Future of Goal Achievement! 🎯</h1>
          
          <p>Hi there!</p>
          
          <p>Thank you for joining the <strong>accountabit.ai</strong> waitlist! You're now part of an exclusive group of ambitious individuals who are ready to transform their goals into achievements.</p>
          
          <div class="welcome-box">
            <h3 style="margin-top: 0; color: #2563eb;">🚀 You're In! Here's What Happens Next:</h3>
            <p style="margin-bottom: 0;">We're putting the finishing touches on your AI accountability coach. You'll be among the first to know when we launch, plus you'll get exclusive early access and special pricing.</p>
          </div>
          
          <h3 style="color: #1e293b;">What Makes accountabit.ai Different?</h3>
          
          <div class="features">
            <div class="feature">
              <div class="feature-icon"></div>
              <div>
                <strong>Proactive AI Coaching</strong><br>
                Your AI coach calls you, checks in, and provides real-time guidance to keep you on track.
              </div>
            </div>
            
            <div class="feature">
              <div class="feature-icon"></div>
              <div>
                <strong>Smart Goal Breakdown</strong><br>
                Transform overwhelming objectives into clear, actionable daily tasks.
              </div>
            </div>
            
            <div class="feature">
              <div class="feature-icon"></div>
              <div>
                <strong>Intelligent Progress Tracking</strong><br>
                Advanced analytics provide insights to optimize your path to success.
              </div>
            </div>
            
            <div class="feature">
              <div class="feature-icon"></div>
              <div>
                <strong>Accountability That Works</strong><br>
                Gentle but persistent accountability that adapts to your style.
              </div>
            </div>
          </div>
          
          <h3 style="color: #1e293b;">Your Early Access Benefits:</h3>
          <ul style="color: #475569;">
            <li>🎯 <strong>First Access</strong> - Be among the first to use the platform</li>
            <li>💎 <strong>Special Pricing</strong> - Exclusive launch discount for waitlist members</li>
            <li>✨ <strong>Beta Features</strong> - Access to exclusive features and updates</li>
            <li>🏆 <strong>Priority Support</strong> - Direct line to our team during launch</li>
          </ul>
          
          <p>We're incredibly excited to help you turn your biggest goals into your greatest achievements. The future of accountability is intelligent, proactive, and personalized.</p>
          
          <p style="margin-bottom: 30px;">Stay tuned for updates, and get ready to experience goal achievement like never before!</p>
          
          <p>Best regards,<br>
          <strong>The accountabit.ai Team</strong></p>
        </div>
        
        <div class="footer">
          <p><strong>accountabit.ai</strong> - Intelligent accountability coaching that transforms goals into achievements.</p>
          
          <div class="social-links">
            <a href="https://accountabit.ai">Visit Website</a> |
            <a href="mailto:hello@accountabit.ai">Contact Us</a>
          </div>
          
          <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
            You received this email because you signed up for the accountabit.ai waitlist. 
            We'll only send you important updates about your accountability journey.
          </p>
        </div>
      </div>
    </body>
    </html>
    `

    // For demo purposes, we'll simulate sending the email
    // In production, you would integrate with an email service like:
    // - Resend (recommended for Supabase)
    // - SendGrid
    // - Mailgun
    // - AWS SES

    console.log(`📧 Welcome email would be sent to: ${email}`)
    console.log(`📊 Source: ${source}`)
    console.log(`✅ Email content prepared and ready to send`)

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome email sent successfully',
        email: email,
        source: source
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error sending welcome email:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send welcome email',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})