import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const sql = neon(process.env.DATABASE_URL!) as any;

  try {
    const [userCount] = await sql`SELECT COUNT(*)::int as count FROM "user"`;
    const [artistCount] = await sql`SELECT COUNT(*)::int as count FROM artists`;
    const [studioCount] = await sql`SELECT COUNT(*)::int as count FROM studios`;
    const [bookingResult] = await sql`SELECT COUNT(*)::int as count FROM bookings`;
    const [revenueResult] = await sql`SELECT COALESCE(SUM(amount), 0)::int as total FROM payments WHERE status = 'paid'`;
    const [ratingResult] = await sql`SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0)::float as avg FROM artists WHERE rating > 0`;
    const [payoutResult] = await sql`SELECT COALESCE(SUM(amount), 0)::int as total FROM payments WHERE status = 'held'`;
    const usersThisMonth = await sql`
      SELECT COUNT(*)::int as count FROM "user"
      WHERE "createdAt" >= date_trunc('month', CURRENT_DATE)
    `;

    return new Response(JSON.stringify({
      totalUsers: userCount.count,
      totalArtists: artistCount.count,
      totalStudios: studioCount.count,
      totalBookings: bookingResult.count,
      revenue: revenueResult.total,
      avgRating: ratingResult.avg,
      pendingPayouts: payoutResult.total,
      newUsersThisMonth: usersThisMonth[0].count,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Admin API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  runtime: 'edge',
};
