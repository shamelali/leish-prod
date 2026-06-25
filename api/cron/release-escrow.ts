import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!) as any;

  try {
    const heldPayments = await sql(
      `SELECT p.*, b.user_id
      FROM payments p
      JOIN bookings b ON b.id = p.booking_id
      WHERE p.status = 'held'
        AND p.updated_at < NOW() - INTERVAL '3 days'
      LIMIT 10`
    );

    let released = 0;
    for (const payment of heldPayments) {
      const [payout] = await sql(
        `INSERT INTO payouts (user_id, amount, status, payment_id)
        VALUES ($1, $2, 'released', $3)
        RETURNING *`,
        payment.user_id,
        payment.amount,
        payment.id
      );

      await sql(
        `UPDATE payments SET status = 'released', updated_at = NOW() WHERE id = $1`,
        payment.id
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
