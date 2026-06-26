import { neon } from '@neondatabase/serverless';
import type { Request } from 'express';

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const action = url.searchParams.get('action') || 'overview';
  const sql = neon(process.env.DATABASE_URL!);

  try {
    switch (action) {
      case 'artists': {
        const artists = await sql`SELECT id, name, slug, location, area, rating, "reviewCount", verified, available, "yearsExperience", "createdAt" FROM artists ORDER BY "createdAt" DESC LIMIT 50`;
        return json({ artists });
      }
      case 'studios': {
        const studios = await sql`SELECT id, name, slug, location, area, rating, "reviewCount", "artistsCount", featured, available, "createdAt" FROM studios ORDER BY "createdAt" DESC LIMIT 50`;
        return json({ studios });
      }
      case 'users': {
        const users = await sql`SELECT id, name, email, role, "createdAt" FROM "user" ORDER BY "createdAt" DESC LIMIT 50`;
        return json({ users });
      }
      case 'bookings': {
        const bookings = await sql`
          SELECT b.id, b.date, b.time, b.status, b."paymentStatus", b.price,
                 u.name as "userName", a.name as "artistName"
          FROM bookings b
          LEFT JOIN "user" u ON b."userId" = u.id
          LEFT JOIN artists a ON b."artistId" = a.id
          ORDER BY b."createdAt" DESC LIMIT 50
        `;
        return json({ bookings });
      }
      case 'payments': {
        const payments = await sql`
          SELECT p.id, p.amount, p.currency, p.status, p."paymentMethod", p."createdAt", p."releasedAt",
                 p."bookingId"
          FROM payments p
          ORDER BY p."createdAt" DESC LIMIT 50
        `;
        return json({ payments });
      }
      case 'toggle-verify': {
        if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
        const { artistId, verified } = await req.json();
        await sql`UPDATE artists SET verified = ${verified} WHERE id = ${artistId}`;
        return json({ success: true });
      }
      case 'delete-artist': {
        if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
        const { artistId } = await req.json();
        await sql`DELETE FROM artists WHERE id = ${artistId}`;
        return json({ success: true });
      }
      default: {
        const [userCount] = await sql`SELECT COUNT(*)::int as count FROM "user"`;
        const [artistCount] = await sql`SELECT COUNT(*)::int as count FROM artists`;
        const [studioCount] = await sql`SELECT COUNT(*)::int as count FROM studios`;
        const [bookingResult] = await sql`SELECT COUNT(*)::int as count FROM bookings`;
        const [revenueResult] = await sql`SELECT COALESCE(SUM(amount), 0)::int as total FROM payments WHERE status = 'paid'`;
        const [ratingResult] = await sql`SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0)::float as avg FROM artists WHERE rating > 0`;
        const [payoutResult] = await sql`SELECT COALESCE(SUM(amount), 0)::int as total FROM payments WHERE status = 'held'`;
        const usersThisMonth = await sql`SELECT COUNT(*)::int as count FROM "user" WHERE "createdAt" >= date_trunc('month', CURRENT_DATE)`;

        return json({
          totalUsers: userCount.count,
          totalArtists: artistCount.count,
          totalStudios: studioCount.count,
          totalBookings: bookingResult.count,
          revenue: revenueResult.total,
          avgRating: ratingResult.avg,
          pendingPayouts: payoutResult.total,
          newUsersThisMonth: usersThisMonth[0].count,
        });
      }
    }
  } catch (err) {
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
  runtime: 'edge',
};
