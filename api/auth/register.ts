import { getPool } from "../../src/lib/db";

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const pool = getPool();

  try {
    const { id, name, email, image, role } = await req.json();

    if (!id || !email) {
      return new Response(
        JSON.stringify({ error: "id and email are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    await pool.query(
      `INSERT INTO "user" (id, name, email, image, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         image = EXCLUDED.image,
         role = COALESCE(EXCLUDED.role, "user".role),
         updated_at = NOW()`,
      [id, name || null, email, image || null, role || "client"],
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Register API error:", err);
    return new Response(JSON.stringify({ error: "Registration failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
