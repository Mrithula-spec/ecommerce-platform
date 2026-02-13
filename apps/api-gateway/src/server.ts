import "dotenv/config";
import { createApp } from "./app";
import { env } from "./config/env";
import { checkPostgresConnection } from "./db/postgres";
import express from "express";
import path from "path";

async function bootstrap() {
  await checkPostgresConnection();
  console.log("PostgreSQL connected");

  const app = createApp();
  

  app.listen(env.PORT, () => {
    console.log(`API Gateway running on port ${env.PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

