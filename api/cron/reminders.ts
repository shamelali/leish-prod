import { neon } from '@neondatabase/serverless';
import { sendEmail } from '../../src/lib/email/brevo';
import { bookingReminderTemplate } from '../../src/lib/email/templates';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!) as any;

  try {
    // Find bookings starting in ~24 hours that haven't had reminders sent
    const bookings = await sql.query(
      `SELECT b.id, b."userId", b.date, b.time,
              a.name AS artist_name, u.email AS customer_email, u.name AS customer_name
       FROM bookings b
       JOIN artists a ON a.id = b."artistId"
       JOIN "user" u ON u.id = b."userId"
       WHERE b.status IN ('confirmed', 'paid_deposit', 'paid_full')
         AND b.date = CURRENT_DATE + INTERVAL '1 day'
         AND NOT EXISTS (
           SELECT 1 FROM booking_events be
           WHERE be."bookingId" = b.id
             AND be."eventType" = 'reminder_sent'
         )
       LIMIT 100`
    );

    if (!bookings || bookings.length === 0) {
      return new Response(JSON.stringify({ ok: true, sent: 0, total: 0 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let sent = 0;
    let failed = 0;

    for (const booking of bookings) {
      try {
        const date = booking.date
          ? new Date(booking.date).toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          : 'TBC';
        const time = booking.time || 'TBC';

        if (booking.customer_email) {
          const template = bookingReminderTemplate({
            customerName: booking.customer_name || 'Valued Customer',
            bookingId: booking.id,
            serviceName: 'Appointment',
            providerName: booking.artist_name || 'Your Artist',
            date,
            time,
          });

          const result = await sendEmail({
            to: booking.customer_email,
            subject: template.subject,
            html: template.html,
            text: template.text,
          });

          if (result.success) {
            sent++;
          } else {
            failed++;
          }
        }

        // Log reminder sent
        await sql.query(
          `INSERT INTO booking_events ("bookingId", "eventType", "eventPayload", "createdAt")
           VALUES ($1, 'reminder_sent', $2, NOW())`,
          [booking.id, JSON.stringify({ email: booking.customer_email })]
        );
      } catch (err) {
        console.error('Error sending reminder for booking:', booking.id, err);
        failed++;
      }
    }

    return new Response(JSON.stringify({ ok: true, sent, failed, total: bookings.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Cron reminders error:', err);
    return new Response(JSON.stringify({ error: 'Failed to process reminders' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  runtime: 'edge',
};
