import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const sql = neon(process.env.DATABASE_URL!) as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return new Response(JSON.stringify({ error: 'Invalid artist ID' }), { status: 400 });
  }

  const [artist] = await sql.query(
    `SELECT a.*,
      COALESCE(
        json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name, 'slug', c.slug))
        FILTER (WHERE c.id IS NOT NULL),
        '[]'::json
      ) AS categories
    FROM artists a
    LEFT JOIN artist_categories ac ON ac."artistId" = a.id
    LEFT JOIN categories c ON c.id = ac."categoryId"
    WHERE a.id = $1
    GROUP BY a.id`,
    [id]
  );

  if (!artist) {
    return new Response(JSON.stringify({ error: 'Artist not found' }), { status: 404 });
  }

  const services = await sql.query(
    `SELECT * FROM services WHERE "artistId" = $1 ORDER BY price ASC`,
    [id]
  );

  const reviews = await sql.query(
    `SELECT * FROM reviews WHERE "artistId" = $1 ORDER BY "createdAt" DESC LIMIT 10`,
    [id]
  );

  const similar = await sql.query(
    `SELECT a.id, a.name, a.image, a.location, a.rating, a."reviewCount", a.price
    FROM artists a
    JOIN artist_categories ac ON ac."artistId" = a.id
    WHERE a.id != $1
      AND ac."categoryId" IN (SELECT "categoryId" FROM artist_categories WHERE "artistId" = $1)
    GROUP BY a.id
    ORDER BY a.rating DESC
    LIMIT 4`,
    [id]
  );

  return new Response(JSON.stringify({ artist, services, reviews, similar }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const config = {
  runtime: 'edge',
};
