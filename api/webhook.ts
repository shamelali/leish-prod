import { getPool } from "../src/lib/db";

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const pool = getPool();

  try {
    const body = await req.json();
    const event = req.headers.get("x-event") || "unknown";

    await pool.query(
      `INSERT INTO webhook_events (event, payload, status) VALUES ($1, $2, 'received')`,
      [event, JSON.stringify(body)],
    );

    if (body.id && body.paid_at) {
      await pool.query(
        `UPDATE payments SET status = 'paid', "updatedAt" = NOW() WHERE "billplzBillId" = $1`,
        [body.id],
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = {
  regions: ["iad1"],
};
