import { Pool } from "@neondatabase/serverless";

export default async function handler(req: Request) {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const baseUrl = `https://${req.headers.get("host") || "localhost"}`;
  const url = new URL(req.url, baseUrl);
  const id = url.pathname.split("/").pop();

  if (!id) {
    await pool.end();
    return new Response(JSON.stringify({ error: "Invalid artist ID" }), {
      status: 400,
    });
  }

  try {
    const artistResult = await pool.query(
      `SELECT artists.*,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name, 'slug', c.slug))
          FILTER (WHERE c.id IS NOT NULL),
          '[]'::json
        ) AS categories
      FROM artists
      LEFT JOIN artist_categories ac ON ac."artistId" = artists.id
      LEFT JOIN categories c ON c.id = ac."categoryId"
      WHERE artists.id = $1
      GROUP BY artists.id`,
      [id],
    );

    if (artistResult.rows.length === 0) {
      await pool.end();
      return new Response(JSON.stringify({ error: "Artist not found" }), {
        status: 404,
      });
    }

    const servicesResult = await pool.query(
      `SELECT * FROM services WHERE "artistId" = $1 ORDER BY price ASC`,
      [id],
    );

    const reviewsResult = await pool.query(
      `SELECT * FROM reviews WHERE "artistId" = $1 ORDER BY "createdAt" DESC LIMIT 10`,
      [id],
    );

    const similarResult = await pool.query(
      `SELECT artists.id, artists.name, artists.image, artists.location, artists.rating, artists."reviewCount", artists.price
      FROM artists
      JOIN artist_categories ac ON ac."artistId" = artists.id
      WHERE artists.id != $1
        AND ac."categoryId" IN (SELECT "categoryId" FROM artist_categories WHERE "artistId" = $1)
      GROUP BY artists.id
      ORDER BY artists.rating DESC
      LIMIT 4`,
      [id],
    );

    await pool.end();

    return new Response(
      JSON.stringify({
        artist: artistResult.rows[0],
        services: servicesResult.rows,
        reviews: reviewsResult.rows,
        similar: similarResult.rows,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    await pool.end();
    console.error("[Artist Detail] DB error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = {
  regions: ["iad1"],
};
