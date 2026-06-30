import { Pool } from "@neondatabase/serverless";
import { sendEmail } from "../../src/lib/email/brevo";
import {
  bookingExpiredTemplate,
  bookingAutoCanceledTemplate,
  bookingReminderTemplate,
} from "../../src/lib/email/templates";

export default async function handler(req: Request) {
  if (req.method !== "GET" && req.method !== "POST") {
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

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const baseUrl = `https://${req.headers.get("host") || "localhost"}`;
  const url = new URL(req.url, baseUrl);
  const action = url.searchParams.get("action") || "cleanup";

  try {
    switch (action) {
      case "cleanup": {
        const results: { cleaned: number; message: string }[] = [];

        try {
          const slotsResult = await pool.query(
            `DELETE FROM availability_slots
             WHERE is_booked = false
               AND "date" < NOW() - INTERVAL '7 days'
             RETURNING id`,
          );
          results.push({
            cleaned: slotsResult.rowCount || 0,
            message: "Expired availability slots",
          });
        } catch {
          results.push({
            cleaned: 0,
            message: "Expired availability slots (table may not exist)",
          });
        }

        await pool.end();
        return new Response(JSON.stringify({ success: true, results }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      case "release-escrow": {
        const heldPaymentsResult = await pool.query(
          `SELECT p.*, b."userId"
          FROM payments p
          JOIN bookings b ON b.id = p."bookingId"
          WHERE p.status = 'held'
            AND p."updatedAt" < NOW() - INTERVAL '3 days'
          LIMIT 10`,
        );

        let released = 0;
        for (const payment of heldPaymentsResult.rows) {
          await pool.query(
            `INSERT INTO payouts ("userId", amount, status, "paymentId")
            VALUES ($1, $2, 'released', $3)`,
            [payment.userId, payment.amount, payment.id],
          );
          await pool.query(
            `UPDATE payments SET status = 'released', "updatedAt" = NOW() WHERE id = $1`,
            [payment.id],
          );
          released++;
        }

        await pool.end();
        return new Response(
          JSON.stringify({ released, total: heldPaymentsResult.rows.length }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      case "booking-cleanup": {
        const result = { expired: 0, cancelled: 0 };

        const twoHoursAgo = new Date(
          Date.now() - 2 * 60 * 60 * 1000,
        ).toISOString();
        const abandonedBookingsResult = await pool.query(
          `SELECT b.id, b."artistId", b.amount, b."createdAt",
                  a.name AS artist_name, u.email AS customer_email, u.name AS customer_name
           FROM bookings b
           LEFT JOIN artists a ON a.id = b."artistId"
           LEFT JOIN "user" u ON u.id = b."userId"
           WHERE b.status = 'pending'
             AND b."createdAt" < $1
           LIMIT 50`,
          [twoHoursAgo],
        );

        for (const booking of abandonedBookingsResult.rows) {
          await pool.query(
            `UPDATE bookings SET status = 'cancelled', "updatedAt" = NOW() WHERE id = $1`,
            [booking.id],
          );
          await pool.query(
            `INSERT INTO booking_events ("bookingId", "eventType", "eventPayload", "createdAt")
             VALUES ($1, 'booking_expired', $2, NOW())`,
            [
              booking.id,
              JSON.stringify({
                reason: "Payment not completed within 2 hours",
              }),
            ],
          );

          if (booking.customer_email) {
            const template = bookingExpiredTemplate({
              customerName: booking.customer_name || "there",
              bookingId: String(booking.id),
              providerName: booking.artist_name || "Provider",
              amount: Number(booking.amount) || 0,
              createdAt: new Date(booking.createdAt).toLocaleString("en-MY"),
            });
            await sendEmail({
              to: booking.customer_email,
              subject: template.subject,
              html: template.html,
              text: template.text,
            });
          }
          result.expired++;
        }

        const twentyFourHoursAgo = new Date(
          Date.now() - 24 * 60 * 60 * 1000,
        ).toISOString();
        const staleBookingsResult = await pool.query(
          `SELECT b.id, u.email AS customer_email
           FROM bookings b
           LEFT JOIN "user" u ON u.id = b."userId"
           WHERE b.status = 'pending'
             AND b."createdAt" < $1
           LIMIT 50`,
          [twentyFourHoursAgo],
        );

        for (const booking of staleBookingsResult.rows) {
          await pool.query(
            `UPDATE bookings SET status = 'cancelled', "updatedAt" = NOW() WHERE id = $1`,
            [booking.id],
          );
          await pool.query(
            `INSERT INTO booking_events ("bookingId", "eventType", "eventPayload", "createdAt")
             VALUES ($1, 'booking_auto_canceled', $2, NOW())`,
            [
              booking.id,
              JSON.stringify({
                reason: "No provider response within 24 hours",
              }),
            ],
          );

          if (booking.customer_email) {
            const template = bookingAutoCanceledTemplate({
              bookingId: String(booking.id),
            });
            await sendEmail({
              to: booking.customer_email,
              subject: template.subject,
              html: template.html,
              text: template.text,
            });
          }
          result.cancelled++;
        }

        await pool.end();
        return new Response(JSON.stringify({ ok: true, result }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      case "reminders": {
        const bookingsResult = await pool.query(
          `SELECT b.id, b."userId", b.date, b.time,
                  a.name AS artist_name, u.email AS customer_email, u.name AS customer_name
           FROM bookings b
           JOIN artists a ON a.id = b."artistId"
           JOIN "user" u ON u.id = b."userId"
           WHERE b.status IN ('confirmed', 'paid_deposit', 'paid_full')
             AND b.date = CURRENT_DATE + INTERVAL '1 day'
             AND NOT EXISTS (
               SELECT 1 FROM booking_events be
               WHERE be."bookingId" = b.id
                 AND be."eventType" = 'reminder_sent'
             )
           LIMIT 100`,
        );

        if (bookingsResult.rows.length === 0) {
          await pool.end();
          return new Response(JSON.stringify({ ok: true, sent: 0, total: 0 }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        let sent = 0;
        let failed = 0;

        for (const booking of bookingsResult.rows) {
          try {
            const date = booking.date
              ? new Date(booking.date).toLocaleDateString("en-MY", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "TBC";
            const time = booking.time || "TBC";

            if (booking.customer_email) {
              const template = bookingReminderTemplate({
                customerName: booking.customer_name || "Valued Customer",
                bookingId: booking.id,
                serviceName: "Appointment",
                providerName: booking.artist_name || "Your Artist",
                date,
                time,
              });

              const emailResult = await sendEmail({
                to: booking.customer_email,
                subject: template.subject,
                html: template.html,
                text: template.text,
              });

              if (emailResult.success) {
                sent++;
              } else {
                failed++;
              }
            }

            await pool.query(
              `INSERT INTO booking_events ("bookingId", "eventType", "eventPayload", "createdAt")
               VALUES ($1, 'reminder_sent', $2, NOW())`,
              [booking.id, JSON.stringify({ email: booking.customer_email })],
            );
          } catch (err) {
            console.error(
              "Error sending reminder for booking:",
              booking.id,
              err,
            );
            failed++;
          }
        }

        await pool.end();
        return new Response(
          JSON.stringify({
            ok: true,
            sent,
            failed,
            total: bookingsResult.rows.length,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      default:
        await pool.end();
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
        });
    }
  } catch (err) {
    await pool.end();
    console.error("Cron error:", err);
    return new Response(JSON.stringify({ error: "Cron job failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = {
  regions: ["iad1"],
};
