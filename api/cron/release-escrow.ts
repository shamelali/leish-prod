import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    const heldPayments = await sql.query(
      `SELECT p.*, b."userId"
      FROM payments p
      JOIN bookings b ON b.id = p."bookingId"
      WHERE p.status = 'held'
        AND p."updatedAt" < NOW() - INTERVAL '3 days'
      LIMIT 10`
    );

    let released = 0;
    for (const payment of heldPayments) {
      await sql.query(
        `INSERT INTO payouts ("userId", amount, status, "paymentId")
        VALUES ($1, $2, 'released', $3)`,
        [payment.userId, payment.amount, payment.id]
      );

      await sql.query(
        `UPDATE payments SET status = 'released', "updatedAt" = NOW() WHERE id = $1`,
        [payment.id]
      );
      released++;
    }

    return new Response(JSON.stringify({ released, total: heldPayments.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Escrow release error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  runtime: 'edge',
};
