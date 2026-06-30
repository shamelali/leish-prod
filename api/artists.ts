import { getPool } from "../src/lib/db";

export default async function handler(req: Request) {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const pool = getPool();
  const baseUrl = `https://${req.headers.get("host") || "localhost"}`;
  const url = new URL(req.url, baseUrl);
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");
  const sort = url.searchParams.get("sort") || "rating";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "6");

  try {
    const conditions: string[] = [];
    const params: (string | number)[] = [];
    let paramIndex = 1;

    if (category && category !== "all") {
      conditions.push(
        `EXISTS (SELECT 1 FROM artist_categories ac JOIN categories c ON c.id = ac."categoryId" WHERE ac."artistId" = artists.id AND c.slug = $${paramIndex})`,
      );
      params.push(category);
      paramIndex++;
    }

    if (search) {
      conditions.push(
        `(artists.name ILIKE $${paramIndex} OR artists.location ILIKE $${paramIndex} OR artists.area ILIKE $${paramIndex})`,
      );
      params.push(`%${search}%`);
      paramIndex++;
    }

    const where =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const orderMap: Record<string, string> = {
      rating: "artists.rating DESC",
      "price-low": "artists.price ASC",
      "price-high": "artists.price DESC",
    };
    const orderBy = orderMap[sort] || "artists.rating DESC";

    const countResult = await pool.query(
      `SELECT COUNT(*)::int as total FROM artists ${where}`,
      params,
    );
    const total = countResult.rows[0].total;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;

    const queryParams = [...params, limit, offset];
    const artistsResult = await pool.query(
      `SELECT artists.*,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name, 'slug', c.slug))
          FILTER (WHERE c.id IS NOT NULL),
          '[]'::json
        ) AS categories
      FROM artists
      LEFT JOIN artist_categories ac ON ac."artistId" = artists.id
      LEFT JOIN categories c ON c.id = ac."categoryId"
      ${where}
      GROUP BY artists.id
      ORDER BY ${orderBy}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      queryParams,
    );

    const allCatsResult = await pool.query(
      `SELECT * FROM categories ORDER BY name`,
    );

    return new Response(
      JSON.stringify({
        artists: artistsResult.rows,
        categories: allCatsResult.rows,
        pagination: { page, limit, total, totalPages },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("[Artists] DB error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = {
  regions: ["iad1"],
};
