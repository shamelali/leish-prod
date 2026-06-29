import { Pool } from '@neondatabase/serverless';

const cancelBookingSchema = {
  parse: (data: unknown) => {
    const obj = data as Record<string, unknown>;
    if (!('bookingId' in obj)) throw new Error('bookingId required');
    return { bookingId: obj.bookingId };
  }
};

export default async function handler(req: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const baseUrl = `https://${req.headers.get('host') || 'localhost'}`;
  const url = new URL(req.url, baseUrl);
  const action = url.searchParams.get('action');

  try {
    switch (action) {
      case 'favorites': {
        const userId = url.searchParams.get('userId');
        if (!userId) {
          await pool.end();
          return new Response(JSON.stringify({ error: 'userId required' }), { status: 400 });
        }

        if (req.method === 'GET') {
          const favoritesResult = await pool.query(
            `SELECT f.*, a.name, a.image, a.location, a.rating, a.price
            FROM favorites f
            JOIN artists a ON a.id = f."artistId"
            WHERE f."userId" = $1
            ORDER BY f."createdAt" DESC`,
            [userId]
          );
          await pool.end();
          return new Response(JSON.stringify({ favorites: favoritesResult.rows }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (req.method === 'POST') {
          const body = await req.json();
          const { artistId } = body;
          await pool.query(
            `INSERT INTO favorites ("userId", "artistId") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
            [userId, artistId]
          );
          await pool.end();
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (req.method === 'DELETE') {
          const body = await req.json();
          const { artistId } = body;
          await pool.query(
            `DELETE FROM favorites WHERE "userId" = $1 AND "artistId" = $2`,
            [userId, artistId]
          );
          await pool.end();
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        break;
      }

      case 'review': {
        if (req.method !== 'POST') {
          await pool.end();
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }
        const body = await req.json();
        const { userId, artistId, rating, text, author, service } = body;

        if (!userId || !artistId || !rating || !author) {
          await pool.end();
          return new Response(JSON.stringify({ error: 'userId, artistId, rating, and author required' }), { status: 400 });
        }

        const reviewResult = await pool.query(
          `INSERT INTO reviews ("userId", "artistId", rating, text, author, service)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *`,
          [userId, artistId, rating, text, author, service]
        );

        await pool.query(
          `UPDATE artists SET
            "reviewCount" = (SELECT COUNT(*) FROM reviews WHERE "artistId" = $1),
            rating = (SELECT ROUND(AVG(rating)::numeric, 2) FROM reviews WHERE "artistId" = $1)
          WHERE id = $1`,
          [artistId]
        );

        await pool.end();
        return new Response(JSON.stringify({ review: reviewResult.rows[0] }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'cancel-booking': {
        if (req.method !== 'POST') {
          await pool.end();
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }

        let bookingId: string | number;
        try {
          const body = await req.json();
          const parsed = cancelBookingSchema.parse(body);
          bookingId = parsed.bookingId as string | number;
        } catch {
          await pool.end();
          return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
        }

        const currentResult = await pool.query(
          `SELECT * FROM bookings WHERE id = $1`,
          [bookingId]
        );
        const current = currentResult.rows[0];

        if (!current) {
          await pool.end();
          return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404 });
        }

        const cancellable = ['pending', 'confirmed', 'paid_deposit'];
        if (!cancellable.includes(current.status)) {
          await pool.end();
          return new Response(JSON.stringify({ error: `Cannot cancel booking with status '${current.status}'` }), { status: 400 });
        }

        const bookingResult = await pool.query(
          `UPDATE bookings SET status = 'cancelled', "updatedAt" = NOW()
          WHERE id = $1
          RETURNING *`,
          [bookingId]
        );

        await pool.end();
        return new Response(JSON.stringify({ booking: bookingResult.rows[0] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'send-welcome-email': {
        if (req.method !== 'POST') {
          await pool.end();
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }

        const { email, name, role, userId } = await req.json();

        if (!email || !name || !role || !userId) {
          await pool.end();
          return new Response(JSON.stringify({ error: 'email, name, role, and userId required' }), { status: 400 });
        }

        const validRoles = ['client', 'artist', 'studio'];
        if (!validRoles.includes(role)) {
          await pool.end();
          return new Response(JSON.stringify({ error: 'role must be one of: client, artist, studio' }), { status: 400 });
        }

        const userResult = await pool.query(`SELECT email FROM users WHERE id = $1`, [userId]);
        const user = userResult.rows[0];

        if (!user) {
          await pool.end();
          return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        if (user.email !== email) {
          await pool.end();
          return new Response(JSON.stringify({ error: 'Email address does not match authenticated user' }), { status: 403 });
        }

        try {
          const { sendWelcomeEmail } = await import('../src/lib/email/welcome');
          const result = await sendWelcomeEmail({ email, name, role });

          await pool.end();

          if (!result.success) {
            return new Response(JSON.stringify({ success: false, error: 'Failed to send welcome email' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (err) {
          console.error('Welcome email failed:', err);
          await pool.end();
          return new Response(JSON.stringify({ success: false, error: 'Welcome email failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      default:
        await pool.end();
        return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400 });
    }
  } catch (err) {
    await pool.end();
    console.error('User action error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await pool.end();
  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
}

export const config = {
  regions: ['iad1'],
};