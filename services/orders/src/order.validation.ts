import { z } from "zod";

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid("Invalid product id"),
      quantity: z.number().int().positive("Quantity must be >= 1")
    })
  ).min(1, "Order must contain at least one product")
});
