import { neon } from '@neondatabase/serverless';
import { sendEmail } from '../../src/lib/email/brevo';
import { bookingExpiredTemplate, bookingAutoCanceledTemplate } from '../../src/lib/email/templates';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!) as any;
  const result = { expired: 0, cancelled: 0 };

  try {
    // 1. Expire abandoned bookings (pending > 2 hours)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    const abandonedBookings = await sql.query(
      `SELECT b.id, b."artistId", b.amount, b."createdAt",
              a.name AS artist_name, u.email AS customer_email, u.name AS customer_name
       FROM bookings b
       LEFT JOIN artists a ON a.id = b."artistId"
       LEFT JOIN "user" u ON u.id = b."userId"
       WHERE b.status = 'pending'
         AND b."createdAt" < $1
       LIMIT 50`,
      [twoHoursAgo]
    );

    for (const booking of abandonedBookings || []) {
      await sql.query(
        `UPDATE bookings SET status = 'cancelled', "updatedAt" = NOW() WHERE id = $1`,
        [booking.id]
      );
      await sql.query(
        `INSERT INTO booking_events ("bookingId", "eventType", "eventPayload", "createdAt")
         VALUES ($1, 'booking_expired', $2, NOW())`,
        [booking.id, JSON.stringify({ reason: 'Payment not completed within 2 hours' })]
      );

      if (booking.customer_email) {
        const template = bookingExpiredTemplate({
          customerName: booking.customer_name || 'there',
          bookingId: String(booking.id),
          providerName: booking.artist_name || 'Provider',
          amount: Number(booking.amount) || 0,
          createdAt: new Date(booking.createdAt).toLocaleString('en-MY'),
        });
        await sendEmail({
          to: booking.customer_email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });
      }
      result.expired++;
    }

    // 2. Cancel unpaid pending bookings (> 24 hours without provider response)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const staleBookings = await sql.query(
      `SELECT b.id, u.email AS customer_email
       FROM bookings b
       LEFT JOIN "user" u ON u.id = b."userId"
       WHERE b.status = 'pending'
         AND b."createdAt" < $1
       LIMIT 50`,
      [twentyFourHoursAgo]
    );

    for (const booking of staleBookings || []) {
      await sql.query(
        `UPDATE bookings SET status = 'cancelled', "updatedAt" = NOW() WHERE id = $1`,
        [booking.id]
      );
      await sql.query(
        `INSERT INTO booking_events ("bookingId", "eventType", "eventPayload", "createdAt")
         VALUES ($1, 'booking_auto_canceled', $2, NOW())`,
        [booking.id, JSON.stringify({ reason: 'No provider response within 24 hours' })]
      );

      if (booking.customer_email) {
        const template = bookingAutoCanceledTemplate({ bookingId: String(booking.id) });
        await sendEmail({
          to: booking.customer_email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });
      }
      result.cancelled++;
    }

    return new Response(JSON.stringify({ ok: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Booking cleanup error:', err);
    return new Response(JSON.stringify({ error: 'Cleanup job failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  runtime: 'edge',
};
