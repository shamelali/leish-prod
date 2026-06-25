import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const sql = neon(process.env.DATABASE_URL!) as any;
  const url = new URL(req.url);
  const category = url.searchParams.get('category');
  const search = url.searchParams.get('search');
  const sort = url.searchParams.get('sort') || 'rating';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '6');

  const conditions: string[] = [];
  const params: (string | number)[] = [];
  let paramIndex = 1;

  if (category && category !== 'all') {
    conditions.push(`EXISTS (SELECT 1 FROM artist_categories ac JOIN categories c ON c.id = ac."categoryId" WHERE ac."artistId" = a.id AND c.slug = $${paramIndex})`);
    params.push(category);
    paramIndex++;
  }

  if (search) {
    conditions.push(`(a.name ILIKE $${paramIndex} OR a.location ILIKE $${paramIndex} OR a.area ILIKE $${paramIndex})`);
    params.push(`%${search}%`);
    paramIndex++;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const orderMap: Record<string, string> = {
    rating: 'a.rating DESC',
    'price-low': 'a.price ASC',
    'price-high': 'a.price DESC',
  };
  const orderBy = orderMap[sort] || 'a.rating DESC';

  const countResult = await sql.query(
    `SELECT COUNT(*) as total FROM artists a ${where}`,
    params
  );
  const total = parseInt(countResult[0].total);
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;

  params.push(limit, offset);
  const artists = await sql.query(
    `SELECT a.*,
      COALESCE(
        json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name, 'slug', c.slug))
        FILTER (WHERE c.id IS NOT NULL),
        '[]'::json
      ) AS categories
    FROM artists a
    LEFT JOIN artist_categories ac ON ac."artistId" = a.id
    LEFT JOIN categories c ON c.id = ac."categoryId"
    ${where}
    GROUP BY a.id
    ORDER BY ${orderBy}
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    params
  );

  const allCats = await sql`SELECT * FROM categories ORDER BY name`;

  return new Response(JSON.stringify({
    artists,
    categories: allCats,
    pagination: { page, limit, total, totalPages },
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const config = {
  runtime: 'edge',
};
