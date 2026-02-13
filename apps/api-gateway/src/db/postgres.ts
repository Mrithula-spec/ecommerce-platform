import { Pool } from "pg";
import { env } from "../config/env";

export const pgPool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
export async function checkPostgresConnection(): Promise<void> {
  const client = await pgPool.connect();
  try {
    await client.query("SELECT 1");
  } finally {
    client.release();
  }
}
