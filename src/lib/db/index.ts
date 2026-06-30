import { Pool } from "@neondatabase/serverless";

// Create a single pool instance to be reused across requests
let pool: Pool | null = null;

export const getPool = () => {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
};

// Optional: Add cleanup for long-running processes (less relevant for serverless)
// but good practice for local development
if (process.env.NODE_ENV !== "production") {
  // @ts-expect-error - global pool for local dev
  global.__dbPool__ = pool;
}
