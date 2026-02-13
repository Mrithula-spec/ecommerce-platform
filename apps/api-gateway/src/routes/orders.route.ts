import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { createOrder } from "@services/orders";
import { createOrderSchema } from "@services/orders";
import { getUserOrders } from "@services/orders";
import { getOrderById } from "@services/orders";
import { requireAuth } from "../middleware/auth.middleware";

export const ordersRouter: ExpressRouter = Router();

ordersRouter.post("/",requireAuth, async (req, res, next) => {
  try {
    const parsed = createOrderSchema.parse(req.body);
    const userId = req.user!.userId;
    const order = await createOrder(userId, parsed.items);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

ordersRouter.get("/", requireAuth, async (req, res, next) => {
  try {
    const userId = (req as any).userId;

    const orders = await getUserOrders(userId);

    res.json(orders);
  } catch (err) {
    next(err);
  }
});
ordersRouter.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const userId = req.user!.userId;
    const orderId = req.params.id;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await getOrderById(orderId, userId);

    res.json(order);
  } catch (err) {
    next(err);
  }
});



