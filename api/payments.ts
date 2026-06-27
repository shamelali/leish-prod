import { Pool, neonConfig } from '@neondatabase/serverless';

const BILLPLZ_API = process.env.BILLPLZ_API_URL || 'https://www.billplz-sandbox.com/api/v3';

function billplzAuth() {
  return `Basic ${btoa(process.env.BILLPLZ_API_KEY! + ':')}`;
}

export default async function handler(req: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const baseUrl = `https://${req.headers.get('host') || 'localhost'}`;
  const url = new URL(req.url, baseUrl);
  const action = url.searchParams.get('action');

  try {
    switch (action) {
      case 'create-bill': {
        if (req.method !== 'POST') {
          pool.end();
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }
        const body = await req.json();
        const { bookingId, amount, description, name, email, phone } = body;

        if (!bookingId || !amount) {
          pool.end();
          return new Response(JSON.stringify({ error: 'bookingId and amount required' }), { status: 400 });
        }

        const billplzBody = new URLSearchParams({
          collection_id: process.env.BILLPLZ_COLLECTION_ID!,
          description: description || 'Beauty booking payment',
          amount: String(Math.round(Number(amount) * 100)),
          name: name || 'Customer',
          email: email || '',
          phone: phone || '',
          callback_url: `${process.env.NEXT_PUBLIC_URL}/api/payments?action=webhook`,
          redirect_url: `${process.env.NEXT_PUBLIC_URL}/bookings/${bookingId}/success`,
        });

        const billplzResponse = await fetch(`${BILLPLZ_API}/bills`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: billplzAuth(),
          },
          body: billplzBody,
        });

        const billplzData = await billplzResponse.json();

        if (!billplzResponse.ok) {
          pool.end();
          return new Response(JSON.stringify({ error: billplzData }), {
            status: billplzResponse.status,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const { rows: [payment] } = await pool.query(
          `INSERT INTO payments ("bookingId", amount, status, "billplzBillId", "paymentMethod")
          VALUES ($1, $2, 'pending', $3, 'billplz')
          RETURNING *`,
          [bookingId, Math.round(Number(amount)), billplzData.id]
        );

        await pool.end();
        return new Response(JSON.stringify({ bill: billplzData, payment }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'status': {
        if (req.method !== 'GET') {
          pool.end();
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }
        const paymentId = url.searchParams.get('paymentId');
        if (!paymentId) {
          pool.end();
          return new Response(JSON.stringify({ error: 'paymentId required' }), { status: 400 });
        }

        const { rows: [payment] } = await pool.query(
          `SELECT * FROM payments WHERE id = $1`,
          [paymentId]
        );

        if (!payment) {
          pool.end();
          return new Response(JSON.stringify({ error: 'Payment not found' }), { status: 404 });
        }

        if (payment.billplzbillid) {
          const billplzResponse = await fetch(
            `${BILLPLZ_API}/bills/${payment.billplzbillid}`,
            {
              headers: {
                Authorization: billplzAuth(),
              },
            }
          );
          const billplzData = await billplzResponse.json();

          if (billplzData.paid_at) {
            await pool.query(
              `UPDATE payments SET status = 'paid', "updatedAt" = NOW() WHERE id = $1`,
              [paymentId]
            );
          }

          await pool.end();
          return new Response(JSON.stringify({ payment, billplz: billplzData }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        await pool.end();
        return new Response(JSON.stringify({ payment }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'release': {
        if (req.method !== 'POST') {
          pool.end();
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }
        const body = await req.json();
        const { paymentId } = body;

        if (!paymentId) {
          pool.end();
          return new Response(JSON.stringify({ error: 'paymentId required' }), { status: 400 });
        }

        const { rows: [payment] } = await pool.query(
          `SELECT * FROM payments WHERE id = $1 AND status = 'held'`,
          [paymentId]
        );

        if (!payment) {
          pool.end();
          return new Response(JSON.stringify({ error: 'Payment not found or not in held status' }), { status: 400 });
        }

        await pool.query(
          `UPDATE payments SET status = 'released', "updatedAt" = NOW() WHERE id = $1`,
          [paymentId]
        );

        await pool.end();
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'register-bank': {
        if (req.method !== 'POST') {
          pool.end();
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }
        const bankBody = await req.json();
        const { userId, bankName, accountNumber, accountHolder } = bankBody;

        if (!userId || !bankName || !accountNumber || !accountHolder) {
          pool.end();
          return new Response(JSON.stringify({ error: 'All fields required' }), { status: 400 });
        }

        const { rows: [account] } = await pool.query(
          `INSERT INTO mua_bank_accounts ("userId", "bankCode", "bankAccountNumber", "bankAccountName")
          VALUES ($1, $2, $3, $4)
          RETURNING *`,
          [userId, bankName, accountNumber, accountHolder]
        );

        await pool.end();
        return new Response(JSON.stringify({ account }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'refund': {
        if (req.method !== 'POST') {
          pool.end();
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }
        const refundBody = await req.json();
        const refundPaymentId = refundBody.paymentId;

        if (!refundPaymentId) {
          pool.end();
          return new Response(JSON.stringify({ error: 'paymentId required' }), { status: 400 });
        }

        const { rows: [payment] } = await pool.query(
          `SELECT * FROM payments WHERE id = $1 AND status IN ('paid', 'held')`,
          [refundPaymentId]
        );

        if (!payment) {
          pool.end();
          return new Response(JSON.stringify({ error: 'Payment not found or cannot be refunded' }), { status: 400 });
        }

        if (payment.billplzbillid) {
          const billplzResponse = await fetch(
            `${BILLPLZ_API}/bills/${payment.billplzbillid}/refund`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: billplzAuth(),
              },
              body: JSON.stringify({ amount: payment.amount }),
            }
          );

          const billplzData = await billplzResponse.json();

          if (!billplzResponse.ok) {
            pool.end();
            return new Response(JSON.stringify({ error: billplzData }), {
              status: billplzResponse.status,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }

        await pool.query(
          `UPDATE payments SET status = 'refunded', "updatedAt" = NOW() WHERE id = $1`,
          [refundPaymentId]
        );

        await pool.end();
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'payouts': {
        if (req.method !== 'GET') {
          pool.end();
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }
        const userId = url.searchParams.get('userId');
        if (!userId) {
          pool.end();
          return new Response(JSON.stringify({ error: 'userId required' }), { status: 400 });
        }

        const { rows: payouts } = await pool.query(
          `SELECT * FROM payouts WHERE "userId" = $1 ORDER BY "createdAt" DESC LIMIT 50`,
          [userId]
        );

        const { rows: bankAccounts } = await pool.query(
          `SELECT * FROM mua_bank_accounts WHERE "userId" = $1 ORDER BY "createdAt" DESC`,
          [userId]
        );

        const { rows: pendingBalance } = await pool.query(
          `SELECT COALESCE(SUM(amount), 0)::int as total FROM payments WHERE "userId" = $1 AND status = 'held'`,
          [userId]
        );

        await pool.end();
        return new Response(JSON.stringify({
          payouts,
          bankAccounts,
          pendingBalance: pendingBalance[0]?.total || 0,
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'webhook': {
        if (req.method !== 'POST') {
          pool.end();
          return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }
        const webhookBody = await req.json();

        await pool.query(
          `INSERT INTO webhook_events (event, payload) VALUES ($1, $2)`,
          ['billplz.payment', JSON.stringify(webhookBody)]
        );

        if (webhookBody.id && webhookBody.paid_at) {
          await pool.query(
            `UPDATE payments SET status = 'paid', "updatedAt" = NOW() WHERE "billplzBillId" = $1`,
            [webhookBody.id]
          );
        }

        await pool.end();
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      default:
        await pool.end();
        return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400 });
    }
  } catch (err) {
    console.error('Payment action error:', err);
    await pool.end();
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  regions: ['iad1'],
};