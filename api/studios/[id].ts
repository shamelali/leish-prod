import { getPool } from "../../src/lib/db";

export default async function handler(req: Request) {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const pool = getPool();
  const baseUrl = `https://${req.headers.get("host") || "localhost"}`;
  const url = new URL(req.url, baseUrl);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return new Response(JSON.stringify({ error: "Invalid studio ID" }), {
      status: 400,
    });
  }

  try {
    const studioResult = await pool.query(
      `SELECT studios.*,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name, 'slug', c.slug))
          FILTER (WHERE c.id IS NOT NULL),
          '[]'::json
        ) AS categories
      FROM studios
      LEFT JOIN studio_categories sc ON sc."studioId" = studios.id
      LEFT JOIN categories c ON c.id = sc."categoryId"
      WHERE studios.id = $1
      GROUP BY studios.id`,
      [id],
    );

    if (studioResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Studio not found" }), {
        status: 404,
      });
    }

    const artistsResult = await pool.query(
      `SELECT DISTINCT artists.*
      FROM artists
      JOIN artist_categories ac ON ac."artistId" = artists.id
      WHERE ac."categoryId" IN (
        SELECT "categoryId" FROM studio_categories WHERE "studioId" = $1
      )
      ORDER BY artists.rating DESC
      LIMIT 10`,
      [id],
    );

    const servicesResult = await pool.query(
      `SELECT DISTINCT services.*
      FROM services
      JOIN artists a ON a.id = services."artistId"
      JOIN artist_categories ac ON ac."artistId" = a.id
      WHERE ac."categoryId" IN (
        SELECT "categoryId" FROM studio_categories WHERE "studioId" = $1
      )
      ORDER BY services.price ASC
      LIMIT 20`,
      [id],
    );

    const reviewsResult = await pool.query(
      `SELECT reviews.*
      FROM reviews
      JOIN artists a ON a.id = reviews."artistId"
      JOIN artist_categories ac ON ac."artistId" = a.id
      WHERE ac."categoryId" IN (
        SELECT "categoryId" FROM studio_categories WHERE "studioId" = $1
      )
      ORDER BY reviews."createdAt" DESC
      LIMIT 10`,
      [id],
    );

    return new Response(
      JSON.stringify({
        studio: studioResult.rows[0],
        artists: artistsResult.rows,
        services: servicesResult.rows,
        reviews: reviewsResult.rows,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("[Studio Detail] DB error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = {
  regions: ["iad1"],
};
