import express, { Application } from "express";
import path from "path";
import { healthRouter } from "./routes/health.route";
import { productsRouter } from "./routes/products.route";
import { usersRouter } from "./routes/users.route";
import cors from "cors";
import { ordersRouter } from "./routes/orders.route";
import { authRouter } from "./routes/auth.route";
import adminRoutes from "./routes/admin.route";
import { errorMiddleware } from "./middleware/error.middleware";

export function createApp(): Application {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(express.json());

  // ✅ ADD THIS HERE (VERY IMPORTANT)
  app.use(
    "/uploads",
    express.static(
      path.join(process.cwd(), "uploads")
    )
  );

  app.use("/users", usersRouter);
  app.use("/products", productsRouter);
  app.use("/health", healthRouter);
  app.use("/orders", ordersRouter);
  app.use("/auth", authRouter);
  app.use("/admin", adminRoutes);

  app.use(errorMiddleware);

  return app;
}
