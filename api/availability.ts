import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  const sql = neon(process.env.DATABASE_URL!) as any;

  if (req.method === 'GET') {
    const url = new URL(req.url);
    const artistId = url.searchParams.get('artistId');
    const studioId = url.searchParams.get('studioId');
    const date = url.searchParams.get('date');

    if (!date || (!artistId && !studioId)) {
      return new Response(JSON.stringify({ error: 'date and artistId or studioId required' }), { status: 400 });
    }

    try {
      const slots = await sql.query(
        `SELECT * FROM availability_slots
         WHERE ($1::int IS NULL OR "artistId" = $1)
           AND ($2::int IS NULL OR "studioId" = $2)
           AND date = $3::date
         ORDER BY time`,
        [artistId ? Number(artistId) : null, studioId ? Number(studioId) : null, date]
      );

      return new Response(JSON.stringify({ slots }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Availability fetch error:', err);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { artistId, studioId, dates, timeSlots } = body;

      if ((!artistId && !studioId) || !dates || !timeSlots || !Array.isArray(dates) || !Array.isArray(timeSlots)) {
        return new Response(JSON.stringify({ error: 'artistId or studioId, dates (array), and timeSlots (array) required' }), { status: 400 });
      }

      const inserted = [];
      for (const date of dates) {
        for (const time of timeSlots) {
          const [slot] = await sql.query(
            `INSERT INTO availability_slots ("artistId", "studioId", date, time, "isBooked")
             VALUES ($1, $2, $3::date, $4, false)
             ON CONFLICT DO NOTHING
             RETURNING *`,
            [artistId ? Number(artistId) : null, studioId ? Number(studioId) : null, date, time]
          );
          if (slot) inserted.push(slot);
        }
      }

      return new Response(JSON.stringify({ slots: inserted }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Availability create error:', err);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
}

export const config = {
  runtime: 'edge',
};
