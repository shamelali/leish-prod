import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const sql = neon(process.env.DATABASE_URL!) as any;
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '6');
  const search = url.searchParams.get('search');
  const sort = url.searchParams.get('sort') || 'rating';

  const conditions: string[] = [];
  const params: (string | number)[] = [];
  let paramIndex = 1;

  if (search) {
    conditions.push(`(s.name ILIKE $${paramIndex} OR s.location ILIKE $${paramIndex} OR s.area ILIKE $${paramIndex} OR s.description ILIKE $${paramIndex})`);
    params.push(`%${search}%`);
    paramIndex++;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const orderMap: Record<string, string> = {
    rating: 's.rating DESC',
    'price-low': 's.price ASC',
    'price-high': 's.price DESC',
    artists: 'artist_count DESC',
  };
  const orderBy = orderMap[sort] || 's.rating DESC';

  const countResult = await sql.query(
    `SELECT COUNT(*) as total FROM studios s ${where}`,
    params
  );
  const total = parseInt(countResult[0].total);
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;

  params.push(limit, offset);
  const studios = await sql.query(
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
    params
  );

  const categories = await sql`SELECT * FROM categories ORDER BY name`;

  return new Response(JSON.stringify({
    studios,
    categories,
    pagination: { page, limit, total, totalPages },
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const config = {
  runtime: 'edge',
};
