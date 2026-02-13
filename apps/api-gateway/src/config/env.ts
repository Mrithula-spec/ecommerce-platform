import dotenv from "dotenv";
import path from "path";

/**
 * Always load the ROOT .env file
 * regardless of where the app is started from
 */
dotenv.config({
  path: path.resolve(__dirname, "../../../../.env")
});

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  PORT: Number(process.env.PORT ?? 4000),
  DATABASE_URL: requireEnv("DATABASE_URL")
};
