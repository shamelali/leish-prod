import { Pool } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const baseUrl = `https://${req.headers.get('host') || 'localhost'}`;
  const url = new URL(req.url, baseUrl);
  const action = url.searchParams.get('action') || 'overview';

  try {
    switch (action) {
      case 'artists': {
        const result = await pool.query(
          `SELECT id, name, slug, location, area, rating, "reviewCount", verified, available, experience, "createdAt" FROM artists ORDER BY "createdAt" DESC LIMIT 50`
        );
        await pool.end();
        return json({ artists: result.rows });
      }
      case 'studios': {
        const result = await pool.query(
          `SELECT s.id, s.name, s.slug, s.location, s.area, s.rating, s."reviewCount", s.featured, s.available, s."createdAt",
                  (SELECT COUNT(*) FROM artists a WHERE a."studioId" = s.id)::int AS "artistsCount"
           FROM studios s
           ORDER BY s."createdAt" DESC
           LIMIT 50`
        );
        await pool.end();
        return json({ studios: result.rows });
      }
      case 'users': {
        const result = await pool.query(
          `SELECT id, name, email, role, "createdAt" FROM "user" ORDER BY "createdAt" DESC LIMIT 50`
        );
        await pool.end();
        return json({ users: result.rows });
      }
      case 'bookings': {
        const result = await pool.query(
          `SELECT b.id, b.date, b.time, b.status, b."paymentStatus", b.amount,
                 u.name as "userName", a.name as "artistName"
          FROM bookings b
          LEFT JOIN "user" u ON b."userId" = u.id
          LEFT JOIN artists a ON b."artistId" = a.id
          ORDER BY b."createdAt" DESC LIMIT 50`
        );
        await pool.end();
        return json({ bookings: result.rows });
      }
      case 'payments': {
        const result = await pool.query(
          `SELECT p.id, p.amount, p.currency, p.status, p."paymentMethod", p."createdAt", p."releasedAt",
                 p."bookingId"
          FROM payments p
          ORDER BY p."createdAt" DESC LIMIT 50`
        );
        await pool.end();
        return json({ payments: result.rows });
      }
      case 'toggle-verify': {
        if (req.method !== 'POST') {
          await pool.end();
          return json({ error: 'Method not allowed' }, 405);
        }
        const { artistId, verified } = await req.json();
        await pool.query(`UPDATE artists SET verified = $1 WHERE id = $2`, [verified, artistId]);
        await pool.end();
        return json({ success: true });
      }
      case 'delete-artist': {
        if (req.method !== 'POST') {
          await pool.end();
          return json({ error: 'Method not allowed' }, 405);
        }
        const { artistId } = await req.json();
        await pool.query(`DELETE FROM artists WHERE id = $1`, [artistId]);
        await pool.end();
        return json({ success: true });
      }
      default: {
        const userCountResult = await pool.query(`SELECT COUNT(*)::int as count FROM "user"`);
        const artistCountResult = await pool.query(`SELECT COUNT(*)::int as count FROM artists`);
        const studioCountResult = await pool.query(`SELECT COUNT(*)::int as count FROM studios`);
        const bookingResult = await pool.query(`SELECT COUNT(*)::int as count FROM bookings`);
        const revenueResult = await pool.query(`SELECT COALESCE(SUM(amount), 0)::int as total FROM payments WHERE status = 'paid'`);
        const ratingResult = await pool.query(`SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0)::float as avg FROM artists WHERE rating > 0`);
        const payoutResult = await pool.query(`SELECT COALESCE(SUM(amount), 0)::int as total FROM payments WHERE status = 'held'`);
        const usersThisMonth = await pool.query(`SELECT COUNT(*)::int as count FROM "user" WHERE "createdAt" >= date_trunc('month', CURRENT_DATE)`);

        await pool.end();
        return json({
          totalUsers: userCountResult.rows[0].count,
          totalArtists: artistCountResult.rows[0].count,
          totalStudios: studioCountResult.rows[0].count,
          totalBookings: bookingResult.rows[0].count,
          revenue: revenueResult.rows[0].total,
          avgRating: ratingResult.rows[0].avg,
          pendingPayouts: payoutResult.rows[0].total,
          newUsersThisMonth: usersThisMonth.rows[0].count,
        });
      }
    }
  } catch (err) {
    await pool.end();
    console.error('Admin API error:', err);
    return json({ error: 'Internal server error' }, 500);
  }
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const config = {
  regions: ['iad1'],
};