import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!) as any;
  const results: { cleaned: number; message: string }[] = [];

  try {
    // Clean up expired availability slots (older than 7 days, not booked)
    const slotsResult = await sql.query(
      `DELETE FROM availability_slots
       WHERE is_booked = false
         AND "date" < NOW() - INTERVAL '7 days'
       RETURNING id`
    );
    results.push({ cleaned: slotsResult.length || 0, message: 'Expired availability slots' });

    // Clean up old monitoring/audit logs (older than 90 days)
    const logsResult = await sql.query(
      `DELETE FROM admin_audit_log
       WHERE created_at < NOW() - INTERVAL '90 days'
       RETURNING id`
    );
    results.push({ cleaned: logsResult.length || 0, message: 'Old audit logs' });

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Cron cleanup error:', err);
    return new Response(JSON.stringify({ error: 'Cleanup failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  runtime: 'edge',
};
