import { createClient } from "@neondatabase/neon-js";

let client: ReturnType<typeof createClient> | null = null;

const dataApiUrl = import.meta.env.VITE_NEON_DATA_API_URL;
const authUrl = import.meta.env.VITE_NEON_AUTH_URL;

export function getDataApiClient() {
  if (client) return client;

  if (!dataApiUrl || !authUrl) {
    throw new Error("VITE_NEON_DATA_API_URL and VITE_NEON_AUTH_URL must be set");
  }

  client = createClient({
    auth: { url: authUrl },
    dataApi: { url: dataApiUrl },
  });

  return client;
}
