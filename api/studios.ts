import { Pool } from "@neondatabase/serverless";

export default async function handler(req: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const baseUrl = `https://${req.headers.get("host") || "localhost"}`;
  const url = new URL(req.url, baseUrl);
  const action = url.searchParams.get("action");

  if (action === "dashboard") {
    const userId = url.searchParams.get("userId");
    if (!userId) {
      await pool.end();
      return new Response(JSON.stringify({ error: "userId required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const studioResult = await pool.query(
      `SELECT * FROM studios WHERE "userId" = $1 LIMIT 1`,
      [userId],
    );

    if (!studioResult.rows[0]) {
      await pool.end();
      return new Response(JSON.stringify({ error: "Studio not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const studio = studioResult.rows[0];

    const artistsCount = await pool.query(
      `SELECT COUNT(*)::int as count FROM artists WHERE "studioId" = $1`,
      [studio.id],
    );

    const bookingsResult = await pool.query(
      `SELECT COUNT(*)::int as count FROM bookings WHERE "studioId" = $1`,
      [studio.id],
    );

    const revenueResult = await pool.query(
      `SELECT COALESCE(SUM(p.amount), 0)::int as total
       FROM payments p
       JOIN bookings b ON b.id = p."bookingId"
       WHERE b."studioId" = $1 AND p.status IN ('paid', 'released')`,
      [studio.id],
    );

    const ratingResult = await pool.query(
      `SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0)::float as rating
       FROM studios WHERE id = $1 AND rating > 0`,
      [studio.id],
    );

    const recentBookings = await pool.query(
      `SELECT b.id, b.date, b.time, b.status, b.amount,
              a.name as "artistName", u.name as "userName"
       FROM bookings b
       LEFT JOIN artists a ON b."artistId" = a.id
       LEFT JOIN "user" u ON b."userId" = u.id
       WHERE b."studioId" = $1
       ORDER BY b."createdAt" DESC
       LIMIT 10`,
      [studio.id],
    );

    const pendingBalance = await pool.query(
      `SELECT COALESCE(SUM(p.amount), 0)::int as total
       FROM payments p
       JOIN bookings b ON b.id = p."bookingId"
       WHERE b."studioId" = $1 AND p.status = 'held'`,
      [studio.id],
    );

    await pool.end();
    return new Response(
      JSON.stringify({
        studio,
        stats: {
          artists: artistsCount.rows[0]?.count || 0,
          bookings: bookingsResult.rows[0]?.count || 0,
          revenue: revenueResult.rows[0]?.total || 0,
          rating: ratingResult.rows[0]?.rating || 0,
          pendingBalance: pendingBalance.rows[0]?.total || 0,
        },
        recentBookings: recentBookings.rows,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (req.method !== "GET") {
    await pool.end();
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "6");
  const search = url.searchParams.get("search");
  const sort = url.searchParams.get("sort") || "rating";

  try {
    const conditions: string[] = [];
    const params: (string | number)[] = [];
    let paramIndex = 1;

    if (search) {
      conditions.push(
        `(s.name ILIKE $${paramIndex} OR s.location ILIKE $${paramIndex} OR s.area ILIKE $${paramIndex} OR s.description ILIKE $${paramIndex})`,
      );
      params.push(`%${search}%`);
      paramIndex++;
    }

    const where =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const orderMap: Record<string, string> = {
      rating: "s.rating DESC",
      "price-low": "s.price ASC",
      "price-high": "s.price DESC",
      artists: "artist_count DESC",
    };
    const orderBy = orderMap[sort] || "s.rating DESC";

    const countResult = await pool.query(
      `SELECT COUNT(*)::int as total FROM studios s ${where}`,
      params,
    );
    const total = countResult.rows[0].total;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;

    const queryParams = [...params, limit, offset];
    const studiosResult = await pool.query(
      `SELECT s.*,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name, 'slug', c.slug))
          FILTER (WHERE c.id IS NOT NULL),
          '[]'::json
        ) AS categories,
        (SELECT COUNT(*) FROM artists a
          JOIN artist_categories ac ON ac."artistId" = a.id
          JOIN studio_categories sc ON sc."categoryId" = ac."categoryId"
          WHERE sc."studioId" = s.id
        )::int AS artist_count
      FROM studios s
      LEFT JOIN studio_categories sc ON sc."studioId" = s.id
      LEFT JOIN categories c ON c.id = sc."categoryId"
      ${where}
      GROUP BY s.id
      ORDER BY ${orderBy}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      queryParams,
    );

    const categoriesResult = await pool.query(
      `SELECT * FROM categories ORDER BY name`,
    );

    await pool.end();

    return new Response(
      JSON.stringify({
        studios: studiosResult.rows,
        categories: categoriesResult.rows,
        pagination: { page, limit, total, totalPages },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    await pool.end();
    console.error("[Studios] DB error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = {
  regions: ["iad1"],
};
