import { sendEmail } from '../src/lib/email/brevo';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const body = await req.json();
    const { to, subject, html, text, from, fromName } = body;

    if (!to || !subject || !html || !text) {
      return new Response(JSON.stringify({ error: 'to, subject, html, and text are required' }), { status: 400 });
    }

    const result = await sendEmail({ to, subject, html, text, from, fromName });

    if (!result.success) {
      return new Response(JSON.stringify({ error: 'Email send failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Email API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Email send failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
