import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.NEON_DATABASE_URL || import.meta.env.VITE_NEON_DATABASE_URL!);

export const neonAuth = {
  authUrl: import.meta.env.VITE_NEON_AUTH_URL,
};
