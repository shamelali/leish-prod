import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const sql = neon(process.env.DATABASE_URL!) as any;
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return new Response(JSON.stringify({ error: 'Invalid studio ID' }), { status: 400 });
  }

  const [studio] = await sql.query(
    `SELECT s.*,
      COALESCE(
        json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name, 'slug', c.slug))
        FILTER (WHERE c.id IS NOT NULL),
        '[]'::json
      ) AS categories
    FROM studios s
    LEFT JOIN studio_categories sc ON sc."studioId" = s.id
    LEFT JOIN categories c ON c.id = sc."categoryId"
    WHERE s.id = $1
    GROUP BY s.id`,
    [id]
  );

  if (!studio) {
    return new Response(JSON.stringify({ error: 'Studio not found' }), { status: 404 });
  }

  const artists = await sql.query(
    `SELECT DISTINCT a.*
    FROM artists a
    JOIN artist_categories ac ON ac."artistId" = a.id
    WHERE ac."categoryId" IN (
      SELECT "categoryId" FROM studio_categories WHERE "studioId" = $1
    )
    ORDER BY a.rating DESC
    LIMIT 10`,
    [id]
  );

  const services = await sql.query(
    `SELECT DISTINCT s.*
    FROM services s
    JOIN artists a ON a.id = s."artistId"
    JOIN artist_categories ac ON ac."artistId" = a.id
    WHERE ac."categoryId" IN (
      SELECT "categoryId" FROM studio_categories WHERE "studioId" = $1
    )
    ORDER BY s.price ASC
    LIMIT 20`,
    [id]
  );

  const reviews = await sql.query(
    `SELECT r.*
    FROM reviews r
    JOIN artists a ON a.id = r."artistId"
    JOIN artist_categories ac ON ac."artistId" = a.id
    WHERE ac."categoryId" IN (
      SELECT "categoryId" FROM studio_categories WHERE "studioId" = $1
    )
    ORDER BY r."createdAt" DESC
    LIMIT 10`,
    [id]
  );

  return new Response(JSON.stringify({ studio, artists, services, reviews }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const config = {
  runtime: 'edge',
};
