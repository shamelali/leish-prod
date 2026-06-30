import { neon } from "@neondatabase/serverless";

export default async function handler() {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const action = "users";
    switch (action) {
      case "users": {
        const users =
          await sql`SELECT id, name, email, role, "createdAt" FROM "user" ORDER BY "createdAt" DESC LIMIT 50`;
        return { users };
      }
      default:
        return { error: "Invalid action" };
    }
  } catch (err) {
    console.error("Admin API error:", err);
    return { error: "Internal server error" };
  }
}

// Execute the handler
handler()
  .then((result) => {
    console.log("Result:", JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error("Handler failed:", err);
  });
