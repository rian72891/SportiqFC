import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const welcomeHtml = (email: string) => `
<!doctype html><html><body style="font-family:Arial,sans-serif;background:#0a0a0a;color:#fff;margin:0;padding:0">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px">
    <div style="background:linear-gradient(135deg,#dc2626,#b91c1c);padding:24px;border-radius:12px;text-align:center">
      <h1 style="margin:0;font-size:28px;color:#fff">Welcome to SportiqFC! ⚽</h1>
    </div>
    <div style="background:#171717;padding:24px;border-radius:12px;margin-top:16px;color:#e5e5e5;line-height:1.6">
      <p>Hey there 👋</p>
      <p>Thanks for subscribing with <b>${email}</b>. You'll now get the hottest sports news straight to your inbox — Premier League, Champions League, Brasileirão, NBA, UFC and more.</p>
      <p>Stay tuned for breaking stories, transfer scoops and weekly recaps.</p>
      <p style="margin-top:24px">— The SportiqFC team</p>
    </div>
    <p style="text-align:center;color:#737373;font-size:12px;margin-top:16px">You're receiving this because you subscribed at SportiqFC.</p>
  </div>
</body></html>`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: insertErr } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.toLowerCase() });

    if (insertErr && !insertErr.message.includes("duplicate")) {
      console.error("insert error:", insertErr);
      return new Response(JSON.stringify({ error: "Could not subscribe" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    let emailSent = false;
    if (RESEND_API_KEY) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "SportiqFC <onboarding@resend.dev>",
          to: [email],
          subject: "Welcome to SportiqFC ⚽",
          html: welcomeHtml(email),
        }),
      });
      emailSent = r.ok;
      if (!r.ok) console.error("resend error:", await r.text());
      else await supabase.from("newsletter_subscribers").update({ welcomed: true }).eq("email", email.toLowerCase());
    }

    return new Response(JSON.stringify({ success: true, emailSent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
