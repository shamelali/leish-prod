import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const sql = neon(process.env.DATABASE_URL!) as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  if (!id || isNaN(Number(id))) {
    return new Response(JSON.stringify({ error: 'Invalid artist ID' }), { status: 400 });
  }

  const [artist] = await sql(
    `SELECT a.*,
      COALESCE(
        json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name, 'slug', c.slug))
        FILTER (WHERE c.id IS NOT NULL),
        '[]'::json
      ) AS categories
    FROM artists a
    LEFT JOIN artist_categories ac ON ac.artist_id = a.id
    LEFT JOIN categories c ON c.id = ac.category_id
    WHERE a.id = $1
    GROUP BY a.id`,
    id
  );

  if (!artist) {
    return new Response(JSON.stringify({ error: 'Artist not found' }), { status: 404 });
  }

  const services = await sql(
    `SELECT * FROM services WHERE artist_id = $1 ORDER BY price ASC`,
    id
  );

  const reviews = await sql(
    `SELECT * FROM reviews WHERE artist_id = $1 ORDER BY created_at DESC LIMIT 10`,
    id
  );

  const similar = await sql(
    `SELECT a.id, a.name, a.image, a.location, a.rating, a.review_count, a.price
    FROM artists a
    JOIN artist_categories ac ON ac.artist_id = a.id
    WHERE a.id != $1
      AND ac.category_id IN (SELECT category_id FROM artist_categories WHERE artist_id = $1)
    GROUP BY a.id
    ORDER BY a.rating DESC
    LIMIT 4`,
    id
  );

  return new Response(JSON.stringify({ artist, services, reviews, similar }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const config = {
  runtime: 'edge',
};
