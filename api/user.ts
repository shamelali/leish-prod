import { neon } from '@neondatabase/serverless';
import { enforceRateLimit } from '../src/lib/rate-limit';
import { z } from 'zod';
import { validateBody } from '../src/lib/validate';

const cancelBookingSchema = z.object({
  bookingId: z.union([z.string(), z.number()]),
});

export default async function handler(req: Request) {
  const sql = neon(process.env.DATABASE_URL!) as any;
  const url = new URL(req.url);
  const action = url.searchParams.get('action');

  try {
    switch (action) {
      case 'favorites': {
        const userId = url.searchParams.get('userId');
        if (!userId) {
          return new Response(JSON.stringify({ error: 'userId required' }), { status: 400 });
        }

        if (req.method === 'GET') {
          const favorites = await sql.query(
            `            SELECT f.*, a.name, a.image, a.location, a.rating, a.price
            FROM favorites f
            JOIN artists a ON a.id = f."artistId"
            WHERE f."userId" = $1
            ORDER BY f."createdAt" DESC`,
            [userId]
          );
          return new Response(JSON.stringify({ favorites }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (req.method === 'POST') {
          const body = await req.json();
          const { artistId } = body;
          await sql.query(
            `INSERT INTO favorites ("userId", "artistId") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
            [userId, artistId]
          );
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (req.method === 'DELETE') {
          const body = await req.json();
          const { artistId } = body;
          await sql.query(
            `DELETE FROM favorites WHERE "userId" = $1 AND "artistId" = $2`,
            [userId, artistId]
          );
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        break;
      }

      case 'review': {
        if (req.method !== 'POST') {
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }
        const body = await req.json();
        const { userId, artistId, rating, text, author, service } = body;

        if (!userId || !artistId || !rating || !author) {
          return new Response(JSON.stringify({ error: 'userId, artistId, rating, and author required' }), { status: 400 });
        }

        const [review] = await sql.query(
          `INSERT INTO reviews ("userId", "artistId", rating, text, author, service)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *`,
          [userId, artistId, rating, text, author, service]
        );

        await sql.query(
          `UPDATE artists SET
            "reviewCount" = (SELECT COUNT(*) FROM reviews WHERE "artistId" = $1),
            rating = (SELECT ROUND(AVG(rating)::numeric, 2) FROM reviews WHERE "artistId" = $1)
          WHERE id = $1`,
          [artistId]
        );

        return new Response(JSON.stringify({ review }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'cancel-booking': {
        if (req.method !== 'POST') {
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }

        const rateCheck = enforceRateLimit(req, 'bookings:cancel', 10, 60_000);
        if (!rateCheck.ok) {
          return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
            status: 429,
            headers: { 'Retry-After': String(rateCheck.retryAfterSec), 'Content-Type': 'application/json' },
          });
        }

        const { data, error } = await validateBody(cancelBookingSchema)(req);
        if (error) return error;
        const bookingId = data!.bookingId;

        // Fetch current booking to validate transition
        const [current] = await sql.query(
          `SELECT * FROM bookings WHERE id = $1`,
          [bookingId]
        );

        if (!current) {
          return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404 });
        }

        const cancellable = ['pending', 'confirmed', 'paid_deposit'];
        if (!cancellable.includes(current.status)) {
          return new Response(JSON.stringify({ error: `Cannot cancel booking with status '${current.status}'` }), { status: 400 });
        }

        const [booking] = await sql.query(
          `UPDATE bookings SET status = 'cancelled', "updatedAt" = NOW()
          WHERE id = $1
          RETURNING *`,
          [bookingId]
        );

        // Log cancellation event
        await sql.query(
          `INSERT INTO booking_events ("bookingId", "eventType", "eventPayload", "createdAt")
           VALUES ($1, 'status_changed_to_cancelled', $2, NOW())`,
          [bookingId, JSON.stringify({ previousStatus: current.status })]
        );

        return new Response(JSON.stringify({ booking }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400 });
    }
  } catch (err) {
    console.error('User action error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
}

export const config = {
  runtime: 'edge',
};
