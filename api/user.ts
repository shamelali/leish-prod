import { Pool } from "@neondatabase/serverless";

const cancelBookingSchema = {
  parse: (data: unknown) => {
    const obj = data as Record<string, unknown>;
    if (!("bookingId" in obj)) throw new Error("bookingId required");
    return { bookingId: obj.bookingId };
  },
};

export default async function handler(req: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const baseUrl = `https://${req.headers.get("host") || "localhost"}`;
  const url = new URL(req.url, baseUrl);
  const action = url.searchParams.get("action");

  try {
    switch (action) {
      case "bookings": {
        const userId = url.searchParams.get("userId");
        if (!userId) {
          await pool.end();
          return new Response(JSON.stringify({ error: "userId required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

const bookingsResult = await pool.query(
          `SELECT b.id, b.date, b.time, b.status, b.amount,
                  a.name as "artistName", a.image as "artistImage",
                  s.name as "serviceName",
                  u.name as "userName"
           FROM bookings b
           LEFT JOIN artists a ON b."artistId" = a.id
           LEFT JOIN services s ON b."serviceId" = s.id
           LEFT JOIN "user" u ON b."userId" = u.id
           WHERE b."userId" = $1 OR b."artistId" = $1
           ORDER BY b."createdAt" DESC
           LIMIT 100`,
          [userId],
        );

        const ratingResult = await pool.query(
          `SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0)::float as rating,
                  COUNT(*)::int as "reviewCount"
           FROM reviews WHERE "artistId" = $1`,
          [userId],
        );

        return new Response(
          JSON.stringify({
            bookings: bookingsResult.rows,
            rating: ratingResult.rows[0]?.rating || 0,
            reviewCount: ratingResult.rows[0]?.reviewCount || 0,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      case "favorites": {
        const userId = url.searchParams.get("userId");
        if (!userId) {
          await pool.end();
          return new Response(JSON.stringify({ error: "userId required" }), {
            status: 400,
          });
        }

if (req.method === "GET") {
          const favoritesResult = await pool.query(
            `SELECT f.*, a.name, a.image, a.location, a.rating, a.price
             FROM favorites f
             JOIN artists a ON a.id = f."artistId"
             WHERE f."userId" = $1
             ORDER BY f."createdAt" DESC`,
            [userId],
          );
          return new Response(
            JSON.stringify({ favorites: favoritesResult.rows }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (req.method === "POST") {
          const body = await req.json();
          const { artistId } = body;
          await pool.query(
            `INSERT INTO favorites ("userId", "artistId") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
            [userId, artistId],
          );
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (req.method === "DELETE") {
          const body = await req.json();
          const { artistId } = body;
          await pool.query(
            `DELETE FROM favorites WHERE "userId" = $1 AND "artistId" = $2`,
            [userId, artistId],
          );
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        break;
      }

      case "review": {
        if (req.method !== "POST") {
          await pool.end();
          return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
          });
        }
        const body = await req.json();
        const { userId, artistId, rating, text, author, service } = body;

        if (!userId || !artistId || !rating || !author) {
          await pool.end();
          return new Response(
            JSON.stringify({
              error: "userId, artistId, rating, and author required",
            }),
            { status: 400 },
          );
        }

const reviewResult = await pool.query(
          `INSERT INTO reviews ("userId", "artistId", rating, text, author, service)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING *`,
          [userId, artistId, rating, text, author, service],
        );

        await pool.query(
          `UPDATE artists SET
            "reviewCount" = (SELECT COUNT(*) FROM reviews WHERE "artistId" = $1),
            rating = (SELECT ROUND(AVG(rating)::numeric, 2) FROM reviews WHERE "artistId" = $1)
          WHERE id = $1`,
          [artistId],
        );

        return new Response(JSON.stringify({ review: reviewResult.rows[0] }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      }

      case "cancel-booking": {
        if (req.method !== "POST") {
          await pool.end();
          return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
          });
        }

        let bookingId: string | number;
        try {
          const body = await req.json();
          const parsed = cancelBookingSchema.parse(body);
          bookingId = parsed.bookingId as string | number;
        } catch {
          await pool.end();
          return new Response(
            JSON.stringify({ error: "Invalid request body" }),
            { status: 400 },
          );
        }

const currentResult = await pool.query(
            `SELECT * FROM bookings WHERE id = $1`,
            [bookingId],
          );
          const current = currentResult.rows[0];

          if (!current) {
            return new Response(JSON.stringify({ error: "Booking not found" }), {
              status: 404,
            });
          }

          const cancellable = ["pending", "confirmed", "paid_deposit"];
          if (!cancellable.includes(current.status)) {
            return new Response(
              JSON.stringify({
                error: `Cannot cancel booking with status '${current.status}'`,
              }),
              { status: 400 },
            );
          }

          const bookingResult = await pool.query(
            `UPDATE bookings SET status = 'cancelled', "updatedAt" = NOW()
            WHERE id = $1
            RETURNING *`,
            [bookingId],
          );

          return new Response(
            JSON.stringify({ booking: bookingResult.rows[0] }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
      }

      case "confirm-booking": {
        if (req.method !== "POST") {
          await pool.end();
          return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
          });
        }
        const confirmBody = await req.json();
        const confirmBookingId = confirmBody.bookingId;
        if (!confirmBookingId) {
          await pool.end();
          return new Response(JSON.stringify({ error: "bookingId required" }), {
            status: 400,
          });
        }
const confirmResult = await pool.query(
            `UPDATE bookings SET status = 'confirmed', "updatedAt" = NOW()
            WHERE id = $1 AND status = 'pending'
            RETURNING *`,
            [confirmBookingId],
          );
          if (!confirmResult.rows[0]) {
            return new Response(
              JSON.stringify({ error: "Booking not found or not pending" }),
              { status: 400 },
            );
          }
          return new Response(
            JSON.stringify({ booking: confirmResult.rows[0] }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
      }

      case "reject-booking": {
        if (req.method !== "POST") {
          await pool.end();
          return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
          });
        }
        const rejectBody = await req.json();
        const rejectBookingId = rejectBody.bookingId;
        if (!rejectBookingId) {
          return new Response(JSON.stringify({ error: "bookingId required" }), {
            status: 400,
          });
        }
        const rejectResult = await pool.query(
          `UPDATE bookings SET status = 'rejected', "updatedAt" = NOW()
           WHERE id = $1 AND status = 'pending'
           RETURNING *`,
          [rejectBookingId],
        );
        if (!rejectResult.rows[0]) {
          return new Response(
            JSON.stringify({ error: "Booking not found or not pending" }),
            { status: 400 },
          );
        }
        return new Response(
          JSON.stringify({ booking: rejectResult.rows[0] }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }

      case "send-welcome-email": {
        if (req.method !== "POST") {
          await pool.end();
          return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
          });
        }

        const { email, name, role } = await req.json();

        if (!email || !name || !role) {
            return new Response(
              JSON.stringify({ error: "email, name, and role required" }),
              { status: 400 },
            );
          }

          const validRoles = ["client", "artist", "studio"];
          if (!validRoles.includes(role)) {
            return new Response(
              JSON.stringify({
                error: "role must be one of: client, artist, studio",
              }),
              { status: 400 },
            );
          }

          try {
            const { sendWelcomeEmail } = await import("../src/lib/email/welcome");
            const result = await sendWelcomeEmail({ email, name, role });

            if (!result.success) {
              return new Response(
                JSON.stringify({
                  success: false,
                  error: "Failed to send welcome email",
                }),
                {
                  status: 500,
                  headers: { "Content-Type": "application/json" },
                },
              );
            }

            return new Response(JSON.stringify({ success: true }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          } catch (err) {
            console.error("Welcome email failed:", err);
            return new Response(
              JSON.stringify({ success: false, error: "Welcome email failed" }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
      }

      case "notifications": {
        const userId = url.searchParams.get("userId");
        if (!userId) {
          await pool.end();
          return new Response(JSON.stringify({ error: "userId required" }), {
            status: 400,
          });
        }

        if (req.method === "GET") {
          const notifResult = await pool.query(
            `SELECT id, type, title, body as message, data, "readAt" as read, "createdAt" as date
             FROM notifications
             WHERE "userId" = $1
             ORDER BY "createdAt" DESC`,
            [userId],
          );
          return new Response(
            JSON.stringify({ notifications: notifResult.rows }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (req.method === "POST") {
          const body = await req.json();
          const { action, notificationId } = body;
          if (action === "mark-read") {
            if (!notificationId) {
              return new Response(
                JSON.stringify({ error: "notificationId required" }),
                { status: 400 },
              );
            }
            await pool.query(
              `UPDATE notifications SET "readAt" = NOW() WHERE id = $1 AND "userId" = $2`,
              [notificationId, userId],
            );
          } else if (action === "mark-all-read") {
            await pool.query(
              `UPDATE notifications SET "readAt" = NOW() WHERE "userId" = $1 AND "readAt" IS NULL`,
              [userId],
            );
          } else if (action === "delete") {
            if (!notificationId) {
              return new Response(
                JSON.stringify({ error: "notificationId required" }),
                { status: 400 },
              );
            }
            await pool.query(
              `DELETE FROM notifications WHERE id = $1 AND "userId" = $2`,
              [notificationId, userId],
            );
          } else if (action === "clear-all") {
            await pool.query(`DELETE FROM notifications WHERE "userId" = $1`, [
              userId,
            ]);
          } else {
            return new Response(JSON.stringify({ error: "Invalid action" }), {
              status: 400,
            });
          }
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        break;
      }

      default:
        await pool.end();
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
        });
    }
  } catch (err) {
    await pool.end();
    console.error("User action error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  await pool.end();
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
  });
}

export const config = {
  regions: ["iad1"],
};
